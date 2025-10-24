export interface ShortSellingItem {
  dt: string;
  close_pric: string;
  pred_pre_sig: string;
  pred_pre: string;
  flu_rt: string;
  trde_qty: string;
  shrts_qty: string;
  ovr_shrts_qty: string;
  trde_wght: string;
  shrts_trde_prica: string;
  shrts_avg_pric: string;
}

export async function fetchShortSelling({
  token,
  code,
  start,
  end,
}: {
  token: string;
  code: string;
  start: string;
  end: string;
}): Promise<ShortSellingItem[]> {
  const url = `${process.env.KIWOOM_API_URL}/api/dostk/shsa`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      authorization: `Bearer ${token}`,
      "api-id": "ka10014",
    },
    body: JSON.stringify({
      stk_cd: code,
      tm_tp: "1",
      strt_dt: start,
      end_dt: end,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API request failed: ${err}`);
  }

  const data = await res.json();
  return data.shrts_trnsn ?? [];
}
