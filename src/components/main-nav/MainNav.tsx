import type { JSX } from 'react';
import './style.scss';

interface MainNavProps {
  navItems: { title: string; link: string }[];
  isNavExpanded: boolean;
  setIsNavExpanded: (newVal: boolean) => void;
}

export default function MainNav({ navItems, isNavExpanded, setIsNavExpanded }: MainNavProps): JSX.Element {
  return (
    <div className="main-nav">
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
