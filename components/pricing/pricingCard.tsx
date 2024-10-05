import React from "react";

interface PricingCardProps {
  planName: string;
  price: number;
  yearlyPrice: number;
  billingCycle: "MONTHLY" | "YEARLY";
  features: string[];
  isSelected: boolean;
  onSelect: () => void; // Assuming onSelect is a function that takes no arguments
}

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  yearlyPrice,
  billingCycle,
  features,
  isSelected,
  onSelect,
}) => {
  const displayPrice =
    billingCycle === "MONTHLY" ? `$${price}` : `$${yearlyPrice}`;
  const cycleText = billingCycle === "MONTHLY" ? "month" : "year";

  return (
    <div
      className={`relative bg-white shadow-md rounded-lg p-6 w-90 transform transition-transform duration-300 ${
        isSelected ? "scale-105 border-2 border-gray-800" : ""
      }`}
    >
      <div className="text-[#1B1F8A] text-3xl font-bold">{displayPrice}</div>
      <div className="text-gray-500 text-sm font-medium">/ {cycleText}</div>
      <div className="mt-4 text-xl font-semibold text-gray-800">{planName}</div>
      <hr className="my-4 border-gray-300" />
      <ul className="space-y-3 text-gray-600 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {" "}
            {/* Using index as key is not recommended unless list items have no unique id */}
            <svg
              className="h-5 w-5 text-gray-800 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`mt-6 w-full py-2 rounded-lg font-semibold transition-colors duration-300 ${
          isSelected
            ? "bg-[#1B1F8A] text-white"
            : "bg-[#070824] text-white hover:bg-[#1e1e1e]"
        }`}
        onClick={onSelect}
      >
        {isSelected ? "Selected" : "Choose Plan"}
      </button>
    </div>
  );
};

export default PricingCard;
