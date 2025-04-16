import { toast } from "react-toastify";
import { OrderList, PaginationContainer, SectionTitle } from "../components";
import { redirect } from "react-router-dom";
import { customFetch } from "../utils/idnex";

 export const loader = (store) => async ({request}) => {
    const user = store.getState().userState.user;
    if (!user) {
        toast.warn('You must to be logged in to veiw orders');
        redirect('/login');
    }

    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

    try {
        const response = await customFetch('/orders', {
            params, headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        const { orders } = response.data; 
        return { orders };
        
    } catch (error) {
        const msg =
        error?.response?.data?.error?.message || 'Order failed. Try again.';
        toast.error(msg);
        if(error.response.status === 401) return redirect('/login');
        return null; 
    }
};

const Orders = () => {
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList />
      {/* <PaginationContainer /> */}
    </>
  );
};
export default Orders;
