export const ViewMode = {
  List: "list",
  Grid: "grid",
} as const;

export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];
