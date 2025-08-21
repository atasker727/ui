import type { JSX } from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="application-footer">
      <div>Version 1.0</div>
      <div>© {new Date().getFullYear()} My Application</div>
    </footer>
  );
}
