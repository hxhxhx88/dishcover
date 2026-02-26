# Client session lifecycle specification

## Purpose

- Define the expected session behavior for signed-in users in the mobile product.

## Terminology

- **Access token:** short-lived credential used to access protected resources.
- **Refresh token:** long-lived credential used to renew access without full sign-in.
- **Session:** authenticated state bound to one active token pair.

## Session business rules

- A successful sign-in issues an access token and a refresh token and moves the user into an authenticated state.
- Protected actions require a valid access token. Invalid or expired access must be treated as unauthorized.
- When access is unauthorized and a refresh token is available, the system attempts one silent refresh cycle.
- A successful refresh returns a new access token and a new refresh token, and immediately invalidates the prior refresh token.
- A refresh token is single-use across refresh cycles and must not be reusable after a successful rotation.
- If refresh cannot succeed for any reason, the user session is considered ended.
- When a session is ended, the user returns to an unauthenticated state and must complete sign-in again.
- Explicit sign-out ends the current session immediately and invalidates tokens from that session.

## Acceptance scenarios

- Given a valid active session, protected actions succeed.
- Given an expired access token and a valid refresh token, the session is renewed and user flow continues.
- Given an expired access token and an invalid or expired refresh token, the session ends and re-authentication is required.
- Given a successful refresh, the previous refresh token is no longer valid.
- Given explicit sign-out, tokens from that session are no longer valid for protected actions.
