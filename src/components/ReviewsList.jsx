import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const ReviewsList = ()=> {
    const { reviews, count } = useLoaderData();

    return(
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <h4 className="mb-4 capitalize">total reviews: {count}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User</th>
              <th>Rating</th>
              <th>Title</th>
              <th className="hidden sm:table-cell">Product</th>
              <th className="hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              const {
                _id,
                rating,
                title,
                user,
                product,
                createdAt,
              } = review;

              const date = day(createdAt).format("hh:mm A - MMM Do, YYYY");

              return (
                <tr key={_id} className="text-gray-900 dark:text-gray-100 even:bg-gray-100 dark:even:bg-gray-800">
                  <td className="px-4 py-2">{user?.name || "Unknown"}</td>
                  <td className="px-4 py-2">{rating} / 5</td>
                  <td className="px-4 py-2">{title}</td>
                  <td className="hidden sm:table-cell px-4 py-2">
                    {product?.name || <span className="italic text-gray-500">Deleted</span>}
                  </td>
                  <td className="hidden sm:table-cell px-4 py-2">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsList;