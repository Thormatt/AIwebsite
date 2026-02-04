import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left */}
          <div>
            <Link
              href="/"
              className="text-sm font-bold tracking-wider uppercase text-text-primary"
            >
              Thor<span className="text-gradient">.</span>
            </Link>
            <p className="text-small text-text-muted mt-4 max-w-xs">
              AI strategy and implementation.
              <br />
              Strategy that ships.
            </p>
          </div>

          {/* Right */}
          <div className="flex gap-12">
            <div>
              <p className="text-micro text-text-muted mb-4">Navigate</p>
              <div className="space-y-2">
                <Link href="/services" className="block text-small text-text-secondary hover:text-text-primary transition-colors">
                  Services
                </Link>
                <Link href="/articles" className="block text-small text-text-secondary hover:text-text-primary transition-colors">
                  Articles
                </Link>
                <Link href="/#contact" className="block text-small text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <p className="text-micro text-text-muted mb-4">Connect</p>
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/in/thor-matthiasson-647a9415/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-small text-text-secondary hover:text-text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:thor@aiwiththor.com"
                  className="block text-small text-text-secondary hover:text-text-primary transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-micro text-text-muted">
          <span>&copy; {year} Thor Matthiasson</span>
          <span>New York Metropolitan Area</span>
        </div>
      </div>
    </footer>
  );
}
