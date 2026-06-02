import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

import '../../styles/CourseModal.css';
import { useModal } from '../../hooks/useModal';
import { useSelectedCourse } from '../../hooks/useSelectedCourse';
import { useSelectedLanguage } from '../../hooks/useSelectedLanguage';
import { translate } from '../../utils/translateAPI';
import { StorageCourse } from '../../models/Course';

const CourseModal = () => {
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { selectedCourse } = useSelectedCourse();
  const { selectedLanguage } = useSelectedLanguage();
  const { setCourseModalOpen } = useModal();

  const handleAnswer = async () => {
    if (!userAnswer || userAnswer.trim() === '') {
      toast.error(<p className='toast'>You must provide an answer!</p>, {
        id: 'quiz',
      });
      return;
    }
    const translatedText = await translate(
      selectedCourse.questions[currentQuestionNo].questionText,
      'en',
      selectedLanguage.translateCode
    );

    if (
      translatedText.trim().toLowerCase() === userAnswer.trim().toLowerCase()
    ) {
      toast.success(<p className='toast'>Correct answer!</p>, {
        id: 'quiz',
      });
      setCorrectAnswers(correctAnswers + 1);
    } else {
      toast.error(
        <p className='toast'>Wrong! We were looking for "{translatedText}"</p>,
        {
          id: 'quiz',
        }
      );
    }

    if (currentQuestionNo < selectedCourse.questions.length - 1) {
      setTimeout(() => {
        setUserAnswer('');
        setCurrentQuestionNo(currentQuestionNo + 1);
      }, 1000);
    } else {
      // Last answer
      let finishedCourses = localStorage.getItem('finishedCourses');
      let filteredCourses: StorageCourse[] = [];
      if (finishedCourses) {
        const parsedCourses: StorageCourse[] = JSON.parse(finishedCourses);
        filteredCourses = parsedCourses.filter(
          (storeCourse) =>
            storeCourse.courseId !== selectedCourse.id ||
            storeCourse.languageId !== selectedLanguage.id
        );
      }
      filteredCourses.push({
        courseId: selectedCourse.id,
        languageId: selectedLanguage.id,
        marks: correctAnswers,
      });

      localStorage.setItem('finishedCourses', JSON.stringify(filteredCourses));

      setTimeout(() => {
        setUserAnswer('');
        setCourseModalOpen(false);
      }, 1000);
    }
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='modal'>
        <div className='modalContainer'>
          <div className='modalHeader'>
            <h1 className='title capitalize'>
              {selectedLanguage.name} {selectedCourse.name}
            </h1>
            <IoClose
              className='cpointer'
              size={24}
              onClick={() => {
                setCourseModalOpen(false);
              }}
            />
          </div>
          <div className='modalBody'>
            <h2>
              Question {currentQuestionNo + 1}/{selectedCourse.questions.length}
            </h2>
            <img
              src={selectedCourse.questions[currentQuestionNo].questionImage}
              alt='question'
            />
            <input
              type='text'
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>

          <div className='modalFooter'>
            <button className='inline-btn' onClick={handleAnswer}>
              {currentQuestionNo === selectedCourse.questions.length - 1
                ? 'Finish Course'
                : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseModal;
