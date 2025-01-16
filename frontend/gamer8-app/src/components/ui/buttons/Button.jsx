import Spinner from '../Spinner';

function Button({ children, isLoading, Icon, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-fit w-fit rounded-md border-0 border-secondary-color bg-button-color px-4 py-2 text-center font-base text-[12px] text-secondary-color transition-all duration-500 hover:border-4 md:text-base"
    >
      {!Icon && !isLoading && children}
      {Icon && !isLoading && (
        <div className="flex flex-row items-center">
          <Icon className="flex-[1] text-[20px] text-secondary-text-color" />
          <p className="flex-[3]">{children}</p>
        </div>
      )}
      {isLoading && (
        <Spinner className="mx-auto animate-spin text-xl" />
      )}
    </button>
  );
}

export default Button;
