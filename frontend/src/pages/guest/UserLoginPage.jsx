import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../features/userAuthSlice"; 
import Button from "../../components/Button";
import { motion } from "framer-motion";

const UserLoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLoggedIn, error, loading } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
        dispatch(registerUser({ name, email, password }));
    } else {
        dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-soft-white p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-heading text-center text-gold mb-2">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-center font-body text-gray-600 mb-8">
          {isRegistering ? "Join Serenity Hotels" : "Please sign in to continue"}
        </p>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {isRegistering && (
            <div>
                <label className="block text-sm font-body font-medium text-gray-700">Full Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                required
                />
            </div>
          )}

          <div>
            <label className="block text-sm font-body font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : (isRegistering ? "Sign Up" : "Sign In")}
          </Button>
        </form>

        <div className="mt-6 text-center">
            <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-gold hover:underline font-body text-sm"
            >
                {isRegistering 
                    ? "Already have an account? Sign In" 
                    : "Don't have an account? Sign Up"}
            </button>
        </div>

      </motion.div>
    </div>
  );
};



export default UserLoginPage;