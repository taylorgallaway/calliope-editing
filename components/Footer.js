export default function Footer({ ruled = false }) {
  return (
    <footer className={ruled ? 'site-footer site-footer--ruled' : 'site-footer'}>
      <div className="site-footer__inner">
        <p>© 2026 Calliope Editing</p>
        <p>
          <a href="mailto:tgallaway15@icloud.com">tgallaway15@icloud.com</a> · @calliope.editing
        </p>
      </div>
    </footer>
  );
}
