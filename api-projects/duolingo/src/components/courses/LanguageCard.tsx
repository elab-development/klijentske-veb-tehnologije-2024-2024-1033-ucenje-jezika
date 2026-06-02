import { Link } from 'react-router-dom';
import { Language } from '../../models/Language';

interface LanguageCardProps {
  language: Language;
}

const LanguageCard = ({ language }: LanguageCardProps) => {
  return (
    <div className='box'>
      <div className='thumb'>
        <img src={language.image} alt={language.name + ' flag'} />
        <span>3 courses</span>
      </div>
      <h3 className='title capitalize'>{language.name} Courses</h3>
      <Link to={`/courses/${language.id}`} className='inline-btn'>
        view courses
      </Link>
    </div>
  );
};

export default LanguageCard;
