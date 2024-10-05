// Use client pragma for client-side rendering
"use client";

// Import necessary modules and components from React, Next.js, and local components
import React, { useState } from "react";
import PricingToggle from "@/components/pricing/pricingToggle";
import BackButton from "@/components/pricing/backButton";
import PricingCard from "@/components/pricing/pricingCard";
import Image from "next/image";
import { NextPage } from "next";

// Define the BillingCycle type
type BillingCycle = "MONTHLY" | "YEARLY";

// Define the PlanType interface for the pricing plans
type PlanType = {
  plan: string;
  price: number;
  yearlyPrice: number;
  features: string[];
};

// Define the Pricing component
const Pricing: NextPage = () => {
  // Use useState to manage billing cycle and selected plan state
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Function to handle billing cycle toggle, accepts any string and validates it as a BillingCycle
  const handleToggle = (cycle: string) => {
    if (cycle === "MONTHLY" || cycle === "YEARLY") {
      setBillingCycle(cycle);
    } else {
      console.error("Invalid billing cycle:", cycle);
    }
  };

  // Array of plan objects
  const plans: PlanType[] = [
    {
      plan: "Starter",
      price: 20,
      yearlyPrice: 200,
      features: [
        "Book Writer",
        "Unlimited Characters Creation",
        "Auto Complete Suggestions",
      ],
    },
    {
      plan: "Pro",
      price: 50,
      yearlyPrice: 500,
      features: [
        "Creative Catalyst",
        "Screenplay Writer",
        "Book Writer",
        "Book to Screenplay Converter",
        "Unlimited Characters Creation",
        "Unlimited Scripts Creation",
        "Auto Complete Suggestions",
        "Auto Script Elements Tagging",
      ],
    },
    {
      plan: "Enterprise",
      price: 70,
      yearlyPrice: 700,
      features: [
        "Creative Catalyst",
        "Screenplay Writer",
        "Book Writer",
        "Book to Screenplay Converter",
        "Unlimited Characters Creation",
        "Unlimited Scripts Creation",
        "Unlimited Books Creation",
        "Voice Chat in Creative Catalyst",
        "Famous Writers Assistance",
        "Auto Complete Suggestions",
        "Auto Script Elements Tagging",
      ],
    },
  ];

  // Function to handle plan selection
  const handlePlanSelect = (planName: string) => {
    setSelectedPlan((prevPlan) => (prevPlan === planName ? null : planName));
  };

  // Function to calculate the total price based on the selected plan and billing cycle
  const calculateTotalPrice = () => {
    const plan = plans.find((p) => p.plan === selectedPlan);
    return plan
      ? billingCycle === "MONTHLY"
        ? plan.price
        : plan.yearlyPrice
      : 0;
  };

  // JSX for the Pricing page
  return (
    <div className="relative bg-gray-100 py-10">
      <BackButton />
      <div className="text-center mb-12">
        <Image
          src="/assets/logo/svgs/logo_black_box.svg"
          alt="Logo"
          className="mx-auto mb-4 w-12 h-12"
          width={48}
          height={48}
        />
        <h1 className="text-4xl font-bold text-gray-800">LOWERATED WRITER</h1>
        <p className="mt-2 text-gray-600">
          Make your moviemaking dream a reality. Get four essential tools,
          including Creative Catalyst, Book Writer, Screenplay Writer, and
          Storyline Converter.
        </p>
        <div className="pt-10">
          <PricingToggle onToggle={handleToggle} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.plan}
              planName={plan.plan}
              price={plan.price}
              yearlyPrice={plan.yearlyPrice}
              billingCycle={billingCycle}
              features={plan.features}
              isSelected={selectedPlan === plan.plan}
              onSelect={() => handlePlanSelect(plan.plan)}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 right-0 m-8">
        <button
          className={`px-5 py-4 text-2xl font-bold bg-[#1B1F8A] text-white rounded-sm transition-opacity duration-300 shadow-lg ${
            selectedPlan ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!selectedPlan}
        >
          Checkout - ${calculateTotalPrice()}
        </button>
      </div>
    </div>
  );
};

// Export the Pricing component as the default export
export default Pricing;
