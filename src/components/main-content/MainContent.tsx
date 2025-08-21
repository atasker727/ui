import type { JSX } from 'react';

export default function MainContent({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <>
      <div className="main-content">{children}</div>
    </>
  );
}
