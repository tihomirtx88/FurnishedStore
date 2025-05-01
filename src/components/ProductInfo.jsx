const ProductInfo = ({
  product,
  productColors,
  setProductColors,
  amount,
  handleAmount,
  generateAmountOptions,
}) => {
  const { name, company, description, colors } = product;

  return (
    <div>
      <h1 className="capitalize text-3xl font-bold">{name}</h1>
      <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
      <p className="mt-6 leading-8">{description}</p>
      {/* COLORS */}
      <div className="mt-6">
        <h4 className="text-md font-medium tracking-wider capitalize">
          Colors
        </h4>
        <div className="mt-2">
          {colors &&
            colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`badge w-6 h-6 mr-2 ${
                  color === productColors ? "border-2 border-secondary" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setProductColors(color)}
              ></button>
            ))}
        </div>
      </div>
      {/* AMOUNT */}
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="amount">
          <h4 className="text-md font-medium -tracking-wider capitalize">
            Amount
          </h4>
        </label>
        <select
          className="select select-secondary select-bordered select-md text-black"
          id="amount"
          value={amount}
          onChange={handleAmount}
        >
          {generateAmountOptions(5).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductInfo;
