import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customFetch } from "../utils/idnex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchProduct = async (id) => {
  const { data } = await customFetch(`/products/${id}`);
  return data.product;
};

const updateProduct = async ({ id, form }) => {
  const { data } = await customFetch.patch(`/products/${id}`, {
    ...form,
    colors: form.colors.split(",").map((c) => c.trim()),
  });
  return data;
};

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => fetchProduct(id),
  });

  const getInitialForm = (product) => ({
    name: product?.name || "",
    company: product?.company || "",
    price: product?.price || "",
    description: product?.description || "",
    colors: product?.colors?.join(", ") || "",
  });

  const [form, setForm] = useState(getInitialForm(null));

  useEffect(() => {
    if (product) {
      setForm(getInitialForm(product));
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: ({ id, form }) => updateProduct({ id, form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleProduct", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(`/products/${id}`);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, form });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong while loading product.</p>;

  return (
    <section className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input input-bordered w-full"
          name="name"
          value={form.name ?? ""}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          name="company"
          value={form.company ?? ""}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          name="price"
          type="number"
          value={form.price ?? ""}
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          name="colors"
          value={form.colors ?? ""}
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
