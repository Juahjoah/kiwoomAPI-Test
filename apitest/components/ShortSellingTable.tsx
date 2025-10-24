"use client";

import { useEffect, useState } from "react";

interface ShortSellingItem {
  dt: string;
  close_pric: string;
  shrts_qty: string;
  ovr_shrts_qty: string;
  flu_rt: string;
}

export default function ShortSellingTable() {
  const [data, setData] = useState<ShortSellingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/shortselling?code=005930");
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>📊 데이터를 불러오는 중...</p>;
  if (!data.length) return <p>데이터가 없습니다.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">공매도 추이</h2>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th>일자</th>
            <th>종가</th>
            <th>공매도량</th>
            <th>누적공매도량</th>
            <th>등락율</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t text-center">
              <td>{row.dt}</td>
              <td>{row.close_pric}</td>
              <td>{row.shrts_qty}</td>
              <td>{row.ovr_shrts_qty}</td>
              <td>{row.flu_rt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
