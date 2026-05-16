import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white px-8 lg:px-12 pb-8 pt-32"
      role="contentinfo"
    >
      <div className="flex flex-col md:flex-row justify-between items-end">
        <div>
          <p className="text-body text-black mb-[7px]">
            Lekha Rathnam
          </p>
          <p className="text-caption text-black">
            Editorial & Fine Art Photography
          </p>
        </div>

        <div className="flex gap-[16px] mt-8 md:mt-0">
          <a href="mailto:info@lekharathnam.com" className="nav-link">
            Email
          </a>
          <a href="https://instagram.com/lekharathnam" target="_blank" rel="noopener noreferrer" className="nav-link">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
