import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} legacyBehavior>
            <a className="nav-link"> {label} </a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient-primary">
      <Link href="/" legacyBehavior>
        <a className="navbar-brand">TickIt</a>
      </Link>
      <div className="ml-auto">
        <ul className="navbar-nav">{links}</ul>
      </div>
    </nav>
  );
};
