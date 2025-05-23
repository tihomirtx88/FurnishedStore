import { toast } from "react-toastify";
import { OrderList, PaginationContainer, SectionTitle } from "../components";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/idnex";

const ordersQuery = (params, user) => {
   return{
    queryKey: ['orders', user.username, params.page ? parseInt(params.page) : 1],
    queryFn: () => customFetch("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
   }
  };
  

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("You must to be logged in to veiw orders");
      redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await queryClient.ensureQueryData(ordersQuery(params, user));

      const { orders, numOfPages, currentPage, totalProducts, count } = response.data;
      return { orders, numOfPages, currentPage, totalProducts, count };

    } catch (error) {
      const msg =
        error?.response?.data?.error?.message || "Order failed. Try again.";
      toast.error(msg);
      if (error?.response?.status === 401) return redirect("/login");
      return null;
    }
  };

const Orders = () => {

  const { orders } = useLoaderData();
  if (orders.length < 1) {
    return <SectionTitle text="please make a order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList />
      <PaginationContainer />
    </>
  );
};
export default Orders;
