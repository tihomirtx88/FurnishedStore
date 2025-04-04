const FormCheckbox = ({ label, name, size, checked, onChange }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer text-black m-4">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        className={`checkbox checkbox-primary ${size}`}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
export default FormCheckbox;
