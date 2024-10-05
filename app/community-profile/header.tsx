// import React from "react";
// import Image from "next/image";

// const Header = () => {
//   return (
//     <div className="bg-gray-900 text-white text-center py-4">
//       <div className="relative">
//         <Image
//           src="/path/to/banner.png"
//           alt="Lowerated Community"
//           className="w-full h-56 object-cover"
//         />
//         <span className="absolute top-2/3 left-1/2 transform -translate-x-1/2 text-2xl font-semibold">
//           where art is appreciated
//         </span>
//       </div>
//       <div className="flex justify-center mt-4 space-x-4">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           All
//         </button>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Books
//         </button>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Screenplays
//         </button>
//         <input
//           type="search"
//           placeholder="Search"
//           className="bg-gray-800 border border-gray-700 text-white rounded py-2 px-4"
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;

// // src/pages/index.js
// import Header from "./header";
// import UserProfile from "./communityProfile";
// import Content from "./content";

// export default function HomePage() {
//   const user = {
//     name: "Joey Styles",
//     email: "joey@gmail.com",
//     profilePicture: "/path/to/profile.jpg",
//     profileUrl: "https://lowerated.com/JoeyStyles",
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center space-x-8">
//           <UserProfile user={user} />
//           <Content isEmpty={true} />
//         </div>
//       </div>
//     </div>
//   );
// }
