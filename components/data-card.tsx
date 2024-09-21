import React from "react";
import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { Skeleton } from "./ui/skeleton";

const boxVariant = cva("rounded-md p-3 shrink-0", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500/20",
      success: "fill-emerald-500/20",
      danger: "fill-rose-500/20",
      warning: "fill-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
type BoxVariant = VariantProps<typeof boxVariant>;
type IconVariant = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariant, IconVariant {
  icon: IconType;
  title: string;
  total?: number;
  description: string;
  isOutOfStock?: number;
  success?: number;
}
const DataCard = ({
  icon: Icon,
  description,
  title,
  isOutOfStock = 0,
  total = 0,
  success = 0,

  variant,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {description}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <p>Total</p>
            <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
              <CountUp preserveValue start={0} end={total} />
            </h1>
          </div>
          {title === "Products" && (
            <div>
              <p>Out of Stock</p>
              <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
                <CountUp preserveValue start={0} end={isOutOfStock} />
              </h1>
            </div>
          )}
          {title === "Enquries" && (
            <div>
              <p>Success Enquries</p>
              <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
                <CountUp preserveValue start={0} end={success} />
              </h1>
            </div>
          )}
          {title === "Order" && (
            <div>
              <p>Success Orders</p>
              <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
                <CountUp preserveValue start={0} end={success} />
              </h1>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;

export const DataCardLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="size-14" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <Skeleton className="shrink-0 h-5 w-24 mb-2" />
            <Skeleton className="shrink-0 h-5 w-40" />
          </div>
          <div>
            <Skeleton className="shrink-0 h-5 w-24 mb-2" />
            <Skeleton className="shrink-0 h-5 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
