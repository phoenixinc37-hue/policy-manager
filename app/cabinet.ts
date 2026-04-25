export const cabinetIcon = {
  width: 52,
  height: 60,
  borderRadius: 8,
  background: "linear-gradient(180deg, #3b5d7a 0%, #2a455d 100%)",
  border: "1px solid #22394d",
  padding: 5,
  boxSizing: "border-box" as const,
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gap: 4,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
};

export const drawerRow = {
  borderRadius: 4,
  border: "1px solid #3e556b",
  background: "linear-gradient(180deg, #6f8aa6 0%, #4f6b86 100%)",
  position: "relative" as const,
};

export const drawerHandle = {
  position: "absolute" as const,
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 12,
  height: 4,
  borderRadius: 999,
  background: "#2a455d",
};
