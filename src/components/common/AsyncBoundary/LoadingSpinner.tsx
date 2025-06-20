interface LoadingSpinnerProps {
  title?: string;
}

export default function LoadingSpinner({
  title = "정보를 불러오는 중...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-[14rem]">
      <div className="relative mb-6">
        <div className="absolute inset-0 w-16 h-16 bg-brand-primary/10 rounded-full blur-md"></div>

        <div className="relative w-16 h-16 border-3 border-bg-tertiary border-t-brand-primary border-r-brand-primary rounded-full animate-spin"></div>

        <div className="absolute inset-2 w-12 h-12 border-2 border-transparent border-b-brand-secondary rounded-full animate-spin animate-reverse"></div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-5 animate-pulse">
          {title}
        </h3>

        <div className="flex justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
