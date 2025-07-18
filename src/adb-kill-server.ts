import { promisify } from "util";
import { exec as _exec } from "child_process";
import { getAdbPath } from "./adb";
import { createToast } from "./toasts";

const exec = promisify(_exec);

export default async function main() {
  const toast = await createToast("Killing ADB Server...");

  try {
    const adb = getAdbPath();

    await exec(`${adb} kill-server`);

    toast.success(`ADB server killed successfully`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error("An unknown error occurred");
    }
  }
}
