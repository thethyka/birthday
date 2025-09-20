/**
 * Configuration utilities for the birthday website
 */

/**
 * Get the birthday person's name from environment variable or default
 * @returns The name of the birthday person
 */
export function getBirthdayPersonName(): string {
  return process.env.NEXT_PUBLIC_BIRTHDAY_NAME || "Sashah";
}

/**
 * Get the possessive form of the birthday person's name
 * @returns The possessive form (e.g., "John's" or "Chris's")
 */
export function getBirthdayPersonPossessive(): string {
  const name = getBirthdayPersonName();
  return name.endsWith('s') ? `${name}'` : `${name}'s`;
}