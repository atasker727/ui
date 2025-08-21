import { useState } from 'react';

import MainNav from '@/components/main-nav/MainNav.tsx';
import MainContent from '@/components/main-content/MainContent.tsx';
// import ImageView from '@/components/image-view/imageView';
import ImageCarousel from './components/image-carousel/imageCarousel';

// import print from '@/helpers/print.tsx'

function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  // const reqId = useRef(1);

  const navItems: { title: string; link: string }[] = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
  ];

  return (
    <div className={`application-container ${isNavExpanded ? 'nav-expanded' : 'nav-collapsed'}`}>
      <MainNav navItems={navItems} isNavExpanded={isNavExpanded} setIsNavExpanded={setIsNavExpanded} />
      <MainContent>
        <ImageCarousel sizeType="preview" />
        {/* <ImageCarousel sizeType="fullsize" /> */}
      </MainContent>
    </div>
  );
}

export default App;
