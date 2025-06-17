import Skeleton from "@/components/common/Skeleton/Skeleton";
import { shortCardStyles } from "@/styles/sharedCardStyles";

export default function ShortCardSkeleton() {
  return (
    <div className={shortCardStyles.container}>
      <Skeleton className="w-full h-full" />
    </div>
  );
}
