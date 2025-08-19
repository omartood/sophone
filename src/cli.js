#!/usr/bin/env node
import { 
  isValidSomaliMobile, 
  normalizeE164, 
  formatLocal, 
  getOperator,
  formatInternational,
  getOperatorInfo,
  getAllOperators,
  getWallet,
  getWalletInfo,
  getAllWallets,
  validateBatch,
  SomaliPhoneError,
  _getValidationError 
} from "./index.js";
import fs from 'fs';

const [, , cmd, arg] = process.argv;

function help() {
  console.log(`
sophone - Somali phone number validation and wallet detection

Usage:
  sophone validate <number>           Validate a phone number
  sophone format <number>             Format to local (0XXX XXX XXX)
  sophone e164 <number>               Format to E.164 (+252XXXXXXXXX)
  sophone international <number>      Format to international (+252 XX XXX XXXX)
  sophone operator <number>           Get operator name
  sophone wallet <number>             Get mobile wallet name
  sophone info <number>               Get detailed operator and wallet information
  sophone walletinfo <number>         Get detailed wallet information
  sophone operators                   List all operators
  sophone wallets                     List all mobile wallets
  sophone batch <file>                Process numbers from file (one per line)
  sophone help                        Show this help

Examples:
  sophone validate "+252 61 123 4567"
  sophone format "0611234567"
  sophone e164 "0611234567"
  sophone international "0611234567"
  sophone operator "+252771234567"
  sophone wallet "0611234567"
  sophone info "0611234567"
  sophone walletinfo "0611234567"
  sophone operators
  sophone wallets
  sophone batch numbers.txt
`.trim());
}

if (!cmd || cmd === "help") {
  help(); process.exit(0);
}

if (!arg && !["operators", "wallets"].includes(cmd)) {
  console.error("Error: missing argument."); help(); process.exit(1);
}

try {
  switch (cmd) {
    case "validate":
      const isValid = isValidSomaliMobile(arg);
      console.log(isValid ? "✓ valid" : "✗ invalid");
      if (!isValid) {
        // Show why it's invalid without throwing
        const error = _getValidationError(arg);
        if (error) {
          console.error(`  ${error.message}`);
        }
        process.exit(1);
      }
      break;
    case "format":
      console.log(formatLocal(arg));
      break;
    case "e164":
      console.log(normalizeE164(arg));
      break;
    case "international":
      console.log(formatInternational(arg));
      break;
    case "operator":
      console.log(getOperator(arg));
      break;
    case "wallet":
      const wallet = getWallet(arg);
      console.log(wallet || "No primary wallet available");
      break;
    case "info":
      const info = getOperatorInfo(arg);
      if (info) {
        console.log(`Operator: ${info.name}`);
        console.log(`Prefixes: ${info.prefixes.join(', ')}`);
        console.log(`Type: ${info.type}`);
        if (info.website) {
          console.log(`Website: ${info.website}`);
        }
        if (info.wallet) {
          console.log(`Primary Wallet: ${info.wallet}`);
        }
      } else {
        console.log("No operator information available");
      }
      break;
    case "walletinfo":
      const walletInfo = getWalletInfo(arg);
      if (walletInfo) {
        console.log(`Wallet: ${walletInfo.name}`);
        console.log(`Full Name: ${walletInfo.fullName}`);
        console.log(`Operator: ${walletInfo.operator}`);
        console.log(`Description: ${walletInfo.description}`);
        console.log(`Features: ${walletInfo.features.join(', ')}`);
        if (walletInfo.ussd) {
          console.log(`USSD Code: ${walletInfo.ussd}`);
        }
        if (walletInfo.website) {
          console.log(`Website: ${walletInfo.website}`);
        }
      } else {
        console.log("No wallet information available");
      }
      break;
    case "operators":
      const operators = getAllOperators();
      console.log("Available Operators:");
      operators.forEach(op => {
        console.log(`  ${op.name} (${op.prefixes.join(', ')})`);
        if (op.website) {
          console.log(`    Website: ${op.website}`);
        }
        if (op.wallet) {
          console.log(`    Primary Wallet: ${op.wallet}`);
        }
      });
      break;
    case "wallets":
      const wallets = getAllWallets();
      console.log("Available Mobile Wallets:");
      wallets.forEach(wallet => {
        console.log(`  ${wallet.name} (${wallet.operator})`);
        if (wallet.ussd) {
          console.log(`    USSD: ${wallet.ussd}`);
        }
        if (wallet.website) {
          console.log(`    Website: ${wallet.website}`);
        }
        console.log(`    Features: ${wallet.features.join(', ')}`);
      });
      break;
    case "batch":
      if (!fs.existsSync(arg)) {
        console.error(`✗ File not found: ${arg}`);
        process.exit(1);
      }
      const content = fs.readFileSync(arg, 'utf8');
      const numbers = content.split('\n').filter(line => line.trim());
      const results = validateBatch(numbers);
      
      console.log(`Processing ${numbers.length} numbers from ${arg}:\n`);
      results.forEach(result => {
        if (result.ok) {
          const operator = result.value.operator || 'unknown';
          const wallet = result.value.wallet ? ` | ${result.value.wallet}` : '';
          console.log(`✓ ${result.input} → ${result.value.e164} (${operator}${wallet})`);
        } else {
          console.log(`✗ ${result.input} → ${result.error.message}`);
        }
      });
      
      const valid = results.filter(r => r.ok).length;
      const invalid = results.length - valid;
      console.log(`\nSummary: ${valid} valid, ${invalid} invalid`);
      break;
    default:
      console.error(`✗ Unknown command '${cmd}'`);
      console.error("");
      help();
      process.exit(1);
  }
} catch (e) {
  if (e instanceof SomaliPhoneError) {
    console.error(`✗ ${e.message}`);
    process.exit(1);
  } else {
    // Unexpected error
    console.error(`✗ Unexpected error: ${e.message}`);
    process.exit(1);
  }
}
