import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { toast } from "react-toastify";
import { customFetch } from "../utils/idnex";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const user = store.getState().userState.user;

    if (!user) {
      toast.error("You must to log in first.");
      return null;
    }

    const featured = formData.get("featured") === "on";
    const freeShipping = formData.get("freeShipping") === "on";

    formData.set("featured", featured);
    formData.set("freeShipping", freeShipping);

    const colors = formData
      .get("colors")
      ?.split(",")
      .map((c) => c.trim());

    if (colors) {
      formData.set("colors", JSON.stringify(colors));
    }

    try {
      const response = await customFetch.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      

      toast.success("Order placed successfully!");
      return redirect("/products");
    } catch (error) {
      console.log(error);

      const msg =
        error?.response?.data?.error?.message || "Products failed. Try again.";
      toast.error(msg);
      if (error.response.status === 401) return redirect("/login");
      return null;
    }
  };

const CreateProducrForm = () => {
  return (
    <Form method="POST" encType="multipart/form-data" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize mb-2">Create Product</h4>

      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Price" name="price" type="number" required />
      <FormInput label="Description" name="description" type="text" required />
      <label className="form-label">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        className="file-input file-input-bordered"
      />

      {/* Category dropdown */}
      <label className="form-label">Category</label>
      <select name="category" required className="select select-bordered">
        <option value="office">Office</option>
        <option value="kitchen">Kitchen</option>
        <option value="bedroom">Bedroom</option>
      </select>

      {/* Company dropdown */}
      <label className="form-label">Company</label>
      <select name="company" required className="select select-bordered">
        <option value="ikea">IKEA</option>
        <option value="liddy">Liddy</option>
        <option value="marcos">Marcos</option>
      </select>

      {/* Colors */}
      <FormInput
        label="Colors (comma separated)"
        name="colors"
        type="text"
        placeholder="#000000, #ffffff"
        required
      />

      {/* Booleans */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          className="checkbox"
        />
        <label htmlFor="featured">Featured</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="freeShipping"
          id="freeShipping"
          className="checkbox"
        />
        <label htmlFor="freeShipping">Free Shipping</label>
      </div>

      <FormInput label="Inventory" name="inventory" type="number" required />

      <div className="mt-4">
        <SubmitBtn text="Create Product" />
      </div>
    </Form>
  );
};
export default CreateProducrForm;
