import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, ChevronDown, Calendar } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Eye, EyeOff } from "lucide-react";
import Prism from "../components/Prism";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const InputField = React.forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      onIconClick,
      type = "text",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative group">
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-[#535558] text-white placeholder-gray-400 px-6 py-3.5 rounded-full outline-none",
              "border border-white/10 focus:border-[#49BFBE] focus:ring-1 focus:ring-[#49BFBE]/50",
              "transition-all duration-300 ease-out",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/50",
              className,
            )}
            {...props}
          />
          {Icon && (
            <button
              type="button"
              onClick={onIconClick}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors",
                onIconClick
                  ? "cursor-pointer hover:text-white"
                  : "pointer-events-none",
              )}
            >
              <Icon size={18} />
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-400 font-medium ml-4 block">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";
const SelectField = React.forwardRef(
  ({ options, placeholder, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative group">
          <select
            ref={ref}
            className={cn(
              "w-full bg-[#535558] text-white placeholder-gray-400 px-6 py-3.5 rounded-full outline-none appearance-none cursor-pointer",
              "border border-white/10 focus:border-[#49BFBE] focus:ring-1 focus:ring-[#49BFBE]/50",
              "transition-all duration-300 ease-out",
              "invalid:text-gray-400",
              className,
            )}
            defaultValue=""
            {...props}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt} className="bg-[#535558] text-white">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
        {error && (
          <span className="text-xs text-red-400 font-medium ml-4 block">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
SelectField.displayName = "SelectField";
import { indianStatesAndCities } from "../data/indianLocations";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const selectedState = watch("state");
  const cities = selectedState
    ? indianStatesAndCities[selectedState] || []
    : [];
  const states = Object.keys(indianStatesAndCities).sort();
  const [showPassword, setShowPassword] = React.useState(false);
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Registration failed",
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#060D0C] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>
      {}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#49BFBE]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#49BFBE]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[450px] flex flex-col items-center z-10 my-10"
      >
        {}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <img
            src="/MASCOTHIGH.png"
            alt="CredLo Mascot"
            className="w-32 h-32 object-contain drop-shadow-2xl"
          />
        </motion.div>
        <h1 className="text-4xl font-amiko font-bold text-[#49BFBE] tracking-[0.2em] mb-8 drop-shadow-sm">
          CREDLO
        </h1>
        {}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 flex flex-col items-center"
        >
          <InputField
            placeholder="Name"
            autoComplete="name"
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />
          <InputField
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            error={errors.email}
          />
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            icon={showPassword ? EyeOff : Eye}
            onIconClick={() => setShowPassword(!showPassword)}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 chars" },
            })}
            error={errors.password}
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <InputField
              type="tel"
              placeholder="Mobile No."
              {...register("mobile", { required: "Mobile number is required" })}
              error={errors.mobile}
            />
            <InputField
              type="date"
              placeholder="DD-MM-YYYY"
              className="text-gray-400 valid:text-white"
              {...register("dob", { required: "Date of birth is required" })}
              error={errors.dob}
            />
          </div>
          <InputField
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
            error={errors.address}
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <SelectField
              placeholder="State"
              options={states}
              {...register("state", {
                required: "State is required",
                onChange: (e) => {
                  setValue("city", "");
                },
              })}
              error={errors.state}
            />
            <SelectField
              placeholder="City"
              options={cities}
              {...register("city", { required: "City is required" })}
              error={errors.city}
              disabled={!selectedState}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-[50%] text-black font-bold text-lg py-3 rounded-full mt-6 shadow-lg",
              "bg-[#49BFBE] hover:bg-[#3da8a7] hover:shadow-[0_0_25px_rgba(73,191,190,0.4)]",
              "transition-all duration-300 flex items-center justify-center gap-2",
              isSubmitting && "opacity-80 cursor-wait",
            )}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Register"
            )}
          </motion.button>
          {errors.root && (
            <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
          )}
        </form>
        {}
        <div className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-[#49BFBE] hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;
