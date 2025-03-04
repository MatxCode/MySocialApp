import News from "@/components/News";

export default function NewsPage() {
  return (
    <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">Actualités Française</h1>
        <News />
    </div>
);
}
