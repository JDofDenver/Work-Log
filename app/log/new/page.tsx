"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon } from "lucide-react";
import { createWorkLogEntry } from "@/lib/actions/work-log";
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
      {pending ? "Saving..." : "Save Entry"}
    </Button>
  );
}

export default function NewEntryPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      setError(null);
      await createWorkLogEntry(formData);
      // Server action handles redirect
    } catch (error) {
        console.log("Error creating work log entry:", error);
      setError(error instanceof Error ? error.message : "Failed to save entry");
    }
  }

  return (

    <div className="flex-1 w-full flex flex-col gap-8 items-center">
      <WorkLogNav />
      <div>
        <h1 className="font-bold text-3xl">New Work Log Entry</h1>
      </div>

      <Card className="w-full max-w-2xl md:max-w-4xl">
        <CardHeader>
          <CardTitle>Create New Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                name="project"
                type="text"
                placeholder="Enter project name..."
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
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                placeholder="What did you work on today? Add your notes, progress, challenges, etc..."
                rows={8}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:flex md:gap-3">
              <div className="flex justify-center md:justify-start">
                <SubmitButton />
              </div>
              <div className="flex justify-center md:justify-start">
                <Link href="/log" className="w-full md:w-auto">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
