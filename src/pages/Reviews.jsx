import { useLoaderData } from "react-router-dom";

const Reviews = () => {

    const { orders } = useLoaderData();
    if (orders.length < 1) {
      return <SectionTitle text="please make a order" />;
    }
    return (
      <>
        <SectionTitle text="Your Orders" />
      </>
    );
  };
  export default Reviews;