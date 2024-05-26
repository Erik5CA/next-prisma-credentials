"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      console.log("redirect");
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div className="mt-5 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-1/4 border border-white/30  p-8 rounded-md"
      >
        <h1 className="font-bold text-slate-300 text-4xl mb-4 pb-3 border-b border-white/30">
          Login
        </h1>
        {error && <p className="bg-red-500 text-sm p-2 rounded">{error}</p>}
        <label htmlFor="email" className="text-slate-500 text-sm block mb-2">
          Email:
        </label>
        <input
          type="email"
          className="p-3 rounded block mb-2 border border-white/30 bg-transparent text-slate-300 w-full"
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
          className="p-3 rounded block mb-2 border border-white/30 bg-transparent text-slate-300 w-full"
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

        <button
          className="bg-green-600 p-3 mt-2 text-white text-xl rounded-lg w-full transition-all hover:bg-green-800"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
