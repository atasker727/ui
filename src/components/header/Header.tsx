import type { JSX } from 'react';

export default function Header(): JSX.Element {
  return (
    <div className="application-header m-0">
      <h1 className="application-header-title text-grey h-100">Note Taker</h1>
    </div>
  );
}
