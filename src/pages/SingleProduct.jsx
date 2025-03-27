import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/idnex";
import { Link } from 'react-router-dom';

export const loader = async ({params}) => {
    const response = await customFetch(`/products/${params.id}`);
    const product = response?.data?.product ?? {};
    return {product};
    
  };

const SingleProduct = () => {

    const { product } = useLoaderData();
    const { name, image, company, description } = product;
    
    return(
        <section>
             <div className='text-md breadcrumbs'>
               <ul>
                 <li>
                   <Link to='/'>Home</Link>
                 </li>
                 <li>
                   <Link to='/products'>Products</Link>
                 </li>
               </ul>
             </div>
             {/* PRODUCT */}
             <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
               {/* IMAGE */}
               <img
                 src={image}
                 alt={name}
                 className='w-96 h-96 object-contain rounded-lg lg:w-full'
               />
               {/* PRODUCT */}
               <div>
                 <h1 className='capitalize text-3xl font-bold'>{name}</h1>
                 <h4 className='text-xl text-neutral-content font-bold mt-2'>
                   {company}
                 </h4>
                 <p className='mt-3 text-xl'></p>
                 <p className='mt-6 leading-8'>{description}</p>
                 {/* COLORS */}
                 <div className='mt-6'>
                   <h4 className='text-md font-medium tracking-wider capitalize'>
                     colors
                   </h4>
                   <div className='mt-2'>
                     
                   </div>
                 </div>
                 {/* AMOUNT */}
                 <div className='form-control w-full max-w-xs'>
                   <label className='label' htmlFor='amount'>
                     <h4 className='text-md font-medium -tracking-wider capitalize'>
                       amount
                     </h4>
                   </label>
                   <select
                     className='select select-secondary select-bordered select-md'
                     id='amount'
                  
                   >
                     
                   </select>
                 </div>
                 {/* CART BTN */}
                 <div className='mt-10'>
                   <button className='btn btn-secondary btn-md'>
                     Add to bag
                   </button>
                 </div>
               </div>
             </div>
           </section>
    );
};

export default SingleProduct;