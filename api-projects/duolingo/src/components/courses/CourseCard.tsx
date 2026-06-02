import '../../styles/CourseCard.css';
import { useEffect, useState } from 'react';
import { Course, StorageCourse } from '../../models/Course';
import { Language } from '../../models/Language';
import { useModal } from '../../hooks/useModal';
import { useSelectedCourse } from '../../hooks/useSelectedCourse';
import { useSelectedLanguage } from '../../hooks/useSelectedLanguage';

interface CourseCardProps {
  course: Course;
  language: Language;
}

const CourseCard = ({ language, course }: CourseCardProps) => {
  const [passed, setPassed] = useState('');
  const [marks, setMarks] = useState(-1);
  const { courseModalOpen, setCourseModalOpen } = useModal();
  const { setSelectedCourse } = useSelectedCourse();
  const { setSelectedLanguage } = useSelectedLanguage();

  const beginCourse = () => {
    setCourseModalOpen(true);
    setSelectedCourse(course);
    setSelectedLanguage(language);
  };

  useEffect(() => {
    let finishedCourses = localStorage.getItem('finishedCourses');
    if (finishedCourses) {
      const parsedCourses: StorageCourse[] = JSON.parse(finishedCourses);
      // [{courseId, languageId, marks}]
      let filteredCourses = parsedCourses.filter(
        (storeCourse) =>
          storeCourse.courseId === course.id &&
          storeCourse.languageId === language.id
      );

      if (filteredCourses.length > 0) {
        if (course.noOfQuestions / 2 < filteredCourses[0].marks) {
          setPassed('passed');
        } else {
          setPassed('failed');
        }

        setMarks(filteredCourses[0].marks);
      }
    }
  }, [courseModalOpen]);

  return (
    <div className='box cpointer' onClick={beginCourse}>
      <i className='fas fa-play'></i>
      <img src={language.image} alt='course' />
      <h3 className='capitalize'>{course.name} course</h3>
      <h5
        className={`result capitalize ${
          passed === 'passed' ? 'passed' : passed === 'failed' ? 'failed' : ''
        } `}
      >
        {passed}: {marks}/{course.noOfQuestions}
      </h5>
    </div>
  );
};

export default CourseCard;
