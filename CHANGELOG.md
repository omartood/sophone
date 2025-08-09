# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-08-09

### Fixed
- Updated repository links to correct GitHub URL (github.com/omartood/sophone)
- Fixed documentation to show ES module syntax instead of CommonJS
- Enhanced README with comprehensive CLI examples and proper links
- Added contributing guidelines and development setup instructions

### Changed
- Improved package description with emoji and better formatting
- Enhanced CLI help documentation with all 8 commands

## [0.1.0] - 2025-08-09

### Added
- Initial release of sophone
- Core phone number validation for Somalia (+252)
- Support for all major Somali mobile operators:
  - Hormuud (61, 77)
  - Somtel (62, 65, 66)
  - Telesom (63)
  - SomLink (64)
  - SomNet (68)
  - NationLink (69)
  - Amtel (71)
- Multiple formatting options:
  - E.164 format (+252XXXXXXXXX)
  - Local format (0XXX XXX XXX)
  - International format (+252 XX XXX XXXX)
- Professional error handling with SomaliPhoneError class
- Structured error codes (INVALID_LENGTH, INVALID_PREFIX, INVALID_INPUT, UNKNOWN)
- Both throwing and safe (non-throwing) function variants
- Comprehensive validation with detailed results
- Operator information and metadata
- Batch processing capabilities
- CLI tool with multiple commands
- Complete TypeScript definitions
- 36 comprehensive tests
- GitHub Actions CI/CD workflows