import PropertyForm from "@/components/admin/properties/PropertyForm";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyForm mode="edit" id={id} />;
}

