const FormInput = ({ className = "", ...props }) => {
  return (
    <input
      className={`border-logo focus:border-darkPink rounded border-2 px-3 py-2 outline-none ${className}`}
      {...props}
    />
  );
};
export default FormInput;
