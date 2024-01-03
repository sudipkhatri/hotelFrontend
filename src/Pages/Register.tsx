import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
   const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async() => {
      showToast({ message: "Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const {  register, watch, handleSubmit, formState: { errors },} = useForm<RegisterFormData>();
  
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 max-w-lg mx-auto" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold tracking-tight"> Create An Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded  outline-none w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500"> {errors.firstName.message} </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full outline-none py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500"> {errors.lastName.message} </span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required.";
              } else if (watch("password") !== val) {
                return "your password do not match";
              }
            },
          })}
          className="border rounded outline-none w-full py-1 font-normal px-2"
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">
            {" "}
            {errors.confirmPassword.message}{" "}
          </span>
        )}
      </label>
      <div className="flex justify-between items-center">
        <span>
          Already have an account? <Link to="/sign-in">Login</Link>
        </span>
        <span>
          <button
            type="submit"
            className="text-white p-2 rounded transition px-4 duration-500 border border-teal-300 hover:border-black font-bold hover:bg-black bg-indigo-600"
          >
            Create Account
          </button>
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-5"></div>
    </form>
  );
};

export default Register;
