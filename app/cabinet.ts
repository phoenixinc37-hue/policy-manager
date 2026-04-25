export const cabinetIcon = {
  width: 46,
  height: 46,
  borderRadius: 12,
  background: "linear-gradient(180deg, #2e7d32 0%, #1f5d24 100%)",
  padding: 8,
  boxSizing: "border-box" as const,
  display: "grid",
  gap: 4,
};

export const drawerRow = {
  background: "#9ae6a0",
  borderRadius: 4,
  position: "relative" as const,
};

export const drawerHandle = {
  position: "absolute" as const,
  right: 5,
  top: "50%",
  width: 7,
  height: 2,
  marginTop: -1,
  borderRadius: 2,
  background: "#1f5d24",
};
