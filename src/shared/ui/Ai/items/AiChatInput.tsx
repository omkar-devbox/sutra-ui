// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useRef, useCallback, useEffect } from "react";
import { Send, Square, Paperclip } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { FileAttachment } from "./FileAttachment";
import { aiChatInputStyles } from "../styles/aiSidebar.styles";
import type { AiChatInputProps } from "../types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

const DEFAULT_MAX_FILES = 5;
const DEFAULT_MAX_TEXTAREA_HEIGHT = 200;

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const AiChatInput: React.FC<AiChatInputProps> = ({
  input,
  setInput,
  onSend,
  isTyping,
  placeholder = "Ask something...",
  onAttach,
  attachments = [],
  onRemoveAttachment,
  onStop,
  styleConfig,
  className,
  disabled = false,
  allowedFileTypes,
  maxFileSize,
  maxFiles = DEFAULT_MAX_FILES,
  onAttachmentError,
  showAttachButton = true,
  sendIcon,
  stopIcon,
  attachIcon,
  extraActions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --------------------------------------------------
  // Textarea Auto-Resize Behavior
  // --------------------------------------------------

  // Auto-resize textarea height dynamically based on content
  useEffect(() => {
    const textareaElement = textareaRef.current;
    if (!textareaElement) return;
    textareaElement.style.height = "auto";
    const maxHeight = typeof styleConfig?.input?.maxHeight === "number"
      ? styleConfig.input.maxHeight
      : DEFAULT_MAX_TEXTAREA_HEIGHT;
    textareaElement.style.height = `${Math.min(textareaElement.scrollHeight, maxHeight)}px`;
  }, [input, styleConfig?.input?.maxHeight]);

  // --------------------------------------------------
  // File Attachment Validation & Processing Handlers
  // --------------------------------------------------

  // Handle file picker selection with validation
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles || selectedFiles.length === 0) return;

      // Validate total file count
      if (attachments.length + selectedFiles.length > maxFiles) {
        onAttachmentError?.(
          `Maximum ${maxFiles} file(s) allowed. You currently have ${attachments.length}.`
        );
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Validate each file against size and type constraints
      const validFiles: File[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const currentFile = selectedFiles[i];

        // Max file size validation
        if (maxFileSize && currentFile.size > maxFileSize) {
          const maxMegabytes = (maxFileSize / (1024 * 1024)).toFixed(1);
          onAttachmentError?.(
            `File "${currentFile.name}" exceeds the maximum allowed size of ${maxMegabytes}MB.`
          );
          continue;
        }

        // Allowed file types validation
        if (allowedFileTypes && allowedFileTypes.length > 0) {
          const isTypeAllowed = allowedFileTypes.some((allowedType) => {
            if (allowedType.endsWith("/*")) {
              const mimeCategoryPrefix = allowedType.slice(0, -2);
              return currentFile.type.startsWith(mimeCategoryPrefix);
            }
            if (allowedType.startsWith(".")) {
              return currentFile.name.toLowerCase().endsWith(allowedType.toLowerCase());
            }
            return currentFile.type === allowedType;
          });

          if (!isTypeAllowed) {
            onAttachmentError?.(
              `File "${currentFile.name}" is not an accepted format (${allowedFileTypes.join(", ")}).`
            );
            continue;
          }
        }

        validFiles.push(currentFile);
      }

      if (validFiles.length > 0 && onAttach) {
        // Construct standard FileList-like container for callback
        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        onAttach(dataTransfer.files);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [attachments.length, maxFiles, maxFileSize, allowedFileTypes, onAttach, onAttachmentError]
  );

  // --------------------------------------------------
  // Message Submission & Keyboard Handlers
  // --------------------------------------------------

  const handleSend = useCallback(() => {
    if ((!input.trim() && attachments.length === 0) || isTyping || disabled) {
      return;
    }
    onSend();
  }, [input, attachments, isTyping, disabled, onSend]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const inputStyles = styleConfig?.input;
  const isSendDisabled =
    (!input.trim() && attachments.length === 0) || isTyping || disabled;

  return (
    <div
      className={cn(aiChatInputStyles.root, className)}
      style={{
        backgroundColor: inputStyles?.bg,
        borderColor: inputStyles?.border,
      }}
    >
      <div className={aiChatInputStyles.inner}>
        {/* Attachment Previews Area */}
        {attachments.length > 0 && (
          <div className={aiChatInputStyles.attachmentPreview}>
            {attachments.map((file) => (
              <div key={file.id} className="w-48">
                <FileAttachment
                  attachment={file}
                  onRemove={onRemoveAttachment}
                  styleConfig={styleConfig}
                />
              </div>
            ))}
          </div>
        )}

        {/* Input Textarea and Action Buttons */}
        <div className={aiChatInputStyles.textareaWrapper}>
          {/* File Attachment Trigger Button */}
          {showAttachButton && onAttach && (
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className={aiChatInputStyles.attachButtonLeft}
              aria-label="Attach documents or images"
              title="Attach files"
              disabled={disabled || isTyping}
              style={{
                color: inputStyles?.attachButtonColor,
              }}
            >
              {attachIcon ?? <Paperclip size={18} aria-hidden="true" />}
            </button>
          )}

          {/* Main Input Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            className={cn(
              aiChatInputStyles.textarea,
              !showAttachButton && "pl-4"
            )}
            style={{
              backgroundColor: inputStyles?.textareaBg,
              color: inputStyles?.textareaText,
              borderColor: inputStyles?.textareaBorder,
              borderRadius: inputStyles?.radius,
              fontSize: inputStyles?.fontSize,
              minHeight: inputStyles?.minHeight,
            }}
            aria-label="Chat message input"
          />

          {/* Action Buttons: Send, Stop, Extra Actions */}
          <div className={aiChatInputStyles.actionGroup}>
            {extraActions}

            {isTyping ? (
              <button
                onClick={onStop}
                className={aiChatInputStyles.stopButton}
                title="Stop generating response"
                type="button"
                aria-label="Stop generation"
                style={{
                  backgroundColor: inputStyles?.stopButtonBg,
                  color: inputStyles?.stopButtonText,
                }}
              >
                {stopIcon ?? <Square size={16} fill="currentColor" aria-hidden="true" />}
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={isSendDisabled}
                className={aiChatInputStyles.sendButton}
                type="button"
                aria-label="Send message"
                title="Send message"
                style={{
                  backgroundColor: inputStyles?.sendButtonBg,
                  color: inputStyles?.sendButtonText,
                  borderRadius: inputStyles?.sendButtonRadius,
                }}
              >
                {sendIcon ?? <Send size={17} aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>

        {/* Hidden Native File Input Element */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept={allowedFileTypes ? allowedFileTypes.join(",") : undefined}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
