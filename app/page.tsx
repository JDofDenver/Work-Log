import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { getWorkLogEntries } from "@/lib/actions/work-log";
import { LoginForm } from "@/components/login-form";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { WorkLogNav } from "@/components/work-log-nav";
import { CopyrightYear } from "@/components/copyright-year";

async function AuthenticatedContent() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data?.user || error) {
    return <LoginContent />;
  }

  return (
    <>
      <WorkLogNav />
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Suspense fallback={<div>Loading...</div>}>
            <WorkLogContent />
          </Suspense>
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <CopyrightYear />
          <ThemeSwitcher />
        </footer>
      </div>
    </>
  );
}

async function WorkLogContent() {
  const entries = await getWorkLogEntries();

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Work Log</h1>
        <Link href="/new">
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
                    <tr key={entry.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <Link href={`/${entry.id}/edit`} className="block cursor-pointer">
                          <div className="font-medium">
                            {new Date(entry.entry_date).toLocaleDateString()}
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/${entry.id}/edit`} className="block cursor-pointer">
                          <div className="font-medium">{entry.subject_line}</div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/${entry.id}/edit`} className="block cursor-pointer">
                          <div className="text-muted-foreground">{entry.project}</div>
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

function LoginContent() {
  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <span>Work Log</span>
          </div>
          <ThemeSwitcher />
        </div>
      </nav>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-md mx-auto">
            <div className="text-center">
              <h1 className="font-bold text-3xl mb-2">Work Log</h1>
              <p className="text-muted-foreground">Sign in to access your work log</p>
            </div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <CopyrightYear />
          <ThemeSwitcher />
        </footer>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthenticatedContent />
      </Suspense>
    </main>
  );
}
