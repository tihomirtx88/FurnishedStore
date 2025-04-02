import { formatPrice } from "../utils/idnex";

const FormRange = ({ label, name, size, price, maxPrice, setSelectedPrice }) => {

  const step = 1000;

  return (
    <div className='form-control'>
      <label htmlFor={name} className='label cursor-pointer text-black m-4'>
        <span className='label-text capitalize'>{label}</span>
        <span>{formatPrice(price)}</span>
      </label>
      <input
        type='range'
        name={name}
        min={0}
        max={maxPrice}
        value={price}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'>0</span>
        <span className='font-bold text-md'>Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};
export default FormRange;
