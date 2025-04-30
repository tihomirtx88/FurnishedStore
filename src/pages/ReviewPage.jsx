import { redirect, useParams } from "react-router-dom";
import CreateReviewForm from "../components/CreateReviewForm";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
    const user = store.getState().userState.user;
  
    if (!user) {
      toast.warn("You must to logged in to create product");
      return redirect("/login");
    }
  
    return null;
  };

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