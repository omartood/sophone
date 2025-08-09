# sophone

Somalia (+252) phone validator, formatter, and operator guesser. Library + CLI.

## Installation

```bash
npm install sophone
```

## Library Usage

```javascript
import {
  isValidSomaliMobile,
  normalizeE164,
  formatLocal,
  getOperator,
  validate,
  SomaliPhoneError,
  ERROR_CODES
} from "sophone";

// Basic validation (never throws)
isValidSomaliMobile("+252 61 123 4567"); // true
isValidSomaliMobile("0611234567"); // true
isValidSomaliMobile("invalid"); // false

// Comprehensive validation with detailed results
const result = validate("0611234567");
if (result.ok) {
  console.log(result.value.e164);    // "+252611234567"
  console.log(result.value.local);   // "0611 234 567"
  console.log(result.value.operator); // "Hormuud"
} else {
  console.log(result.error.code);    // "INVALID_PREFIX"
  console.log(result.error.message); // Descriptive error message
}
```

### Throwing vs Safe Functions

The library provides both throwing and safe (non-throwing) versions of functions:

```javascript
// Throwing functions (throw SomaliPhoneError on invalid input)
try {
  normalizeE164("0611234567");  // "+252611234567"
  formatLocal("0611234567");    // "0611 234 567"
  getOperator("0611234567");    // "Hormuud"
} catch (error) {
  if (error instanceof SomaliPhoneError) {
    console.log(error.code);    // ERROR_CODES.INVALID_PREFIX
    console.log(error.message); // Descriptive message
  }
}

// Safe functions (return null on invalid input, never throw)
normalizeE164Safe("0611234567");  // "+252611234567"
normalizeE164Safe("invalid");     // null

formatLocalSafe("0611234567");    // "0611 234 567"
formatLocalSafe("invalid");       // null

getOperatorSafe("0611234567");    // "Hormuud"
getOperatorSafe("invalid");       // null
```

### Error Handling

The library uses a custom `SomaliPhoneError` class with structured error codes:

```javascript
try {
  normalizeE164("invalid");
} catch (error) {
  console.log(error instanceof SomaliPhoneError); // true
  console.log(error.code);    // "INVALID_INPUT"
  console.log(error.message); // "invalid" contains no valid digits
  console.log(error.details); // Additional context
}

// Available error codes
console.log(ERROR_CODES.INVALID_INPUT);  // "INVALID_INPUT"
console.log(ERROR_CODES.INVALID_LENGTH); // "INVALID_LENGTH"
console.log(ERROR_CODES.INVALID_PREFIX); // "INVALID_PREFIX"
console.log(ERROR_CODES.UNKNOWN);        // "UNKNOWN"
```

## CLI Usage

```bash
# Validate a number
sophone validate "+252 61 123 4567"  # ✓ valid

# Format to local
sophone format "0611234567"  # 0611 234 567

# Convert to E.164
sophone e164 "0611234567"  # +252611234567

# Format to international
sophone international "0611234567"  # +252 61 123 4567

# Get operator
sophone operator "+252771234567"  # Hormuud

# Get detailed operator info
sophone info "0611234567"  # Shows operator details

# List all operators
sophone operators  # Shows all available operators

# Process batch file
sophone batch numbers.txt  # Process multiple numbers

# Help
sophone help
```

## Supported Operators

- **Hormuud**: 61, 77
- **Somtel**: 62, 65, 66
- **Telesom**: 63
- **SomLink**: 64
- **SomNet**: 68
- **NationLink**: 69
- **Amtel**: 71

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

### Safe Functions (Non-throwing)
These functions return `null` instead of throwing errors:

#### `normalizeE164Safe(input: string): string | null`
Safe version of `normalizeE164`.

#### `formatLocalSafe(input: string): string | null`
Safe version of `formatLocal`.

#### `getOperatorSafe(input: string): string | null`
Safe version of `getOperator`.

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

Made with ❤️ for the Somali developer community 🇸🇴
