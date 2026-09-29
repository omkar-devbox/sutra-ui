import React from "react";
import { cn } from "../../utils";
import { formFieldBaseStyles as s } from "../../styles/style";
import type { FormFieldStyleConfig } from "../../types/types";
import { Tooltip } from "@/shared/ui";

const getStyleVars = (config?: FormFieldStyleConfig) =>
  config
    ? Object.entries(config).reduce(
        (acc, [k, v]) => (v ? { ...acc, [`--ff-${k}`]: v } : acc),
        {}
      )
    : {};

interface FormFieldWrapperProps {
  id: string;
  label?: string | React.ReactNode;
  hint?: string | React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  colSpan?: 1 | 2 | 3 | 4 | "full";
  layout?: "vertical" | "horizontal";
  wrapperClassName?: string;
  children: React.ReactNode;
  hideLabel?: boolean;
  styleConfig?: FormFieldStyleConfig;
}

const getColSpanClass = (span?: 1 | 2 | 3 | 4 | "full") => {
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

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  id,
  label,
  hint,
  error,
  helperText,
  required,
  disabled,
  fullWidth = true,
  colSpan,
  layout = "vertical",
  wrapperClassName,
  children,
  hideLabel = false,
  styleConfig,
}) => {
  const isHorizontal = layout === "horizontal" && !hideLabel && !!label;

  return (
    <div
      style={getStyleVars(styleConfig) as React.CSSProperties}
      className={cn(
        s.wrapper,
        fullWidth ? s.wrapperFull : s.wrapperAuto,
        isHorizontal && "md:flex-row md:items-center md:gap-4",
        getColSpanClass(colSpan),
        wrapperClassName,
      )}
    >
      {label && !hideLabel && (
        <label
          htmlFor={id}
          className={cn(
            s.label,
            disabled && s.labelDisabled,
            isHorizontal && "md:w-1/3 md:shrink-0 md:mb-0"
          )}
          style={styleConfig?.label ? { color: styleConfig.label } : undefined}
        >
          {hint ? (
            <Tooltip content={hint} placement="top-start">
              <span className={s.hint}>
                {label}
              </span>
            </Tooltip>
          ) : (
            label
          )}
          {required && <span className={s.requiredMark}>*</span>}
        </label>
      )}

      <div className={cn("w-full", isHorizontal && "md:flex-1")}>
        {children}

        {(helperText || error) && (
          <p
            className={error ? s.errorText : s.helperText}
            role={error ? "alert" : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    </div>
  );
};
