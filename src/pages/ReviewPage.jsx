import { useParams } from "react-router-dom";
import CreateReviewForm from "../components/CreateReviewForm";

const ReviewPage = () => {
  const { id: productId } = useParams();

  return (
    <section className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
      <CreateReviewForm productId={productId} />
    </section>
  );
};

export default ReviewPage;