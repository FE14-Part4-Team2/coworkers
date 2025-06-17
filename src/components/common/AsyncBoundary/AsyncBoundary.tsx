"use client";

import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorInfo } from "react";

interface AsyncBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  errorFallback:
    | ReactNode
    | ((props: { error: Error; resetErrorBoundary: () => void }) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export default function AsyncBoundary({
  children,
  fallback,
  errorFallback,
  onError,
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => {
            if (typeof errorFallback === "function") {
              return errorFallback({ error, resetErrorBoundary });
            }
            return errorFallback;
          }}
          onError={onError}
          onReset={reset}
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
