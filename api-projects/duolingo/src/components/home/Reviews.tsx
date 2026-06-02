import '../../styles/Reviews.css';
import { duolingoReviews } from '../../utils/constants';
import ReviewCard from './ReviewCard';

const Reviews = () => {
  return (
    <section className='reviews'>
      <h1 className='heading'>student's reviews</h1>

      <div className='box-container'>
        {duolingoReviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            review={review.review}
            reviewText={review.reviewText}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
