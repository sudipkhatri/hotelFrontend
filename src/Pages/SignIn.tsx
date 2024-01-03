import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
    const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Login Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const { register, handleSubmit, formState: { errors }} = useForm<SignInFormData>();

  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data)
  })

  
  return (
    <form className="flex flex-col gap-5 max-w-lg mx-auto" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold tracking-tight"> Sign In</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded outline-none w-full py-1 px-2 font-normal"
            {...register("email", { required: "email is required" })}
          ></input>
          {errors.email && (
            <span className="text-red-500"> {errors.email.message} </span>
          )}
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "password must be of 6 characters",
              },
            })}
            className="border rounded outline-none w-full py-1 px-2 font-normal"
          ></input>
          {errors.password && (
            <span className="text-red-500"> {errors.password.message} </span>
          )}
        </label>
      </div>
      <div className="flex justify-between ">
        <span>
            Already have an account?{" "}
            <Link to="/register">Register</Link>
        </span>
        <span>
          <button
            type="submit"
            className="text-white p-2 px-5 rounded font-bold hover:bg-black bg-indigo-600"
          >
            Sign In
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignIn;
