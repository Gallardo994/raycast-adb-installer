import { showToast, Toast } from "@raycast/api";

export type ToastHandler = {
  toast: Toast;
  error: (message: string) => void;
  success: (message: string) => void;
  progress: (message: string) => void;
};

export async function createToast(message: string): Promise<ToastHandler> {
  const toast = await showToast(Toast.Style.Animated, "In Progress", message);

  return {
    toast,
    error: (message: string) => {
      toast.title = "Error";
      toast.message = message;
      toast.style = Toast.Style.Failure;
      console.error(message);
    },
    success: (message: string) => {
      toast.title = "Success";
      toast.message = message;
      toast.style = Toast.Style.Success;
      console.log(message);
    },
    progress: (message: string) => {
      toast.title = "In Progress";
      toast.message = message;
      toast.style = Toast.Style.Animated;
      console.log(message);
    },
  };
}
