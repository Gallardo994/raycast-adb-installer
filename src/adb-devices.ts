import { promisify } from "util";
import { exec as _exec } from "child_process";
import { getAdbPath } from "./adb";
import { createToast } from "./toasts";

const exec = promisify(_exec);

export default async function main() {
  const toast = await createToast("Listing ADB Devices...");

  try {
    const adb = getAdbPath();

    toast.progress("Fetching devices...");
    const { stdout } = await exec(`${adb} devices -l`);

    if (!stdout.trim()) {
      throw new Error("No devices found");
    }

    const devices = stdout
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => line.trim());

    if (devices.length === 0) {
      throw new Error("No devices found");
    }

    toast.success(`Connected ADB devices: ${devices.length}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error("An unknown error occurred");
    }
  }
}
