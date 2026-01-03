export default function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-extrabold">Search Results</h1>
      <p className="mt-2 text-sm text-black/70">
        This page will later connect to your listings API + filters + map view.
      </p>

      <pre className="mt-6 overflow-auto rounded-2xl bg-black p-4 text-xs text-white">
        {JSON.stringify(searchParams, null, 2)}
      </pre>
    </div>
  );
}

