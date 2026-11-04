# Amazon Creators API Investigation (2026-07)

> Archive status: paused until the Associates account becomes eligible for the
> Creators API. This is historical investigation context, not an active product
> data synchronization procedure.

## Summary

This document records what was tested while integrating Amazon Creators API for this site, why local/runtime calls failed, and why implementation is paused.

Conclusion: API access is blocked by account eligibility requirements, so production integration is paused for now.

## What We Tried

1. Designed scheduled sync flow with GitHub Actions.
2. Implemented a local sync script to:
- collect ASINs from article shortcodes
- call Creators API GetItems
- write `data/amazon/products.json`
3. Added OAuth token flow for FE region endpoint.
4. Verified request shape against official docs.
5. Tested both:
- direct HTTP implementation
- official Node.js SDK (`@amzn/creatorsapi-nodejs-sdk`)

## Credential / Endpoint Notes

- FE token endpoint for JP credentials: `https://api.amazon.co.jp/auth/o2/token`
- Base API endpoint: `https://creatorsapi.amazon.com`
- GetItems path: `/catalog/v1/getItems`
- Required token scope: `creatorsapi::default`
- Marketplace used for JP: `www.amazon.co.jp`

## Errors Observed and Fixes

### 1) OAuth token request failed (400)

Error:
- `missing required parameter: scope`

Fix:
- Added scope `creatorsapi::default` to token request body.

### 2) GetItems validation error (400)

Error:
- invalid `resources` entries

Fix:
- aligned resources with Creators API naming used in docs and SDK examples
- switched price/availability to `offersV2` resource family

### 3) Access denied (403)

Error:
- `AccessDeniedException`
- reason: `AssociateNotEligible`
- message: account does not currently meet eligibility requirements

Status:
- This happened with both custom HTTP client and official Node.js SDK.
- Indicates account eligibility gating, not implementation syntax.

## SDK Validation Result

The official Node SDK was installed and built locally, and GetItems was called with test ASINs.
Result was still `AssociateNotEligible`.

Therefore, implementation is considered blocked by account state, not by request format.

## Eligibility Constraints Confirmed

- Need shipped sales in recent period.
- Need minimum conversion count in recent period (as identified during investigation).

Because these conditions are not currently met, API integration is paused.

## Operational Decision

- Do not proceed with production sync automation yet.
- Keep this memo as the restart point.
- Resume once eligibility conditions are satisfied.

## Restart Checklist (When Eligible)

1. Re-run SDK sample GetItems against JP marketplace.
2. Confirm successful API response for at least 1 ASIN.
3. Re-introduce sync script and scheduled workflow.
4. Keep secrets only in CI secrets (not in public assets).
5. Validate generated product data and shortcode rendering.

