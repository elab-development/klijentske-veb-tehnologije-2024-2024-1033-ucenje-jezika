import { useModal } from '../../hooks/useModal';
import { Language } from '../../models/Language';
import '../../styles/CoursesList.css';
import { courses, languages } from '../../utils/constants';
import CourseCard from './CourseCard';
import CourseModal from './CourseModal';

interface CoursesListProps {
  languageId: number;
}

const CoursesList = ({ languageId }: CoursesListProps) => {
  const language: Language = languages.filter(
    (lan) => lan.id === languageId
  )[0];
  const { courseModalOpen } = useModal();

  return (
    <section className='courseslist'>
      <h1 className='heading capitalize'>{language.name} courses</h1>

      <div className='box-container'>
        <CourseCard language={language} course={courses[0]} />
        <CourseCard language={language} course={courses[1]} />
        <CourseCard language={language} course={courses[2]} />
      </div>

      {courseModalOpen && <CourseModal />}
    </section>
  );
};

export default CoursesList;
