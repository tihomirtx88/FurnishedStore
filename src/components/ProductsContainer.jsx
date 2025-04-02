import { useLoaderData } from "react-router-dom";
import ProductsList from "./ProductList";
import ProductsGrid from "./ProductsGrid";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const { products } = useLoaderData();
  const productsCount = products?.length || 0;

  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
          <h4 className="font-medium text-md">
            {productsCount} product{productsCount > 1 && "s"}
          </h4>
          <div className="flex gap-x-2">
            <button
              type="button"
              className={setActiveStyles("grid")}
              onClick={() => setLayout("grid")}
            >
              <BsFillGridFill />
            </button>
            <button
              type="button"
              className={setActiveStyles("list")}
              onClick={() => setLayout("list")}
            >
              <BsList />
            </button>
          </div>
        </div>

        {/* Products */}
        <div>
          {productsCount === 0 ? (
            <h5 className="text-2xl mt-16">Sorry, no products matched...</h5>
          ) : layout === "grid" ? (
            <ProductsGrid />
          ) : (
            <ProductsList />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsContainer;
