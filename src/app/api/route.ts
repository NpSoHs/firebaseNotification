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
  console.log("getAccessToken");
  return new Promise<string>((resolve, reject) => {
    const key = require('./service-account.json');  // Ensure this is the correct path to your service account file
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
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

