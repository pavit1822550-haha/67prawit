import { readFile } from 'node:fs/promises';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const localCredentialFiles = [
  './next-nodejs-nextapp-10089-firebase-adminsdk-fbsvc-69946419ee.json',
  './firebase-config-fin0169.json',
  './firebase-config.json',
];

async function loadServiceAccount() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    try {
      return JSON.parse(serviceAccountJson);
    } catch (error) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON must contain valid service-account JSON.', {
        cause: error,
      });
    }
  }

  for (const file of localCredentialFiles) {
    try {
      return JSON.parse(await readFile(new URL(file, import.meta.url), 'utf8'));
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error(`Unable to read Firebase credentials from ${file}.`, {
          cause: error,
        });
      }
    }
  }

  throw new Error(
    'Firebase credentials are missing. Set FIREBASE_SERVICE_ACCOUNT_JSON or add a local service-account JSON file under server/config.',
  );
}

const serviceAccount = await loadServiceAccount();
if (
  !serviceAccount.project_id ||
  !serviceAccount.client_email ||
  !serviceAccount.private_key
) {
  throw new Error(
    'Firebase service-account credentials must include project_id, client_email, and private_key.',
  );
}

initializeApp({ credential: cert(serviceAccount) });

export default getFirestore();
