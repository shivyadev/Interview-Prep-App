import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function Loader({
  message = "Loading...",
  fullScreen = false,
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3",
        fullScreen ? "fixed inset-0" : "h-full w-full",
        className
      )}
    >
      <Spinner className="size-6" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
