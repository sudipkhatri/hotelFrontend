import { useEffect } from "react";

type ToastProps = {
  message: string,
  type: "SUCCESS" | "ERROR",
  onClose: ()=> void,
};

const Toast = ({ message, type, onClose }: ToastProps) => {

    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose()
        }, 5000);
        return ()=> clearTimeout(timer);
    }, [onClose])

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 rounded-md bg-green-600 max-wd-md"
      : "fixed top-4 right-4 z-50 rounded-md bg-red-600 max-wd-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg text-white font-semi-bold p-4">
            {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
