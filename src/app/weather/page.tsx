import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Application Météo</h1>
      <Weather />
    </div>
  );
}
