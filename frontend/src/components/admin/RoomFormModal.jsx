import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRoom, updateRoom } from "../../features/roomSlice";
import Modal from "../Modal";
import Button from "../Button";
import { FaSpinner } from "react-icons/fa";

const RoomFormModal = ({ isOpen, onClose, room }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Deluxe",
    price: "",
    description: "",
    amenities: [],
    images: "",
    isAvailable: true, // Default to true
  });

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || "",
        type: room.type || "Deluxe",
        price: room.price || "",
        description: room.description || "",
        amenities: room.amenities || [],
        images: Array.isArray(room.images) && room.images.length > 0 ? room.images[0] : "",
        // Handle existing value safely
        isAvailable: room.isAvailable !== undefined ? room.isAvailable : true,
      });
    } else {
      setFormData({
        name: "",
        type: "Deluxe",
        price: "",
        description: "",
        amenities: [],
        images: "",
        isAvailable: true,
      });
    }
  }, [room, isOpen]);

  const allAmenities = ["Wi-Fi", "Pool", "AC", "Breakfast", "Parking"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle Checkbox logic
    if (type === "checkbox" && name === "isAvailable") {
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large! Max 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, images: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const roomData = {
      ...formData,
      price: parseFloat(formData.price),
      images: [formData.images],
    };

    try {
      if (room) {
        await dispatch(updateRoom({ id: room.id, ...roomData })).unwrap();
      } else {
        await dispatch(addRoom(roomData)).unwrap();
      }
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("Error saving room: " + error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={room ? "Edit Room" : "Add New Room"}
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-body text-deep-brown">
        <div>
          <label className="block text-sm font-bold mb-1">Room Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Single">Single</option>
              <option value="Family">Family</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
        </div>

        {/* --- NEW: Availability Checkbox --- */}
        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded border border-gray-200">
            <input 
                type="checkbox" 
                name="isAvailable" 
                checked={formData.isAvailable} 
                onChange={handleChange}
                className="w-5 h-5 accent-gold cursor-pointer"
                id="avail-check"
            />
            <label htmlFor="avail-check" className="font-bold text-sm cursor-pointer select-none">
                Available for Booking
            </label>
        </div>
        {/* ---------------------------------- */}

        <div>
          <label className="block text-sm font-bold mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {allAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => handleAmenityChange(amenity)} className="accent-gold" />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Room Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500" required={!room} />
          {formData.images && (
            <img src={formData.images} alt="Preview" className="mt-2 h-20 w-32 object-cover rounded border" />
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : (room ? "Update Room" : "Add Room")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomFormModal;