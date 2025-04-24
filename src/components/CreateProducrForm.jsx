import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

const CreateProducrForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize mb-2">Create Product</h4>

      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Price" name="price" type="number" required />
      <FormInput label="Description" name="description" type="text" required />
      <FormInput
        label="Image URL"
        name="image"
        type="text"
        placeholder="/uploads/example.jpeg"
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
