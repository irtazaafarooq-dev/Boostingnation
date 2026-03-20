import "../globals.css";
// import { Inter, Syne } from "next/font/google";
import Navbar from "@/components/Navbar"; // <-- 1. Import it here
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer"; // <-- 2. Import it here
// import SmoothScroll from "@/components/SmoothScroll";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes'; // <-- 1. Import the dark theme
import LiveChat from "@/components/LiveChat";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat", 
});

export const metadata = {
  title: "Elite Gaming Marketplace",
  description: "Premium boosting and progression services.",
};

const customDarkAppearance = {
  variables: {
    colorPrimary: '#3b82f6',
    colorBackground: '#121820',
    colorText: '#ffffff',
    colorTextSecondary: '#ffffff',
  },
  elements: {
    headerTitle: "!text-white font-heading font-bold",
    headerSubtitle: "!text-white/70 font-body",
    dividerLine: "!bg-white/20",
    dividerText: "!text-white/50",
    formFieldLabel: "!text-white/80",
    formFieldInput: "!bg-[#0b0f14] !border-white/20 !text-white !placeholder-white/50 focus:!border-blue-500",
    formFieldInputShowPasswordButton: "!text-white/50 hover:!text-white",
    socialButtonsBlockButton: "!bg-[#0b0f14] hover:!bg-[#1a222c] !border !border-white/20 transition-colors",
    socialButtonsBlockButtonText: "!text-white font-bold",
    badge: "!bg-blue-500 !text-white !border-none !px-2 !py-0.5 !rounded-md",
    socialButtonsIconButton: "!bg-[#0b0f14] hover:!bg-[#1a222c] !border !border-white/20 transition-colors [&_svg_path]:!fill-white [&_svg]:!fill-white",
    footerActionText: "!text-white/60",
    footerActionLink: "!text-blue-500 hover:!text-blue-400",
    modalCloseButton: "!text-white/50 hover:!text-white",
    watermark: "!opacity-60 invert",
    userButtonPopoverCard: "!bg-[#121820] !border !border-white/10",
    userPreviewMainIdentifier: "!text-white font-bold",
    userPreviewSecondaryIdentifier: "!text-white/50",
    userButtonPopoverActionButton: "!text-white hover:!text-white hover:!bg-white/5 transition-colors",
    userButtonPopoverActionButtonText: "!text-white", 
    userButtonPopoverActionButtonIconBox: "!text-white", 
    userButtonPopoverActionButtonIcon: "!text-white",
    userButtonPopoverFooter: "!bg-[#0b0f14]",
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={customDarkAppearance}>

    <html lang="en" className={montserrat.variable}>
      <body className="antialiased selection:bg-blue-500 selection:text-white bg-agency-black text-agency-white">
        
        {/* <SmoothScroll> */}
          <Navbar />
          {children}
          <Footer/>
        {/* </SmoothScroll> */}
        <LiveChat />
      </body>
    </html>
    </ClerkProvider>
  );
}