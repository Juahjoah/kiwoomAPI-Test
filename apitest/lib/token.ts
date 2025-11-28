export interface TokenResponse {
  token: string;
  token_type: string;
  expires_dt: string;
}

export async function getKiwoomToken(): Promise<string> {
  const url = `${process.env.KIWOOM_AUTH_URL}/oauth2/token`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      appkey: process.env.KIWOOM_APP_KEY!,
      secretkey: process.env.KIWOOM_APP_SECRET!,
    }),
  });

  const text = await res.text();

  if (!res.ok) throw new Error(`Token fetch failed: ${text}`);

  const data = JSON.parse(text) as TokenResponse;
  return data.token;
}
