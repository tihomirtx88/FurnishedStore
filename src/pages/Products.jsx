import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils/idnex";

export const loader = async ({request}) => {
    const response = await customFetch('/products');
    const products = response?.data?.porducts; 
    return {products};
};

const Products = () => {
    return(
        <>
          <Filters/>
          <ProductsContainer/>
          <PaginationContainer/>
        </>
    );
};

export default Products;