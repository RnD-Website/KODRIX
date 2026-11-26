import { cn } from "@/lib/utils";
export default function Container({ className, children, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1100px] px-5 md:px-8 lg:px-0", className)} {...p}>{children}</div>;
}
