import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
    return(
        <section className="max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <form className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= (hoveredStar || form.rating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <input
            className="input input-bordered w-full"
            name="title"
            placeholder="Review title"
          />
          <textarea
            className="textarea textarea-bordered w-full"
            name="comment"
            placeholder="Your review..."
          />
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      </section>
    );
};

export default ReviewPage;