import Link from "next/link";
import Image from "next/image";
import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  link,
}) => {
  return (
    <Link href={link} legacyBehavior>
      <a className="items-left justify-left block border rounded-lg p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex justify-left items-left mb-4">
          <div className="bg-size-100 rounded-card p-3 flex items-left justify-left">
            <Image
              src={icon}
              alt={title}
              className="w-15 h-15" // This class might not be effective. Ensure CSS defines 'w-15' and 'h-15'.
              layout="intrinsic"
              width={100}
              height={100}
            />
          </div>
        </div>
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </a>
    </Link>
  );
};

export default ToolCard;
