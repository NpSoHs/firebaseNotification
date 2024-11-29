import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';  // Import NextResponse for Next.js v13+
const { google } = require('googleapis');

const PROJECT_ID = 'smartdoorbell-49fd1';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

/**
 * Get a valid access token.
 */
export function getAccessToken() {
  const data = {
    "type": "service_account",
    "project_id": "smartdoorbell-f9359",
    "private_key_id": "6bf500225ffb899269e241f254166c9a8b0cbedc",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDt0q+Q09DS8kEz\nrz3Ju8TJ2Ue21fEQ/fju08/4HCsf00f6j9FTVfc9hi5xqo5r6NeR1vqF7k6b+f8C\nt0lIztge0gwBcDm0h7cTLMAZHH6o138LIqi2VTm/GFodH4OB4Sbr3TfOwcsr5gbe\nhcanFIuxAsPX9jso+RrfQQ6I3goANkcEoP+tATJwybIcgZdH3pOR7Xl7BVt18ud5\nsKz2hFZptQJwy4YqtdPVmtXf7MXfA99MaLVXvDYU/SP/CZ1rGyQpzW9Y9Z+xVZPv\njfs2c7JVY5iIouvKN/ijUUg1Oz5xnuq08aVryHKbfNeYkHhuiUMua6nI6Bwxze3H\ni+jm3ctlAgMBAAECggEAE/jiURuUuS5qjtxb6EXqUhg6904Su15UyjvEBp5Y+ch8\nzjxHNEQvKf3LhzSvVr0cY21GJzq648r0IUaCs0hZqobxxqol0nUmSQg0TrePpH7K\ndsUvnXZdTeDN6o2ztdPSeLLgha7NMO/VqljaNLxbOd+VUlzlnXyEBvU38wMQnHFJ\nAVhIoODCUv1rtgVCpIFbCEtV+EZmwcLrvGZIl+n+1Xuj7t4XWwDwaV6Nz1OGQWyv\n7lppvsApN3NQzDq4d54pjt695WAWOjVC9ObW4urKEM6GcDJ1qNzW+XhwHX5QDD6h\nPQEOwpo1TKvCYQDYAsgCY4kneTbUV/TI5du/5sLjqQKBgQD+keCV8+zytoULFC9Z\niemHQYyhmUlkQ2o9nzgvbNKvwGbPajyHHXWIPk0yj3aqhtq/SY6qXyqDJ/KTq9fs\nEUCi6MdK5Kq4QNaOP48XGcIrRcxV/72HpHaV2x6p32R0CoiLMbBCTY0P8yYUHAY+\nHCoiCnP1gbCto9JUWj2Y5Qbs6QKBgQDvKLkig7iwWVtmZIw2hSEPWok6an2Z0EDw\nfizELtwwHEbphZwXVtJ682/dHPp1NheMsEkUBZvmChNyrpe/FH7aX3EQqznjCrON\nRHcjkXJIBMioYLx3PO5QaALqJ+j5wEHyFTmbamBeTXLGMgDBfCDc5xo0kbeq5JXe\nclt/q/AtHQKBgQDjGX4yJ95NFDiSDprDFP4o9HghvZ60fFOtz3mPDVTTByBwjsSa\ngNRWC8ZQgZ2KOS2yEkvcf3Nsd9m2lUnVxfpUmrcXf/Ew2F7PnbHoGMmYUvccDT6m\nYDiOLWEoiCqUPsVa76PfMlHSVca1j96d0ABiR9L0xJK6BPhg2fQzjrVj6QKBgQDt\nAYtvA+CciwFEGLLHOOmJYKyMAoqUSsiATFoq1VGKMAuqUqlci8Ms62DZXGVskP2H\nhA/30pMrxqJ9TT6+sx3/ZQQUg8trD+jeP5Jd4j7B1lPQYYWEGRMHBfyVdpWwI/J2\naMhdF2+HJPNwLI+JL20V3cSfgiTlK4DGIMhCXu82lQKBgQCkci+NCAdPSVIvOSOb\nyfiw9yt5fLbKqEnexVp8EUGPoTG2/vW6ZeoWMHQyeLfe2zqEe8gV0zbepzDMBAl4\ngUniAbLLbWdhD0g0iPq1u/V7fRUy/VOGV3rsc+ohUVkiNIJjcU8tjkYT+C1+7CaQ\nGxUV74TfEmxKBeNeHKphQMf8qg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-u09bx@smartdoorbell-f9359.iam.gserviceaccount.com",
    "client_id": "102106143576726688491",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u09bx%40smartdoorbell-f9359.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

  console.log("getAccessToken");

  return new Promise<string>((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      data.client_email,
      null,
      data.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize((err: any, tokens: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

export interface AccessTokenResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}
/**
 * Handle GET requests.
 */
export async function GET(req: NextApiRequest) {
  try {
    console.log("GET /api/getServerFirebaseToken");
    const accessToken = await getAccessToken();
    console.log('Access token retrieved successfully:', accessToken);
    
    // Use NextResponse for the response
    return NextResponse.json({ success:true, accessToken });
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return NextResponse.json({success:false, error: 'Error retrieving access token' }, { status: 500 });
  }
}

/**
 * Handle OPTIONS requests (preflight for CORS).
 */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

