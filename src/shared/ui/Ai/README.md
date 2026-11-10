# 🤖 AI Assistant UI Component Suite (`@/shared/ui/Ai`)

Welcome to the documentation for the **AI Assistant UI Component Suite** in the `Sutra-ui` design system.

This module provides a production-grade, turn-key, feature-rich conversational AI sidebar and chat interface with virtualized rendering, real-time streaming response simulation, file attachment uploads, markdown code block rendering with syntax copy, dynamic suggestion chips, and **95%+ deep theme customization** via `AiStyleConfig` and direct props.

---

## 📌 Table of Contents

1. [Overview & Core Architecture](#-overview--core-architecture)
2. [Module Directory Map](#-module-directory-map)
3. [Exhaustive API & Props Specification](#-exhaustive-api--props-specification)
   - [`<AiSidebar />`](#aisidebar-)
   - [`<AiChat />`](#aichat-)
   - [`<AiSidebarHeader />`](#aisidebarheader-)
   - [`<AiChatArea />`](#aichatarea-)
   - [`<AiChatInput />`](#aichatinput-)
   - [`<FileAttachment />`](#fileattachment-)
   - [`<CodeBlock />`](#codeblock-)
   - [`useAiChat` Hook](#useaichat-hook)
4. [Deep Customization via `AiStyleConfig`](#-deep-customization-via-aistyleconfig)
5. [Step-by-Step Code Recipes](#-step-by-step-code-recipes)
   - [Recipe 1: Full Embedded Resizable Chat Sidebar](#recipe-1-full-embedded-resizable-chat-sidebar)
   - [Recipe 2: Complete 95% Custom Brand Theme](#recipe-2-complete-95-custom-brand-theme)
   - [Recipe 3: Real Backend Streaming / Server-Sent Events (SSE)](#recipe-3-real-backend-streaming--server-sent-events-sse)
   - [Recipe 4: Custom Empty State & Suggestion Chips](#recipe-4-custom-empty-state--suggestion-chips)
   - [Recipe 5: File Upload Restrictions & Error Handling](#recipe-5-file-upload-restrictions--error-handling)
6. [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)

---

## 🤖 Overview & Core Architecture

The AI module is engineered for seamless integration into enterprise dashboards, code editors, and workflow platforms. It strictly decouples state management, streaming handlers, and rendering subcomponents.

### Key Capabilities:
- 💬 **Conversational Interface**: Rich message bubbles with user avatar support, timestamps, and status badges.
- ⚡ **Virtualized Rendering**: Built with `@tanstack/react-virtual` with dynamic row measurement (`data-index`) and auto-scroll tracking during streaming.
- 📎 **File Attachment Preview**: Visible attachment trigger button, document/image preview cards with URL validation and automatic `URL.revokeObjectURL` cleanup.
- 💻 **Markdown & Code Snippets**: Safe markdown rendering with `react-markdown`, `remark-gfm`, and `rehype-sanitize`, plus copyable `<CodeBlock />` snippets.
- 🎨 **95% UI Customization**: Every layer (sidebar, header, chat area, messages, inputs, attachments, code blocks) is customizable via `styleConfig` and granular slot props.

---

## 🗺️ Module Directory Map

- Main Entrypoint: [index.ts](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/index.ts)
- Types & Interfaces: [types/index.ts](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/types/index.ts)
- Custom Hook: [hooks/useAiChat.ts](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/hooks/useAiChat.ts)
- Main Chat Container: [items/AiChat.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/AiChat.tsx)
- Sidebar Wrapper: [items/AiSidebar.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/AiSidebar.tsx)
- Chat Area & Empty State: [items/AiChatArea.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/AiChatArea.tsx)
- Input & Action Bar: [items/AiChatInput.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/AiChatInput.tsx)
- Header Bar: [items/AiSidebarHeader.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/AiSidebarHeader.tsx)
- File Attachment: [items/FileAttachment.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/FileAttachment.tsx)
- Code Block: [items/CodeBlock.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/CodeBlock.tsx)
- Error Boundary: [items/AiErrorBoundary.tsx](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/items/AiErrorBoundary.tsx)
- Styling Tokens: [styles/aiSidebar.styles.ts](file:///home/omkar/Documents/sutra-ui/src/shared/ui/Ai/styles/aiSidebar.styles.ts)

---

## 🛠 Exhaustive API & Props Specification

### `<AiSidebar />`

The top-level animated sidebar drawer that hosts the AI Chat interface.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | **Required** | Controls visibility of the sidebar. |
| `onClose` | `() => void` | **Required** | Callback invoked when the sidebar is dismissed (close button, Escape key, or mobile backdrop click). |
| `resizable` | `boolean` | `true` | Allows mouse/touch drag and keyboard resizing. |
| `side` | `"left" \| "right"` | `"right"` | Docked screen position of the sidebar. |
| `defaultWidth` | `number` | `400` | Initial width in pixels. |
| `minWidth` | `number` | `320` | Minimum constraint width in pixels. |
| `maxWidth` | `number` | `800` | Maximum constraint width in pixels. |
| `storageKey` | `string` | `"ai_sidebar_width"` | LocalStorage key used to persist user-adjusted width. |
| `animate` | `boolean` | `true` | Whether to enable Framer Motion width/opacity transition. |
| `animationDuration` | `number` | `0.28` | Duration of the open/close animation in seconds. |
| `title` | `string` | `"AI Assistant"` | Title displayed in the header. |
| `subtitle` | `string` | `"Always here to help"` | Subtitle displayed under title. |
| `icon` | `ReactNode` | `<Sparkles />` | Custom icon component for the header. |
| `closeIcon` | `ReactNode` | `<X />` | Custom icon component for close button. |
| `styleConfig` | `AiStyleConfig` | `undefined` | Custom styling tokens object. |
| `initialMessages` | `Message[]` | `undefined` | Seed messages for chat. |
| `suggestions` | `AiSuggestion[]` | `DEFAULT_SUGGESTIONS` | Suggestion chips rendered in empty state. |
| `allowedFileTypes` | `string[]` | `undefined` | Allowed MIME types / extensions (e.g. `["image/*", ".pdf"]`). |
| `maxFileSize` | `number` | `undefined` | Maximum allowed attachment size in bytes. |
| `maxFiles` | `number` | `5` | Maximum attachments allowed per message. |

---

### `<AiChat />`

The standalone chat interface containing the header, scrollable virtualized chat area, and input action bar.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"AI Assistant"` | Header title. |
| `subtitle` | `string` | `"Always here to help"` | Header subtitle or streaming state text. |
| `showCloseButton` | `boolean` | `false` | Shows close icon button. |
| `onClose` | `() => void` | `undefined` | Invoked when close icon is clicked. |
| `showAvatars` | `boolean` | `true` | Shows user and assistant avatars. |
| `showTimestamps` | `boolean` | `false` | Shows timestamps on messages. |
| `userAvatar` | `ReactNode` | `<User />` | Custom avatar for user messages. |
| `assistantAvatar` | `ReactNode` | `<Bot />` | Custom avatar for assistant messages. |
| `placeholder` | `string` | `"Ask something..."` | Input placeholder text. |
| `showAttachButton` | `boolean` | `true` | Displays paperclip attachment trigger button. |
| `emptyStateTitle` | `string` | `"How can I help you today?"` | Title when chat has no messages. |
| `emptyStateDescription` | `string` | Default description | Description text when empty. |
| `renderEmptyState` | `() => ReactNode` | `undefined` | Custom render prop for empty state. |
| `renderTypingIndicator` | `() => ReactNode` | `undefined` | Custom render prop for typing indicator. |
| `renderHeaderActions` | `() => ReactNode` | `undefined` | Custom action buttons in header. |
| `onMessageSent` | `(msg: Message) => void` | `undefined` | Callback fired when user sends a message. |
| `onMessageReceived` | `(msg: Message) => void` | `undefined` | Callback fired when assistant finishes responding. |

---

### `useAiChat` Hook

Provides reactive chat state and action handlers.

```ts
const {
  messages,
  isLoading,
  streamingState,
  sendMessage,
  stopStreaming,
  clearChat,
  removeMessage,
  setMessages,
} = useAiChat({
  initialMessages?: Message[],
  systemContext?: string,
  onMessage?: (message: Message) => void,
  onError?: (error: Error) => void,
  maxMessages?: number,
});
```

---

## 🎨 Deep Customization via `AiStyleConfig`

Use `styleConfig` to customize up to 95% of all visual elements without editing component code:

```ts
import type { AiStyleConfig } from "@/shared/ui/Ai";

const customTheme: AiStyleConfig = {
  sidebar: {
    bg: "#0f172a",                 // Dark slate background
    border: "#1e293b",             // Border color
    radius: "16px",                // Border radius
    shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    backdropBg: "bg-slate-950/60", // Mobile backdrop styling
    backdropBlur: "backdrop-blur-md",
    resizeHandleColor: "#38bdf8",
  },
  header: {
    bg: "#0f172a",
    text: "#f8fafc",
    subtitle: "#94a3b8",
    border: "#1e293b",
    height: "68px",
    iconBg: "rgba(56, 189, 248, 0.15)",
    iconColor: "#38bdf8",
  },
  chatArea: {
    bg: "#090d16",
    emptyStateTitleColor: "#f8fafc",
    emptyStateDescriptionColor: "#94a3b8",
    emptyStateIconBg: "rgba(56, 189, 248, 0.15)",
    emptyStateIconColor: "#38bdf8",
    suggestionBg: "#1e293b",
    suggestionText: "#f1f5f9",
    suggestionBorder: "#334155",
    suggestionHoverBg: "#334155",
    suggestionIconColor: "#38bdf8",
    typingIndicatorBg: "#1e293b",
    typingIndicatorText: "#94a3b8",
    typingIndicatorBorder: "#334155",
  },
  message: {
    maxWidth: "80%",
    user: {
      bg: "#2563eb",
      text: "#ffffff",
      radius: "18px",
      padding: "14px",
    },
    assistant: {
      bg: "#1e293b",
      text: "#f1f5f9",
      border: "#334155",
      radius: "18px",
      padding: "14px",
    },
    userAvatarBg: "#1d4ed8",
    assistantAvatarBg: "#0284c7",
    timestampColor: "#64748b",
  },
  input: {
    bg: "#0f172a",
    border: "#1e293b",
    textareaBg: "#1e293b",
    textareaText: "#f8fafc",
    textareaBorder: "#334155",
    sendButtonBg: "#2563eb",
    sendButtonText: "#ffffff",
    attachButtonColor: "#94a3b8",
    stopButtonBg: "#dc2626",
    stopButtonText: "#ffffff",
  },
  attachment: {
    bg: "#1e293b",
    border: "#334155",
    text: "#f8fafc",
    sizeText: "#94a3b8",
    previewBg: "#0f172a",
  },
  codeBlock: {
    bg: "#0b0f17",
    border: "#334155",
    headerBg: "#161e2e",
    headerText: "#94a3b8",
    codeText: "#e2e8f0",
  },
};
```

---

## 💡 Step-by-Step Code Recipes

### Recipe 1: Full Embedded Resizable Chat Sidebar

```tsx
import React, { useState } from "react";
import { AiSidebar } from "@/shared/ui/Ai";

export function DashboardWithAi() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <main className="flex-1 p-6">
        <button
          onClick={() => setIsAiOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Open AI Assistant
        </button>
      </main>

      <AiSidebar
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        side="right"
        defaultWidth={420}
        minWidth={320}
        maxWidth={750}
        title="Engineering Copilot"
        subtitle="Powered by Sutra AI"
      />
    </div>
  );
}
```

---

### Recipe 2: Complete 95% Custom Brand Theme

```tsx
import { AiChat, type AiStyleConfig } from "@/shared/ui/Ai";

const purpleBrandTheme: AiStyleConfig = {
  header: {
    bg: "#4c1d95",
    text: "#ffffff",
    subtitle: "#ddd6fe",
    iconBg: "rgba(255, 255, 255, 0.2)",
    iconColor: "#ffffff",
  },
  message: {
    user: {
      bg: "#7c3aed",
      text: "#ffffff",
      radius: "16px",
    },
    assistant: {
      bg: "#f5f3ff",
      text: "#3b0764",
      border: "#ddd6fe",
      radius: "16px",
    },
  },
  input: {
    sendButtonBg: "#7c3aed",
    sendButtonText: "#ffffff",
  },
};

export function CustomThemedChat() {
  return (
    <div className="h-[600px] w-[400px] rounded-2xl shadow-xl overflow-hidden">
      <AiChat
        title="Purple Copilot"
        styleConfig={purpleBrandTheme}
        placeholder="Type a query..."
      />
    </div>
  );
}
```

---

### Recipe 3: Real Backend Streaming / Server-Sent Events (SSE)

```tsx
import React, { useState } from "react";
import { AiChat, useAiChat } from "@/shared/ui/Ai";

export function LiveStreamingChat() {
  const { messages, setMessages } = useAiChat();

  const handleCustomSend = async ({ content }: { content: string }) => {
    // 1. Add user message
    const userMsg = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content,
      createdAt: Date.now(),
      status: "sent" as const,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Add assistant placeholder
    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: "assistant" as const,
        content: "",
        status: "sending" as const,
        isStreaming: true,
      },
    ]);

    // 3. Connect to your streaming API endpoint
    const response = await fetch("/api/ai/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: content }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      accumulated += decoder.decode(value);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: accumulated } : m
        )
      );
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, isStreaming: false, status: "sent" } : m
      )
    );
  };

  return (
    <div className="h-full">
      <AiChat onSuggestionClick={(s) => handleCustomSend({ content: s.label })} />
    </div>
  );
}
```

---

### Recipe 4: Custom Empty State & Suggestion Chips

```tsx
import { AiSidebar, type AiSuggestion } from "@/shared/ui/Ai";
import { Sparkles, Code2, BookOpen, Bug } from "lucide-react";

const customSuggestions: AiSuggestion[] = [
  {
    id: "explain",
    label: "Explain this React architecture",
    icon: <BookOpen size={16} />,
  },
  {
    id: "refactor",
    label: "Refactor component for performance",
    icon: <Code2 size={16} />,
  },
  {
    id: "debug",
    label: "Audit and check for memory leaks",
    icon: <Bug size={16} />,
  },
];

export function TailoredAiSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AiSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Code Architect"
      subtitle="v2.0 Clean Architecture"
      emptyStateTitle="Welcome to Code Architect"
      emptyStateDescription="Select a suggested action below or describe your task."
      suggestions={customSuggestions}
      showTimestamps
    />
  );
}
```

---

### Recipe 5: File Upload Restrictions & Error Handling

```tsx
import { AiChat } from "@/shared/ui/Ai";

export function SecureUploadChat() {
  return (
    <AiChat
      allowedFileTypes={["image/png", "image/jpeg", ".pdf", ".txt"]}
      maxFileSize={5 * 1024 * 1024} // 5 MB maximum
      maxFiles={3}                  // Max 3 attachments per message
      onAttachmentError={(errorMsg) => {
        alert(`Attachment Error: ${errorMsg}`);
      }}
    />
  );
}
```

---

## ❓ Frequently Asked Questions (FAQ)

**Q: Does TanStack Virtual handle variable-height messages?**
> Yes! Every message row container is assigned `data-index={row.index}` and attached to `rowVirtualizer.measureElement`. When dynamic content (such as multiline code blocks or streaming responses) expands, heights are re-measured smoothly.

**Q: Can I change colors for dark mode?**
> Yes! All components use standard Tailwind dark-mode variants (`dark:bg-[#03131e]`, `dark:text-[#ebf7ff]`) by default, and custom hex colors can be provided via `styleConfig`.

**Q: Are attachments protected against malicious URL execution?**
> Yes! Download anchors validate the `attachment.url` scheme against `http:`, `https:`, `blob:`, and `data:` protocols, preventing `javascript:` XSS vectors.

---

Part of the **Sutra-ui Component Library**. Built with React 18, TypeScript, Tailwind CSS, and TanStack Virtual.
