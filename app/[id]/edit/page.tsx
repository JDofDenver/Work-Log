import { notFound } from "next/navigation";
import { getWorkLogEntry } from "@/lib/actions/work-log";
import { EditEntryForm } from "./edit-entry-form";
import { Suspense } from "react";

interface EditEntryPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function EditEntryContent({ params }: EditEntryPageProps) {
  try {
    const { id } = await params;
    const entry = await getWorkLogEntry(id);

    if (!entry) {
      console.log("Entry not found");
      notFound();
    }

    return <EditEntryForm entry={entry} />;
  } catch (error) {
    console.error("Error fetching entry:", error);
    notFound();
  }
}

export default function EditEntryPage({ params }: EditEntryPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditEntryContent params={params} />
    </Suspense>
  );
}
