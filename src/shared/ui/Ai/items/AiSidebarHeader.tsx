// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { aiSidebarHeaderStyles } from "../styles/aiSidebar.styles";
import type { AiSidebarHeaderProps } from "../types";

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const AiSidebarHeader: React.FC<AiSidebarHeaderProps> = ({
  onClose,
  title = "AI Assistant",
  subtitle,
  icon,
  closeIcon,
  showClose = true,
  styleConfig,
  className,
  actions,
  children,
}) => {
  const headerStyles = styleConfig?.header;

  // Custom child renderer overrides standard header layout if provided
  if (children) {
    return (
      <header
        className={cn(aiSidebarHeaderStyles.root, className)}
        style={{
          backgroundColor: headerStyles?.bg,
          borderColor: headerStyles?.border,
          height: headerStyles?.height,
          padding: headerStyles?.padding,
          borderRadius: headerStyles?.radius,
        }}
      >
        {children}
      </header>
    );
  }

  return (
    <header
      className={cn(aiSidebarHeaderStyles.root, className)}
      style={{
        backgroundColor: headerStyles?.bg,
        borderColor: headerStyles?.border,
        height: headerStyles?.height,
        padding: headerStyles?.padding,
        borderRadius: headerStyles?.radius,
      }}
    >
      {/* Left Title and Icon Section */}
      <div className={aiSidebarHeaderStyles.leftSection}>
        <div
          className={aiSidebarHeaderStyles.iconWrapper}
          style={{
            backgroundColor: headerStyles?.iconBg,
            color: headerStyles?.iconColor,
          }}
          aria-hidden="true"
        >
          {icon ?? <Sparkles size={20} />}
        </div>

        <div className={aiSidebarHeaderStyles.titleWrapper}>
          <h2
            className={aiSidebarHeaderStyles.title}
            style={{ color: headerStyles?.text }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={aiSidebarHeaderStyles.subtitle}
              style={{ color: headerStyles?.subtitle }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Controls: Actions Slot and Close Button */}
      <div className={aiSidebarHeaderStyles.rightSection}>
        {actions}

        {showClose && onClose && (
          <button
            onClick={onClose}
            className={aiSidebarHeaderStyles.closeButton}
            aria-label="Close sidebar"
            type="button"
          >
            {closeIcon ?? <X size={18} aria-hidden="true" />}
          </button>
        )}
      </div>
    </header>
  );
};
