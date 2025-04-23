import { useSelector } from "react-redux";
import { formatPrice } from "../utils/idnex";

const CartTotals = () => {
  const { cartTotal, shipping, orderTotal, tax } = useSelector(
    (state) => state.cartState
  );
  return (
    <div className="min-w-64 w-auto mx-auto mt-8 p-6 border border-base-300 rounded-xl shadow-md bg-white dark:bg-gray-800">
      <div className="space-y-3">
        {/* Subtotal */}
        <p className="flex justify-between text-sm border-b border-base-300 pb-2 text-gray-800 dark:text-white">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>

        {/* Shipping */}
        <p className="flex justify-between text-sm border-b border-base-300 pb-2 text-gray-800 dark:text-white">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>

        {/* Tax */}
        <p className="flex justify-between text-sm border-b border-base-300 pb-2 text-gray-800 dark:text-white">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>

        {/* Order Total */}
        <p className="flex justify-between text-sm border-b border-base-300 pb-2 text-gray-800 dark:text-white">
          <span>Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
