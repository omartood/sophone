# [1.1.0](https://github.com/omartood/sophone/compare/v1.0.0...v1.1.0) (2025-08-19)


### Features

* add Golis Telecom operator and Sahal wallet support ([fc22bea](https://github.com/omartood/sophone/commit/fc22bea66b90a4886c2d04dc371d8e10538238e7))

# 1.0.0 (2025-08-19)


### Bug Fixes

* update Node.js version to 20 for semantic-release compatibility ([555c624](https://github.com/omartood/sophone/commit/555c624a8c883024d670a76b1ede7150ad98c647))


### Features

* add automated release system ([c87b07d](https://github.com/omartood/sophone/commit/c87b07d2aedb149d9bf232ef54621d9586149eb8))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-12-19

### ✨ Features

- **Mobile Wallet Detection**: Added comprehensive mobile wallet identification for Somalia
  - EVC Plus (Hormuud Telecom) - *770#
  - Sahal (Somtel Network) - *828#
  - ZAAD (Telesom) - *712#
  - eDahab (Multi-operator) - *444#
  - Jeeb (Multi-operator digital wallet)

### 🚀 New Functions

- `getWallet(input)` - Get primary wallet for phone number
- `getWalletInfo(input)` - Get detailed wallet information
- `getWalletSafe(input)` - Safe version of getWallet
- `getWalletInfoSafe(input)` - Safe version of getWalletInfo
- `getAllWallets()` - List all supported wallets
- `getWalletByName(walletName)` - Get wallet by name
- `getWalletByOperator(operatorName)` - Get wallet by operator
- `getSupportedWallets()` - Get array of wallet names

### 🖥️ CLI Enhancements

- `sophone wallet <number>` - Get wallet name
- `sophone walletinfo <number>` - Get detailed wallet info
- `sophone wallets` - List all wallets
- Enhanced `sophone info` to show wallet information
- Enhanced `sophone batch` to show wallet in output

### 🧪 Testing

- Added 62 comprehensive tests
- Full coverage for wallet detection features
- Enhanced validation result object with wallet information

### 📚 Documentation

- Updated README.md with wallet detection examples
- Added comprehensive API documentation
- Enhanced CLI usage examples

## [0.1.1] - 2024-12-18

### 🐛 Bug Fixes

- Initial release fixes and improvements

## [0.1.0] - 2024-12-18

### ✨ Features

- **Phone Number Validation**: Validate Somali phone numbers in any format
- **Number Formatting**: Format to E.164, local, and international formats
- **Operator Detection**: Identify mobile operators (Hormuud, Somtel, Telesom, etc.)
- **CLI Tool**: Command-line interface for phone number operations
- **TypeScript Support**: Full type definitions included
- **Batch Processing**: Process multiple numbers at once
- **Error Handling**: Beautiful error messages with detailed codes
- **Zero Dependencies**: Lightweight and fast

### 🎯 Supported Operators

- Hormuud Telecom (61, 77)
- Somtel Network (62, 65, 66)
- Telesom (63)
- SomLink (64)
- SomNet (68)
- NationLink (69)
- Amtel (71)
