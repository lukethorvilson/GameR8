import Spinner from '../Spinner';

function Button({
  children,
  isLoading,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-md text-[12px] h-[35px] w-[100px] sm:text-sm md:text-base font-base text-center bg-button-color text-secondary-color"
    >
      {!isLoading && children}
      {isLoading && (
        <Spinner className="mx-auto animate-spin text-xl" />
      )}
    </button>
  );
}

export default Button;
