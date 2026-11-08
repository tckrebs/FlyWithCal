// combines array of class names
export function cx(classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}