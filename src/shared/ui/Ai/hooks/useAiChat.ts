// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  Message,
  ChatState,
  StreamingState,
  ChatActions,
  SendMessagePayload,
  UseAiChatOptions,
} from "../types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

const DEFAULT_MAX_MESSAGES = 100;
const BOOT_TIMESTAMP = Date.now();

/**
 * Generates unique identifiers with browser crypto support and fallback.
 */
function createMessageId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates standard initial messages when none are provided.
 */
function createInitialMessages(systemContext?: string): Message[] {
  return [
    {
      id: "system-init",
      role: "system",
      content: systemContext || "AI Assistant initialized. Context loaded.",
      createdAt: BOOT_TIMESTAMP,
      status: "sent",
    },
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      createdAt: BOOT_TIMESTAMP,
      status: "sent",
    },
  ];
}

// ----------------------------------------------------
// Hook Implementation
// ----------------------------------------------------

export const useAiChat = (
  options: UseAiChatOptions = {}
): ChatState & ChatActions & { streamingState: StreamingState } => {
  const {
    initialMessages,
    systemContext,
    onMessage,
    onError,
    maxMessages = DEFAULT_MAX_MESSAGES,
  } = options;

  // --------------------------------------------------
  // Chat State & Mutable References
  // --------------------------------------------------

  // Initialize state once with initial messages or default system welcome
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessages && initialMessages.length > 0) {
      return initialMessages;
    }
    return createInitialMessages(systemContext);
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamingState, setStreamingState] = useState<StreamingState>({
    isStreaming: false,
  });

  // Mutable refs prevent stale closures and avoid recreating callbacks
  const abortControllerRef = useRef<AbortController | null>(null);
  const isSendingRef = useRef<boolean>(false);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const maxMessagesRef = useRef(maxMessages);
  maxMessagesRef.current = maxMessages;

  // Track initialMessages prop changes and sync safely when explicitly provided
  const prevInitialMessagesRef = useRef(initialMessages);
  useEffect(() => {
    if (
      initialMessages &&
      initialMessages !== prevInitialMessagesRef.current &&
      initialMessages.length > 0
    ) {
      setMessages(initialMessages);
      prevInitialMessagesRef.current = initialMessages;
    }
  }, [initialMessages]);

  // --------------------------------------------------
  // Helper State Updaters & Streaming Controls
  // --------------------------------------------------

  // Updates the targeted message content; optimizes for last message in O(1)
  const updateMessageContent = useCallback((targetId: string, updatedContent: string) => {
    setMessages((prevMessages) => {
      const lastIndex = prevMessages.length - 1;
      const lastMessage = prevMessages[lastIndex];

      if (lastMessage?.id === targetId) {
        const nextMessages = [...prevMessages];
        nextMessages[lastIndex] = { ...lastMessage, content: updatedContent };
        return nextMessages;
      }

      const targetIndex = prevMessages.findIndex((message) => message.id === targetId);
      if (targetIndex === -1) return prevMessages;

      const nextMessages = [...prevMessages];
      nextMessages[targetIndex] = { ...nextMessages[targetIndex], content: updatedContent };
      return nextMessages;
    });
  }, []);

  // Stops streaming cleanly and marks current message as sent
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setStreamingState((prevState) => {
      if (prevState.streamingMessageId) {
        const streamMessageId = prevState.streamingMessageId;
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === streamMessageId
              ? { ...message, status: "sent", isStreaming: false }
              : message
          )
        );
      }
      return { isStreaming: false };
    });

    setIsLoading(false);
    isSendingRef.current = false;
  }, []);

  // --------------------------------------------------
  // Message Sending & Streaming Simulation Logic
  // --------------------------------------------------

  // Sends message and initiates AI response streaming simulation
  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      const { content, attachments } = payload;
      const trimmedContent = content.trim();

      // Guard against empty payloads or concurrent in-flight requests
      if (
        (!trimmedContent && (!attachments || attachments.length === 0)) ||
        isSendingRef.current
      ) {
        return;
      }

      isSendingRef.current = true;
      setIsLoading(true);

      const userMessage: Message = {
        id: createMessageId(),
        role: "user",
        content: trimmedContent,
        attachments: attachments && attachments.length > 0 ? attachments : undefined,
        createdAt: Date.now(),
        status: "sent",
      };

      // Append user message with capacity limit enforcement
      setMessages((prevMessages) => {
        const nextMessages = [...prevMessages, userMessage];
        const capacityLimit = maxMessagesRef.current;
        return nextMessages.length > capacityLimit ? nextMessages.slice(-capacityLimit) : nextMessages;
      });

      onMessageRef.current?.(userMessage);

      const assistantId = createMessageId();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // Create initial placeholder for incoming assistant response
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: assistantId,
            role: "assistant",
            content: "",
            status: "sending",
            isStreaming: true,
            createdAt: Date.now(),
          },
        ]);

        setStreamingState({
          isStreaming: true,
          streamingMessageId: assistantId,
        });

        // Determine simulated response text based on prompt
        let responseText = `I have received your request: "${trimmedContent}"`;

        if (attachments && attachments.length > 0) {
          const fileNames = attachments.map((att) => att.name).join(", ");
          responseText = `I received your ${attachments.length} attachment(s): ${fileNames}. How would you like me to process them?`;
        } else if (trimmedContent.toLowerCase().includes("summarize")) {
          responseText =
            "### Summary\n\nYour UI components are modular, well-structured, and ready for theme customization. TanStack Virtual is used for virtualization with adaptive auto-scroll.";
        } else if (trimmedContent.toLowerCase().includes("code")) {
          responseText =
            "Here is an optimized React component with TypeScript:\n\n```tsx\nimport React, { memo } from 'react';\n\ninterface CardProps {\n  title: string;\n  count: number;\n}\n\nexport const MetricCard: React.FC<CardProps> = memo(({ title, count }) => {\n  return (\n    <div className=\"p-4 rounded-xl border border-neutral-200 bg-white dark:bg-neutral-900\">\n      <h4 className=\"text-sm text-neutral-500\">{title}</h4>\n      <p className=\"text-2xl font-bold mt-1\">{count}</p>\n    </div>\n  );\n});\n```";
        }

        if (trimmedContent.toLowerCase().includes("simulate error")) {
          throw new Error("Simulated API connection failure. Please retry your prompt.");
        }

        // Stream response in adaptive chunks
        const words = responseText.split(" ");
        const chunkSize = words.length > 80 ? 4 : 2;
        let accumulatedText = "";

        for (let i = 0; i < words.length; i += chunkSize) {
          if (controller.signal.aborted) {
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 50));

          if (controller.signal.aborted) {
            break;
          }

          const chunk = words.slice(i, i + chunkSize).join(" ");
          accumulatedText += (accumulatedText ? " " : "") + chunk;
          updateMessageContent(assistantId, accumulatedText);
        }

        // Finalize completed streaming response
        if (!controller.signal.aborted) {
          setMessages((prevMessages) =>
            prevMessages.map((message) =>
              message.id === assistantId
                ? { ...message, status: "sent", isStreaming: false, content: accumulatedText }
                : message
            )
          );

          onMessageRef.current?.({
            id: assistantId,
            role: "assistant",
            content: accumulatedText,
            status: "sent",
            createdAt: Date.now(),
          });
        }
      } catch (err) {
        // Handle cancellation gracefully without emitting error messages
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        const error = err instanceof Error ? err : new Error(String(err));
        onErrorRef.current?.(error);

        // Update assistant message to display error state
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  status: "error",
                  isStreaming: false,
                  content: error.message || "An unexpected error occurred while processing.",
                  error: error.message,
                }
              : message
          )
        );
      } finally {
        setIsLoading(false);
        isSendingRef.current = false;
        setStreamingState({ isStreaming: false });
        abortControllerRef.current = null;
      }
    },
    [updateMessageContent]
  );

  // --------------------------------------------------
  // Chat Actions & Lifecycle Management
  // --------------------------------------------------

  // Clears conversation back to initial state
  const clearChat = useCallback(() => {
    stopStreaming();
    setMessages(createInitialMessages(systemContext));
  }, [systemContext, stopStreaming]);

  // Removes a single message by ID
  const removeMessage = useCallback((messageId: string) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
  }, []);

  // Ensure any ongoing streaming request is aborted when the hook unmounts
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    messages,
    isLoading,
    streamingState,
    sendMessage,
    stopStreaming,
    clearChat,
    removeMessage,
    setMessages,
  };
};
