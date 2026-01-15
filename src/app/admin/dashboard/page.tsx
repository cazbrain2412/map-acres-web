import dbConnect from "@/lib/db/mongoose";
import Property from "@/models/Property";

export default async function AdminDashboard() {
  await dbConnect();
  const pending = await Property.countDocuments({ status: "pending" });
  const approved = await Property.countDocuments({ status: "approved" });
  const rejected = await Property.countDocuments({ status: "rejected" });

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-white/60 text-sm">Pending</div>
          <div className="text-3xl font-extrabold mt-2">{pending}</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-white/60 text-sm">Approved</div>
          <div className="text-3xl font-extrabold mt-2">{approved}</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-white/60 text-sm">Rejected</div>
          <div className="text-3xl font-extrabold mt-2">{rejected}</div>
        </div>
      </div>

      <div className="mt-8">
        <a className="rounded-2xl bg-[#225BA0] px-5 py-3 font-semibold inline-flex" href="/admin/properties">
          Manage Properties
        </a>
      </div>
    </div>
  );
}

