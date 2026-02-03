"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon, EditIcon, XIcon } from "lucide-react";
import { updateWorkLogEntry } from "@/lib/actions/work-log";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { WorkLogNav } from "@/components/work-log-nav";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 w-full md:w-auto"
    >
      <SaveIcon size={16} />
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

interface EditEntryFormProps {
  entry: {
    id: string;
    project?: string;
    subject_line: string;
    notes?: string;
    created_at?: string;
  };
}

export function EditEntryForm({ entry }: EditEntryFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      setError(null);
      await updateWorkLogEntry(entry.id, formData);
      setIsEditing(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update entry");
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    // Form will reset automatically since we're using defaultValue
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-8 items-center">
      <WorkLogNav />
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">
          {isEditing ? "Edit Entry" : "Work Log Entry"}
        </h1>
      </div>

      <Card className="w-full max-w-2xl md:max-w-4xl">
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Entry Details" : "Entry Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="entryDate">Entry Date</Label>
              <Input
                id="entryDate"
                name="entryDate"
                type="date"
                defaultValue={entry.created_at ? new Date(entry.created_at).toISOString().split('T')[0] : ''}
                disabled={!isEditing}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                name="project"
                type="text"
                placeholder="Enter project name..."
                defaultValue={entry.project || ""}
                disabled={!isEditing}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Enter a subject for your work log entry..."
                defaultValue={entry.subject_line}
                required
                disabled={!isEditing}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                placeholder="What did you work on today? Add your notes, progress, challenges, etc..."
                defaultValue={entry.notes || ""}
                rows={8}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical ${!isEditing ? 'bg-muted' : ''}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:flex md:gap-3">
              {!isEditing ? (
                <>
                  <div className="flex justify-center md:justify-start">
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 w-full md:w-auto"
                    >
                      <EditIcon size={16} />
                      Edit Entry
                    </Button>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Link href="/log" className="w-full md:w-auto">
                      <Button type="button" variant="outline" className="w-full">
                        Back to Log
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center md:justify-start">
                    <SubmitButton />
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex items-center gap-2 w-full md:w-auto"
                    >
                      <XIcon size={16} />
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
