
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-300">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Image
            src="/assets/images/login-screen-image.svg"
            alt="Illustration"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-4 md:p-8 relative z-10">
        <div className="absolute inset-0 bg-white rounded-l-[100px] md:rounded-none"></div>
        <div className="w-full max-w-md relative z-20 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/assets/logo/svgs/logo_black.svg"
                alt="logo-black"
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-center mt-4">
              Welcome to Lowerated Writer
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Let&apos;s Turn Your Ideas into Stories
            </p>

            <div className="pt-6">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
