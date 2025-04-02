const FormInput = ({ label, name, type, defaultValue, size }) => {
    return (
      <div className='form-control'>
        <label htmlFor={name} className='label text-black m-4'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className={`input input-bordered ${size}`}
        />
      </div>
    );
  };
  export default FormInput;
  