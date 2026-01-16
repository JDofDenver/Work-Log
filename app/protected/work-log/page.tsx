import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { getWorkLogEntries } from "@/lib/actions/work-log";


async function WorkLogContent() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }
  
  const entries = await getWorkLogEntries();
  console.log("Fetched entries:", entries);
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Work Log Entries</h1>
        <Link href="/protected/work-log/new">
          <Button className="flex items-center gap-2">
            <PlusIcon size={16} />
            New Entry
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No entries yet. Create your first work log entry!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Entry Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Subject Line</th>
                    <th className="text-left py-3 px-4 font-semibold">Project</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm">
                        <Link href={`/protected/work-log/${entry.id}/edit`} className="block cursor-pointer">
                          {entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'No Date'}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        <Link href={`/protected/work-log/${entry.id}/edit`} className="block cursor-pointer">
                          {entry.subject_line}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Link href={`/protected/work-log/${entry.id}/edit`} className="block cursor-pointer">
                          {entry.project ? (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {entry.project}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">No Project</span>
                          )}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function WorkLogPage() {
  return (
    <Suspense fallback={<div className="flex-1 w-full flex items-center justify-center">Loading work log...</div>}>
      <WorkLogContent />
    </Suspense>
  );
}