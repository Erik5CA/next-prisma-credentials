"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    const resJson = await res.json();
    if (res.ok) {
      router.push("/auth/login");
    }
    console.log(resJson);
  });

  return (
    <div className="mt-5 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-1/4 border border-white/50  p-8 rounded-md"
      >
        <h1 className="font-bold text-slate-300 text-4xl mb-4">Register</h1>

        <label htmlFor="username" className="text-slate-500 text-sm block mb-2">
          Username:
        </label>
        <input
          type="text"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <label htmlFor="email" className="text-slate-500 text-sm block mb-2">
          Email:
        </label>
        <input
          type="email"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label htmlFor="password" className="text-slate-500 text-sm block mb-2">
          Password:
        </label>
        <input
          type="password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <label htmlFor="password" className="text-slate-500 text-sm block mb-2">
          Confirm Password:
        </label>
        <input
          type="confirmPassword"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          className="bg-blue-500 p-3 mt-2 text-white rounded-lg w-full"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
