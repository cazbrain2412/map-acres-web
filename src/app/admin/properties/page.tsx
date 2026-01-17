export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

function toPlain(d: any) {
  return JSON.parse(JSON.stringify(d));
}

export default async function AdminPropertiesPage() {
  await dbConnect();
  const rows = await Property.find({}).sort({ createdAt: -1 }).limit(200).lean();
  const items = toPlain(rows);

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/60">ADMIN</div>
          <h1 className="mt-2 text-2xl font-extrabold">Properties</h1>
          <div className="mt-1 text-sm text-white/60">Create, edit, approve & control homepage sections.</div>
        </div>

        <Link
          href="/admin/properties/create"
          className="rounded-2xl bg-[#225BA0] px-5 py-3 text-sm font-semibold hover:opacity-90"
        >
          + Add Property
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Homepage</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p: any) => (
              <tr key={p._id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-white/60">{p.slug}</div>
                </td>
                <td className="px-4 py-3">{p.city}</td>
                <td className="px-4 py-3">
                  <div className="text-xs text-white/60">{p.category}</div>
                  <div className="font-semibold">{p.type}</div>
                </td>
                <td className="px-4 py-3 font-semibold">
                  ₹ {typeof p.price === "number" ? p.price.toLocaleString("en-IN") : p.price}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    {p.status}
                  </span>
                  {p.featured ? (
                    <span className="ml-2 rounded-full bg-[#225BA0] px-3 py-1 text-xs font-semibold">
                      Featured
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {(p.homeSections || []).slice(0, 4).map((s: string) => (
                      <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                        {s}
                      </span>
                    ))}
                    {(p.homeSections || []).length > 4 ? (
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                        +{(p.homeSections || []).length - 4}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/properties/${p._id}`}
                      className="rounded-xl bg-[#225BA0] px-3 py-2 text-xs font-semibold hover:opacity-90"
                    >
                      Edit
                    </Link>
                    <DeletePropertyButton id={String(p._id)} />
                  </div>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td className="px-4 py-10 text-white/60" colSpan={7}>
                  No properties yet. Click “Add Property”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

