import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/userAuthSlice";
import Modal from "./Modal";
import Button from "./Button";

const SignInModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [username,setUsername]=useState("Demo User");
  const [email, setEmail] = useState("demo@user.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Sign In">
      <form onSubmit={handleLogin} className="space-y-4 font-body">
      <div>
          <label className="block text-sm font-medium text-gray-700">
           Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg hover:ring-1 hover:outline-none hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email (demo)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg hover:ring-1 hover:outline-none hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password (demo)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg hover:outline-none hover:ring-1 hover:ring-gold focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignInModal;