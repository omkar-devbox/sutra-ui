// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { FileText, Download, X, File } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { aiChatMessageStyles } from "../styles/aiSidebar.styles";
import type { FileAttachmentProps } from "../types";

// ----------------------------------------------------
// Helper Functions
// ----------------------------------------------------

/**
 * Validates that an attachment URL has a safe scheme before rendering an anchor.
 */
function isSafeUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:")
  );
}

/**
 * Formats byte size into a human-readable string (e.g. "1.5 MB").
 * Uses logarithmic calculation to determine the closest binary magnitude unit.
 */
function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const convertedSize = bytes / Math.pow(1024, unitIndex);
  return `${convertedSize.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const FileAttachment: React.FC<FileAttachmentProps> = ({
  attachment,
  onRemove,
  showDownload = true,
  showRemove = true,
  styleConfig,
  className,
}) => {
  const isImage = attachment.type?.startsWith("image/");
  const isPdf = attachment.type === "application/pdf";
  const hasSafeDownloadUrl = showDownload && isSafeUrl(attachment.url);
  const attachmentStyles = styleConfig?.attachment;

  return (
    <div
      className={cn(aiChatMessageStyles.attachment.root, className)}
      style={{
        backgroundColor: attachmentStyles?.bg,
        borderColor: attachmentStyles?.border,
        borderRadius: attachmentStyles?.radius,
      }}
    >
      {/* File Preview Thumbnail / Icon */}
      {isImage && attachment.preview ? (
        <div
          className={aiChatMessageStyles.attachment.preview}
          style={{
            backgroundColor: attachmentStyles?.previewBg,
            borderRadius: attachmentStyles?.radius,
          }}
        >
          <img
            src={attachment.preview}
            alt={attachment.name || "attachment preview"}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={aiChatMessageStyles.attachment.icon}
          style={{
            backgroundColor: attachmentStyles?.previewBg,
            borderRadius: attachmentStyles?.radius,
          }}
          aria-hidden="true"
        >
          {isPdf ? <FileText size={20} /> : <File size={20} />}
        </div>
      )}

      {/* File Metadata */}
      <div className={aiChatMessageStyles.attachment.info}>
        <p
          className={aiChatMessageStyles.attachment.name}
          style={{ color: attachmentStyles?.text }}
          title={attachment.name}
        >
          {attachment.name}
        </p>
        <span
          className={aiChatMessageStyles.attachment.size}
          style={{ color: attachmentStyles?.sizeText }}
        >
          {formatFileSize(attachment.size)}
        </span>
      </div>

      {/* File Action Buttons */}
      <div className={aiChatMessageStyles.attachment.actions}>
        {hasSafeDownloadUrl && (
          <a
            href={attachment.url}
            download={attachment.name || "download"}
            className={aiChatMessageStyles.attachment.actionButton}
            aria-label={`Download ${attachment.name}`}
            title={`Download ${attachment.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={14} />
          </a>
        )}

        {showRemove && onRemove && (
          <button
            onClick={() => onRemove(attachment.id)}
            className={aiChatMessageStyles.attachment.removeButton}
            type="button"
            aria-label={`Remove ${attachment.name}`}
            title={`Remove ${attachment.name}`}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

