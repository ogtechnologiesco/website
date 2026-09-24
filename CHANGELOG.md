# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-09-24

### Changed

- Footer: split the single Tools column into a dedicated full-width row
  with one column per category (Image & PDF, XML, Developer,
  Security & ISO, Finance, Data & Other) for a balanced layout

## [1.0.0] - 2026-09-24

First tagged release of the OG Technologies EU corporate website.

### Added

- Corporate marketing pages: products, portfolio, ventures, about, contact
- Blog and Insights sections with static article content
- 46 free online tools under `/tools` with a categorized hub page, including:
  - XML formatter/validator, hash generator, PDF tools, security scanner,
    blockchain compliance checker
  - Finance validators: IBAN, BIC/SWIFT, LEI, GTIN
  - ISO 20022 XML viewer and MT940-to-CSV converter
  - Healthcare tools: HL7 v2 parser, FHIR validator
  - Aerospace tools: TLE parser and converter
  - SCORM validator, phone formatter, vCard generator, email validator,
    CSV deduplicator
- User authentication (JWT), CRM module, helpdesk system
- Stripe-based subscription payments
- SEO infrastructure: static prerendering for all public routes,
  trailing-slash canonical URLs, JSON-LD structured data
  (BreadcrumbList, BlogPosting, WebApplication, CollectionPage),
  sitemap.xml, llms.txt, site search index

### Fixed

- Google Search Console indexing: standardized trailing-slash canonicals
  and internal links to resolve duplicate/alternate-page reports
- Thin-content indexing on XML tool pages via per-page content sections
