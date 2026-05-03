import { supabase } from "./supabase";

export async function getCompanyProfile() {
  const { data } = await supabase.from("company_profile").select("*").eq("id", 1).single();
  return data;
}

export async function updateCompanyProfile(updates: Record<string, any>) {
  const keys = Object.keys(updates).filter((k) => k !== "id" && k !== "updatedAt");
  if (keys.length === 0) return getCompanyProfile();

  await supabase.from("company_profile").update(updates).eq("id", 1);
  return getCompanyProfile();
}

export async function getDefinitions() {
  const { data } = await supabase.from("definitions").select("*").order("label", { ascending: true });
  return data || [];
}

export async function saveDefinition(key: string, label: string, definition: string) {
  await supabase.from("definitions").upsert({ key, label, definition });
  return getDefinitions();
}

export async function deleteDefinition(key: string) {
  await supabase.from("definitions").delete().eq("key", key);
}
