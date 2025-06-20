import Button from "@/components/common/Button";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  total: number;
  pageSize: number;
}

export default function Pagination({
  page,
  setPage,
  total,
  pageSize,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages === 0) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-6 sm:mt-10">
      <Button
        label="<-"
        variant="primary"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="w-9 h-[2rem] sm:w-[3rem] sm:h-[2.6rem] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-bg-tertiary text-bg-inverse border border-brand-primary hover:bg-brand-primary hover:text-text-inverse disabled:opacity-50"
      />
      {Array.from({ length: totalPages }, (_, idx) => {
        const p = idx + 1;
        const isActive = p === page;
        return (
          <Button
            label={String(p)}
            variant={isActive ? "primary" : "ghost"}
            key={p}
            onClick={() => setPage(p)}
            className={`
                text-md sm:text-lg w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold
                ${isActive ? "border-bg-secondary" : "border-brand-primary"}
              `}
            disabled={page === p}
          />
        );
      })}
      <Button
        label="->"
        variant="primary"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-[2rem] sm:w-[3rem] sm:h-[2.6rem] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-bg-tertiary text-text-inverse border border-brand-primary hover:bg-brand-primary hover:text-text-inverse disabled:opacity-50"
      />
    </nav>
  );
}
