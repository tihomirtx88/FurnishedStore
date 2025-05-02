import { Link } from "react-router-dom";

const ProductReviews = ({ reviewsData, user, id  }) => {
  const productReviews = reviewsData?.reviews || [];
  const userReview = productReviews.find(
    (review) => review.user === user?.userId
  );

  return (
    <div>
      <h3 className="text-xl font-bold mt-8">Reviews</h3>
      {/* Display reviews */}
      {productReviews.length > 0 ? (
        productReviews.map((review) => (
          <div key={review._id}>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
      {/* Add/Edit Review Button */}
      {user &&
        (userReview ? (
          <Link
            to={`/reviews/${userReview._id}/edit`}
            className="btn btn-outline btn-warning m-4"
          >
            Edit Your Review
          </Link>
        ) : (
          <Link
            to={`/products/${id}/review`}
            className="btn btn-outline btn-warning m-4"
          >
            Add Review
          </Link>
        ))}
    </div>
  );
};

export default ProductReviews;
