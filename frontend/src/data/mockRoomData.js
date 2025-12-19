import deluxeKingRoom1 from '../assets/Deluxe_King_Room_1.webp';
import deluxeKingRoom2 from '../assets/Deluxe_King_Room_2.webp';
import presidentialSuite1 from '../assets/Presidential_Suite_1.jpg';
import presidentialSuite2 from '../assets/Presidential_Suite_2.webp';
import cozySingleRoom1 from '../assets/Cozy_Single_Room_1.jpg';
import cozySingleRoom2 from '../assets/Cozy_Single_Room_2.jpg';
import grandFamilyRoom1 from '../assets/Grand_Family_Room_1.jpeg';
import grandFamilyRoom2 from '../assets/Grand_Family_Room_2.jpeg';
import oceanViewDeluxe1 from '../assets/Ocean_View_Deluxe_1.jpg';
import oceanViewDeluxe2 from '../assets/Ocean_View_Deluxe_2.jpg';


export const mockRooms = [
  {
    id: "deluxe-101",
    name: "Deluxe King Room",
    description:
      "A spacious room with a king-size bed, city view, and a luxurious marble bathroom. Perfect for couples or solo travelers seeking comfort.",
    price: 750,
    rating: 4.8,
    type: "Deluxe",
    amenities: ["Wi-Fi", "AC", "Breakfast", "Parking"],
    images: [
      deluxeKingRoom1,
      deluxeKingRoom2      
    ],
  },
  {
    id: "suite-201",
    name: "Presidential Suite",
    description:
      "The pinnacle of luxury. This suite features a separate living area, panoramic city views, a private jacuzzi, and 24/7 butler service.",
    price: 800,
    rating: 5.0,
    type: "Suite",
    amenities: ["Wi-Fi", "Pool", "AC", "Breakfast", "Parking"],
    images: [
      presidentialSuite1,
      presidentialSuite2
    ],
  },
  {
    id: "single-301",
    name: "Cozy Single Room",
    description:
      "A comfortable and elegant room designed for the solo traveler. Features a plush single bed, work desk, and all essential amenities.",
    price: 950,
    rating: 4.5,
    type: "Single",
    amenities: ["Wi-Fi", "AC", "Parking"],
    images: [
      cozySingleRoom1,
      cozySingleRoom2
    ],
  },
  {
    id: "family-102",
    name: "Grand Family Room",
    description:
      "Perfect for families, this room offers two queen beds, a kitchenette, and a spacious layout. Enjoy comfort for the whole family.",
    price: 600,
    rating: 4.7,
    type: "Family",
    amenities: ["Wi-Fi", "AC", "Breakfast", "Parking"],
    images: [
      grandFamilyRoom1,
      grandFamilyRoom2
    ],
  },
  {
    id: "deluxe-202",
    name: "Ocean View Deluxe",
    description:
      "Wake up to stunning ocean views. This deluxe room offers a private balcony, a king-size bed, and premium amenities.",
    price: 550,
    rating: 4.9,
    type: "Deluxe",
    amenities: ["Wi-Fi", "Pool", "AC", "Breakfast"],
    images: [
      oceanViewDeluxe1,
      oceanViewDeluxe2
    ],
  },
];