import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

import { registerUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { label: "", color: "bg-slate-800", score: 0 };
    if (pwd.length < 6) return { label: "Weak (Min 6 chars)", color: "bg-rose-500", score: 33 };
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
      return { label: "Strong", color: "bg-emerald-500", score: 100 };
    }
    return { label: "Medium", color: "bg-amber-500", score: 66 };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(formData);

      login(data.user, data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10">
        
        {/* Left Visual Column */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-r border-slate-800/80 text-white relative">
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <BookOpen className="w-6 h-6 text-purple-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                Padhlo
              </span>
            </Link>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Join Thousands of Students</span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-white">
              Start learning smarter, not harder.
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Collaborative study groups & active classrooms</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Task management & streak tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Shared study materials & peer leaderboards</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 border-t border-white/10 pt-4">
            © {new Date().getFullYear()} Padhlo Inc. All rights reserved.
          </div>
        </div>

        {/* Right Form Column */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-slate-400 text-sm mt-1">Sign up for your free Padhlo account.</p>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@student.edu"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-11 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2.5">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-400">Password strength:</span>
                    <span className="text-slate-300 font-medium">{passwordStrength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.score}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 ml-1.5 font-semibold transition"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;