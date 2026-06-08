"use client";

import ScatteredHero from "@/components/home/ScatteredHero";
import dynamic from "next/dynamic";

const Universe3D = dynamic(() => import("@/components/Universe3D"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* 
        The existing hero has been kept aside as requested.
        Uncomment the line below to bring it back!
        <ScatteredHero />
      */}
      <Universe3D />
    </main>
  );
}
