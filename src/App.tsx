import { useState } from 'react';

import MainNav from '@/components/main-nav/MainNav.tsx';
import MainContent from '@/components/main-content/MainContent.tsx';
// import ImageView from '@/components/image-view/imageView';
import ImageCarousel from './components/image-carousel/imageCarousel';
// import Modal from '@/components/modal/modal';

function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  const navItems: { title: string; link: string }[] = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
  ];

  return (
    <div className={`application-container ${isNavExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
      <MainNav navItems={navItems} isNavExpanded={isNavExpanded} setIsNavExpanded={setIsNavExpanded} />
      <MainContent>
        <>
          {/* <ImageCarousel sizeType="preview" /> */}
          {/* <Modal />
          <button /> */}
          <ImageCarousel sizeType="fullsize" />
        </>
      </MainContent>
    </div>
  );
}

export default App;
