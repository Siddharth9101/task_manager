import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import type { LoginUserInput } from "../types/user";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-md">
        <fieldset className="fieldset w-full rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-8">
          <legend className="fieldset-legend px-2 text-xl font-bold text-base-content sm:text-2xl">
            Login
          </legend>

          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="label text-base-content">
                Email
              </label>

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="john@gmail.com"
                aria-invalid={!!errors.email}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
              />

              {errors.email && (
                <p className="text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="label text-base-content">
                Password
              </label>

              <input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={!!errors.password}
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
              />

              {errors.password && (
                <p className="text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="btn btn-primary mt-2 w-full"
            >
              {loading || isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="mt-3 text-center text-sm text-base-content/70">
              Don't have an account?{" "}
              <a href="/register" className="link link-primary font-medium">
                Register
              </a>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
