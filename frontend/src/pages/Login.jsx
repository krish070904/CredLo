import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/authService";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
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
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-400 font-medium ml-4 block"
          >
            {error.message}
          </motion.span>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const onSubmit = async (data) => {
    try {
      await authService.login(data);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Login failed",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[400px] flex flex-col items-center z-10"
      >
        {}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mb-4"
        >
          <img
            src="/mascot.png"
            alt="CredLo Mascot"
            className="w-28 h-28 object-contain drop-shadow-2xl"
          />
        </motion.div>
        <h1 className="text-4xl font-amiko font-bold text-[#49BFBE] tracking-[0.2em] mb-10 drop-shadow-sm">
          CREDLO
        </h1>
        {}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 flex flex-col items-center"
        >
          <InputField
            type="email"
            placeholder="Email or Mobile"
            autoComplete="username"
            {...register("identifier", {
              required: "Email or Mobile is required",
            })}
            error={errors.identifier}
          />
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            icon={showPassword ? EyeOff : Eye}
            onIconClick={() => setShowPassword(!showPassword)}
            {...register("password", { required: "Password is required" })}
            error={errors.password}
          />
          {}
          <div className="w-[60%] flex justify-end">
            <Link
              to="#"
              className="text-sm text-gray-400 hover:text-[#49BFBE] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-[60%] text-black font-bold text-lg py-3 rounded-full mt-6 shadow-lg",
              "bg-[#49BFBE] hover:bg-[#3da8a7] hover:shadow-[0_0_25px_rgba(73,191,190,0.4)]",
              "transition-all duration-300 flex items-center justify-center gap-2",
              isSubmitting && "opacity-80 cursor-wait",
            )}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Login"
            )}
          </motion.button>
          {errors.root && (
            <p className="text-red-500 text-sm mt-4">{errors.root.message}</p>
          )}
        </form>
        {}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-gray-400 text-sm"
        >
          New User?{" "}
          <Link
            to="/register"
            className="text-[#49BFBE] font-semibold cursor-pointer hover:underline hover:text-[#3da8a7] transition-colors"
          >
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};
export default Login;
