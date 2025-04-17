import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import { customFetch } from "../utils/idnex";

const url = 'products';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url)
};

export const loader = ( queryClient ) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response?.data?.products;

  return { products };
  
};

const Landing = () => {
 
    return(
       <>
         <Hero/>
         <FeaturedProducts />
       </>
    );
};

export default Landing;