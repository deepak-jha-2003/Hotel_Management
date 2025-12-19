import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, deleteMessage } from "../../features/contactSlice"; // Import deleteMessage
import { motion } from "framer-motion";
import { FaEnvelope, FaTrash, FaReply } from "react-icons/fa"; // Import Icons

const AdminMessagesPage = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(id));
    }
  };

  const handleReply = (email, name) => {
    // Opens default email client with pre-filled details
    const subject = `Reply to your inquiry - Serenity Hotels`;
    const body = `Hi ${name},\n\nThank you for contacting us.\n\nBest Regards,\nSerenity Team`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-heading text-deep-brown mb-6 flex items-center">
        <FaEnvelope className="mr-3 text-gold" /> User Messages
      </h1>

      <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-hidden">
        <div className="grid gap-6">
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="border-b border-gray-100 pb-4 last:border-0 hover:bg-beige/30 p-4 rounded transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-deep-brown">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-gold hover:underline">{msg.email}</a>
                  </div>
                  <div className="flex items-center space-x-3">
                     <span className="text-xs text-gray-400 mr-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    
                    {/* REPLY BUTTON */}
                    <button 
                      onClick={() => handleReply(msg.email, msg.name)}
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full transition-colors"
                      title="Reply via Email"
                    >
                      <FaReply />
                    </button>

                    {/* DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"
                      title="Delete Message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="font-body text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
                  {msg.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">No messages found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminMessagesPage;