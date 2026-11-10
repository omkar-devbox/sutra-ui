// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useState, useCallback } from "react";
import { cn } from "@/shared/lib/utils";
import { AiSidebarHeader } from "./AiSidebarHeader";
import { AiChatArea } from "./AiChatArea";
import { AiChatInput } from "./AiChatInput";
import { useAiChat } from "../hooks/useAiChat";
import type { AiSuggestion, Attachment, AiChatProps } from "../types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

const DEFAULT_SUGGESTIONS: AiSuggestion[] = [
  { id: "1", label: "Summarize this page", action: "summarize" },
  { id: "2", label: "Write a React component", action: "code" },
  { id: "3", label: "Explain key architectural concepts", action: "explain" },
];

/**
 * Creates unique ID for file attachments safely.
 */
function createAttachmentId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `att_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const AiChat: React.FC<AiChatProps> = ({
  className,
  onClose,
  showCloseButton = false,
  initialMessages,
  systemContext,
  suggestions = DEFAULT_SUGGESTIONS,
  onSuggestionClick,
  title = "AI Assistant",
  subtitle,
  icon,
  closeIcon,
  styleConfig,
  placeholder = "Ask something...",
  showAvatars = true,
  showTimestamps = false,
  userAvatar,
  assistantAvatar,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  renderEmptyState,
  renderTypingIndicator,
  renderHeaderActions,
  allowedFileTypes,
  maxFileSize,
  maxFiles,
  onAttachmentError,
  showAttachButton = true,
  formatTimestamp,
  autoScroll = true,
  messageGap,
  onMessageSent,
  onMessageReceived,
}) => {
  const { messages, isLoading, streamingState, sendMessage, stopStreaming } =
    useAiChat({
      initialMessages,
      systemContext,
      onMessage: (msg) => {
        if (msg.role === "user") {
          onMessageSent?.(msg);
        } else if (msg.role === "assistant" && msg.status === "sent") {
          onMessageReceived?.(msg);
        }
      },
    });

  // --------------------------------------------------
  // Chat State & Attachment Management
  // --------------------------------------------------

  const [input, setInput] = useState<string>("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Sends the user message and revokes preview object URLs to prevent leaks
  const handleSend = useCallback(() => {
    if (!input.trim() && attachments.length === 0) return;

    sendMessage({
      content: input,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    setInput("");

    // Revoke object URLs once message payload is dispatched to release memory
    attachments.forEach((attachment) => {
      if (attachment.preview && attachment.preview.startsWith("blob:")) {
        URL.revokeObjectURL(attachment.preview);
      }
    });

    setAttachments([]);
  }, [input, attachments, sendMessage]);

  // Processes newly selected files with preview generator
  const handleAttach = useCallback((files: FileList) => {
    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: createAttachmentId(),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      metadata: { lastModified: file.lastModified },
    }));

    setAttachments((prevAttachments) => [...prevAttachments, ...newAttachments]);
  }, []);

  // Removes a single attachment and frees its preview object URL
  const handleRemoveAttachment = useCallback((attachmentId: string) => {
    setAttachments((prevAttachments) => {
      const removedAttachment = prevAttachments.find((att) => att.id === attachmentId);
      if (removedAttachment?.preview && removedAttachment.preview.startsWith("blob:")) {
        URL.revokeObjectURL(removedAttachment.preview);
      }
      return prevAttachments.filter((att) => att.id !== attachmentId);
    });
  }, []);

  // --------------------------------------------------
  // Suggestion & Layout Handlers
  // --------------------------------------------------

  // Handles clicking a suggestion chip (either custom handler or default send)
  const handleSuggestionSelect = useCallback(
    (suggestion: AiSuggestion) => {
      if (onSuggestionClick) {
        onSuggestionClick(suggestion);
      } else {
        sendMessage({ content: suggestion.label });
      }
    },
    [onSuggestionClick, sendMessage]
  );

  const isStreaming = streamingState.isStreaming;
  const computedSubtitle = isStreaming
    ? "Generating response..."
    : subtitle || "Always here to help";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden bg-[#ebf7ff] dark:bg-[#03131e]",
        className
      )}
      style={{ backgroundColor: styleConfig?.chatArea?.bg }}
    >
      {/* Header Bar */}
      <AiSidebarHeader
        onClose={onClose}
        title={title}
        subtitle={computedSubtitle}
        icon={icon}
        closeIcon={closeIcon}
        showClose={showCloseButton}
        styleConfig={styleConfig}
        actions={renderHeaderActions ? renderHeaderActions() : undefined}
      />

      {/* Virtualized Message Scroll Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <AiChatArea
          messages={messages}
          isTyping={isLoading || isStreaming}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionSelect}
          styleConfig={styleConfig}
          emptyStateTitle={emptyStateTitle}
          emptyStateDescription={emptyStateDescription}
          emptyStateIcon={emptyStateIcon}
          renderEmptyState={renderEmptyState}
          renderTypingIndicator={renderTypingIndicator}
          showAvatars={showAvatars}
          showTimestamps={showTimestamps}
          userAvatar={userAvatar}
          assistantAvatar={assistantAvatar}
          formatTimestamp={formatTimestamp}
          autoScroll={autoScroll}
          messageGap={messageGap}
        />
      </div>

      {/* Input Action Form */}
      <AiChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isTyping={isLoading || isStreaming}
        placeholder={placeholder}
        onAttach={handleAttach}
        attachments={attachments}
        onRemoveAttachment={handleRemoveAttachment}
        onStop={stopStreaming}
        styleConfig={styleConfig}
        allowedFileTypes={allowedFileTypes}
        maxFileSize={maxFileSize}
        maxFiles={maxFiles}
        onAttachmentError={onAttachmentError}
        showAttachButton={showAttachButton}
      />
    </div>
  );
};
