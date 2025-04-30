import { redirect } from "react-router-dom";
import { customFetch } from "../utils/idnex";
import { toast } from "react-toastify";
import { PaginationContainer, ReviewsList } from "../components";

const reviewsQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch("/reviews", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader = ( queryClient, store ) => async ({request}) => {
    const user = store.getState().userState.user;

    if (!user) {
        toast.warn("You must to be logged in to veiw orders");
        redirect("/login");
    }

    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    try {
        const response = await queryClient.ensureQueryData(reviewsQuery(params, user));
    
        const { reviews, numOfPages, currentPage, totalProducts, count } = response.data;
        return { reviews, numOfPages, currentPage, totalProducts, count };
    
    } catch (error) {
        const msg =
        error?.response?.data?.error?.message || "Reviews failed. Try again.";
        toast.error(msg);
        if (error?.response?.status === 401) return redirect("/login");
        return null;
    }
};

const Reviews = () => {
  return (
    <>
      <SectionTitle text="All Orders" />
      <ReviewsList/>
      <PaginationContainer />
    </>
  );
};
export default Reviews;
