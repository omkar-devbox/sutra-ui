// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useState } from "react";
import {
  AiSidebar,
  AiChat,
  type AiStyleConfig,
  type AiSuggestion,
  type Message,
} from "@/shared/ui/Ai";
import {
  Bot,
  Sparkles,
  Sliders,
  Settings2,
  Code2,
  Eye,
  PanelRightOpen,
  PanelLeftOpen,
  Palette,
  Terminal,
  FileCheck2,
  CheckCircle,
} from "lucide-react";

// ----------------------------------------------------
// Types and Preset Models
// ----------------------------------------------------

type ThemePresetKey = "default" | "midnight" | "purple" | "emerald";

interface ThemePreset {
  name: string;
  description: string;
  config?: AiStyleConfig;
}

// ----------------------------------------------------
// Constants and Theme Configurations
// ----------------------------------------------------

const THEME_PRESETS: Record<ThemePresetKey, ThemePreset> = {
  default: {
    name: "Default Modern",
    description: "Crisp blue & light sky theme with dark mode auto-detection",
    config: undefined,
  },
  midnight: {
    name: "Midnight Slate",
    description: "Deep dark high-contrast theme optimized for developers",
    config: {
      sidebar: {
        bg: "#090d16",
        border: "#1e293b",
        shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      },
      header: {
        bg: "#0f172a",
        text: "#f8fafc",
        subtitle: "#94a3b8",
        border: "#1e293b",
        iconBg: "rgba(56, 189, 248, 0.15)",
        iconColor: "#38bdf8",
      },
      chatArea: {
        bg: "#090d16",
        emptyStateTitleColor: "#f8fafc",
        emptyStateDescriptionColor: "#94a3b8",
        suggestionBg: "#1e293b",
        suggestionText: "#f1f5f9",
        suggestionBorder: "#334155",
        suggestionHoverBg: "#334155",
        typingIndicatorBg: "#1e293b",
        typingIndicatorText: "#94a3b8",
        typingIndicatorBorder: "#334155",
      },
      message: {
        user: {
          bg: "#0284c7",
          text: "#ffffff",
          radius: "16px",
        },
        assistant: {
          bg: "#1e293b",
          text: "#f8fafc",
          border: "#334155",
          radius: "16px",
        },
        userAvatarBg: "#0369a1",
        assistantAvatarBg: "#0284c7",
      },
      input: {
        bg: "#0f172a",
        border: "#1e293b",
        textareaBg: "#1e293b",
        textareaText: "#f8fafc",
        textareaBorder: "#334155",
        sendButtonBg: "#0284c7",
        sendButtonText: "#ffffff",
        attachButtonColor: "#94a3b8",
      },
    },
  },
  purple: {
    name: "Royal Purple",
    description: "Vibrant corporate gradient theme for enterprise copilot",
    config: {
      sidebar: {
        bg: "#2e1065",
        border: "#4c1d95",
      },
      header: {
        bg: "#3b0764",
        text: "#f5f3ff",
        subtitle: "#c4b5fd",
        border: "#581c87",
        iconBg: "rgba(168, 85, 247, 0.2)",
        iconColor: "#d8b4fe",
      },
      chatArea: {
        bg: "#1e0836",
        emptyStateTitleColor: "#faf5ff",
        emptyStateDescriptionColor: "#c4b5fd",
        suggestionBg: "#3b0764",
        suggestionText: "#f5f3ff",
        suggestionBorder: "#6b21a8",
        suggestionHoverBg: "#581c87",
        typingIndicatorBg: "#3b0764",
        typingIndicatorText: "#d8b4fe",
        typingIndicatorBorder: "#6b21a8",
      },
      message: {
        user: {
          bg: "#7c3aed",
          text: "#ffffff",
          radius: "16px",
        },
        assistant: {
          bg: "#3b0764",
          text: "#faf5ff",
          border: "#6b21a8",
          radius: "16px",
        },
        userAvatarBg: "#6d28d9",
        assistantAvatarBg: "#9333ea",
      },
      input: {
        bg: "#2e1065",
        border: "#4c1d95",
        textareaBg: "#3b0764",
        textareaText: "#f5f3ff",
        textareaBorder: "#6b21a8",
        sendButtonBg: "#7c3aed",
        sendButtonText: "#ffffff",
        attachButtonColor: "#c4b5fd",
      },
    },
  },
  emerald: {
    name: "Cyber Terminal",
    description: "Sleek obsidian with neon emerald tech accents",
    config: {
      sidebar: {
        bg: "#051610",
        border: "#064e3b",
      },
      header: {
        bg: "#06241b",
        text: "#ecfdf5",
        subtitle: "#6ee7b7",
        border: "#064e3b",
        iconBg: "rgba(16, 185, 129, 0.2)",
        iconColor: "#34d399",
      },
      chatArea: {
        bg: "#02100b",
        emptyStateTitleColor: "#ecfdf5",
        emptyStateDescriptionColor: "#a7f3d0",
        suggestionBg: "#062e22",
        suggestionText: "#ecfdf5",
        suggestionBorder: "#047857",
        suggestionHoverBg: "#064e3b",
        typingIndicatorBg: "#062e22",
        typingIndicatorText: "#6ee7b7",
        typingIndicatorBorder: "#047857",
      },
      message: {
        user: {
          bg: "#059669",
          text: "#ffffff",
          radius: "16px",
        },
        assistant: {
          bg: "#062e22",
          text: "#ecfdf5",
          border: "#047857",
          radius: "16px",
        },
        userAvatarBg: "#047857",
        assistantAvatarBg: "#10b981",
      },
      input: {
        bg: "#051610",
        border: "#064e3b",
        textareaBg: "#062e22",
        textareaText: "#ecfdf5",
        textareaBorder: "#047857",
        sendButtonBg: "#10b981",
        sendButtonText: "#022c22",
        attachButtonColor: "#6ee7b7",
      },
    },
  },
};

const DEMO_SUGGESTIONS: AiSuggestion[] = [
  { id: "1", label: "Generate React Component", action: "code" },
  { id: "2", label: "Summarize this page", action: "summarize" },
  { id: "3", label: "Explain TanStack Virtualizer", action: "explain" },
  { id: "4", label: "Simulate Error State", action: "simulate error" },
];

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const AiDemoPage: React.FC = () => {
  // Sidebar visibility and docking controls
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [sidebarSide, setSidebarSide] = useState<"left" | "right">("right");

  // Customization controls
  const [activeTheme, setActiveTheme] = useState<ThemePresetKey>("default");
  const [chatTitle, setChatTitle] = useState<string>("Sutra AI Copilot");
  const [chatSubtitle, setChatSubtitle] = useState<string>("Enterprise Assistant");
  const [showAvatars, setShowAvatars] = useState<boolean>(true);
  const [showTimestamps, setShowTimestamps] = useState<boolean>(true);
  const [showAttachButton, setShowAttachButton] = useState<boolean>(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // Real-time Event Logger state
  const [eventLogs, setEventLogs] = useState<
    { id: string; time: string; text: string; role: "user" | "assistant" }[]
  >([]);

  // Logs outbound and incoming messages
  const logEvent = (message: Message) => {
    const timeStr = new Date().toLocaleTimeString();
    const snippet = message.content.length > 50
      ? `${message.content.substring(0, 50)}...`
      : message.content;

    setEventLogs((prev) => [
      {
        id: message.id,
        time: timeStr,
        text: `[${message.role.toUpperCase()}] ${snippet}`,
        role: message.role === "user" ? "user" : "assistant",
      },
      ...prev.slice(0, 15),
    ]);
  };

  const currentStyleConfig = THEME_PRESETS[activeTheme].config;

  return (
    <div className="space-y-8 p-6 pb-20 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Bot size={22} />
              </span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  AI UI Module Showcase
                </h1>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  95%+ UI Customization &bull; Virtualized &bull; Production Ready
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Explore the turn-key AI Assistant Suite featuring TanStack Virtual list virtualization,
              real-time message streaming, safe markdown code highlighting, document attachment handling,
              and exhaustive theme customization via <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 font-mono text-xs">AiStyleConfig</code>.
            </p>
          </div>

          {/* Quick Drawer Action */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              type="button"
              className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
            >
              <PanelRightOpen size={18} />
              Open Drawer Sidebar
            </button>

            <button
              onClick={() => setSidebarSide((prev) => (prev === "right" ? "left" : "right"))}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title="Toggle sidebar docking side"
            >
              {sidebarSide === "right" ? (
                <>
                  <PanelLeftOpen size={16} />
                  Dock Left
                </>
              ) : (
                <>
                  <PanelRightOpen size={16} />
                  Dock Right
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Interactive Chat + Customization Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Embedded <AiChat /> Showcase */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-lg">
              <Eye size={20} className="text-blue-600" />
              <span>Live Embedded Chat Container</span>
            </div>
            <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              &lt;AiChat /&gt;
            </span>
          </div>

          {/* Interactive Chat Window Box */}
          <div className="h-[620px] w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <AiChat
              title={chatTitle}
              subtitle={chatSubtitle}
              suggestions={DEMO_SUGGESTIONS}
              showAvatars={showAvatars}
              showTimestamps={showTimestamps}
              showAttachButton={showAttachButton}
              autoScroll={autoScroll}
              styleConfig={currentStyleConfig}
              onMessageSent={logEvent}
              onMessageReceived={logEvent}
              placeholder="Ask anything, type 'code' or 'summarize'..."
            />
          </div>
        </div>

        {/* Right Column: Customization Controls & Live Event Tracker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Theme Presets Selector */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Palette size={18} className="text-blue-600" />
              <span>95% Custom Theme Presets</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(THEME_PRESETS) as ThemePresetKey[]).map((key) => {
                const preset = THEME_PRESETS[key];
                const isSelected = activeTheme === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTheme(key)}
                    type="button"
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs">{preset.name}</span>
                      {isSelected && <CheckCircle size={14} className="text-blue-600 dark:text-blue-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Sliders size={18} className="text-blue-600" />
              <span>UI Props Playground</span>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Header Title Input */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Header Title
                </label>
                <input
                  type="text"
                  value={chatTitle}
                  onChange={(e) => setChatTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Header Subtitle Input */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Header Subtitle
                </label>
                <input
                  type="text"
                  value={chatSubtitle}
                  onChange={(e) => setChatSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvatars}
                    onChange={(e) => setShowAvatars(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show Avatars</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTimestamps}
                    onChange={(e) => setShowTimestamps(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show Timestamps</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAttachButton}
                    onChange={(e) => setShowAttachButton(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Attach Button</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoScroll}
                    onChange={(e) => setAutoScroll(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Auto Scroll</span>
                </label>
              </div>
            </div>
          </div>

          {/* Event Dispatch Log */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs">
                <Terminal size={16} className="text-blue-600" />
                <span>Real-Time Interaction Log</span>
              </div>
              {eventLogs.length > 0 && (
                <button
                  onClick={() => setEventLogs([])}
                  type="button"
                  className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="h-32 overflow-y-auto space-y-1.5 font-mono text-[11px] bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {eventLogs.length === 0 ? (
                <p className="text-slate-400 text-center py-8">
                  Send a message or click a suggestion to see real-time callbacks.
                </p>
              ) : (
                eventLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-1.5 ${
                      log.role === "user"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <span className="text-slate-400 shrink-0">[{log.time}]</span>
                    <span className="truncate">{log.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Code Integration Preview Box */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <Code2 size={20} className="text-blue-600" />
          <span>Quick Code Integration Snippet</span>
        </div>

        <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto text-xs font-mono text-neutral-300 leading-relaxed">
          <pre>{`import { AiSidebar, type AiStyleConfig } from "@/shared/ui/Ai";
import { useState } from "react";

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open AI</button>

      <AiSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        side="${sidebarSide}"
        title="${chatTitle}"
        subtitle="${chatSubtitle}"
        showAvatars={${showAvatars}}
        showTimestamps={${showTimestamps}}
        showAttachButton={${showAttachButton}}
        styleConfig={${activeTheme === "default" ? "undefined" : `THEME_PRESETS["${activeTheme}"].config`}}
      />
    </>
  );
}`}</pre>
        </div>
      </div>

      {/* Floating / Drawer Sidebar Instance */}
      <AiSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        side={sidebarSide}
        title={chatTitle}
        subtitle={chatSubtitle}
        suggestions={DEMO_SUGGESTIONS}
        showAvatars={showAvatars}
        showTimestamps={showTimestamps}
        showAttachButton={showAttachButton}
        autoScroll={autoScroll}
        styleConfig={currentStyleConfig}
        onMessageSent={logEvent}
        onMessageReceived={logEvent}
      />
    </div>
  );
};

export default AiDemoPage;

