import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";

type ToolCardProps = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

const ToolCard: NextPage<ToolCardProps> = ({
  title,
  description,
  icon,
  link,
}) => {
  return (
    <Link href={link} legacyBehavior>
      <a className="block border rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-size-100 p-3 flex items-center justify-center">
            <Image
              src={icon}
              alt={title}
              className="w-40 h-52 rounded-card shadow-lg"
              layout="intrinsic"
              width={150}
              height={150}
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
