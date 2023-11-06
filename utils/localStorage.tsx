import root from "window-or-global";
import { PersistentStorage } from "@/utils/PersistentStorage";
import type { Storage } from "@/utils/PersistentStorage";

type LocalStorageKey = "childName" | "childGender" | "childAge" | "childStory" | "aiPageData";

export const localStorage: Readonly<Storage<LocalStorageKey>> =
  new PersistentStorage<LocalStorageKey>(root.localStorage);
