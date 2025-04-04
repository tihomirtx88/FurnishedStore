import { Form, Link, useLoaderData, useSearchParams } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { products } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const company = searchParams.get("company") || "all";
  const order = searchParams.get("order") || "a-z";
  const price = Number(searchParams.get("price")) || 0;
  const shipping = searchParams.get("shipping") === "on";

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const companies = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchParams({
          search,
          category,
          company,
          order,
          price,
          shipping: shipping ? "on" : undefined,
        });
      }}
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
    >
      {/* SEARCH */}
      <FormInput
        name="search"
        label="search product"
        type="search"
        value={search}
        onChange={(e) =>
          setSearchParams({ ...searchParams, search: e.target.value })
        }
        size="input-sm"
      />

      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        defaultValue={category}
        size="select-sm"
        onChange={(e) =>
          setSearchParams({ ...searchParams, category: e.target.value })
        }
      />

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        list={companies}
        defaultValue={company}
        size="select-sm"
        onChange={(e) =>
          setSearchParams({ ...searchParams, company: e.target.value })
        }
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
        size="select-sm"
        onChange={(e) =>
          setSearchParams({ ...searchParams, order: e.target.value })
        }
      />

      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price || 0}
        maxPrice={Math.max(...products.map((p) => p.price))}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />

      {/* SHIPPING */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        checked={shipping}
        onChange={(e) =>
          setSearchParams({
            ...searchParams,
            shipping: e.target.checked ? "on" : undefined,
          })
        }
      />

      {/* BUTTONS */}
      {/* <button type="submit" className="btn btn-primary btn-sm">
        search
      </button> */}

      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
