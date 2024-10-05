// src/app/layout.tsx
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import "./globals.css";

type Props = {
  children: React.ReactNode;
};

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
