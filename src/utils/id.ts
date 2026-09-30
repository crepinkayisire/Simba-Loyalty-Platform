/** Short unique id for records created in the console. */
export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}