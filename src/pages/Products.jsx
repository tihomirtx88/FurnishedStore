import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils/idnex";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // Extract all query params
  const search = url.searchParams.get("search") || "";
  const category = url.searchParams.get("category") || "all";
  const company = url.searchParams.get("company") || "all";
  const order = url.searchParams.get("order") || "a-z";
  const shipping = url.searchParams.get("shipping") === "on";
  const price = url.searchParams.get("price") || "";

  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category !== "all") params.append("category", category);
  if (company !== "all") params.append("company", company);
  if (order) params.append("sort", order);
  if (shipping) params.append("freeShipping", "true");
  if (price) params.append("price", price);

  const response = await customFetch(`/products?${params.toString()}`);
  const products = response?.data?.porducts;
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
