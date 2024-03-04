import { ClassValue } from "clsx";
import { cn } from "~/lib/utils";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "text" | "blockquote" | "code";
  children: React.ReactNode;
  className?: ClassValue;
}

export function Typography({ variant, children, className }: TypographyProps) {
  let additionalClasses: string[] = [];

  switch (variant) {
    case "h1":
      additionalClasses = [
        "scroll-m-20",
        "text-4xl",
        "font-extrabold",
        "tracking-tight",
        "lg:text-5xl",
      ];
      break;
    case "h2":
      additionalClasses = ["leading-7"];
      break;
    case "h3":
      additionalClasses = ["leading-7"];
      break;
    case "h4":
      additionalClasses = [
        "text-3xl",
        "font-semibold",
        "tracking-tight",
        "transition-colors",
      ];
      break;
    case "text":
      additionalClasses = ["leading-7"];
      break;
    case "blockquote":
      additionalClasses = ["border-l-2", "pl-6", "italic"];
      break;
    case "code":
      additionalClasses = [
        "relative",
        "rounded",
        "bg-muted",
        "px-[0.3rem]",
        "py-[0.2rem]",
        "font-mono",
        "text-sm",
        "font-semibold",
      ];
      break;
    default:
      additionalClasses = ["leading-7"];
      break;
  }

  const combinedClasses = cn(...additionalClasses, className);

  switch (variant) {
    case "h1":
      return <h1 className={combinedClasses}>{children}</h1>;
    case "h2":
    case "h3":
    case "text":
      return <p className={combinedClasses}>{children}</p>;
    case "h4":
      return <h2 className={combinedClasses}>{children}</h2>;
    case "blockquote":
      return <blockquote className={combinedClasses}>{children}</blockquote>;
    case "code":
      return <code className={combinedClasses}>{children}</code>;
    default:
      return <p className={combinedClasses}>{children}</p>;
  }
}
