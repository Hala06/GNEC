import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import BackgroundBlobs from '../components/Ui/BackgroundBlobs';
import Stars from '../components/Ui/Stars';
import ScrollButton from '../components/core/Buttons/ScrollButton';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      {/* Visual Effects */}
      <BackgroundBlobs />
      <Stars />

      {/* Main Layout */}
      <Navbar />
      <main id="main-content" className="content-wrapper">
        {children}
      </main>
      <Footer />
      <ScrollButton />
    </div>
  );
};

export default MainLayout;
