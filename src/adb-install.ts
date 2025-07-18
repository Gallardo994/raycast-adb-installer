import { getSelectedFinderItems } from "@raycast/api";
import { promisify } from "util";
import { exec as _exec } from "child_process";
import { basename } from "path";
import { getAdbPath } from "./adb";
import { createToast } from "./toasts";

const exec = promisify(_exec);

export default async function main() {
  const toast = await createToast("Installing APK on Android device...");

  try {
    const finderItems = await getSelectedFinderItems();
    if (finderItems.length === 0) {
      throw new Error("No files selected in Finder");
    }

    const file = finderItems[0];
    const path = file.path;
    const fileName = basename(path);

    if (!path.toLowerCase().endsWith(".apk")) {
      throw new Error("Selected file is not an APK");
    }

    const adb = getAdbPath();

    toast.progress(`Installing: ${fileName}`);
    const { stdout } = await exec(`${adb} install -r "${path}"`);

    toast.success(`APK installed successfully: ${stdout.trim()}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error("An unknown error occurred");
    }
  }
}
