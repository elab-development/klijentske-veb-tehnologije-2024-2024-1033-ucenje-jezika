import { Link } from 'react-router-dom';

interface CategoryCardProps {
  link: string;
  image: string;
  text: string;
  background: string;
}

const CategoryCard = ({ link, image, text, background }: CategoryCardProps) => {
  return (
    <Link
      to={link}
      className='cat-card'
      style={{
        background: background,
      }}
    >
      <img src={image} alt={text} />
      <h6>{text}</h6>
    </Link>
  );
};

export default CategoryCard;
