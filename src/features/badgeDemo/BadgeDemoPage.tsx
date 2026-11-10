// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useState } from "react";
import {
  Badge,
  CountBadge,
  StatusBadge,
  DotBadge,
  BadgeGroup,
  FilterBadge,
  type BadgeVariant,
  type BadgeSize,
  type BadgeStatus,
} from "@/shared/ui/Badge";
import { Button } from "@/shared/ui";
import {
  Tag,
  Sparkles,
  Bell,
  ShoppingCart,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Sliders,
  Users,
  Activity,
  Layers,
} from "lucide-react";

// ----------------------------------------------------
// Demo Page Component
// ----------------------------------------------------

export default function BadgeDemoPage() {
  // ── State for Interactive Playground ──
  const [selectedVariant, setSelectedVariant] = useState<BadgeVariant>("primary");
  const [selectedSize, setSelectedSize] = useState<BadgeSize>("md");
  const [isRounded, setIsRounded] = useState<boolean>(true);
  const [hasDot, setHasDot] = useState<boolean>(true);
  const [isPulsing, setIsPulsing] = useState<boolean>(true);
  const [hasIcon, setHasIcon] = useState<boolean>(true);
  const [customText, setCustomText] = useState<string>("Interactive Badge");

  // ── State for Interactive Counter ──
  const [cartCount, setCartCount] = useState<number>(5);
  const [showZeroCount, setShowZeroCount] = useState<boolean>(false);

  // ── State for Interactive Filter Tags ──
  const INITIAL_TAGS = [
    { id: "1", label: "React", active: true },
    { id: "2", label: "Active", active: true },
    { id: "3", label: "Filter", active: false },
    { id: "4", label: "TypeScript", active: true },
    { id: "5", label: "Tailwind CSS", active: false },
    { id: "6", label: "Zustand", active: false },
  ];
  const [filterTags, setFilterTags] = useState(INITIAL_TAGS);

  // ── State for BadgeGroup Truncation ──
  const [groupMax, setGroupMax] = useState<number>(4);
  const [groupGap, setGroupGap] = useState<"sm" | "md" | "lg">("md");

  // ── State for Live Status Simulator ──
  const [userStatus, setUserStatus] = useState<BadgeStatus>("online");

  // Filter tag actions
  const toggleFilterTag = (id: string) => {
    setFilterTags((prev) =>
      prev.map((tag) => (tag.id === id ? { ...tag, active: !tag.active } : tag))
    );
  };

  const removeFilterTag = (id: string) => {
    setFilterTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const resetFilterTags = () => {
    setFilterTags(INITIAL_TAGS);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* ──────────────────────────────────────────────────── */}
      {/* Top Header Banner */}
      {/* ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-600/10 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" className="px-3 py-1 font-semibold">
                <Sparkles className="h-3.5 w-3.5 mr-1 text-blue-500" />
                Sutra UI Badges
              </Badge>
              <Badge variant="outline" className="text-xs">
                Component Showcase
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Badge & Status Indicator System
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Production-grade badge system featuring 8 color variants, 3 sizes, pre-configured live status presence indicators, notification counters, and interactive dismissible filter tags.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilterTags}
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Demo
            </Button>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 1: Live Interactive Playground */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-500" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Interactive Badge Playground
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Customize props in real time to test live appearance, sizing, and animations.
            </p>
          </div>

          {/* Live Preview Canvas */}
          <div className="flex items-center justify-center min-w-[200px] p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40">
            <Badge
              variant={selectedVariant}
              size={selectedSize}
              rounded={isRounded}
              dot={hasDot}
              pulse={isPulsing}
              icon={hasIcon ? <Flame className="h-3.5 w-3.5 text-current" /> : undefined}
            >
              {customText}
            </Badge>
          </div>
        </div>

        {/* Control Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          {/* Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Color Variant
            </label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as BadgeVariant)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
            >
              <option value="primary">Primary (Blue)</option>
              <option value="secondary">Secondary (Zinc)</option>
              <option value="success">Success (Emerald)</option>
              <option value="danger">Danger (Red)</option>
              <option value="warning">Warning (Amber)</option>
              <option value="outline">Outline (Bordered)</option>
              <option value="info">Info (Sky)</option>
              <option value="default">Default (Neutral)</option>
            </select>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["sm", "md", "lg"] as BadgeSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium border uppercase transition-colors ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Label Text Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Label Text
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500"
              placeholder="Badge label"
            />
          </div>

          {/* Feature Toggles */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Toggles
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRounded}
                  onChange={(e) => setIsRounded(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                Pill Shape
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDot}
                  onChange={(e) => setHasDot(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                Dot Indicator
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPulsing}
                  onChange={(e) => setIsPulsing(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                Pulse Ping
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasIcon}
                  onChange={(e) => setHasIcon(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                Leading Icon
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 2: Variants Showcase (Section A) */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Tag className="h-4 w-4 text-emerald-500" />
            A. Color Variants
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            6 core variants tailored for enterprise design systems, styled with validated Tailwind v4 tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rounded Box Format */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Standard Rounded (`rounded-md`)
            </h3>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Pill Shape Format */}
          <div className="space-y-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Pill Shape (`rounded={true}`)
            </h3>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Badge variant="primary" rounded>Primary</Badge>
              <Badge variant="secondary" rounded>Secondary</Badge>
              <Badge variant="success" rounded>Success</Badge>
              <Badge variant="danger" rounded>Danger</Badge>
              <Badge variant="warning" rounded>Warning</Badge>
              <Badge variant="outline" rounded>Outline</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 3: Sizes Showcase (Section B) */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-500" />
            B. Sizing Scaling (`sm`, `md`, `lg`)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Consistent dimensions for dense table rows, cards, or prominent page headers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500">sm (18px):</span>
            <Badge size="sm" variant="primary" rounded>
              Small Badge
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500">md (22px):</span>
            <Badge size="md" variant="primary" rounded>
              Medium (Default)
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500">lg (26px):</span>
            <Badge size="lg" variant="primary" rounded>
              Large Badge
            </Badge>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 4: Status Indicators (Section C) */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              C. Live Status Indicators (`StatusBadge` & `DotBadge`)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Standardized presence indicators with radar ping animations and accessible status roles.
            </p>
          </div>

          {/* Interactive Status Switcher */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">Simulate State:</span>
            {(["online", "pending", "offline", "busy"] as BadgeStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setUserStatus(status)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all ${
                  userStatus === status
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Badges with Labels */}
          <div className="space-y-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              `StatusBadge` (Dots + Labels)
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <StatusBadge status="online" />
              <StatusBadge status="pending" />
              <StatusBadge status="offline" />
              <StatusBadge status="busy" />
              <StatusBadge status="away" />
            </div>

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
              <span className="text-xs text-zinc-500">Live Simulated State:</span>
              <StatusBadge status={userStatus} pulse />
            </div>
          </div>

          {/* Standalone Dot Indicators */}
          <div className="space-y-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              `DotBadge` (Compact Standalone Indicator)
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <DotBadge status="online" pulse />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Online (Pulsing)</span>
              </div>
              <div className="flex items-center gap-2">
                <DotBadge status="pending" pulse />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <DotBadge status="offline" />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Offline</span>
              </div>
            </div>

            {/* In Avatar Context */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-4">
              <span className="text-xs text-zinc-500">In Avatar Context:</span>
              <div className="relative inline-flex">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  JD
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 ring-2 ring-white dark:ring-zinc-900 rounded-full">
                  <DotBadge status={userStatus} pulse size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 5: Count Badges (Section D) */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Bell className="h-4 w-4 text-rose-500" />
              D. Numerical Count Badges (`CountBadge`)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Notification pill badges with overflow truncation (`99+`), comma formatting (`1,250`), zero hiding, and corner anchoring.
            </p>
          </div>

          {/* Interactive Stepper */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono">Live Counter:</span>
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setCartCount((prev) => Math.max(0, prev - 1))}
                className="p-1 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                aria-label="Decrement"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="px-3 text-xs font-bold text-zinc-800 dark:text-zinc-200 min-w-[32px] text-center">
                {cartCount}
              </span>
              <button
                type="button"
                onClick={() => setCartCount((prev) => prev + 1)}
                className="p-1 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                aria-label="Increment"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCartCount(1250)}
              className="text-xs"
            >
              Set 1,250
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCartCount(120)}
              className="text-xs"
            >
              Set 120 (99+)
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requested Showcase Values */}
          <div className="space-y-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Target Count Formats
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-1 text-center">
                <CountBadge count={5} />
                <span className="block text-[10px] text-zinc-500">5 (Standard)</span>
              </div>
              <div className="space-y-1 text-center">
                <CountBadge count={120} maxCount={99} />
                <span className="block text-[10px] text-zinc-500">99+ (Overflow)</span>
              </div>
              <div className="space-y-1 text-center">
                <CountBadge count={0} showZero />
                <span className="block text-[10px] text-zinc-500">0 (showZero)</span>
              </div>
              <div className="space-y-1 text-center">
                <CountBadge count={1250} />
                <span className="block text-[10px] text-zinc-500">1,250 (Thousands)</span>
              </div>
            </div>
          </div>

          {/* Anchored Top-Right on Icons */}
          <div className="space-y-4 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Anchored Over Icons (Interactive Counter)
            </h3>
            <div className="flex items-center gap-8">
              <CountBadge count={cartCount} showZero={showZeroCount} variant="danger">
                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </CountBadge>

              <CountBadge count={cartCount} showZero={showZeroCount} variant="primary">
                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
                >
                  <Bell className="h-5 w-5" />
                </button>
              </CountBadge>

              <CountBadge count={cartCount} showZero={showZeroCount} variant="warning">
                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-xs"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </CountBadge>

              <label className="text-xs flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={showZeroCount}
                  onChange={(e) => setShowZeroCount(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                Show badge when 0
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 6: Interactive Filter Badges (Section E) */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Tag className="h-4 w-4 text-blue-500" />
              E. Interactive & Dismissible Badges (`FilterBadge`)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Interactive tags featuring active selection states and integrated dismiss (`×`) triggers (`React ×`, `Active ×`, `Filter ×`).
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetFilterTags}
            className="flex items-center gap-1.5 self-start md:self-auto text-xs"
          >
            <RotateCcw className="h-3 w-3" />
            Restore Tags
          </Button>
        </div>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Active Filter Query Chips (Click tag to select, click × to remove)
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              {filterTags.length} active tag{filterTags.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filterTags.length > 0 ? (
            <BadgeGroup gap="md">
              {filterTags.map((tag) => (
                <FilterBadge
                  key={tag.id}
                  label={tag.label}
                  active={tag.active}
                  onClick={() => toggleFilterTag(tag.id)}
                  onRemove={() => removeFilterTag(tag.id)}
                />
              ))}
            </BadgeGroup>
          ) : (
            <div className="text-center py-6 text-xs text-zinc-400">
              All tags dismissed. Click "Restore Tags" to reset.
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 7: Badge Groups & Truncated Overflow */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500" />
              F. Badge Grouping & `+N` Truncation (`BadgeGroup` & `BadgeOverflow`)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Clean layout wrapping for tag clouds with automatic overflow calculation (`max={groupMax}`).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Max Visible:</span>
              <select
                value={groupMax}
                onChange={(e) => setGroupMax(Number(e.target.value))}
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-xs"
              >
                <option value={2}>2 Badges</option>
                <option value={3}>3 Badges</option>
                <option value={4}>4 Badges</option>
                <option value={6}>6 Badges</option>
                <option value={10}>All (No Truncation)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Gap:</span>
              <select
                value={groupGap}
                onChange={(e) => setGroupGap(e.target.value as "sm" | "md" | "lg")}
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-xs"
              >
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
          <BadgeGroup max={groupMax} gap={groupGap}>
            <Badge variant="primary" rounded>TypeScript</Badge>
            <Badge variant="secondary" rounded>React</Badge>
            <Badge variant="success" rounded>Vite</Badge>
            <Badge variant="info" rounded>Tailwind CSS</Badge>
            <Badge variant="warning" rounded>Next.js</Badge>
            <Badge variant="outline" rounded>Zustand</Badge>
            <Badge variant="danger" rounded>Docker</Badge>
            <Badge variant="primary" rounded>PostgreSQL</Badge>
          </BadgeGroup>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── */}
      {/* Section 8: Real-World Enterprise Cards */}
      {/* ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-500" />
          Enterprise Composition Cards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: User Profile Card */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase">Team Member</span>
              <StatusBadge status="online" pulse size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                OJ
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Omkar Jadhav</h4>
                <p className="text-xs text-zinc-500">omkar@prologiccrm.com</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Badge variant="primary" size="sm" rounded>Architect</Badge>
              <Badge variant="secondary" size="sm" rounded>Admin</Badge>
              <Badge variant="outline" size="sm" rounded>Core Team</Badge>
            </div>
          </div>

          {/* Card 2: E-Commerce Order Status */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase">Invoice #INV-2026</span>
              <Badge variant="success" size="sm" dot>Paid</Badge>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                $1,250.00
              </div>
              <p className="text-xs text-zinc-500">Enterprise Annual Subscription</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
              <span>Items:</span>
              <CountBadge count={12} variant="secondary" size="sm" />
            </div>
          </div>

          {/* Card 3: Server Health Status */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase">Production Cluster</span>
              <Badge variant="success" size="sm" pulse dot>99.98% SLA</Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Database Primaries:</span>
                <StatusBadge status="online" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Async Workers:</span>
                <StatusBadge status="pending" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Backup Node:</span>
                <StatusBadge status="offline" size="sm" />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs">
              <span className="text-zinc-500">Pending Jobs:</span>
              <CountBadge count={99} maxCount={50} variant="warning" size="sm" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

