import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { customFetch } from "../utils/idnex";

const EditProductPage = () => {
  const { product } = useLoaderData(); 
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: product.name,
    company: product.company,
    price: product.price,
    description: product.description,
    colors: product.colors.join(", "),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await customFetch.patch(`/products/${id}`, {
      ...form,
      colors: form.colors.split(",").map((c) => c.trim()),
    });
    navigate(`/products/${id}`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <section className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input input-bordered w-full"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          name="company"
          value={form.company}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          name="colors"
          value={form.colors}
          onChange={handleChange}
          placeholder="e.g. #000000, #ffffff"
        />
        <button type="submit" className="btn btn-success">
          Update Product
        </button>
      </form>
    </section>
  );
};

export default EditProductPage;
