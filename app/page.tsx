import InfinitePages from "./components/InfinitePages";

export default function Home() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Infinite Scroll Pages</h1>
      <InfinitePages />
    </main>
  );
}
