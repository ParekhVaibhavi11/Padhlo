import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, BookOpen } from "lucide-react";

import { loginUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.user, data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

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

          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Smart Study Platform</span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-white">
              Elevate your learning journey today.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connect with study rooms, track your productivity tasks, and access shared classroom materials all in one place.
            </p>
          </div>

          <div className="text-xs text-slate-400 border-t border-white/10 pt-4">
            © {new Date().getFullYear()} Padhlo Inc. All rights reserved.
          </div>
        </div>

        {/* Right Form Column */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 text-sm mt-1">Please enter your details to sign in.</p>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@student.edu"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition duration-200"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Don't have an account?
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 ml-1.5 font-semibold transition"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;