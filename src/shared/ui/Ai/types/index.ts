// ----------------------------------------------------
// Message Models and Roles
// ----------------------------------------------------

export type MessageRole = "user" | "assistant" | "system";

export type MessageStatus = "sending" | "sent" | "error" | "streaming";

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
  metadata?: Record<string, unknown>;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt?: number;
  status?: MessageStatus;
  isStreaming?: boolean;
  error?: string;
  attachments?: Attachment[];
}

// ----------------------------------------------------
// Chat State and Action Payloads
// ----------------------------------------------------

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export interface SendMessagePayload {
  content: string;
  attachments?: Attachment[];
}

export interface StreamingState {
  isStreaming: boolean;
  streamingMessageId?: string;
}

export interface ChatActions {
  sendMessage: (payload: SendMessagePayload) => Promise<void>;
  stopStreaming: () => void;
  clearChat: () => void;
  removeMessage: (id: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export interface UseAiChatOptions {
  initialMessages?: Message[];
  systemContext?: string;
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  maxMessages?: number;
}

// ----------------------------------------------------
// Suggestion Chips
// ----------------------------------------------------

export interface AiSuggestion {
  id: string;
  label: string;
  icon?: React.ReactNode;
  action?: string;
  description?: string;
}

// ----------------------------------------------------
// UI Customization Styles (AiStyleConfig)
// ----------------------------------------------------

export interface AiSidebarStyleConfig {
  bg?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  backdropBg?: string;
  backdropBlur?: string;
  resizeHandleColor?: string;
}

export interface AiHeaderStyleConfig {
  bg?: string;
  text?: string;
  subtitle?: string;
  border?: string;
  height?: number | string;
  padding?: string;
  radius?: string;
  iconBg?: string;
  iconColor?: string;
  closeButtonHoverBg?: string;
}

export interface AiChatAreaStyleConfig {
  bg?: string;
  padding?: string;
  messageGap?: number;
  emptyStateTitleColor?: string;
  emptyStateDescriptionColor?: string;
  emptyStateIconBg?: string;
  emptyStateIconColor?: string;
  suggestionBg?: string;
  suggestionHoverBg?: string;
  suggestionText?: string;
  suggestionBorder?: string;
  suggestionRadius?: string;
  suggestionIconColor?: string;
  typingIndicatorBg?: string;
  typingIndicatorText?: string;
  typingIndicatorBorder?: string;
}

export interface AiMessageBubbleStyleConfig {
  bg?: string;
  text?: string;
  border?: string;
  radius?: string;
  padding?: string;
  fontSize?: string;
  shadow?: string;
}

export interface AiMessageStyleConfig {
  maxWidth?: string;
  user?: AiMessageBubbleStyleConfig;
  assistant?: AiMessageBubbleStyleConfig;
  system?: AiMessageBubbleStyleConfig;
  userAvatarBg?: string;
  userAvatarText?: string;
  assistantAvatarBg?: string;
  assistantAvatarText?: string;
  timestampColor?: string;
  timestampFontSize?: string;
}

export interface AiInputStyleConfig {
  bg?: string;
  border?: string;
  textareaBg?: string;
  textareaText?: string;
  textareaBorder?: string;
  textareaPlaceholder?: string;
  radius?: string;
  minHeight?: number | string;
  maxHeight?: number | string;
  fontSize?: string;
  sendButtonBg?: string;
  sendButtonHoverBg?: string;
  sendButtonText?: string;
  sendButtonRadius?: string;
  stopButtonBg?: string;
  stopButtonHoverBg?: string;
  stopButtonText?: string;
  attachButtonColor?: string;
  attachButtonHoverBg?: string;
}

export interface AiAttachmentStyleConfig {
  bg?: string;
  border?: string;
  text?: string;
  sizeText?: string;
  radius?: string;
  previewBg?: string;
  actionHoverBg?: string;
  removeButtonColor?: string;
  removeButtonHoverBg?: string;
}

export interface AiCodeBlockStyleConfig {
  bg?: string;
  border?: string;
  headerBg?: string;
  headerBorder?: string;
  headerText?: string;
  codeText?: string;
  radius?: string;
  fontSize?: string;
}

export interface AiStyleConfig {
  sidebar?: AiSidebarStyleConfig;
  header?: AiHeaderStyleConfig;
  chatArea?: AiChatAreaStyleConfig;
  message?: AiMessageStyleConfig;
  input?: AiInputStyleConfig;
  attachment?: AiAttachmentStyleConfig;
  codeBlock?: AiCodeBlockStyleConfig;
}

// ----------------------------------------------------
// Component Props Specifications
// ----------------------------------------------------

export interface AiSidebarHeaderProps {
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  showClose?: boolean;
  styleConfig?: AiStyleConfig;
  className?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export interface FileAttachmentProps {
  attachment: Attachment;
  onRemove?: (id: string) => void;
  showDownload?: boolean;
  showRemove?: boolean;
  styleConfig?: AiStyleConfig;
  className?: string;
}

export interface CodeBlockProps {
  language?: string;
  value: string;
  showCopyButton?: boolean;
  styleConfig?: AiStyleConfig;
  className?: string;
}

export interface AiChatAreaProps {
  messages: Message[];
  isTyping: boolean;
  suggestions?: AiSuggestion[];
  onSuggestionClick?: (suggestion: AiSuggestion) => void;
  onScrollToBottom?: () => void;
  styleConfig?: AiStyleConfig;
  className?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: React.ReactNode;
  renderEmptyState?: () => React.ReactNode;
  renderMessage?: (message: Message, index: number) => React.ReactNode;
  renderTypingIndicator?: () => React.ReactNode;
  showAvatars?: boolean;
  showTimestamps?: boolean;
  userAvatar?: React.ReactNode;
  assistantAvatar?: React.ReactNode;
  formatTimestamp?: (timestamp: number) => string;
  autoScroll?: boolean;
  messageGap?: number;
}

export interface AiChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isTyping: boolean;
  placeholder?: string;
  onAttach?: (files: FileList) => void;
  attachments?: Attachment[];
  onRemoveAttachment?: (id: string) => void;
  onStop?: () => void;
  styleConfig?: AiStyleConfig;
  className?: string;
  disabled?: boolean;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  onAttachmentError?: (error: string) => void;
  showAttachButton?: boolean;
  sendIcon?: React.ReactNode;
  stopIcon?: React.ReactNode;
  attachIcon?: React.ReactNode;
  extraActions?: React.ReactNode;
}

export interface AiChatProps {
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  initialMessages?: Message[];
  systemContext?: string;
  suggestions?: AiSuggestion[];
  onSuggestionClick?: (suggestion: AiSuggestion) => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  styleConfig?: AiStyleConfig;
  placeholder?: string;
  showAvatars?: boolean;
  showTimestamps?: boolean;
  userAvatar?: React.ReactNode;
  assistantAvatar?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: React.ReactNode;
  renderEmptyState?: () => React.ReactNode;
  renderTypingIndicator?: () => React.ReactNode;
  renderHeaderActions?: () => React.ReactNode;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  onAttachmentError?: (error: string) => void;
  showAttachButton?: boolean;
  formatTimestamp?: (timestamp: number) => string;
  autoScroll?: boolean;
  messageGap?: number;
  onMessageSent?: (message: Message) => void;
  onMessageReceived?: (message: Message) => void;
}

export interface AiSidebarProps extends AiChatProps {
  isOpen: boolean;
  onClose: () => void;
  resizable?: boolean;
  side?: "left" | "right";
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  storageKey?: string;
  animate?: boolean;
  animationDuration?: number;
  hideBackdropOnDesktop?: boolean;
}

export interface AiErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
}
