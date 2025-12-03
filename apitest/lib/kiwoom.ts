export interface ShortSellingItem {
  dt: string;                   // 일자
  close_pric: string;           // 종가
  pred_pre_sig: string;         // 전일대비기호
  pred_pre: string;             // 전일대비
  flu_rt: string;               // 등락율
  trde_qty: string;             // 거래량
  shrts_qty: string;            // 공매도량
  ovr_shrts_qty: string;        // 누적공매도량
  trde_wght: string;            // 매매비중
  shrts_trde_prica: string;     // 공매도거래대금
  shrts_avg_pric: string;       // 공매도평균가
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

  const headers = {
    "Content-Type": "application/json;charset=UTF-8",     // JSON 포맷 지정
    authorization: `Bearer ${token}`,                     // 접근 토큰 (Bearer 접두사 포함)
    "api-id": "ka10014",                                  // TR명 (공매도추이요청)
  };

  const body = {
    stk_cd: code,                                         // 종목코드
    tm_tp: "1",                                           // 시간구분 (0: 시작일, 1: 기간)
    strt_dt: start,                                       // 시작일자
    end_dt: end,                                          // 종료일자
  };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  // 응답 처리
  const text = await res.text();

  // 에러 처리
  if (!res.ok) throw new Error(`API request failed (${res.status}): ${text}`);
  // JSON 파싱
  const data = JSON.parse(text);
  // 결과 추출
  const result = data.shrts_trnsn ?? [];

  return result;
}
