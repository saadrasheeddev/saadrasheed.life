# Auth.md

Welcome. This service supports agentic registration.
Resource Server: `https://saadrasheed.life/api`
Authorization Server: `https://saadrasheed.life`

*Note: Currently, all primary endpoints are public. This document outlines the standard flow for future protected resources.*

## Discover

1. Fetch the Protected Resource Metadata (PRM) at `/.well-known/oauth-protected-resource` to read `resource`, `authorization_servers`, `scopes_supported`, and `bearer_methods_supported`.
2. Fetch the Authorization Server metadata at `/.well-known/oauth-authorization-server` and read the standard OAuth fields along with the `agent_auth` block, which includes `register_uri`, `identity_types_supported`, and `credential_types_supported`.

## Pick a method

Select the appropriate registration method based on your capabilities:
- **identity_assertion**: If you have a session you can exchange for an ID-JAG bound to this service's audience.
- **service_auth**: If you only have the user's email (claim ceremony required).
- **anonymous**: If you have neither (claim ceremony optional).

## Register

Send a POST request to the registration endpoint to receive a service-signed `identity_assertion`.

### service_auth

```http
POST /agent-register HTTP/1.1
Content-Type: application/json

{
  "type": "service_auth",
  "login_hint": "user@example.com"
}
```

```json
{
  "claim_token": "token_123",
  "claim_block": {
    "user_code": "ABCD-1234",
    "verification_uri": "https://saadrasheed.life/claim"
  }
}
```

## Claim ceremony

1. **Get the ceremony materials**: For `service_auth`, use the `claim_block` from the registration response.
2. **Hand off to the user**: Present the `verification_uri` and `user_code` to the user so they can authenticate.
3. **Poll for completion**:

```http
POST /oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

grant_type=urn:workos:agent-auth:grant-type:claim&claim_token=token_123
```

## Exchange the assertion

Exchange the `identity_assertion` for an access token.

```http
POST /oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<identity_assertion>
```

## Use the access_token

Present the access token in your API requests:

```http
GET /api/protected HTTP/1.1
Authorization: Bearer <access_token>
```
*Note: There is no refresh_token. Re-exchange the same `identity_assertion` when the `access_token` expires.*

## Errors

| Code | Endpoint | Action |
|------|----------|--------|
| `invalid_request` | `/agent-register` | Fix malformed request and retry. |
| `service_auth_not_enabled` | `/agent-register` | Method disabled. Use an alternative. |
| `authorization_pending` | `/oauth/token` | Continue polling during the claim ceremony. |
| `invalid_grant` | `/oauth/token` | The assertion expired or was revoked. Restart registration. |

## Revocation

1. **Credential layer**: POST the `access_token` to `/oauth/revoke` to kill it. The `identity_assertion` survives.
2. **Registration layer**: The provider may invalidate the assertion via an events endpoint. If you receive an `invalid_grant` on exchange, restart at registration.
