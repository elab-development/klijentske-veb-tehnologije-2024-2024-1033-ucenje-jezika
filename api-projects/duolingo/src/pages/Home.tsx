import { useSidebar } from '../hooks/useSidebar.hook';
import AboutSection from '../components/home/AboutSection';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Reviews from '../components/home/Reviews';
import Footer from '../components/Footer';

const Home = () => {
  const { sidebarActive } = useSidebar();

  return (
    <div className={`section ${sidebarActive && 'active'}`}>
      <Header />
      <Sidebar />
      <AboutSection />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
