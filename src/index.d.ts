// Error codes constants
export const ERROR_CODES: {
  INVALID_LENGTH: 'INVALID_LENGTH';
  INVALID_PREFIX: 'INVALID_PREFIX';
  UNKNOWN: 'UNKNOWN';
  INVALID_INPUT: 'INVALID_INPUT';
};

// Custom error class
export class SomaliPhoneError extends Error {
  code: string;
  details: any;
  constructor(message: string, code: string, details?: any);
}

// Operator information interface
export interface OperatorInfo {
  name: string;
  prefixes: string[];
  website: string | null;
  type: string;
}

export const OPERATOR_INFO: Record<string, OperatorInfo>;

// Validation result types
export interface ValidationSuccess {
  ok: true;
  value: {
    input: string;
    nsn: string;
    e164: string;
    local: string;
    operator: string | null;
    operatorInfo: OperatorInfo | null;
  };
}

export interface ValidationError {
  ok: false;
  error: {
    code: string;
    message: string;
    details: any;
  };
}

export type ValidationResult = ValidationSuccess | ValidationError;

// Batch processing types
export interface BatchValidationResult {
  input: string;
  ok: boolean;
  value?: ValidationSuccess['value'];
  error?: ValidationError['error'];
}

export interface BatchNormalizationResult {
  input: string;
  result: string | null;
}

/**
 * Converts input to National Significant Number (NSN) format
 */
export function toNSN(input: string): string;

/**
 * Validates if the input is a valid Somali mobile number
 */
export function isValidSomaliMobile(input: string): boolean;

/**
 * Validates a Somali mobile number and returns detailed result
 */
export function validate(input: string): ValidationResult;

/**
 * Normalizes a Somali mobile number to E.164 format (+252XXXXXXXXX)
 * @throws {SomaliPhoneError} If the number is invalid
 */
export function normalizeE164(input: string): string;

/**
 * Formats a Somali mobile number to local format (0XXX XXX XXX)
 * @throws {SomaliPhoneError} If the number is invalid
 */
export function formatLocal(input: string): string;

/**
 * Gets the mobile operator for a Somali mobile number
 * @throws {SomaliPhoneError} If the number is invalid
 */
export function getOperator(input: string): string | null;

/**
 * Safe version of normalizeE164 that returns null instead of throwing
 */
export function normalizeE164Safe(input: string): string | null;

/**
 * Safe version of formatLocal that returns null instead of throwing
 */
export function formatLocalSafe(input: string): string | null;

/**
 * Safe version of getOperator that returns null instead of throwing
 */
export function getOperatorSafe(input: string): string | null;

/**
 * Formats a Somali mobile number to international format (+252 XX XXX XXXX)
 * @throws {SomaliPhoneError} If the number is invalid
 */
export function formatInternational(input: string): string;

/**
 * Safe version of formatInternational that returns null instead of throwing
 */
export function formatInternationalSafe(input: string): string | null;

/**
 * Gets detailed operator information for a Somali mobile number
 * @throws {SomaliPhoneError} If the number is invalid
 */
export function getOperatorInfo(input: string): OperatorInfo | null;

/**
 * Safe version of getOperatorInfo that returns null instead of throwing
 */
export function getOperatorInfoSafe(input: string): OperatorInfo | null;

/**
 * Gets all available operators with their information
 */
export function getAllOperators(): (OperatorInfo & { name: string })[];

/**
 * Gets operator name by prefix
 */
export function getOperatorByPrefix(prefix: string): string | null;

/**
 * Validates multiple phone numbers at once
 */
export function validateBatch(numbers: string[]): BatchValidationResult[];

/**
 * Normalizes multiple phone numbers at once
 */
export function normalizeBatch(numbers: string[]): BatchNormalizationResult[];