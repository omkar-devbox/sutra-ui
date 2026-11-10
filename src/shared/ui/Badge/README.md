# 🏷️ Comprehensive Badge Component Suite Documentation

Welcome to the complete guide for the **Badge UI Component System** located at `@/shared/ui/Badge`.

This suite provides a comprehensive collection of atom and composite components designed for status indicators, live user presence, notification badges, interactive filter tags, and overflow groups.

---

## 📚 Component Overview

| Component | Purpose / Usage | Key Capabilities |
| :--- | :--- | :--- |
| **`Badge`** | General status, category tags, metadata labels | 8 color variants, 3 sizes, pill/rounded, leading icons, polymorphic `asChild`. |
| **`BadgeGroup`** | Grouping multiple badges together | Configurable gap, flex-wrapping, automatic `+N` overflow truncation with `max`. |
| **`CountBadge`** | Notifications, e-commerce cart counts | Truncation (`99+`), comma formatting (`1,250`), zero hiding, top-right anchoring. |
| **`StatusBadge`** | Online, offline, pending, busy, away states | Pre-configured colored status dots, automated labels, live radar pulse animation. |
| **`DotBadge`** | Ultra-compact status indicator | Minimal standalone dot indicator for avatars, table rows, and live streams. |
| **`BadgeOverflow`** | Overflow counter for collections | Renders `+N` indicator for hidden or truncated item lists. |
| **`FilterBadge`** | Interactive, dismissible filter tags | Active selection state, integrated dismiss (`×`) button, keyboard accessibility. |

---

## 📁 Directory Structure

```text
src/shared/ui/Badge/
├── index.ts                 # Unified public export barrel
├── README.md                # Component suite documentation (this file)
├── constant/
│   ├── badge.constant.ts    # Business defaults, mappings, and status constants
│   └── index.ts             # Constant barrel exports
├── hooks/
│   ├── useBadgeCount.ts     # Counter formatting, overflow, and visibility hook
│   ├── useBadgeFilter.ts    # Filter selection and dismissal state management hook
│   ├── useBadgeGroup.ts     # Group truncation and overflow calculation hook
│   └── index.ts             # Hooks barrel exports
├── items/
│   ├── Badge.tsx            # Core universal Badge component
│   ├── CountBadge.tsx       # Specialized notification & cart counter badge
│   ├── StatusBadge.tsx      # Standardized user presence & service health badge
│   ├── DotBadge.tsx         # Standalone compact status dot indicator
│   ├── BadgeGroup.tsx       # Flex container with automatic +N overflow
│   ├── BadgeOverflow.tsx    # +N truncated counter badge
│   ├── FilterBadge.tsx      # Interactive dismissible filter chip (React ×, Filter ×)
│   └── index.ts             # Component items barrel exports
├── styles/
│   ├── badge.styles.ts      # Validated Tailwind v4 tokens & dimensions
│   └── index.ts             # Styles barrel exports
└── types/
    ├── badge.types.ts       # Shared TypeScript type definitions
    └── index.ts             # Types barrel exports
```

---

## 📋 API Reference

### Central Import
```tsx
import {
  Badge,
  CountBadge,
  StatusBadge,
  DotBadge,
  BadgeGroup,
  BadgeOverflow,
  FilterBadge,
  type BadgeVariant,
  type BadgeSize,
  type BadgeStatus,
} from "@/shared/ui/Badge";
```

---

## 🎨 A. Variants & Sizes

### 1. Variants (`variant`)
- `primary`: Tinted blue background with brand blue text.
- `secondary`: Neutral zinc contrast for secondary tags.
- `success`: Emerald background for active, published, or verified states.
- `danger`: Red background for errors, high priority, or critical alerts.
- `warning`: Amber background for pending, caution, or review states.
- `outline`: Clean transparent background with a bordered perimeter.
- `info`: Sky blue background for tips and information.
- `default`: Subtle neutral zinc background.

### 2. Sizes (`size`)
- `sm`: Small (18px height, 10px text) — ideal for dense table cells and counts.
- `md`: Medium (22px height, 12px text) — default standard size.
- `lg`: Large (26px height, 14px text) — ideal for page headers and modals.

```tsx
<div className="flex gap-2">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="danger">Danger</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="outline">Outline</Badge>
</div>
```

---

## 🟢 C. Status Indicators (`StatusBadge` & `DotBadge`)

Display real-time connection, user presence, and operational states:

```tsx
import { StatusBadge, DotBadge } from "@/shared/ui/Badge";

export const StatusExamples = () => (
  <div className="flex flex-col gap-4">
    {/* Status Badges with Dots and Labels */}
    <div className="flex items-center gap-3">
      <StatusBadge status="online" />   {/* ● Online (pulsing green dot) */}
      <StatusBadge status="pending" />  {/* ● Pending (pulsing amber dot) */}
      <StatusBadge status="offline" />  {/* ● Offline (neutral zinc dot) */}
      <StatusBadge status="busy" />     {/* ● Busy (red dot) */}
    </div>

    {/* Compact Standalone Dot Indicators */}
    <div className="flex items-center gap-3">
      <DotBadge status="online" pulse />
      <DotBadge status="pending" pulse />
      <DotBadge status="offline" />
    </div>
  </div>
);
```

---

## 🔢 D. Count Badges (`CountBadge`)

Specialized for unread messages, shopping cart items, and metric indicators:

```tsx
import { CountBadge } from "@/shared/ui/Badge";
import { Bell, ShoppingCart } from "lucide-react";

export const CountExamples = () => (
  <div className="flex items-center gap-6">
    {/* Standalone Numbers */}
    <CountBadge count={5} />           {/* 5 */}
    <CountBadge count={120} maxCount={99} /> {/* 99+ */}
    <CountBadge count={0} showZero />  {/* 0 */}
    <CountBadge count={1250} />        {/* 1,250 (formatted with comma) */}

    {/* Anchored Top-Right on Icons */}
    <CountBadge count={3}>
      <button className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Bell className="w-5 h-5" />
      </button>
    </CountBadge>

    <CountBadge count={12}>
      <button className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <ShoppingCart className="w-5 h-5" />
      </button>
    </CountBadge>
  </div>
);
```

---

## 🏷️ E. Interactive & Dismissible Badges (`FilterBadge`)

Interactive search tags with built-in remove actions (`React ×`, `Active ×`, `Filter ×`):

```tsx
import { useState } from "react";
import { FilterBadge, BadgeGroup } from "@/shared/ui/Badge";

export const FilterBadgeDemo = () => {
  const [filters, setFilters] = useState(["React", "Active", "Filter"]);
  const [activeFilter, setActiveFilter] = useState("React");

  const removeFilter = (tagToRemove: string) => {
    setFilters(filters.filter((t) => t !== tagToRemove));
  };

  return (
    <BadgeGroup gap="md">
      {filters.map((tag) => (
        <FilterBadge
          key={tag}
          label={tag}
          active={activeFilter === tag}
          onClick={() => setActiveFilter(tag)}
          onRemove={() => removeFilter(tag)}
        />
      ))}
    </BadgeGroup>
  );
};
```

---

## 📦 F. Badge Groups & Truncated Overflow (`BadgeGroup` & `BadgeOverflow`)

Render collections of tags with automatic `+N` truncation when exceeding the `max` threshold:

```tsx
import { Badge, BadgeGroup } from "@/shared/ui/Badge";

export const TruncatedGroupDemo = () => {
  const tags = ["TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand", "Vite", "ESBuild"];

  return (
    // Automatically renders first 3 tags followed by a "+4" overflow badge
    <BadgeGroup max={3} gap="sm">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </BadgeGroup>
  );
};
```

---

## ♿ Accessibility & WCAG 2.2 Compliance

1. **Reduced Motion Support**: Pulsing radar rings (`pulse`) automatically disable when the user prefers reduced motion (`motion-reduce:animate-none`).
2. **Grammatically Correct Screen Reader Labels**: Standalone counts automatically output singular or plural ARIA descriptions (`1 notification` vs `5 notifications`).
3. **Decorative SVGs & Indicators**: Dot indicators and remove buttons include `aria-hidden="true"` and descriptive labels.
4. **Keyboard Accessibility**: `FilterBadge` and clickable tags support `Enter` and `Space` activation with visible focus rings.
