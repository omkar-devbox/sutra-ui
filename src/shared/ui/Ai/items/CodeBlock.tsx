// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { aiCodeBlockStyles } from "../styles/aiSidebar.styles";
import { useClipboardCopy } from "../hooks/useClipboardCopy";
import { DEFAULT_COPY_FEEDBACK_DURATION_MS } from "../constant/ai.constant";
import type { CodeBlockProps } from "../types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { CodeBlockProps } from "../types";

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "code",
  value,
  showCopyButton = true,
  styleConfig,
  className,
}) => {
  const { copied, copyToClipboard } = useClipboardCopy({
    duration: DEFAULT_COPY_FEEDBACK_DURATION_MS,
    onError: (err) => console.warn("[CodeBlock] Copy to clipboard failed:", err),
  });

  const codeBlockStyles = styleConfig?.codeBlock;

  return (
    <div
      className={cn(aiCodeBlockStyles.root, className)}
      style={{
        backgroundColor: codeBlockStyles?.bg,
        borderColor: codeBlockStyles?.border,
        borderRadius: codeBlockStyles?.radius,
      }}
    >
      {/* Code Header: Language Badge and Copy Action */}
      <div
        className={aiCodeBlockStyles.header}
        style={{
          backgroundColor: codeBlockStyles?.headerBg,
          borderColor: codeBlockStyles?.headerBorder,
          color: codeBlockStyles?.headerText,
        }}
      >
        <span className="uppercase text-[11px] font-semibold tracking-wider opacity-80">
          {language}
        </span>

        {showCopyButton && (
          <button
            onClick={() => copyToClipboard(value)}
            type="button"
            aria-label={copied ? "Code copied to clipboard" : "Copy code snippet"}
            className={aiCodeBlockStyles.copyButton}
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" aria-hidden="true" />
            ) : (
              <Copy size={14} aria-hidden="true" />
            )}
            <span className={copied ? "text-emerald-400 font-medium" : ""}>
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        )}
      </div>

      {/* Code Content Container */}
      <div className={aiCodeBlockStyles.codePre}>
        <pre className="m-0">
          <code
            className={aiCodeBlockStyles.code}
            style={{
              color: codeBlockStyles?.codeText,
              fontSize: codeBlockStyles?.fontSize,
            }}
          >
            {value}
          </code>
        </pre>
      </div>
    </div>
  );
};
