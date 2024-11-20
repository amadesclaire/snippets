// const {OAuth2Client} = require('google-auth-library');
// Docs: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token#node.js

class OAuth2Client {
  verifyIdToken({
    id_token,
    audience,
  }: {
    id_token: string;
    audience: string;
  }) {
    if (id_token === "valid_token" && audience === "valid_audience") {
      return { getPayload: () => ({}) };
    }
  }
}
const client = new OAuth2Client();

const oauth_google = {
  client_id: "YOUR_GOOGLE_CLIENT_ID",
  client_secret: "YOUR_GOOGLE_CLIENT_SECRET",
  authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
  toeknUri: "https://oauth2.googleapis.com/token",
  redirect_uri: "http://localhost:8000",
  response_type: "code",
  scope: "email profile",
  prompt: "consent",
  include_granted_scopes: "true",
  state: "state_parameter_passthrough_value",
  access_type: "offline",
};

export const googleAuthLogin = {
  getAuthUrl: () => {
    const query = {
      client_id: oauth_google.client_id,
      redirect_uri: oauth_google.redirect_uri,
      response_type: oauth_google.response_type,
      scope: oauth_google.scope,
    };
    const url = new URL(oauth_google.authorizationEndpointUri);
    url.search = new URLSearchParams(query).toString();
    return url.toString();
  },
  verifyGoogleCode: async ({ code }: { code: string }) => {
    console.info({ code }, "verifyGoogleCode");
    try {
      const tokenResponse = await fetch(
        "http://localhost:8000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: oauth_google.client_id,
            client_secret: oauth_google.client_secret,
            code,
            grant_type: "authorization_code",
            redirect_uri: oauth_google.redirect_uri,
          }),
        }
      );
      const tokenData = (await tokenResponse.json()) as { id_token: string };

      const ticket = await client.verifyIdToken({
        id_token: tokenData.id_token,
        audience: oauth_google.client_id,
      });

      const userData = ticket?.getPayload();
      console.info({ userData }, "google auth successful");
      return userData;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to verify google code");
    }
  },
};
