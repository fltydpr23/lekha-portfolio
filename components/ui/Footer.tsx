export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__meta">
        <p>Lekha Rathnam</p>
        <p>Editorial &amp; fine art photography · © {year}</p>
      </div>

      <nav className="site-footer__links" aria-label="Contact links">
        <a href="mailto:hello@lekharathnam.com" className="nav-link">
          Email
        </a>
        <a
          href="https://www.instagram.com/lekharathnam"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          Instagram
        </a>
      </nav>
    </footer>
  );
}
