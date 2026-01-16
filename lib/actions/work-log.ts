"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getWorkLogEntries() {
  const supabase = await createClient();
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      redirect("/auth/login");
    }
    const { data, error } = await supabase
    .from('workLog')
    .select('*')
    .eq('user_id', user.id);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to fetch work log entries");
    }
    return data;
}

export async function getWorkLogEntry(id: string) {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('workLog')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only access their own entries
    .single();

  if (error) {
    console.error("Supabase error:", error);
    if (error.code === 'PGRST116') {
      throw new Error("Entry not found");
    }
    throw new Error("Failed to fetch work log entry");
  }

  return data;
}


export async function createWorkLogEntry(formData: FormData) {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  // Extract form data
  const project = formData.get("project") as string;
  const subject = formData.get("subject") as string;
  const notes = formData.get("notes") as string;

  if (!subject?.trim()) {
    throw new Error("Subject is required");
  }

  try {
    // Insert into Supabase table
    const { data, error } = await supabase
    .from('workLog')
    .insert([
        {
          user_id: user.id,
          project: project || null,
          subject_line: subject.trim(),
          notes: notes || null,
        }
    ])
    .select()

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to create work log entry");
    }

    console.log("Created entry:", data);

    // Revalidate the work log page to show the new entry
    revalidatePath("/protected/work-log");

    // Redirect to the work log page
    redirect("/protected/work-log");

  } catch (error) {
    console.error("Error creating work log entry:", error);
    throw error;
  }
}

export async function updateWorkLogEntry(entryId: string, formData: FormData) {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  // Extract form data
  const project = formData.get("project") as string;
  const subject = formData.get("subject") as string;
  const notes = formData.get("notes") as string;

  if (!subject?.trim()) {
    throw new Error("Subject is required");
  }

  try {
    // Update the Supabase record
    const { data, error } = await supabase
      .from("workLog")
      .update({
        project: project || null,
        subject_line: subject.trim(),
        notes: notes || null,
      })
      .eq("id", entryId)
      .eq("user_id", user.id) // Ensure user can only update their own entries
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to update work log entry");
    }

    console.log("Updated entry:", data);

    // Revalidate pages that might show this data
    revalidatePath("/");
    revalidatePath(`/${entryId}/edit`);

    return { success: true, data };

  } catch (error) {
    console.error("Error updating work log entry:", error);
    throw error;
  }
}
