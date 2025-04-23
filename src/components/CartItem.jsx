import { useDispatch } from "react-redux";
import { formatPrice, generateAmountOptions } from "../utils/idnex";
import { editItem, removeItem } from "../features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeItem({cartID}))
  };

  const { cartID, name, image, company, amount, productColors, price } =
    cartItem;

  const handleAmount = (e) => {
    dispatch(editItem({cartID, amount:parseInt(e.target.value)}));
  };

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={name}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{name}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-gray-800 dark:text-white">
          {company}
        </h4>
        {/* COLOR */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColors }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* REMOVE */}
        <button className="mt-2 link link-primary link-hover text-sm" onClick={removeItemFromCart}>
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
