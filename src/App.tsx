import MainNav from '@/components/main-nav/MainNav';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import MainContent from '@/components/main-content/MainContent';
import PhotoOfTheDay from '@/components/planet-views/photo-of-the-day/photo-of-the-day';
import MarsPhotos from '@/components/planet-views/mars/mars-photos';

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
            {currentRoute === 'mars' && <MarsPhotos />}
          </>
        </MainContent>
      </div>
      <Footer />
    </>
  );
}

export default App;
