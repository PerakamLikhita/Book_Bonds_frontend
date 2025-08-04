import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('file:///home/rguktongole/Downloads/pexels-rickyrecap-1907785.jpg')`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-brightness-110 z-10" />

      <div className="overlay fixed inset-0 flex justify-center items-center z-20">
        <div className="bg-black bg-opacity-70 text-white p-8 rounded-xl shadow-lg w-[400px] relative z-30 border border-white/10">
          <h2 className="text-center mb-5 text-xl font-bold">Login to BookBonds</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md transition"
            >
              Login
            </button>

            <div className="text-center text-sm mt-4">
              Don’t have an account?{' '}
              <a
                href="/register"
                className="text-[#0077cc] font-bold hover:underline"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
