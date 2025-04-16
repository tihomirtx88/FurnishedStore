import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { toast } from "react-toastify";
import { customFetch } from "../utils/idnex";
import { clearCart } from "../features/cart/cartSlice";

export const action = (store) => async ({ request }) => {
    const data = await request.formData();
    const { name, address} = Object.fromEntries(data);
    const user = store.getState().userState.user;

    const { cartItems, cartTotal, tax, shipping, orderTotal } = store.getState().cartState;

    if (!user || cartItems.length < 1) {
      toast.error('Invalid checkout data.');
      return null;
    }

    const orderItems = cartItems.map((item) => {
      return {
        name: item.name,
        price: item.price,
        image: item.image,
        amount: item.amount,
        product: item.productID, 
      };
    });

    const orderPayload = {
      name,
      address,
      tax: Math.round(tax),
      shippingFee: Math.round(shipping),
      subtotal: Math.round(cartTotal),
      total: Math.round(orderTotal),
      items: orderItems,
      clientSecret: 'demo-secret-123', // TODO: Replace with Stripe integration if needed
  
    };
     
    try {
      const response = await customFetch.post('/orders', orderPayload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(response);
      
  
      store.dispatch(clearCart());
      toast.success('Order placed successfully!');
      return redirect('/orders');
    } catch (error) {
      const msg =
        error?.response?.data?.error?.message || 'Order failed. Try again.';
      toast.error(msg);
      return null;
    }
};

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
