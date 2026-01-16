import { notFound } from "next/navigation";
import { getWorkLogEntry } from "@/lib/actions/work-log";
import { EditEntryForm } from "./edit-entry-form";

interface EditEntryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEntryPage({ params }: EditEntryPageProps) {
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

