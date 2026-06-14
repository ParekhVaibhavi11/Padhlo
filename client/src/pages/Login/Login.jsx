import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

import { loginUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
  setFormData({
    email: "",
    password: "",
  });
}, []);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await loginUser(formData);

      login(
        data.user,
        data.token
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Welcome Back
        </h1>

        <form
          autocomplete="off"
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        <p className="text-center mt-4">

          Don't have an account?

          <Link
            to="/register"
            className="text-purple-600 ml-2 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;