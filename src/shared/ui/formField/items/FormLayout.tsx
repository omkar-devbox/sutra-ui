import React from "react";
import { cn } from "../utils";

/* ── Form Layout Types ───────────────────────────────────────── */

export interface FormLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Number of grid columns across screen breakpoints
   * @default 2
   */
  columns?: 1 | 2 | 3 | 4;
  /**
   * Grid gap spacing
   * @default "md"
   */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Form layout alignment variant
   * @default "vertical"
   */
  layout?: "vertical" | "horizontal" | "inline";
  className?: string;
}

export interface FormSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "between";
  sticky?: boolean;
  className?: string;
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | "full";
  className?: string;
}

/* ── Helper Class Generators ─────────────────────────────────── */

const getGridColsClass = (cols: 1 | 2 | 3 | 4 = 2) => {
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 md:grid-cols-2";
    case 3:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    default:
      return "grid-cols-1 md:grid-cols-2";
  }
};

const getGapClass = (gap: "none" | "sm" | "md" | "lg" | "xl" = "md") => {
  switch (gap) {
    case "none":
      return "gap-0";
    case "sm":
      return "gap-3";
    case "lg":
      return "gap-6";
    case "xl":
      return "gap-8";
    case "md":
    default:
      return "gap-4 md:gap-5";
  }
};

export const getColSpanClass = (span?: 1 | 2 | 3 | 4 | "full") => {
  if (!span) return "";
  if (span === "full") return "col-span-full";
  switch (span) {
    case 1:
      return "col-span-1";
    case 2:
      return "col-span-1 md:col-span-2";
    case 3:
      return "col-span-1 md:col-span-2 lg:col-span-3";
    case 4:
      return "col-span-1 md:col-span-2 lg:col-span-4";
    default:
      return "";
  }
};

/* ── Components ──────────────────────────────────────────────── */

/**
 * `<FormLayout>` - Top-level flexible container for forms with responsive multi-column grids.
 */
export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  columns = 2,
  gap = "md",
  layout = "vertical",
  className,
  ...rest
}) => {
  if (layout === "inline") {
    return (
      <div
        className={cn("flex flex-wrap items-center", getGapClass(gap), className)}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid w-full",
        getGridColsClass(columns),
        getGapClass(gap),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * `<FormSection>` - Clean visual group for logically related form fields with header and divider.
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon,
  badge,
  extra,
  children,
  divider = false,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col space-y-4",
        divider && "pb-6 border-b border-slate-200 dark:border-slate-800",
        className
      )}
      {...rest}
    >
      {(title || description || icon || badge || extra) && (
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                {icon}
              </div>
            )}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {title && (
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {title}
                  </h3>
                )}
                {badge}
              </div>
              {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>
          </div>
          {extra && <div className="flex shrink-0 items-center">{extra}</div>}
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
};

/**
 * `<FormRow>` - A single row inside a form with custom sub-grid columns.
 */
export const FormRow: React.FC<FormRowProps> = ({
  children,
  columns = 2,
  gap = "md",
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "grid w-full",
        getGridColsClass(columns),
        getGapClass(gap),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * `<FormItem>` - Form cell wrapper supporting grid column spans.
 */
export const FormItem: React.FC<FormItemProps> = ({
  children,
  colSpan = 1,
  className,
  ...rest
}) => {
  return (
    <div className={cn("w-full", getColSpanClass(colSpan), className)} {...rest}>
      {children}
    </div>
  );
};

/**
 * `<FormActions>` - Action footer buttons bar (Submit, Reset, Cancel) with sticky alignment support.
 */
export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = "right",
  sticky = false,
  className,
  ...rest
}) => {
  const getAlignClass = () => {
    switch (align) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "between":
        return "justify-between";
      case "right":
      default:
        return "justify-end";
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 pt-4",
        getAlignClass(),
        sticky &&
          "sticky bottom-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 border-t border-slate-200 dark:border-slate-800",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
