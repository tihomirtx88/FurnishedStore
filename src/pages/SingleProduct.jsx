import { useLoaderData } from "react-router-dom";
import { customFetch, generateAmountOptions } from "../utils/idnex";
import { Link } from "react-router-dom";
import { useState } from "react";

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`);
  const product = response?.data?.product ?? {};
  return { product };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { name, image, company, description, colors } = product;
  const [productColors, setProductColors] = useState(
    product.colors ? product.colors[0] : "#222"
  );
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={name}
          className="w-96 h-96 object-contain rounded-lg lg:w-full"
        />
        {/* PRODUCT */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl"></p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors &&
                colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColors ? "border-2 border-secondary" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColors(color)}
                  ></button>
                ))}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md text-black"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(5).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* CART BTN */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md">Add to bag</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
