import Spinner from '../Spinner';

function Button({
  children,
  height,
  width,
  bgColor,
  textColor,
  isLoading,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-md text-[12px] sm:text-sm md:text-base font-base text-center bg-button-color text-secondary-color"
      style={{
        height: `${height}%`,
        width: `${width}%`,
      }}
    >
      {!isLoading && children}
      {isLoading && (
        <Spinner className="mx-auto animate-spin text-xl" />
      )}
    </button>
  );
}

export default Button;
