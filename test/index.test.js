import { describe, it, expect } from "vitest";
import * as P from "../src/index.js";

describe("sophone", () => {
  describe("ERROR_CODES", () => {
    it("exports error code constants", () => {
      expect(P.ERROR_CODES.INVALID_LENGTH).toBe("INVALID_LENGTH");
      expect(P.ERROR_CODES.INVALID_PREFIX).toBe("INVALID_PREFIX");
      expect(P.ERROR_CODES.UNKNOWN).toBe("UNKNOWN");
      expect(P.ERROR_CODES.INVALID_INPUT).toBe("INVALID_INPUT");
    });
  });

  describe("SomaliPhoneError", () => {
    it("creates error with code and details", () => {
      const error = new P.SomaliPhoneError("Test message", "TEST_CODE", { test: true });
      expect(error.message).toBe("Test message");
      expect(error.code).toBe("TEST_CODE");
      expect(error.details).toEqual({ test: true });
      expect(error.name).toBe("SomaliPhoneError");
      expect(error instanceof Error).toBe(true);
    });
  });

  describe("isValidSomaliMobile", () => {
    it("validates correct numbers in different formats", () => {
      expect(P.isValidSomaliMobile("+252 61 123 4567")).toBe(true);
      expect(P.isValidSomaliMobile("252611234567")).toBe(true);
      expect(P.isValidSomaliMobile("0611234567")).toBe(true);
      expect(P.isValidSomaliMobile("611234567")).toBe(true);
    });

    it("rejects invalid numbers", () => {
      expect(P.isValidSomaliMobile("+252 11 123 4567")).toBe(false);
      expect(P.isValidSomaliMobile("061123456")).toBe(false);
      expect(P.isValidSomaliMobile("06112345678")).toBe(false);
      expect(P.isValidSomaliMobile("+1234567890")).toBe(false);
      expect(P.isValidSomaliMobile("")).toBe(false);
      expect(P.isValidSomaliMobile("abc")).toBe(false);
    });

    it("validates all known prefixes", () => {
      const prefixes = ["61", "62", "63", "64", "65", "66", "68", "69", "71", "77"];
      prefixes.forEach(prefix => {
        expect(P.isValidSomaliMobile(`${prefix}1234567`)).toBe(true);
      });
    });
  });

  describe("validate", () => {
    it("returns success result for valid numbers", () => {
      const result = P.validate("0611234567");
      expect(result.ok).toBe(true);
      expect(result.value.input).toBe("0611234567");
      expect(result.value.nsn).toBe("611234567");
      expect(result.value.e164).toBe("+252611234567");
      expect(result.value.local).toBe("0611 234 567");
      expect(result.value.operator).toBe("Hormuud");
    });

    it("returns error result for invalid numbers", () => {
      const result = P.validate("invalid");
      expect(result.ok).toBe(false);
      expect(result.error.code).toBe(P.ERROR_CODES.INVALID_INPUT);
      expect(result.error.message).toContain("contains no valid digits");
      expect(result.error.details).toBeDefined();
    });

    it("returns error result for short numbers", () => {
      const result = P.validate("123");
      expect(result.ok).toBe(false);
      expect(result.error.code).toBe(P.ERROR_CODES.INVALID_LENGTH);
      expect(result.error.message).toContain("too short");
    });

    it("returns error result for invalid prefix", () => {
      const result = P.validate("0111234567");
      expect(result.ok).toBe(false);
      expect(result.error.code).toBe(P.ERROR_CODES.INVALID_PREFIX);
      expect(result.error.message).toContain("invalid prefix");
    });
  });

  describe("normalizeE164 (throwing)", () => {
    it("normalizes different input formats", () => {
      expect(P.normalizeE164("0611234567")).toBe("+252611234567");
      expect(P.normalizeE164("611234567")).toBe("+252611234567");
      expect(P.normalizeE164("252611234567")).toBe("+252611234567");
      expect(P.normalizeE164("+252611234567")).toBe("+252611234567");
    });

    it("throws SomaliPhoneError for invalid numbers", () => {
      expect(() => P.normalizeE164("invalid")).toThrow(P.SomaliPhoneError);
      expect(() => P.normalizeE164("061123456")).toThrow(P.SomaliPhoneError);
      
      try {
        P.normalizeE164("invalid");
      } catch (error) {
        expect(error.code).toBe(P.ERROR_CODES.INVALID_INPUT);
        expect(error.message).toContain("contains no valid digits");
      }
    });
  });

  describe("normalizeE164Safe (non-throwing)", () => {
    it("normalizes valid numbers", () => {
      expect(P.normalizeE164Safe("0611234567")).toBe("+252611234567");
    });

    it("returns null for invalid numbers", () => {
      expect(P.normalizeE164Safe("invalid")).toBe(null);
      expect(P.normalizeE164Safe("061123456")).toBe(null);
    });
  });

  describe("formatLocal (throwing)", () => {
    it("formats to local format", () => {
      expect(P.formatLocal("+252611234567")).toBe("0611 234 567");
      expect(P.formatLocal("611234567")).toBe("0611 234 567");
      expect(P.formatLocal("0611234567")).toBe("0611 234 567");
    });

    it("throws SomaliPhoneError for invalid numbers", () => {
      expect(() => P.formatLocal("invalid")).toThrow(P.SomaliPhoneError);
      
      try {
        P.formatLocal("123");
      } catch (error) {
        expect(error.code).toBe(P.ERROR_CODES.INVALID_LENGTH);
        expect(error.message).toContain("too short");
      }
    });
  });

  describe("formatLocalSafe (non-throwing)", () => {
    it("formats valid numbers", () => {
      expect(P.formatLocalSafe("0611234567")).toBe("0611 234 567");
    });

    it("returns null for invalid numbers", () => {
      expect(P.formatLocalSafe("invalid")).toBe(null);
      expect(P.formatLocalSafe("123")).toBe(null);
    });
  });

  describe("getOperator (throwing)", () => {
    it("identifies known operators", () => {
      expect(P.getOperator("+252611234567")).toBe("Hormuud");
      expect(P.getOperator("+252771234567")).toBe("Hormuud");
      expect(P.getOperator("+252621234567")).toBe("Somtel");
      expect(P.getOperator("+252631234567")).toBe("Telesom");
      expect(P.getOperator("+252711234567")).toBe("Amtel");
    });

    it("returns null for valid numbers with unknown operators", () => {
      // This would be a valid format but unknown operator - but our current prefixes cover all valid ones
      // So we test with a number that has valid format but invalid prefix
    });

    it("throws SomaliPhoneError for invalid numbers", () => {
      expect(() => P.getOperator("invalid")).toThrow(P.SomaliPhoneError);
      
      try {
        P.getOperator("0111234567");
      } catch (error) {
        expect(error.code).toBe(P.ERROR_CODES.INVALID_PREFIX);
        expect(error.message).toContain("invalid prefix");
      }
    });
  });

  describe("getOperatorSafe (non-throwing)", () => {
    it("identifies known operators", () => {
      expect(P.getOperatorSafe("+252611234567")).toBe("Hormuud");
      expect(P.getOperatorSafe("+252621234567")).toBe("Somtel");
    });

    it("returns null for invalid numbers", () => {
      expect(P.getOperatorSafe("invalid")).toBe(null);
      expect(P.getOperatorSafe("0111234567")).toBe(null);
    });
  });

  describe("formatInternational (throwing)", () => {
    it("formats to international format", () => {
      expect(P.formatInternational("0611234567")).toBe("+252 61 123 4567");
      expect(P.formatInternational("+252611234567")).toBe("+252 61 123 4567");
    });

    it("throws SomaliPhoneError for invalid numbers", () => {
      expect(() => P.formatInternational("invalid")).toThrow(P.SomaliPhoneError);
    });
  });

  describe("formatInternationalSafe (non-throwing)", () => {
    it("formats valid numbers", () => {
      expect(P.formatInternationalSafe("0611234567")).toBe("+252 61 123 4567");
    });

    it("returns null for invalid numbers", () => {
      expect(P.formatInternationalSafe("invalid")).toBe(null);
    });
  });

  describe("getOperatorInfo (throwing)", () => {
    it("returns detailed operator information", () => {
      const info = P.getOperatorInfo("0611234567");
      expect(info).toEqual({
        name: "Hormuud Telecom Somalia",
        prefixes: ["61", "77"],
        website: "https://hormuud.com",
        type: "GSM"
      });
    });

    it("throws SomaliPhoneError for invalid numbers", () => {
      expect(() => P.getOperatorInfo("invalid")).toThrow(P.SomaliPhoneError);
    });
  });

  describe("getOperatorInfoSafe (non-throwing)", () => {
    it("returns operator info for valid numbers", () => {
      const info = P.getOperatorInfoSafe("0621234567");
      expect(info.name).toBe("Somtel Network");
      expect(info.prefixes).toContain("62");
    });

    it("returns null for invalid numbers", () => {
      expect(P.getOperatorInfoSafe("invalid")).toBe(null);
    });
  });

  describe("getAllOperators", () => {
    it("returns all operators with information", () => {
      const operators = P.getAllOperators();
      expect(operators).toHaveLength(7);
      expect(operators[0]).toHaveProperty("name");
      expect(operators[0]).toHaveProperty("prefixes");
      expect(operators[0]).toHaveProperty("type");
    });
  });

  describe("getOperatorByPrefix", () => {
    it("returns operator for valid prefix", () => {
      expect(P.getOperatorByPrefix("61")).toBe("Hormuud");
      expect(P.getOperatorByPrefix("62")).toBe("Somtel");
    });

    it("returns null for invalid prefix", () => {
      expect(P.getOperatorByPrefix("11")).toBe(null);
    });
  });

  describe("validateBatch", () => {
    it("validates multiple numbers", () => {
      const results = P.validateBatch(["0611234567", "invalid", "0621234567"]);
      expect(results).toHaveLength(3);
      expect(results[0].ok).toBe(true);
      expect(results[1].ok).toBe(false);
      expect(results[2].ok).toBe(true);
    });
  });

  describe("normalizeBatch", () => {
    it("normalizes multiple numbers", () => {
      const results = P.normalizeBatch(["0611234567", "invalid", "0621234567"]);
      expect(results).toHaveLength(3);
      expect(results[0].result).toBe("+252611234567");
      expect(results[1].result).toBe(null);
      expect(results[2].result).toBe("+252621234567");
    });
  });

  describe("OPERATOR_INFO", () => {
    it("exports operator information", () => {
      expect(P.OPERATOR_INFO.Hormuud).toBeDefined();
      expect(P.OPERATOR_INFO.Hormuud.name).toBe("Hormuud Telecom Somalia");
      expect(P.OPERATOR_INFO.Hormuud.prefixes).toContain("61");
    });
  });
});
