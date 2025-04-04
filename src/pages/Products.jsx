import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils/idnex";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const company = searchParams.get("company") || "all";
  const order = searchParams.get("order") || "a-z";
  const shipping = searchParams.get("shipping") === "on";
  const price = searchParams.get("price") || "";

  const params = new URLSearchParams();


  if (search) params.append("search", search);
  if (category !== "all") params.append("category", category);
  if (company !== "all") params.append("company", company);
  if (order) params.append("sort", order);
  if (shipping) params.append("freeShipping", "true");
  if (price) params.append("price", price);

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
