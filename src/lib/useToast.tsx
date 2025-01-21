import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const successMessage = (message: string, duration: number) => {
    toast.success(message, {
      autoClose: duration || 5000,
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  const warningMessage = (message: string, duration: number) => {
    toast.warning(message, {
      autoClose: duration || 5000,
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  const errorMessage = (message: string, duration: number) => {
    toast.error(message, {
      autoClose: duration || 5000,
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const functionThatReturnPromise = (duration: number) =>
    new Promise((resolve) => setTimeout(resolve, duration));

  const successPromiseMessage = (message: string, duration: number) => {
    const durationMs = duration || 1000;
    toast.promise(functionThatReturnPromise(durationMs), {
      pending: "Promise is pending",
      success: message || "Promise resolved",
    });
  };
  const errorPromiseMessage = (message: string, duration: number) => {
    const durationMs = duration || 1000;
    toast.promise(functionThatReturnPromise(durationMs), {
      pending: "Promise is pending",
      error: message || "Promise resolved",
    });
  };

  const showToast = {
    successPromiseMessage,
    errorPromiseMessage,
    successMessage,
    warningMessage,
    errorMessage,
  };

  return showToast;
};

export { useToast };
