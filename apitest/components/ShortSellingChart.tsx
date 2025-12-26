"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ShortSellingItem {
  dt: string;
  close_pric: string;
  shrts_qty: string;
  ovr_shrts_qty: string;
  flu_rt: string;
}

export default function ShortSellingChart() {
  const [data, setData] = useState<ShortSellingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/shortselling?code=005930");
        if (!res.ok) throw new Error(`API Error ${res.status}`);
        const json = await res.json();

        setData(json.data || []);
      } catch (err) {
        console.error("🚨 공매도 데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>📊 데이터를 불러오는 중...</p>;
  if (!data.length) return <p>데이터가 없습니다.</p>;

  const sortedData = [...data].reverse();

  const numericData = sortedData.map((d) => ({
    ...d,
    shrts_qty: Number(d.shrts_qty),
    ovr_shrts_qty: Number(d.ovr_shrts_qty),
    flu_rt: Number(d.flu_rt),
  }));

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">📈 공매도 추이 그래프</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={numericData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            label={{ value: "공매도량", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "등락율 (%)", angle: 90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />

          {/* 공매도량 */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="shrts_qty"
            stroke="#2563eb"
            name="공매도량"
            dot={false}
          />
          {/* 누적공매도량 */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="ovr_shrts_qty"
            stroke="#16a34a"
            name="누적공매도량"
            dot={false}
          />
          {/* 등락율 */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="flu_rt"
            stroke="#dc2626"
            name="등락율"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
