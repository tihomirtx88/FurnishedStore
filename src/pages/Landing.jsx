import Hero from "../components/Hero";
import { customFetch } from "../utils/idnex";

const url = 'products';

export const loader = async () => {
  const response = await customFetch(url);
  const products = response.data.data;
  return products;
  
};

const Landing = () => {
    return(
       <>
         <Hero/>
       </>
    );
};

export default Landing;