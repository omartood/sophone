# 🇸🇴 sophone

**Professional Somali phone number validation, formatting, operator detection & mobile wallet identification**

A comprehensive JavaScript/TypeScript library for working with Somali phone numbers. Validate, format, identify operators, and detect mobile money wallets (EVC, Sahal, ZAAD, eDahab, Jeeb) for Somalia (+252) phone numbers with beautiful error handling and TypeScript support.

[![npm version](https://badge.fury.io/js/sophone.svg)](https://www.npmjs.com/package/sophone)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/omartood/sophone/workflows/CI/badge.svg)](https://github.com/omartood/sophone/actions)

## ✨ Features

- 🔍 **Validate** Somali phone numbers in any format
- 🎨 **Format** numbers to E.164, local, or international format
- 📱 **Identify operators** (Hormuud, Somtel, Telesom, etc.)
- 💰 **Detect mobile wallets** (EVC, Sahal, ZAAD, eDahab, Jeeb)
- 🛡️ **TypeScript support** with complete type definitions
- 🚀 **CLI tool** for command-line usage
- 📦 **Batch processing** for multiple numbers
- 🎯 **Beautiful error handling** with detailed messages
- ⚡ **Zero dependencies** and lightweight

## 📦 Installation

### For Library Use

```bash
npm install sophone
```

### For CLI Use (Global)

```bash
npm install -g sophone
```

## 🚀 Quick Start

### Basic Usage

```javascript
import {
  isValidSomaliMobile,
  normalizeE164,
  formatLocal,
  getOperator,
  getWallet,
  getWalletInfo,
} from "sophone";

// Validate any Somali phone number format
isValidSomaliMobile("+252 61 123 4567"); // ✅ true
isValidSomaliMobile("0611234567"); // ✅ true
isValidSomaliMobile("611234567"); // ✅ true
isValidSomaliMobile("252611234567"); // ✅ true
isValidSomaliMobile("invalid"); // ❌ false

// Convert to international E.164 format
normalizeE164("0611234567"); // "+252611234567"

// Format for local display
formatLocal("+252611234567"); // "0611 234 567"

// Identify the mobile operator
getOperator("0611234567"); // "Hormuud"

// Identify the mobile wallet
getWallet("0611234567"); // "EVC"
getWallet("0621234567"); // "Sahal"
getWallet("0631234567"); // "ZAAD"

// Get detailed wallet information
const walletInfo = getWalletInfo("0611234567");
console.log(walletInfo.name); // "EVC Plus"
console.log(walletInfo.ussd); // "*770#"
```

## 📚 Comprehensive Usage Guide

### 1. Phone Number Validation

```javascript
import { isValidSomaliMobile, validate } from "sophone";

// Simple validation (boolean result)
const phoneNumbers = [
  "+252 61 123 4567", // Hormuud
  "0621234567", // Somtel
  "631234567", // Telesom
  "invalid-number", // Invalid
  "123", // Too short
];

phoneNumbers.forEach((number) => {
  const isValid = isValidSomaliMobile(number);
  console.log(`${number}: ${isValid ? "✅ Valid" : "❌ Invalid"}`);
});

// Detailed validation with error information
const result = validate("0611234567");
  if (result.ok) {
    console.log("✅ Valid number!");
    console.log(`📱 Original: ${result.value.input}`);
    console.log(`🌍 International: ${result.value.e164}`);
    console.log(`🏠 Local: ${result.value.local}`);
    console.log(`📡 Operator: ${result.value.operator}`);
    console.log(`💰 Wallet: ${result.value.wallet || 'None'}`);
  } else {
  console.log("❌ Invalid number!");
  console.log(`🚨 Error: ${result.error.message}`);
  console.log(`🔍 Code: ${result.error.code}`);
}
```

### 2. Number Formatting

```javascript
import {
  normalizeE164,
  formatLocal,
  formatInternational,
  // Safe versions that return null instead of throwing
  normalizeE164Safe,
  formatLocalSafe,
  formatInternationalSafe,
} from "sophone";

const phoneNumber = "0611234567";

// Different formatting options
console.log("📱 Original:", phoneNumber);
console.log("🌍 E.164:", normalizeE164(phoneNumber)); // "+252611234567"
console.log("🏠 Local:", formatLocal(phoneNumber)); // "0611 234 567"
console.log("📞 International:", formatInternational(phoneNumber)); // "+252 61 123 4567"

// Safe formatting (won't throw errors)
const invalidNumber = "invalid";
console.log("Safe E.164:", normalizeE164Safe(invalidNumber)); // null
console.log("Safe Local:", formatLocalSafe(invalidNumber)); // null
```

### 3. Operator Detection

```javascript
import { getOperator, getOperatorInfo, getAllOperators } from "sophone";

// Get operator name
console.log(getOperator("0611234567")); // "Hormuud"
console.log(getOperator("0621234567")); // "Somtel"
console.log(getOperator("0631234567")); // "Telesom"

// Get detailed operator information
const operatorInfo = getOperatorInfo("0611234567");
console.log("📡 Operator:", operatorInfo.name); // "Hormuud Telecom Somalia"
console.log("📋 Prefixes:", operatorInfo.prefixes); // ["61", "77"]
console.log("🌐 Website:", operatorInfo.website); // "https://hormuud.com"
console.log("📱 Type:", operatorInfo.type); // "GSM"
console.log("💰 Primary Wallet:", operatorInfo.wallet); // "EVC"

// List all available operators
const allOperators = getAllOperators();
allOperators.forEach((op) => {
  console.log(`📡 ${op.name} (${op.prefixes.join(", ")}) - Wallet: ${op.wallet || 'None'}`);
});
```

### 4. Mobile Wallet Detection

```javascript
import { 
  getWallet, 
  getWalletInfo, 
  getAllWallets, 
  getWalletByName,
  getWalletByOperator,
  getSupportedWallets 
} from "sophone";

// Get wallet name
console.log(getWallet("0611234567")); // "EVC"
console.log(getWallet("0621234567")); // "Sahal"
console.log(getWallet("0631234567")); // "ZAAD"

// Get detailed wallet information
const evcInfo = getWalletInfo("0611234567");
console.log("💰 Wallet:", evcInfo.name); // "EVC Plus"
console.log("📋 Full Name:", evcInfo.fullName); // "Electronic Virtual Cash Plus"
console.log("📡 Operator:", evcInfo.operator); // "Hormuud"
console.log("📞 USSD:", evcInfo.ussd); // "*770#"
console.log("🌐 Website:", evcInfo.website); // "https://evcplus.so"
console.log("⚡ Features:", evcInfo.features); // ["Send Money", "Receive Money", ...]

// Get wallet by name
const zaadWallet = getWalletByName("ZAAD");
console.log("💰 ZAAD USSD:", zaadWallet.ussd); // "*712#"

// Get wallet by operator
const hormuudWallet = getWalletByOperator("Hormuud");
console.log("💰 Hormuud Wallet:", hormuudWallet.name); // "EVC Plus"

// List all supported wallets
const supportedWallets = getSupportedWallets();
console.log("💰 Supported Wallets:", supportedWallets); // ["EVC", "Sahal", "ZAAD", "eDahab", "Jeeb"]

// Get all wallet details
const allWallets = getAllWallets();
allWallets.forEach((wallet) => {
  console.log(`💰 ${wallet.name} (${wallet.operator}) - USSD: ${wallet.ussd || 'N/A'}`);
});
```

### 5. Error Handling

```javascript
import { normalizeE164, SomaliPhoneError, ERROR_CODES } from "sophone";

// Throwing functions with proper error handling
function processPhoneNumber(input) {
  try {
    const e164 = normalizeE164(input);
    console.log(`✅ Processed: ${e164}`);
    return e164;
  } catch (error) {
    if (error instanceof SomaliPhoneError) {
      switch (error.code) {
        case ERROR_CODES.INVALID_LENGTH:
          console.log(`❌ Wrong length: ${error.message}`);
          break;
        case ERROR_CODES.INVALID_PREFIX:
          console.log(`❌ Invalid prefix: ${error.message}`);
          break;
        case ERROR_CODES.INVALID_INPUT:
          console.log(`❌ Invalid input: ${error.message}`);
          break;
        default:
          console.log(`❌ Unknown error: ${error.message}`);
      }

      // Access additional error details
      console.log("🔍 Error details:", error.details);
    }
    return null;
  }
}

// Test with different inputs
processPhoneNumber("0611234567"); // ✅ Valid
processPhoneNumber("123"); // ❌ Too short
processPhoneNumber("0111234567"); // ❌ Invalid prefix
processPhoneNumber("invalid"); // ❌ Invalid input
```

### 6. Batch Processing

```javascript
import { validateBatch, normalizeBatch } from "sophone";

const phoneNumbers = [
  "0611234567", // Valid Hormuud
  "0621234567", // Valid Somtel
  "invalid", // Invalid
  "123", // Too short
  "0771234567", // Valid Hormuud
];

// Validate multiple numbers at once
const validationResults = validateBatch(phoneNumbers);
validationResults.forEach((result) => {
  if (result.ok) {
    console.log(
      `✅ ${result.input} → ${result.value.e164} (${result.value.operator})`
    );
  } else {
    console.log(`❌ ${result.input} → ${result.error.message}`);
  }
});

// Normalize multiple numbers (safe operation)
const normalizedResults = normalizeBatch(phoneNumbers);
normalizedResults.forEach((result) => {
  console.log(`${result.input} → ${result.result || "Invalid"}`);
});
```

### 7. Real-World Examples

#### User Registration Form Validation

```javascript
import { isValidSomaliMobile, validate, formatLocal } from "sophone";

function validateUserPhone(phoneInput) {
  // Quick validation
  if (!isValidSomaliMobile(phoneInput)) {
    return {
      valid: false,
      message: "Please enter a valid Somali phone number",
    };
  }

  // Get detailed information
  const result = validate(phoneInput);
  if (result.ok) {
    return {
      valid: true,
      formatted: result.value.local,
      operator: result.value.operator,
      wallet: result.value.wallet,
      e164: result.value.e164,
    };
  }

  return { valid: false, message: result.error.message };
}

// Usage in form validation
const userInput = "0611234567";
const validation = validateUserPhone(userInput);

if (validation.valid) {
  console.log(`✅ Phone: ${validation.formatted}`);
  console.log(`📡 Operator: ${validation.operator}`);
  console.log(`💰 Wallet: ${validation.wallet || 'No primary wallet'}`);
  // Store validation.e164 in database
} else {
  console.log(`❌ Error: ${validation.message}`);
}
```

#### Contact List Formatter

```javascript
import { formatLocal, getOperator, getWallet, isValidSomaliMobile } from "sophone";

const contacts = [
  { name: "Ahmed", phone: "+252611234567" },
  { name: "Fatima", phone: "0621234567" },
  { name: "Omar", phone: "631234567" },
  { name: "Amina", phone: "invalid-phone" },
];

const formattedContacts = contacts.map((contact) => {
  if (isValidSomaliMobile(contact.phone)) {
    return {
      ...contact,
      formattedPhone: formatLocal(contact.phone),
      operator: getOperator(contact.phone),
      wallet: getWallet(contact.phone),
      valid: true,
    };
  } else {
    return {
      ...contact,
      formattedPhone: contact.phone,
      operator: null,
      wallet: null,
      valid: false,
    };
  }
});

console.log("📞 Contact List:");
formattedContacts.forEach((contact) => {
  const status = contact.valid ? "✅" : "❌";
  const operator = contact.operator ? `(${contact.operator})` : "";
  const wallet = contact.wallet ? ` | ${contact.wallet}` : "";
  console.log(
    `${status} ${contact.name}: ${contact.formattedPhone} ${operator}${wallet}`
  );
});
```

### Throwing vs Safe Functions

The library provides both throwing and safe (non-throwing) versions of functions:

```javascript
// Throwing functions (throw SomaliPhoneError on invalid input)
try {
  normalizeE164("0611234567"); // "+252611234567"
  formatLocal("0611234567"); // "0611 234 567"
  getOperator("0611234567"); // "Hormuud"
} catch (error) {
  if (error instanceof SomaliPhoneError) {
    console.log(error.code); // ERROR_CODES.INVALID_PREFIX
    console.log(error.message); // Descriptive message
  }
}

// Safe functions (return null on invalid input, never throw)
normalizeE164Safe("0611234567"); // "+252611234567"
normalizeE164Safe("invalid"); // null

formatLocalSafe("0611234567"); // "0611 234 567"
formatLocalSafe("invalid"); // null

getOperatorSafe("0611234567"); // "Hormuud"
getOperatorSafe("invalid"); // null
```

### Error Handling

The library uses a custom `SomaliPhoneError` class with structured error codes:

```javascript
try {
  normalizeE164("invalid");
} catch (error) {
  console.log(error instanceof SomaliPhoneError); // true
  console.log(error.code); // "INVALID_INPUT"
  console.log(error.message); // "invalid" contains no valid digits
  console.log(error.details); // Additional context
}

// Available error codes
console.log(ERROR_CODES.INVALID_INPUT); // "INVALID_INPUT"
console.log(ERROR_CODES.INVALID_LENGTH); // "INVALID_LENGTH"
console.log(ERROR_CODES.INVALID_PREFIX); // "INVALID_PREFIX"
console.log(ERROR_CODES.UNKNOWN); // "UNKNOWN"
```

## 🖥️ CLI Usage

The CLI tool provides a convenient way to work with Somali phone numbers from the command line.

### Installation

```bash
npm install -g sophone
```

### Commands

```bash
# Validate a phone number
sophone validate "+252 61 123 4567"
# Output: ✓ valid

sophone validate "invalid-number"
# Output: ✗ invalid
#         "invalid-number" contains no valid digits

# Format to different formats
sophone format "0611234567"        # 0611 234 567
sophone e164 "0611234567"          # +252611234567
sophone international "0611234567" # +252 61 123 4567

# Get operator and wallet information
sophone operator "0611234567"      # Hormuud
sophone wallet "0611234567"        # EVC
sophone info "0611234567"
# Output: Operator: Hormuud Telecom Somalia
#         Prefixes: 61, 77
#         Type: GSM
#         Website: https://hormuud.com
#         Primary Wallet: EVC

sophone walletinfo "0611234567"
# Output: Wallet: EVC Plus
#         Full Name: Electronic Virtual Cash Plus
#         Operator: Hormuud
#         Description: Hormuud's flagship mobile money service
#         Features: Send Money, Receive Money, Pay Bills, Buy Airtime, Merchant Payments
#         USSD Code: *770#
#         Website: https://evcplus.so

# List all operators and wallets
sophone operators
# Output: Available Operators:
#         Hormuud Telecom Somalia (61, 77)
#           Website: https://hormuud.com
#           Primary Wallet: EVC
#         Somtel Network (62, 65, 66)
#           Website: https://somtel.com
#           Primary Wallet: Sahal
#         ...

sophone wallets
# Output: Available Mobile Wallets:
#         EVC Plus (Hormuud)
#           USSD: *770#
#           Website: https://evcplus.so
#           Features: Send Money, Receive Money, Pay Bills, Buy Airtime, Merchant Payments
#         Sahal (Somtel)
#           USSD: *828#
#           Website: https://somtel.com/sahal
#           Features: Money Transfer, Bill Payment, Airtime Purchase, Merchant Services
#         ...

# Process multiple numbers from a file
echo -e "0611234567\n0621234567\ninvalid\n123" > numbers.txt
sophone batch numbers.txt
# Output: Processing 4 numbers from numbers.txt:
#         ✓ 0611234567 → +252611234567 (Hormuud | EVC)
#         ✓ 0621234567 → +252621234567 (Somtel | Sahal)
#         ✗ invalid → "invalid" contains no valid digits
#         ✗ 123 → "123" is too short (3 digits)
#         Summary: 2 valid, 2 invalid

# Get help
sophone help
```

### CLI Examples in Scripts

```bash
#!/bin/bash
# Validate and format phone numbers in a script

phone="0611234567"

if sophone validate "$phone" > /dev/null 2>&1; then
    echo "Phone number is valid!"
    formatted=$(sophone format "$phone")
    operator=$(sophone operator "$phone")
    echo "Formatted: $formatted"
    echo "Operator: $operator"
else
    echo "Invalid phone number: $phone"
fi
```

## Supported Operators & Mobile Wallets

| Operator | Prefixes | Primary Wallet | USSD Code |
|----------|----------|----------------|-----------|
| **Hormuud Telecom** | 61, 77 | EVC Plus | *770# |
| **Somtel Network** | 62, 65, 66 | Sahal | *828# |
| **Telesom** | 63 | ZAAD | *712# |
| **SomLink** | 64 | - | - |
| **SomNet** | 68 | - | - |
| **NationLink** | 69 | - | - |
| **Amtel** | 71 | - | - |

### Additional Mobile Wallets

- **eDahab**: Multi-operator service (*444#) - International remittance
- **Jeeb**: Multi-operator digital wallet - E-commerce focused

## API

### Core Functions

#### `isValidSomaliMobile(input: string): boolean`

Validates if the input is a valid Somali mobile number. Never throws errors.

#### `validate(input: string): ValidationResult`

Comprehensive validation that returns `{ ok: true, value: {...} }` for valid numbers or `{ ok: false, error: {...} }` for invalid ones.

### Throwing Functions

These functions throw `SomaliPhoneError` for invalid input:

#### `normalizeE164(input: string): string`

Normalizes a Somali mobile number to E.164 format (+252XXXXXXXXX).

#### `formatLocal(input: string): string`

Formats a Somali mobile number to local format (0XXX XXX XXX).

#### `getOperator(input: string): string | null`

Gets the mobile operator for a Somali mobile number.

#### `getWallet(input: string): string | null`

Gets the primary mobile wallet for a Somali mobile number based on the operator.

#### `getWalletInfo(input: string): WalletInfo | null`

Gets detailed wallet information including name, USSD code, features, and website.

### Safe Functions (Non-throwing)

These functions return `null` instead of throwing errors:

#### `normalizeE164Safe(input: string): string | null`

Safe version of `normalizeE164`.

#### `formatLocalSafe(input: string): string | null`

Safe version of `formatLocal`.

#### `getOperatorSafe(input: string): string | null`

Safe version of `getOperator`.

#### `getWalletSafe(input: string): string | null`

Safe version of `getWallet`.

#### `getWalletInfoSafe(input: string): WalletInfo | null`

Safe version of `getWalletInfo`.

### Utility Functions

#### `getAllWallets(): Array<WalletInfo>`

Returns an array of all supported mobile wallets with detailed information.

#### `getWalletByName(walletName: string): WalletInfo | null`

Gets wallet information by wallet name (e.g., "EVC", "Sahal").

#### `getWalletByOperator(operatorName: string): WalletInfo | null`

Gets wallet information by operator name (e.g., "Hormuud", "Somtel").

#### `getSupportedWallets(): Array<string>`

Returns an array of supported wallet names.

### Error Handling

#### `SomaliPhoneError`

Custom error class with `code`, `message`, and `details` properties.

#### `ERROR_CODES`

Constants for error codes:

- `INVALID_INPUT`: Invalid or missing input
- `INVALID_LENGTH`: Wrong number of digits
- `INVALID_PREFIX`: Unrecognized mobile prefix
- `UNKNOWN`: General unknown error

## Links

- **GitHub Repository**: https://github.com/omartood/sophone
- **npm Package**: https://www.npmjs.com/package/sophone
- **Issues**: https://github.com/omartood/sophone/issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Clone the repository
git clone https://github.com/omartood/sophone.git
cd sophone

# Install dependencies
npm install

# Run tests
npm test

# Test CLI locally
node src/cli.js validate "0611234567"
```

## Changelog

See [CHANGELOG.md](https://github.com/omartood/sophone/blob/main/CHANGELOG.md) for details.

## License

MIT - see [LICENSE](https://github.com/omartood/sophone/blob/main/LICENSE) file for details.

---

Created by Omar Tood🇸🇴
