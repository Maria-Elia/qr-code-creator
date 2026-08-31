export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__col">
          <p className="site-footer__support-text">
            <strong>Did this tool help you?</strong>
            <br />
            You can support it with a coffee (or treats for my cats 🐱).
          </p>
          <a
            href="https://ko-fi.com/mariaelia/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__support-btn"
          >
            ☕ Support the project
          </a>
        </div>
        <div className="site-footer__col site-footer__col--right">
          <p className="site-footer__wordmark">
            QR Code Generator
            <span className="sparkle" aria-hidden="true"></span>
          </p>
          <a href="mailto:contact@mariaelia.dev" className="site-footer__email">
            contact@mariaelia.dev
          </a>
          <a href="https://mariaelia.de/impressum/" className="site-footer__email">
            Impressum
          </a>
          <p className="site-footer__copyright">&copy; 2026 Maria Elia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
