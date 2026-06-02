import duolingoImg from '../../assets/logo.png';

interface ReviewCardProps {
  name: string;
  review: number;
  reviewText: string;
}
const ReviewCard = ({ name, review, reviewText }: ReviewCardProps) => {
  return (
    <div className='box'>
      <p>{reviewText}</p>
      <div className='student'>
        <img src={duolingoImg} alt='user' />
        <div>
          <h3>{name}</h3>
          <div className='stars'>
            {[...Array(review)].map((e, i) => (
              <i className='fas fa-star' key={e + '' + i}></i>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
