# Agent Registration and Authentication

This file outlines the authentication and registration requirements for AI agents interacting with saadrasheed.life.

## Public Access
The majority of the site content and its primary APIs (such as the API catalog and Agent Skills index) are public and do not require authentication.

## Protected Resources
Currently, there are no OAuth-protected resources that require agent registration.

If protected resources are added in the future, this document will be updated with:
- `register_uri` for client registration
- Supported identity and credential types
- Claim and revocation URLs

For automated discovery of OAuth metadata, please refer to:
- `/.well-known/oauth-authorization-server`
- `/.well-known/oauth-protected-resource`
