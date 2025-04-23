import ProductsGrid from './ProductsGrid';
import SectionTitle from './SectionTitle';


const FeaturedProducts = () => {
  return (
    <div className=' max-w-[95%] m-auto'>
      <SectionTitle text='featured products' />
      <ProductsGrid />
    </div>
  );
};
export default FeaturedProducts;
