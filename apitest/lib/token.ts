export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export async function getKiwoomToken(): Promise<string> {
  const res = await fetch(process.env.KIWOOM_AUTH_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.KIWOOM_APP_KEY!,
      client_secret: process.env.KIWOOM_APP_SECRET!,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token fetch failed: ${err}`);
  }

  const data = (await res.json()) as TokenResponse;
  return data.access_token;
}
