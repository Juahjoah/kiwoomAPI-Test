import ShortSellingTable from "@/components/ShortSellingTable";

export default function ShortSellingPage() {
  return (
    <main className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">공매도 추이 대시보드</h1>
      <ShortSellingTable />
    </main>
  );
}
