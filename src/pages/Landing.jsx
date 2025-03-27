import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import { customFetch } from "../utils/idnex";

const url = 'products';

export const loader = async () => {
  const response = await customFetch(url);
  const products = response?.data?.porducts; 

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