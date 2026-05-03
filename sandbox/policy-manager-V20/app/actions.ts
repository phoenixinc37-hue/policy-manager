"use server";

import { updateCompanyProfile, getCompanyProfile, getDefinitions, saveDefinition as saveDef, deleteDefinition as delDef } from "../lib/queries";
import { revalidatePath } from "next/cache";

export async function saveConfigAction(formData: FormData) {
  const updates: Record<string, any> = {};
  formData.forEach((value, key) => {
    updates[key] = value.toString();
  });
  
  updateCompanyProfile(updates);
  revalidatePath("/");
  revalidatePath("/setup");
  revalidatePath("/definitions");
}

export async function getProfile() {
  return getCompanyProfile();
}

export async function getDefinitionsAction() {
  return getDefinitions();
}

export async function saveDefinitionAction(key: string, label: string, definition: string) {
  saveDef(key, label, definition);
  revalidatePath("/");
  revalidatePath("/setup");
  revalidatePath("/definitions");
}

export async function deleteDefinitionAction(key: string) {
  delDef(key);
  revalidatePath("/");
  revalidatePath("/setup");
  revalidatePath("/definitions");
}
