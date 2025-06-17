interface ErrorFallbackProps {
  error: Error;
  onRetry: () => void;
  title?: string;
}

export default function ErrorFallback({
  error,
  onRetry,
  title = "오류가 발생했습니다",
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-bg-secondary rounded-xl border border-bg-tertiary my-8">
      <div className="mb-6">
        <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 text-center">
        {title}
      </h3>

      <p className="text-gray-400 text-center mb-6 mt-2 text-sm">
        {error.message ||
          "일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."}
      </p>

      <button
        onClick={onRetry}
        className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-secondary transition-colors duration-200"
      >
        다시 시도
      </button>
    </div>
  );
}
