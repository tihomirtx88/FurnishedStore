import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/idnex';

const ProductsList = () => {

  const { products } = useLoaderData();

  return (

    <div className='mt-12 grid gap-y-8'>

      {products.map((product) => {

        const { name, price, image, company } = product;
        const dollarsAmount = formatPrice(price);
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
          >
            <img
              src={image}
              alt={name}
              className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
            />
            <div className='ml-0 sm:ml-16'>
              <h3 className='capitalize font-semibold text-lg text-gray-900 font-serif tracking-wide'>{name}</h3>
              <h4 className='capitalize text-md text-gray-700 font-serif italic'>
                {company}
              </h4>
            </div>
            <p className='font-medium ml-0 sm:ml-auto text-lg'>
              {dollarsAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsList;