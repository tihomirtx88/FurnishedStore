const FormInput = ({ label, name, type, value, size, onChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label text-black m-4">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value} // Use value instead of defaultValue
        className={`text-black input input-bordered ${size}`}
        onChange={onChange} // Ensure the onChange handler updates state
      />
    </div>
  );
};
export default FormInput;
