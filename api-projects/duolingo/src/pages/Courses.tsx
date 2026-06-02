import { useSidebar } from '../hooks/useSidebar.hook';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CoursesSection from '../components/courses/CoursesSection';
import Footer from '../components/Footer';

const Courses = () => {
  const { sidebarActive } = useSidebar();

  return (
    <div className={`section ${sidebarActive && 'active'}`}>
      <Header />
      <Sidebar />
      <CoursesSection />
      <Footer />
    </div>
  );
};

export default Courses;
