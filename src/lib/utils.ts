import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Masks an account number by replacing the middle 4 digits with asterisks
 * @param accountNumber - The full account number to mask
 * @returns The masked account number for display
 */
export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber || accountNumber.length < 8) {
    return accountNumber; // Return as-is if too short to mask safely
  }
  
  const start = accountNumber.slice(0, 4);
  const end = accountNumber.slice(-4);
  const masked = `${start}****${end}`;
  
  return masked;
}

/**
 * Returns the original account number (used for copying to clipboard)
 * This function exists for consistency and potential future modifications
 * @param accountNumber - The account number
 * @returns The original account number
 */
export function getOriginalAccountNumber(accountNumber: string): string {
  return accountNumber;
}

/**
 * Simple hash function to create consistent numbers from strings
 * @param str - Input string to hash
 * @returns A positive integer hash
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Masks a customer ID (UUID) by converting it to a sequential customer number
 * @param customerId - The original customer ID (UUID)
 * @returns A masked customer ID in format CUST-XXX
 */
export function maskCustomerId(customerId: string): string {
  if (!customerId) {
    return customerId;
  }
  
  // Create consistent hash from UUID
  const hash = simpleHash(customerId);
  // Generate customer number between 1-999999
  const customerNumber = (hash % 999999) + 1;
  // Format as CUST-XXX with zero padding
  return `CUST-${customerNumber.toString().padStart(3, '0')}`;
}

/**
 * Returns the original customer ID (used for API calls and internal operations)
 * This function exists for consistency and potential future modifications
 * @param customerId - The customer ID
 * @returns The original customer ID
 */
export function getOriginalCustomerId(customerId: string): string {
  return customerId;
}