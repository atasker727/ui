import type { JSX } from 'react';
import './style.scss';
import { useState } from 'react';

export default function MainNav(): JSX.Element {
  const navItems: { title: string; link: string }[] = [
    { title: 'Photo Of The Day', link: '/POTD' },
    { title: 'Mars', link: '/mars' },
  ];

  const [isNavExpanded, setIsNavExpanded] = useState(true);
  return (
    <div className={`main-nav ${isNavExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
      {navItems.map((item, index) => (
        <a key={index} href={item.link} className="nav-item">
          {isNavExpanded ? item.title : item.title.charAt(0).toUpperCase()}
        </a>
      ))}
      <button className="nav-toggle-button" onClick={() => setIsNavExpanded(!isNavExpanded)}>
        {isNavExpanded ? 'Nav -' : '+'}
      </button>
    </div>
  );
}
