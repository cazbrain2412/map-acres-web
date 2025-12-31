export default async function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-extrabold">Property: {params.id}</h1>
      <p className="mt-2 text-sm text-black/70">
        Later we will load full property details from DB/CMS.
      </p>
    </div>
  );
}

