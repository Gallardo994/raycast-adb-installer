import { getPreferenceValues } from "@raycast/api";

type Option<T> = T | undefined;

export function tryGetAdbPath(): Option<string> {
  const { adbPath } = getPreferenceValues<{ adbPath: string }>();

  if (!adbPath) {
    return undefined;
  }

  return adbPath;
}

export function getAdbPath(): string {
  const adbPath = tryGetAdbPath();

  if (!adbPath) {
    throw new Error("ADB path is not set in preferences");
  }

  return adbPath;
}
