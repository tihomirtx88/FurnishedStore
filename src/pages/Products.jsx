import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils/idnex";

const allProductsQuery = ({ search, category, company, order, shipping, price, page }) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category !== "all") params.append("category", category);
  if (company !== "all") params.append("company", company);
  if (order) params.append("sort", order);
  if (shipping) params.append("freeShipping", "true");
  if (price) params.append("price", price);
  if (page) params.append("page", page);

  return {
    queryKey: ['products', search ?? '', category ?? 'all', company ?? 'all', order ?? 'a-z', price ?? '', shipping ?? false, page ?? 1],
    queryFn: () => customFetch(`/products?${params.toString()}`)
  };
};
export const loader = (queryClient) => async ({ request }) => {
  const url = new URL(request.url);

  // Get the query params from the URL
  const search = url.searchParams.get("search") || "";
  const category = url.searchParams.get("category") || "all";
  const company = url.searchParams.get("company") || "all";
  const order = url.searchParams.get("order") || "a-z";
  const shipping = url.searchParams.get("shipping") === "on";
  const price = url.searchParams.get("price") || "";
  const page = url.searchParams.get("page") || 1;

  // Build plain object for query
  const plainParams = {
    search,
    category,
    company,
    order,
    shipping,
    price,
    page,
  };

  //  Use React Query to get and cache data
  const response = await queryClient.ensureQueryData(allProductsQuery(plainParams));
  const { products, numOfPages, currentPage, totalProducts } = response.data;

  return { products, numOfPages, currentPage, totalProducts };
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
