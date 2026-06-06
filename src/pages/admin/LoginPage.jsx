import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Login failure: ", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] flex items-center justify-center p-4 text-white">
      <div className="bg-transparent md:bg-[#121212] md:border md:border-neutral-800 rounded-sm px-10 py-12 w-full max-w-[350px] flex flex-col items-center">
        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter mb-8">
          <span className="text-white">DIGITAL</span>
          <span style={{ color: '#CCFF00' }}>SURVEY</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5">
          {error && (
            <div className="text-red-500 font-semibold text-sm text-center mb-2">
              {error}
            </div>
          )}

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Phone number, username, or email"
            required
            className="w-full bg-[#121212] border border-neutral-700 rounded-sm px-3 py-2 text-xs font-normal text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-0"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-[#121212] border border-neutral-700 rounded-sm px-3 py-2 text-xs font-normal text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-0"
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white font-semibold text-sm py-2 rounded-lg transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Divider lines */}
        <div className="w-full flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-xs font-semibold text-neutral-400 uppercase">or</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        {/* Forgot password */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            alert("Mock credentials: admin@digitalsurvey.com / adminpassword");
          }}
          className="text-xs font-normal text-[#E0F1FF] hover:text-white transition-colors"
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
}
