// Error codes constants
const ERROR_CODES = {
  INVALID_LENGTH: "INVALID_LENGTH",
  INVALID_PREFIX: "INVALID_PREFIX",
  UNKNOWN: "UNKNOWN",
  INVALID_INPUT: "INVALID_INPUT",
};

// Custom error class
class SomaliPhoneError extends Error {
  constructor(message, code, details = null) {
    super(message);
    this.name = "SomaliPhoneError";
    this.code = code;
    this.details = details;
  }
}

const MOBILE_PREFIXES = new Set([
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "68",
  "69",
  "71",
  "77",
  "90",
]);
const OPERATOR_BY_PREFIX = {
  61: "Hormuud",
  77: "Hormuud",
  62: "Somtel",
  65: "Somtel",
  66: "Somtel",
  63: "Telesom",
  64: "SomLink",
  68: "SomNet",
  69: "NationLink",
  71: "Amtel",
  90: "Golis",
};

// Additional metadata
const OPERATOR_INFO = {
  Hormuud: {
    name: "Hormuud Telecom Somalia",
    prefixes: ["61", "77"],
    website: "https://hormuud.com",
    type: "GSM",
  },
  Somtel: {
    name: "Somtel Network",
    prefixes: ["62", "65", "66"],
    website: "https://somtel.com",
    type: "GSM",
  },
  Telesom: {
    name: "Telesom",
    prefixes: ["63"],
    website: "https://telesom.net",
    type: "GSM",
  },
  SomLink: {
    name: "SomLink",
    prefixes: ["64"],
    website: null,
    type: "GSM",
  },
  SomNet: {
    name: "SomNet",
    prefixes: ["68"],
    website: null,
    type: "GSM",
  },
  NationLink: {
    name: "NationLink Telecom",
    prefixes: ["69"],
    website: null,
    type: "GSM",
  },
  Amtel: {
    name: "Amtel",
    prefixes: ["71"],
    website: null,
    type: "GSM",
  },
  Golis: {
    name: "Golis Telecom",
    prefixes: ["90"],
    website: "https://golistelecom.com",
    type: "GSM",
  },
};

function _digits(s) {
  if (typeof s !== "string") return "";
  return s.replace(/[^\d+]/g, "");
}

function toNSN(input) {
  let s = _digits(input);
  if (s.startsWith("+")) s = s.slice(1);
  if (s.startsWith("00252")) s = s.slice(5);
  else if (s.startsWith("252")) s = s.slice(3);
  if (s.startsWith("0")) s = s.slice(1);
  return s;
}

function isValidSomaliMobile(input) {
  if (!input || typeof input !== "string") return false;
  const nsn = toNSN(input);
  if (!/^\d{9}$/.test(nsn)) return false;
  return MOBILE_PREFIXES.has(nsn.slice(0, 2));
}

function _getValidationError(input) {
  if (!input || typeof input !== "string") {
    return {
      code: ERROR_CODES.INVALID_INPUT,
      message: "Phone number is required and must be a string",
      details: { input, type: typeof input },
    };
  }

  const nsn = toNSN(input);

  if (!nsn || nsn.length === 0) {
    return {
      code: ERROR_CODES.INVALID_INPUT,
      message: `"${input}" contains no valid digits`,
      details: { input, nsn },
    };
  }

  if (nsn.length < 9) {
    return {
      code: ERROR_CODES.INVALID_LENGTH,
      message: `"${input}" is too short (${nsn.length} digits). Somali mobile numbers need 9 digits`,
      details: { input, nsn, actualLength: nsn.length, expectedLength: 9 },
    };
  }

  if (nsn.length > 9) {
    return {
      code: ERROR_CODES.INVALID_LENGTH,
      message: `"${input}" is too long (${nsn.length} digits). Somali mobile numbers need exactly 9 digits`,
      details: { input, nsn, actualLength: nsn.length, expectedLength: 9 },
    };
  }

  const prefix = nsn.slice(0, 2);
  if (!MOBILE_PREFIXES.has(prefix)) {
    const validPrefixes = Array.from(MOBILE_PREFIXES).sort();
    return {
      code: ERROR_CODES.INVALID_PREFIX,
      message: `"${input}" has invalid prefix "${prefix}". Valid prefixes are: ${validPrefixes.join(
        ", "
      )}`,
      details: { input, nsn, prefix, validPrefixes },
    };
  }

  return null;
}

// Throwing functions
function normalizeE164(input) {
  const error = _getValidationError(input);
  if (error) {
    throw new SomaliPhoneError(error.message, error.code, error.details);
  }
  return `+252${toNSN(input)}`;
}

function formatLocal(input) {
  const error = _getValidationError(input);
  if (error) {
    throw new SomaliPhoneError(error.message, error.code, error.details);
  }
  const nsn = toNSN(input);
  return `0${nsn.slice(0, 3)} ${nsn.slice(3, 6)} ${nsn.slice(6, 9)}`;
}

function getOperator(input) {
  const error = _getValidationError(input);
  if (error) {
    throw new SomaliPhoneError(error.message, error.code, error.details);
  }
  const nsn = toNSN(input);
  return OPERATOR_BY_PREFIX[nsn.slice(0, 2)] || null;
}

// Safe versions (non-throwing)
function normalizeE164Safe(input) {
  try {
    return normalizeE164(input);
  } catch (error) {
    return null;
  }
}

function formatLocalSafe(input) {
  try {
    return formatLocal(input);
  } catch (error) {
    return null;
  }
}

function getOperatorSafe(input) {
  try {
    return getOperator(input);
  } catch (error) {
    return null;
  }
}

// Validate function that returns result object
function validate(input) {
  const error = _getValidationError(input);
  if (error) {
    return {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  }

  const nsn = toNSN(input);
  const operator = OPERATOR_BY_PREFIX[nsn.slice(0, 2)] || null;

  return {
    ok: true,
    value: {
      input,
      nsn,
      e164: `+252${nsn}`,
      local: `0${nsn.slice(0, 3)} ${nsn.slice(3, 6)} ${nsn.slice(6, 9)}`,
      operator,
      operatorInfo: operator ? OPERATOR_INFO[operator] : null,
    },
  };
}

// New utility functions
function getOperatorInfo(input) {
  const error = _getValidationError(input);
  if (error) {
    throw new SomaliPhoneError(error.message, error.code, error.details);
  }
  const operator = getOperator(input);
  return operator ? OPERATOR_INFO[operator] : null;
}

function getOperatorInfoSafe(input) {
  try {
    return getOperatorInfo(input);
  } catch (error) {
    return null;
  }
}

function getAllOperators() {
  return Object.keys(OPERATOR_INFO).map((name) => ({
    name,
    ...OPERATOR_INFO[name],
  }));
}

function getOperatorByPrefix(prefix) {
  return OPERATOR_BY_PREFIX[prefix] || null;
}

function formatInternational(input) {
  const error = _getValidationError(input);
  if (error) {
    throw new SomaliPhoneError(error.message, error.code, error.details);
  }
  const nsn = toNSN(input);
  return `+252 ${nsn.slice(0, 2)} ${nsn.slice(2, 5)} ${nsn.slice(5, 9)}`;
}

function formatInternationalSafe(input) {
  try {
    return formatInternational(input);
  } catch (error) {
    return null;
  }
}

// Batch processing functions
function validateBatch(numbers) {
  return numbers.map((number) => ({
    input: number,
    ...validate(number),
  }));
}

function normalizeBatch(numbers) {
  return numbers.map((number) => ({
    input: number,
    result: normalizeE164Safe(number),
  }));
}

export {
  // Constants
  ERROR_CODES,
  SomaliPhoneError,
  OPERATOR_INFO,

  // Core functions
  toNSN,
  isValidSomaliMobile,
  validate,

  // Throwing functions
  normalizeE164,
  formatLocal,
  getOperator,
  formatInternational,
  getOperatorInfo,

  // Safe functions (non-throwing)
  normalizeE164Safe,
  formatLocalSafe,
  getOperatorSafe,
  formatInternationalSafe,
  getOperatorInfoSafe,

  // Utility functions
  getAllOperators,
  getOperatorByPrefix,

  // Batch processing
  validateBatch,
  normalizeBatch,

  // Internal (for CLI)
  _getValidationError,
};
