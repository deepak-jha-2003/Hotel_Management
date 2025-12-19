
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { rateRoom } from "../features/roomSlice";
import Modal from "./Modal";
import Button from "./Button";
import { FaStar } from "react-icons/fa";

const RatingModal = ({ isOpen, onClose, roomId, userId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    dispatch(rateRoom({ id: roomId, rating, review, userId }))
      .unwrap()
      .then(() => {
        alert("Thank you for your feedback!");
        onClose();
        setReview("");
        setRating(5);
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate Your Stay">
      <form onSubmit={handleSubmit} className="space-y-4 text-center">
        <p className="text-gray-600 text-sm">How was your experience?</p>
        
        {/* Star Input */}
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer transition-colors duration-200"
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none"
          rows="3"
          placeholder="Write a review (optional)..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="flex justify-end pt-2">
            <Button type="submit">Submit Rating</Button>
        </div>
      </form>
    </Modal>
  );
};

export default RatingModal;