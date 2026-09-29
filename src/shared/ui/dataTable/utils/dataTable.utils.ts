import type { ColumnDef } from "../types/dataTable.types";

export const calculateOffset = (
  cols: ColumnDef<any>[],
  index: number,
  direction: "left" | "right",
  sizing: Record<string, number>,
) => {
  if (direction === "left") {
    return cols
      .slice(0, index)
      .reduce((acc, col) => acc + (sizing[col.id] || col.width || 150), 0);
  } else {
    return cols
      .slice(index + 1)
      .reduce((acc, col) => acc + (sizing[col.id] || col.width || 150), 0);
  }
};

/**
 * Calculates the initial minimum width for a column based on explicit config or content measurement.
 */
export const calculateColumnMinWidth = <T,>(
  column: ColumnDef<T>,
  data: T[],
): number => {
  if (column.width !== undefined && column.width > 0) {
    return column.width;
  }
  return calculateColumnContentWidth(column, data);
};

/**
 * Dynamically calculates the optimal content-fit width for any column without hardcoded column IDs.
 * Bounded by minWidth and maxWidth, with smart heuristic checks for formatted numbers, emails, badges, and actions.
 */
export const calculateColumnContentWidth = <T,>(
  column: ColumnDef<T>,
  data: T[],
): number => {
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
  const context = canvas?.getContext("2d");

  // 1. Measure Header Label Width (including sort icon, filter button & resizer margin)
  let labelWidth = 100;
  if (column.label) {
    if (context) {
      context.font = "bold 11px Inter, system-ui, -apple-system, sans-serif";
      const measured = context.measureText(column.label).width;
      // 32px padding + 18px for sort indicator + 24px for filter button if enabled
      const filterPadding = column.isFilter ? 24 : 0;
      labelWidth = Math.ceil(measured + 44 + filterPadding);
    } else {
      labelWidth = Math.ceil(column.label.length * 8 + 48);
    }
  }

  // 2. Measure Row Cell Content Widths
  let maxCellWidth = 0;
  if (Array.isArray(data) && data.length > 0) {
    const sampleRows = data.slice(0, 60);

    sampleRows.forEach((row: any) => {
      let textVal = "";
      if ("key" in column && column.key && row[column.key] !== undefined && row[column.key] !== null) {
        textVal = String(row[column.key]);
      }

      let cellW = 0;
      if (textVal) {
        if (context) {
          context.font = "500 13px Inter, system-ui, -apple-system, sans-serif";
          // 32px cell padding (px-4 = 16px each side) + 16px safety margin for badges/avatars
          cellW = context.measureText(textVal).width + 48;
        } else {
          cellW = textVal.length * 8.5 + 48;
        }
      } else if (column.render) {
        // Special defaults for common action/display render columns
        if (column.id === "actions" || column.id === "action") {
          cellW = 110;
        } else if (column.id === "select" || column.id === "selection") {
          cellW = 48;
        } else {
          cellW = column.minWidth ?? 120;
        }
      }

      if (cellW > maxCellWidth) {
        maxCellWidth = cellW;
      }
    });
  }

  // 3. Compute final optimal width
  let calculated = Math.ceil(Math.max(labelWidth, maxCellWidth));

  // Determine standard minimum bounds based on column purpose
  let baseMin = column.minWidth ?? 90;
  if (column.id === "select" || column.id === "selection") {
    baseMin = 48;
  } else if (column.id === "actions" || column.id === "action") {
    baseMin = 100;
  }

  calculated = Math.max(baseMin, calculated);

  if (column.maxWidth) {
    calculated = Math.min(calculated, column.maxWidth);
  }

  return calculated;
};
