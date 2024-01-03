import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: async(error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center bg-black p-3 text-white px-6 font-bold hover:bg-indigo-700 transition duration-500 ease-in-out border border-teal-300 hover:border-black rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
