import { useEffect, useState } from 'react';

import '../../styles/CoursesSection.css';
import { Language } from '../../models/Language';
import { languages } from '../../utils/constants';
import LanguageCard from './LanguageCard';

const CoursesSection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesArray, setPagesArray] = useState<number[]>([]);

  useEffect(() => {
    let pages: number[] = [];
    for (let i = 1; i <= Math.ceil(languages?.length / 6); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [languages]);

  return (
    <section className='courses'>
      <h1 className='heading'>our courses</h1>

      <div className='box-container'>
        {languages
          .slice(currentPage * 6 - 6, currentPage * 6)
          .map((lan, index) => (
            <LanguageCard
              key={index}
              language={
                new Language(lan.id, lan.name, lan.image, lan.translateCode)
              }
            />
          ))}
      </div>

      <div className='pagination'>
        {pagesArray.map((page) => (
          <p
            key={page}
            className={`page ${page === currentPage && 'active'}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </p>
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;
