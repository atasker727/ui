import MainNav from '@/components/main-nav/MainNav';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import MainContent from '@/components/main-content/MainContent';
import ImageCarousel from '@/components/image-carousel/imageCarousel';
import PhotoOfTheDay from '@/components/photo-of-the-day/photo-of-the-day';
// import Modal from '@/components/modal/modal';

function App() {
  const currentRoute = window.location.pathname.slice(1);
  return (
    <>
      <Header />
      <div className={`application-container`}>
        <MainNav />
        <MainContent>
          <>
            {(currentRoute === 'POTD' || currentRoute === '') && <PhotoOfTheDay />}
            {currentRoute === 'mars' && <ImageCarousel photoType="MarsPhotos" sizeType="preview" />}
            {/* <Modal />
            <button /> */}
            {/* <ImageCarousel sizeType="fullsize" /> */}
          </>
        </MainContent>
      </div>
      <Footer />
    </>
  );
}

export default App;
