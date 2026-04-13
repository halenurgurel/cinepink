const ErrorMessage = ({
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="mx-auto my-5 flex items-center justify-center p-5">
      <p className="text-logo m-0 font-medium italic">{message}</p>
    </div>
  );
};
export default ErrorMessage;
