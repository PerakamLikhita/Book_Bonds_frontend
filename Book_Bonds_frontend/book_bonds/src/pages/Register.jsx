import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    id: "",
    contact: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@rguktong\.ac\.in$/;
    const contactPattern = /^\d{10}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Email must end with @rguktong.ac.in");
      return false;
    }
    if (!contactPattern.test(formData.contact)) {
      alert("Contact number must be exactly 10 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await api.post("/auth/register", formData);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const clearForm = () =>
    setFormData({
      name: "",
      email: "",
      password: "",
      department: "",
      id: "",
      contact: ""
    });

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/home/rguktongole/Downloads/Back to the Future.png')`
      }}
    >
      <div className="absolute top-5 left-8 text-2xl font-bold bg-gradient-to-r from-[#00eaff] to-[#8e54e9] bg-clip-text text-transparent z-20">
        BookBonds
      </div>

      <div className="overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-7 rounded-xl shadow-lg w-[380px] backdrop-blur-md text-black">
          <h2 className="text-center mb-5 text-[22px] text-black">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="font-bold text-sm mb-1 block">
                Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-2 py-2 text-sm border border-gray-400 rounded-md bg-white/20 text-black"
              />
            </div>

            <div className="form-group mb-3">
              <label className="font-bold text-sm mb-1 block">
                College Email<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your college email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-2 text-sm border border-gray-400 rounded-md bg-white/20 text-black"
              />
            </div>

            <div className="form-group mb-3">
              <label className="font-bold text-sm mb-1 block">
                Password<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-2 text-sm border border-gray-400 rounded-md bg-white/20 text-black"
              />
            </div>

            <div className="flex gap-3 mb-3">
              <div className="form-group flex-1">
                <label className="font-bold text-sm mb-1 block">
                  Department<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-2 py-2 text-sm border border-gray-400 rounded-md bg-white/20 text-black"
                />
              </div>

              <div className="form-group flex-1">
                <label className="font-bold text-sm mb-1 block">
                  ID No<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="id"
                  required
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full px-2 py-2 text-sm border border-gray-400 rounded-md bg-white/20 text-black"
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="font-bold text-sm mb-1 block">
                Contact No.<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="contact"
                maxLength="10"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-2 py-2 text-sm border border-gray-400 rounded-md bg-white/20 text-black"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 py-2 font-bold bg-blue-700 text-white rounded-md hover:scale-105 transition"
              >
                Register
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="flex-1 py-2 font-bold bg-blue-700 text-white rounded-md hover:scale-105 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
