import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils/idnex";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const paramMap = {
    search: "search",
    category: "category",
    company: "company",
    order: "sort",
    shipping: "freeShipping",
    price: "price",
  };

  const params = new URLSearchParams();

  for (const [key, backendKey] of Object.entries(paramMap)) {
    const value = searchParams.get(key);
    if (value && value !== "all") {
      if (key === "shipping" && value === "on") {
        params.append(backendKey, "true");
      } else {
        params.append(backendKey, value);
      }
    }
  }

  const response = await customFetch(`/products?${params.toString()}`);
  const products = response?.data?.products;
  return { products };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
