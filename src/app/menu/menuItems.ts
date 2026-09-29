import { LayoutDashboard } from "lucide-react";
import type { MenuSection, MenuItem } from "@/shared/nav/Sidebar/types/types";

// ==================== Sidebar Menu ====================

export const SIDEBAR_MENU: MenuSection[] = [
  {
    id: "1",
    label: "Dashboard",
    description: "Main overview & metrics",
    items: [
      {
        id: "1-1",
        key: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
        tooltip: "Overview & Analytics Dashboard",
      },
      {
        id: "1-2",
        key: "datatable-demo",
        label: "DataTable Demo",
        icon: LayoutDashboard,
        path: "/datatable-demo",
        tooltip: "Comprehensive DataTable Demo with all features",
      },
      {
        id: "1-3",
        key: "form-demo",
        label: "Form Fields Demo",
        icon: LayoutDashboard,
        path: "/form-demo",
        tooltip: "Comprehensive FormField & Layout Showcase",
      },
    ],
  },
];

// ==================== Sidebar Configuration ====================

export const SIDEBAR_CONFIG = {
  companyName: "Sutra-ui",
  logo: null,
  menu: SIDEBAR_MENU,
};

// ==================== Menu Customization ====================

export function customizeMenu(
  originalMenu: MenuSection[] = SIDEBAR_MENU,
  options?: {
    hiddenSectionIds?: string[];
    hiddenItemKeys?: string[];
    customSections?: MenuSection[];
  }
): MenuSection[] {
  if (!options) return originalMenu;

  let result = originalMenu;

  // Filter hidden sections from the menu.
  if (options.hiddenSectionIds?.length) {
    result = result.filter(
      (section) => !options.hiddenSectionIds?.includes(section.id) && !section.hidden
    );
  }

  // Filter hidden items from each section.
  if (options.hiddenItemKeys?.length) {
    result = result.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !options.hiddenItemKeys?.includes(item.key) && !item.hidden
      ),
    }));
  }

  // Append custom sections to the existing menu.
  if (options.customSections?.length) {
    result = [...result, ...options.customSections];
  }

  return result;
}

// ==================== Route Access Control ====================

export function hasAccessToRoute(
  pathname: string,
  _user: any,
  hasPermission: (res: string, act?: string) => boolean
): boolean {
  // Normalize the requested pathname.
  const cleanPath = pathname.replace(/\/$/, "");

  // Allow unauthenticated access to public routes.
  const PUBLIC_ROUTES = ["/unauthorized", "/login", "/auth/login"];

  if (PUBLIC_ROUTES.includes(cleanPath)) {
    return true;
  }

  // Find the menu item associated with the requested route.
  const findItemByPath = (searchPath: string): { item: MenuItem; parent?: MenuItem } | null => {
    for (const section of SIDEBAR_MENU) {
      for (const item of section.items) {
        if (item.path?.replace(/\/$/, "") === searchPath) {
          return { item };
        }

        // Check nested child menu items.
        if (item.children) {
          for (const child of item.children) {
            if (child.path?.replace(/\/$/, "") === searchPath) {
              return { item: child, parent: item };
            }
          }
        }
      }
    }

    return null;
  };

  const match = findItemByPath(cleanPath);

  // Validate permissions for the matched route.
  if (match) {
    const checkPermissions = (permission?: Record<string, string[]>) => {
      if (!permission) return true;

      // Grant access when any configured action is permitted.
      return Object.entries(permission).every(([res, actions]) =>
        actions.some((act) => hasPermission(res, act))
      );
    };

    return checkPermissions(match.parent?.permission) && checkPermissions(match.item.permission);
  }

  // Allow routes that are not registered in the sidebar.
  return true;
}