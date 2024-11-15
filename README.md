# @marekkedzia/plumber-auth

`@marekkedzia/plumber-auth` is an Express.js middleware library designed for seamless integration with Auth0 for secure authentication and credential management. It provides a robust mechanism for verifying JWT tokens, logging errors, and storing user credentials.

---

## Features

- **Auth0 Integration**: Handles token validation using Auth0's JSON Web Key Set (JWKS).
- **Secure Authentication**: Verifies RS256 JWTs and ensures requests come from trusted issuers.
- **Error Logging**: Logs authentication errors for enhanced debugging and monitoring.
- **Credential Storage**: Safely stores user metadata for downstream processing.
- **Customizable**: Flexible configuration for error handling, logging, and token issuer URLs.

---

## Installation

Install the package via npm:

```bash
npm install @marekkedzia/plumber-auth
```

---

## Usage

### Basic Setup

To integrate `@marekkedzia/plumber-auth` into your Express.js application:

```typescript
import express from 'express';
import { auth0authHandler } from '@marekkedzia/plumber-auth';

const app = express();

const authMiddleware = auth0authHandler({
    issuerBaseUrl: 'https://your-auth0-domain/',
    logger: { error: console.error },
    forbiddenError: new Error('Access Denied'),
    storeCredentials: (id, metadata) => {
        console.log('User ID:', id);
        console.log('User Metadata:', metadata);
    },
});

app.use('/protected-route', authMiddleware);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

### Advanced Configuration

#### Storing User Credentials

You can define your own logic to store or process user credentials in the `storeCredentials` function. For example, save to a database or pass to another service.

```typescript
storeCredentials: (id, metadata) => {
    // Save to database
    myDatabase.save({ id, ...metadata });
};
```

#### Custom Error Handling

Pass a custom `forbiddenError` to provide detailed feedback for unauthorized access.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for feature enhancements or bug fixes.

---

## Author

**Marek Kędzia**  
Passionate about building robust authentication solutions for modern web applications.

---

## About

`@marekkedzia/plumber-auth` simplifies Auth0 integration for Express.js applications, offering secure JWT validation and credential management with minimal setup.
