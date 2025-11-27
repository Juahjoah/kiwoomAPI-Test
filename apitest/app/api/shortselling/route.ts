import { getKiwoomToken } from "@/lib/token";
import { fetchShortSelling } from "@/lib/kiwoom";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") || "005930";
  const start = searchParams.get("start") || "20241001";
  const end = searchParams.get("end") || "20241020";

  try {
    const token = await getKiwoomToken();
    const data = await fetchShortSelling({ token, code, start, end });
    return Response.json({ data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
