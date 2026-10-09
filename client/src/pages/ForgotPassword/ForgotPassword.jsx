import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, Send, CheckCircle2, Sparkles } from "lucide-react";
import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const res = await forgotPassword(email);
      toast.success(res.message || "Reset link sent to your email!");
      setSubmitted(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl shadow-lg shadow-purple-500/30 mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Forgot Password?</h1>
          <p className="text-slate-400 text-sm mt-2">
            No worries! Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-6 py-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Reset Link Sent</h3>
              <p className="text-sm text-slate-400 mt-2">
                We've sent password reset instructions to <br />
                <span className="text-purple-300 font-medium">{email}</span>
              </p>
            </div>
            <div className="pt-4 space-y-3">
              <button
                onClick={() => setSubmitted(false)}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition duration-200"
              >
                Didn't receive email? Try again
              </button>
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition duration-200"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.edu"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-slate-400 hover:text-purple-300 font-medium transition duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
