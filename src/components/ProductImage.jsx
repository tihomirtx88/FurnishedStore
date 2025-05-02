const ProductImage = ({ image, name }) => (
  <img
    src={image}
    alt={name}
    className="w-96 h-96 object-contain rounded-lg lg:w-full"
  />
);

export default ProductImage;
