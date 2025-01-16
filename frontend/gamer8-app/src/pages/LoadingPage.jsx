import Spinner from '../components/ui/Spinner';

export default function LoadingPage() {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-primary-color">
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <Spinner className="animate-spin font-header text-[50px] text-primary-text-color transition-all duration-150 sm:text-[65px] md:text-[80px] lg:text-[100px]" />
      </div>
    </div>
  );
}
