#!/usr/bin/env node

const {
  normalizeE164,
  formatLocal,
  isValidSomaliMobile,
  getOperator,
  normalizeE164Safe,
  formatLocalSafe,
  getOperatorSafe,
  validate,
  SomaliPhoneError,
  ERROR_CODES,
} = require("./src/index.js");

console.log("=== Comprehensive sophone API Examples ===\n");

const testNumbers = [
  "0611234567", // valid Hormuud
  "0621234567", // valid Somtel
  "invalid", // no digits
  "123", // too short
  "12345678901234", // too long
  "0111234567", // invalid prefix
  "", // empty
];

testNumbers.forEach((number) => {
  console.log(`\n📱 Testing: "${number}"`);

  // 1. Basic validation (never throws)
  const isValid = isValidSomaliMobile(number);
  console.log(`   Valid: ${isValid ? "✅" : "❌"}`);

  // 2. Comprehensive validation with details
  const result = validate(number);
  if (result.ok) {
    console.log(`   ✅ Validation Success:`);
    console.log(`      E164: ${result.value.e164}`);
    console.log(`      Local: ${result.value.local}`);
    console.log(`      Operator: ${result.value.operator || "unknown"}`);
  } else {
    console.log(`   ❌ Validation Error:`);
    console.log(`      Code: ${result.error.code}`);
    console.log(`      Message: ${result.error.message}`);
  }

  // 3. Safe functions (never throw)
  console.log(`   Safe E164: ${normalizeE164Safe(number) || "null"}`);
  console.log(`   Safe Local: ${formatLocalSafe(number) || "null"}`);
  console.log(`   Safe Operator: ${getOperatorSafe(number) || "null"}`);

  // 4. Throwing functions with error handling
  try {
    const e164 = normalizeE164(number);
    console.log(`   Throwing E164: ${e164}`);
  } catch (error) {
    if (error instanceof SomaliPhoneError) {
      console.log(`   Throwing E164 Error: [${error.code}] ${error.message}`);
    }
  }
});

console.log("\n=== Error Code Examples ===");
console.log(`INVALID_LENGTH: ${ERROR_CODES.INVALID_LENGTH}`);
console.log(`INVALID_PREFIX: ${ERROR_CODES.INVALID_PREFIX}`);
console.log(`INVALID_INPUT: ${ERROR_CODES.INVALID_INPUT}`);
console.log(`UNKNOWN: ${ERROR_CODES.UNKNOWN}`);
