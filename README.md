## My information
class: Web Programming
Byl Prawit Jitsuwan

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Firebase credentials

The pet API uses the Firestore collection `pets-026830491008-9`. Firebase Admin
loads credentials from `FIREBASE_SERVICE_ACCOUNT_JSON` first. For local
development only, it can instead read a service-account JSON file under
`server/config`. These credential files are ignored by Git and must never be
committed.

For local development, create `.env.local` in the project root and set
`FIREBASE_SERVICE_ACCOUNT_JSON` to the complete service-account JSON on one
line. Keep `.env.local` private.

For GitHub Actions, add the complete service-account JSON as a repository
secret named `FIREBASE_SERVICE_ACCOUNT_JSON`, then expose it to the build or
server process through the workflow environment. For a deployed application,
also configure the same secret as an environment variable in the hosting
provider's runtime settings. GitHub Secrets are not automatically available
to a deployed application unless the deployment workflow passes them through.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# 67prawit" 
"# 67prawit" 
