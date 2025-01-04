import classNames from 'classnames';
import Spinner from '../universal/Spinner';

function Button({
  children,
  height,
  width,
  bgColor,
  textColor,
  isLoading,
  onClick,
}) {
  const buttonClass = classNames(
    'rounded-md text-[12px] sm:text-sm md:text-base font-base  text-center',
    {
      [`bg-${bgColor}-300`]: bgColor,
      [`text-${textColor}-950`]: textColor,
    },
  );
  return (
    <button
      onClick={onClick}
      className={buttonClass}
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
