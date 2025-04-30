import { FaStar } from "react-icons/fa";
import { customFetch } from "../utils/idnex";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const submitReview = async ({ productId, review, token }) => {

    const { data } = await customFetch.post(`/reviews`, {
      ...review,
      product: productId,
    },
    {
        headers: {
          Authorization: `Bearer ${token}`,
       }
    }
);
    return data;
};

const ReviewPage = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        comment: "",
        rating: 0,
    });

    const [hoveredStar, setHoveredStar] = useState(null);
    const user = useSelector((state) => state.userState.user);

    const mutation = useMutation({
        mutationFn: ({ productId, review }) => submitReview({ productId, review, token: user?.token }),
        onSuccess: () => {
          queryClient.invalidateQueries(["reviews", productId]);
          toast.success("Success submit review");
          navigate(`/products/${productId}`);
        },
        onError: (error) => {
            console.error("Error submitting review:", error.response?.data || error.message);

            const backendMessage = error.response?.data?.msg;
          
            if (backendMessage === "Already submitted for this product") {
              toast.error("You have already submitted a review for this product.");
            } else {
              toast.error(backendMessage || "Failed to submit review.");
            }
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    
    const handleRating = (value) => {
         setForm((prev) => ({ ...prev, rating: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.rating) return toast.error("Please select a rating.");
        mutation.mutate({ productId, review: form });
    };

    return(
        <section className="max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= (hoveredStar || form.rating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
              />
            ))}
          </div>
          <input
            className="input input-bordered w-full"
            name="title"
            placeholder="Review title"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            name="comment"
            placeholder="Your review..."
            value={form.comment}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      </section>
    );
};

export default ReviewPage;