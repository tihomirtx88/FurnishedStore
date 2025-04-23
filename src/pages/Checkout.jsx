import { useSelector } from "react-redux";
import { CartTotals, CheckoutForm, SectionTitle } from "../components";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  console.log(user);

  if (!user) {
    toast.warn("You must to logged in to checkout");
    return redirect("/login");
  }

  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start py-8 px-8">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
