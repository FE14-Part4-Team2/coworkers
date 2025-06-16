import clsx from "clsx";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-text-default dark:bg-bg-tertiary rounded",
        className,
      )}
    />
  );
}
