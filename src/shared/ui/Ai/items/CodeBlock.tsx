// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { aiCodeBlockStyles } from "../styles/aiSidebar.styles";
import type { CodeBlockProps } from "../types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

const DEFAULT_COPY_FEEDBACK_DURATION_MS = 2000;

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
  const [copied, setCopied] = useState<boolean>(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --------------------------------------------------
  // Clipboard Copy & Feedback Management
  // --------------------------------------------------

  // Clean up any pending timeout when component unmounts
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
        setCopied(true);

        if (copyTimeoutRef.current) {
          clearTimeout(copyTimeoutRef.current);
        }

        copyTimeoutRef.current = setTimeout(() => {
          setCopied(false);
          copyTimeoutRef.current = null;
        }, DEFAULT_COPY_FEEDBACK_DURATION_MS);
      }
    } catch (err) {
      console.warn("[CodeBlock] Copy to clipboard failed:", err);
      setCopied(false);
    }
  }, [value]);

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
            onClick={copyToClipboard}
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
