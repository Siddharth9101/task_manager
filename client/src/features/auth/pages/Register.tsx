import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import type { RegisterUserInput } from "../types/user";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { handleRegister } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6">
      <form onSubmit={handleSubmit(handleRegister)} className="w-full max-w-md">
        <fieldset className="fieldset w-full rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-8">
          <legend className="fieldset-legend px-2 text-xl font-bold text-base-content sm:text-2xl">
            Register
          </legend>

          <div className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="label text-base-content">
                Name
              </label>

              <input
                {...register("name", {
                  required: "Name is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Name cannot be empty",
                })}
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                aria-invalid={!!errors.name}
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
              />

              {errors.name && (
                <p className="text-sm text-error">{errors.name.message}</p>
              )}
            </div>

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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
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
              disabled={isSubmitting}
              className="btn btn-primary mt-2 w-full"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>

            <p className="text-center text-sm text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
