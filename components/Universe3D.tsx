"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

const IMAGES = [
  "/images/pic-1.jpg",
  "/images/pic-2.jpg",
  "/images/pic-3.jpg",
  "/images/pic-4.jpg",
  "/images/pic-5.jpg",
  "/images/pic-6.jpg",
  "/images/pic-7.jpg",
  "/images/pic-8.jpg",
];

const vertexShader = `
  varying vec2 vUv;
  varying float vViewZ;
  
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // vViewZ is the distance from the camera to the vertex
    vViewZ = -mvPosition.z; 
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uDim;
  uniform float uFocusDistance;
  
  varying vec2 vUv;
  varying float vViewZ;
  
  void main() {
    // Depth of Field calculation: blur increases as distance from focal plane increases
    float dofBlur = abs(vViewZ - uFocusDistance) * 0.0008; 
    
    // Combine the interaction hover-blur with the camera's natural DoF blur
    float blur = (uDim * 0.015) + dofBlur;
    blur = clamp(blur, 0.0, 0.03); // Cap max blur to keep it highly performant
    
    vec4 color = vec4(0.0);
    
    // 9-Tap Box Blur
    color += texture2D(uTexture, vec2(vUv.x - blur, vUv.y - blur));
    color += texture2D(uTexture, vec2(vUv.x, vUv.y - blur));
    color += texture2D(uTexture, vec2(vUv.x + blur, vUv.y - blur));
    
    color += texture2D(uTexture, vec2(vUv.x - blur, vUv.y));
    color += texture2D(uTexture, vec2(vUv.x, vUv.y));
    color += texture2D(uTexture, vec2(vUv.x + blur, vUv.y));
    
    color += texture2D(uTexture, vec2(vUv.x - blur, vUv.y + blur));
    color += texture2D(uTexture, vec2(vUv.x, vUv.y + blur));
    color += texture2D(uTexture, vec2(vUv.x + blur, vUv.y + blur));
    
    color /= 9.0;
    
    // Wash out to the softer premium background when dimmed via interaction
    color.rgb = mix(color.rgb, vec3(0.886, 0.886, 0.878), uDim * 0.4);
    
    gl_FragColor = color;
  }
`;

export default function Universe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e2e2e0"); 
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 45; 
    let targetScrollZ = camera.position.z;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + Math.PI / 4; // Max look down
    controls.minPolarAngle = Math.PI / 2 - Math.PI / 4; // Max look up
    controls.maxAzimuthAngle = Math.PI / 3; // Max look right
    controls.minAzimuthAngle = -Math.PI / 3; // Max look left
    controls.enableZoom = false; // We handle zoom/scrolling manually for the endless effect
    controls.enablePan = false;

    const textureLoader = new THREE.TextureLoader();
    const textures = IMAGES.map((src) => {
      const tex = textureLoader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace; 
      return tex;
    });
    
    const particles: THREE.Mesh[] = [];
    const geometry = new THREE.PlaneGeometry(4, 4);

    for (let i = 0; i < 60; i++) {
      const textureIndex = Math.floor(Math.random() * textures.length);
      const texture = textures[textureIndex];
      
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uDim: { value: 0.0 },
          uFocusDistance: { value: 30.0 }
        },
        side: THREE.DoubleSide,
        transparent: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 100; 
      mesh.position.y = (Math.random() - 0.5) * 60;
      // Spread out across 250 units deep for a balanced, immersive depth
      mesh.position.z = camera.position.z - (Math.random() * 250); 
      
      const randomScale = 0.5 + Math.random() * 1.5; 
      mesh.userData.baseScale = randomScale;
      
      mesh.scale.set(0, 0, 0);
      
      scene.add(mesh);
      particles.push(mesh);
      
      gsap.to(mesh.scale, {
        x: randomScale,
        y: randomScale,
        z: randomScale,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: Math.random() * 2
      });
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;
    let activeMesh: THREE.Mesh | null = null;
    let isFlying = false;

    // Depth of field animation trackers
    let globalFocusDistance = 30.0;
    const focusObj = { dist: 30.0 };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const resetMeshRotation = (mesh: THREE.Mesh) => {
      // Normalize rotation so it doesn't violently unwind multiple full spins
      mesh.rotation.y = mesh.rotation.y % (Math.PI * 2);
      if (mesh.rotation.y > Math.PI) mesh.rotation.y -= Math.PI * 2;
      else if (mesh.rotation.y < -Math.PI) mesh.rotation.y += Math.PI * 2;
      gsap.to(mesh.rotation, { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" });
    };

    const onWheel = (event: WheelEvent) => {
      // Scroll moves the camera backwards and forwards through the universe
      targetScrollZ -= event.deltaY * 0.02;
      
      // If user scrolls away, reset the active spinning mesh
      if (activeMesh && !isFlying) {
        resetMeshRotation(activeMesh);
        activeMesh = null;
      }
    };

    const onClick = () => {
      if (hoveredMesh && !isFlying) {
        // Reset previously active mesh if clicking a new one
        if (activeMesh && activeMesh !== hoveredMesh) {
          resetMeshRotation(activeMesh);
        }
        
        activeMesh = hoveredMesh;
        isFlying = true;
        const targetPos = hoveredMesh.position.clone();
        controls.enabled = false;

        const scaleOffset = hoveredMesh.userData.baseScale * 6;

        gsap.to(camera.position, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z + scaleOffset,
          duration: 2,
          ease: "power3.inOut",
        });

        gsap.to(controls.target, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 2,
          ease: "power3.inOut",
          onComplete: () => {
            isFlying = false;
            controls.enabled = true; 
            targetScrollZ = camera.position.z; // Sync endless scroll to new location
            globalFocusDistance = focusObj.dist; // Lock focus so it doesn't auto-blur
          }
        });

        // Pull camera focus to the exact image we are flying to
        gsap.to(focusObj, {
          dist: scaleOffset,
          duration: 2,
          ease: "power3.inOut"
        });
      }
    };

    const onDoubleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(particles);
      
      if (intersects.length === 0 && !isFlying) {
        controls.enabled = false;
        gsap.to(camera.position, {
          x: controls.target.x,
          y: controls.target.y,
          duration: 1.5,
          ease: "power3.out",
          onComplete: () => {
            controls.enabled = true;
          }
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("dblclick", onDoubleClick);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isFlying) {
        // Endless scroll camera interpolation
        const scrollLerp = (targetScrollZ - camera.position.z) * 0.1;
        camera.position.z += scrollLerp;
        controls.target.z += scrollLerp;
      }

      // Slowly rotate the active (clicked) mesh
      if (activeMesh) {
        activeMesh.rotation.y += 0.003;
      }

      particles.forEach((p) => {
        // ENDLESS RUNNER RECYCLING LOGIC
        if (p.position.z > camera.position.z + 10) {
          // Passed behind the camera, move to front
          p.position.z -= 250;
          p.position.x = (Math.random() - 0.5) * 100;
          p.position.y = (Math.random() - 0.5) * 60;
        } else if (p.position.z < camera.position.z - 260) {
          // Scrolled backwards too far, move to back
          p.position.z += 250;
          p.position.x = (Math.random() - 0.5) * 100;
          p.position.y = (Math.random() - 0.5) * 60;
        }

        // Update shader focal distance
        const mat = p.material as THREE.ShaderMaterial;
        mat.uniforms.uFocusDistance.value = isFlying ? focusObj.dist : globalFocusDistance;
      });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(particles);

      if (intersects.length > 0 && !isFlying) {
        const firstIntersect = intersects[0];
        const mesh = firstIntersect.object as THREE.Mesh;
        
        // Auto-Focus dynamically adjusts to the hovered item's true distance!
        globalFocusDistance = THREE.MathUtils.lerp(globalFocusDistance, firstIntersect.distance, 0.1);
        focusObj.dist = globalFocusDistance; 
        
        if (hoveredMesh !== mesh) {
          if (hoveredMesh) {
            gsap.to(hoveredMesh.scale, { 
              x: hoveredMesh.userData.baseScale, 
              y: hoveredMesh.userData.baseScale, 
              z: hoveredMesh.userData.baseScale, 
              duration: 0.3 
            });
          }
          
          hoveredMesh = mesh;
          gsap.to(hoveredMesh.scale, { 
            x: hoveredMesh.userData.baseScale * 1.15, 
            y: hoveredMesh.userData.baseScale * 1.15, 
            z: hoveredMesh.userData.baseScale * 1.15, 
            duration: 0.3, 
            ease: "back.out(1.5)" 
          });
          document.body.style.cursor = "pointer";

          particles.forEach((p) => {
            if (p !== hoveredMesh) {
              const mat = p.material as THREE.ShaderMaterial;
              gsap.to(mat.uniforms.uDim, { value: 1.0, duration: 0.3 });
            }
          });
        }
      } else {
        if (hoveredMesh && !isFlying) {
          gsap.to(hoveredMesh.scale, { 
            x: hoveredMesh.userData.baseScale, 
            y: hoveredMesh.userData.baseScale, 
            z: hoveredMesh.userData.baseScale, 
            duration: 0.3 
          });
          hoveredMesh = null;
          document.body.style.cursor = "auto";

          particles.forEach((p) => {
            const mat = p.material as THREE.ShaderMaterial;
            gsap.to(mat.uniforms.uDim, { value: 0.0, duration: 0.3 });
          });
        }
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("click", onClick);
      window.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("resize", handleResize);
      document.body.style.cursor = "auto";
      cancelAnimationFrame(animationFrameId);
      
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      particles.forEach((p) => {
        (p.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#e2e2e0] absolute top-0 left-0 z-0 overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      
      <div className="absolute bottom-10 left-10 text-black z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter">The Universe.</h1>
        <p className="mt-2 text-black/60">Scroll to explore. Hover to focus. Click to fly.</p>
      </div>
    </div>
  );
}
