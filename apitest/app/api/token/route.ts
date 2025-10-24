import { getKiwoomToken } from "@/lib/token";

export async function GET() {
  try {
    const token = await getKiwoomToken();
    return Response.json({ access_token: token });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
