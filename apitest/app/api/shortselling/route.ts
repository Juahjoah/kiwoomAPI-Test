import { getKiwoomToken } from "@/lib/token";
import { fetchShortSelling } from "@/lib/kiwoom";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") || "005930";
  const start = searchParams.get("start") || "20241001";
  const end = searchParams.get("end") || "20241020";

  try {
    console.log("🚀 [API] shortselling start");
    console.log("code:", code, "start:", start, "end:", end);

    const token = await getKiwoomToken();
    console.log("✅ [API] Token issued:", token?.slice(0, 10) + "...");

    const data = await fetchShortSelling({ token, code, start, end });
    console.log("✅ [API] Kiwoom response length:", data?.length);
    return Response.json({ data });
  } catch (error: any) {
    console.error("❌ [API] shortselling error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
