import clsx from "clsx";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "text" | "blockquote" | "code";
  children: React.ReactNode;
  className?: string;
}

export function Typography({ variant, children, className }: TypographyProps) {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={clsx(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className,
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return <p className={clsx("leading-7", className)}>{children}</p>;

    case "h3":
      return <p className={clsx("leading-7", className)}>{children}</p>;
    case "h4":
      return (
        <h2
          className={clsx(
            "text-3xl font-semibold tracking-tight transition-colors",
            className,
          )}
        >
          {children}
        </h2>
      );
    case "text":
      return <p className={clsx("leading-7", className)}>{children} </p>;
    case "blockquote":
      return (
        <blockquote className={clsx("border-l-2 pl-6 italic", className)}>
          {children}
        </blockquote>
      );
    case "code":
      return (
        <code
          className={clsx(
            "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            className,
          )}
        >
          {children}
        </code>
      );
    default:
      return <p className="leading-7">{children} </p>;
  }
}
