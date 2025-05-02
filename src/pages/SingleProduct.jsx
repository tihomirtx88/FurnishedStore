import { useLoaderData } from "react-router-dom";
import { customFetch, generateAmountOptions } from "../utils/idnex";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { ProductActions, ProductImage, ProductInfo, ProductReviews } from "../components";
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { useProductReviews } from '../hooks/useProductReviews';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`)
  }
};

export const loader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
  const product = response?.data?.product ?? {};
  return { product };
};

const SingleProduct = () => {

  const { product } = useLoaderData();
  const { id, name, image, company, colors, price } = product;

  const [productColors, setProductColors] = useState(colors?.[0] || "#222");
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const role = user?.role;

  const handleAmount = (e) => setAmount(parseInt(e.target.value));

  const cartProduct = {
    cartID: id + productColors,
    productID: id,
    image,
    name,
    price,
    company,
    productColors,
    amount,
  };

  const addToCart = () => dispatch(addItem({ product: cartProduct }));

  const { data: reviewsData } = useProductReviews(id, user);
  const deleteMutation = useDeleteProduct(id);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) deleteMutation.mutate();
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <ProductImage image={image} name={name} />
        <div>
          <ProductInfo
            product={product}
            productColors={productColors}
            setProductColors={setProductColors}
            amount={amount}
            handleAmount={handleAmount}
            generateAmountOptions={generateAmountOptions}
          />
          <ProductActions
            role={role}
            addToCart={addToCart}
            handleDelete={handleDelete}
            productId={id}
            userReview={reviewsData?.reviews?.find((review) => review.user === user?.userId)}
            user={user}
          />
          <ProductReviews reviewsData={reviewsData} user={user} id={id} />
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
