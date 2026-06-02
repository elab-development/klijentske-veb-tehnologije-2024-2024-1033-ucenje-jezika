import { useParams } from 'react-router-dom';

import { useSidebar } from '../hooks/useSidebar.hook';
import CoursesList from '../components/courses/CoursesList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Course = () => {
  const { sidebarActive } = useSidebar();
  const { id } = useParams();

  return (
    <div className={`section ${sidebarActive && 'active'}`}>
      <Header />
      <Sidebar />
      {id && <CoursesList languageId={parseInt(id)} />}
      <Footer />
    </div>
  );
};

export default Course;
