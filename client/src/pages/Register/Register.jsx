import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

import { registerUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

    useEffect(() => {
    setFormData({
      name: "",
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
        await registerUser(
          formData
        );

      login(
        data.user,
        data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

      toast.success(
        "Account created successfully"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h1>

        <form
          autoCapitalize="off"
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/login"
            className="text-purple-600 ml-2 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;