import React, { useState } from "react";

interface PricingToggleProps {
  onToggle: (option: string) => void; // Function that accepts a string and returns void
}

const PricingToggle: React.FC<PricingToggleProps> = ({ onToggle }) => {
  const [active, setActive] = useState<string>("MONTHLY");

  const handleToggle = (option: string) => {
    setActive(option);
    onToggle(option);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-56 h-12 bg-gray-300 rounded-full shadow-inner flex items-center">
        <div
          className={`absolute top-0 h-full w-1/2 bg-gray-800 rounded-full transition-transform duration-300 ease-in-out ${
            active === "YEARLY" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        <button
          className={`relative z-10 w-1/2 h-full rounded-full text-sm font-semibold focus:outline-none transition-colors duration-300 ${
            active === "MONTHLY" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => handleToggle("MONTHLY")}
        >
          MONTHLY
        </button>
        <button
          className={`relative z-10 w-1/2 h-full rounded-full text-sm font-semibold focus:outline-none transition-colors duration-300 ${
            active === "YEARLY" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => handleToggle("YEARLY")}
        >
          YEARLY
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;
