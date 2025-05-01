import { Link } from "react-router-dom";

const ProductActions = ({
  role,
  addToCart,
  handleDelete,
  productId,
  userReview,
  user,
}) => {
  return (
    <div className="mt-10">
      <button className="btn btn-secondary btn-md" onClick={addToCart}>
        Add to bag
      </button>
      {role === "admin" && (
        <>
          <Link
            to={`/products/${productId}/edit`}
            className="btn btn-warning btn-md m-4"
          >
            Edit Product
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-md">
            Delete Product
          </button>
        </>
      )}
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
            to={`/products/${productId}/review`}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 btn-md m-4"
          >
            Add Review
          </Link>
        ))}
    </div>
  );
};

export default ProductActions;
