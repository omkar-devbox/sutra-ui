import { lazy, Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Loader2 } from "lucide-react";
import { SIDEBAR_MENU } from "../menu/menuItems";

// Lazy loading page components
const ExcelDashboard = lazy(() => import("@/features/excel/ExcelDashboard"));
const DataTableDemoPage = lazy(
  () => import("@/features/dataTableDemo/DataTableDemoPage")
);
const FormFieldDemoPage = lazy(
  () => import("@/features/formFieldDemo/FormFieldDemoPage")
);
const GenericPage = lazy(() => import("@/shared/pages/GenericPage/GenericPage"));
const UnauthorizedPage = lazy(() =>
  import("@/shared/pages/unauthorized/UnauthorizedPage")
);
const NotFoundPage = lazy(() =>
  import("@/shared/pages/notfound/NotFoundPage")
);

/**
 * Fallback loader shown while lazy loaded chunks are being fetched
 */
function PageLoader() {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
      <Loader2 size={32} className="animate-spin text-blue-600 dark:text-blue-400" />
      <span className="text-xs font-semibold tracking-wide uppercase">Loading Page Module...</span>
    </div>
  );
}

export function AppRouter() {
  // Memoized dynamic sidebar module & settings routes
  const moduleRoutes = useMemo(() => {
    return SIDEBAR_MENU.flatMap((section) =>
      section.items.flatMap((item) => {
        const routes: { path: string; title: string; subtitle: string }[] = [];

        const addRoute = (p?: string, label?: string, tooltip?: string) => {
          if (!p || p === "/") return;
          routes.push({
            path: p,
            title: label || "Module Page",
            subtitle: tooltip || `Manage ${label || "module details"}`,
          });
          // Settings sub-route
          const settingsPath = p.endsWith("/batches")
            ? `${p}/batches-form-settings`
            : `${p}/settings`;
          routes.push({
            path: settingsPath,
            title: `${label || "Module"} Settings`,
            subtitle: `Configure form fields & settings for ${label || "module"}`,
          });
        };

        addRoute(item.path, item.label, item.tooltip);

        if (item.children) {
          item.children.forEach((child) => {
            addRoute(child.path, child.label, child.tooltip);
          });
        }

        return routes;
      })
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Dashboard / DataTable Showcase */}
        <Route
          path="/"
          element={
            <MainLayout pageTitle="DataTable Showcase" pageSubtitle="Full-featured enterprise tabular data engine">
              <DataTableDemoPage />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainLayout pageTitle="DataTable Showcase" pageSubtitle="Full-featured enterprise tabular data engine">
              <DataTableDemoPage />
            </MainLayout>
          }
        />

        {/* Dedicated Route */}
        <Route
          path="/datatable-demo"
          element={
            <MainLayout pageTitle="DataTable Showcase" pageSubtitle="Full-featured enterprise tabular data engine">
              <DataTableDemoPage />
            </MainLayout>
          }
        />

        {/* Form Fields Showcase */}
        <Route
          path="/form-demo"
          element={
            <MainLayout pageTitle="Form Field & Layout Showcase" pageSubtitle="Full suite of form controls, responsive layouts & dynamic JSON schemas">
              <FormFieldDemoPage />
            </MainLayout>
          }
        />

        {/* Excel Portal */}
        <Route
          path="/excel"
          element={
            <MainLayout pageTitle="Excel Intelligence & AI Modifier" pageSubtitle="Deep openpyxl analysis & LLM automation">
              <ExcelDashboard />
            </MainLayout>
          }
        />

        {/* Dynamic Sidebar Module & Settings Routes */}
        {moduleRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <MainLayout pageTitle={route.title} pageSubtitle={route.subtitle}>
                <GenericPage />
              </MainLayout>
            }
          />
        ))}

        {/* Unauthorized Route */}
        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        {/* Fallback 404 Route */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Suspense>
  );
}

