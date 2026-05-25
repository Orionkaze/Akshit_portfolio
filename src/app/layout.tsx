import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import FilmGrain from "@/components/ui/FilmGrain";
import Letterbox from "@/components/ui/Letterbox";
import SceneNav from "@/components/ui/SceneNav";
import SplashCursor from "@/components/ui/SplashCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Akshit | Cinematic Portfolio",
  description: "A cinematic, immersive 3D personal portfolio of Akshit — Full-Stack Developer & CTO @ Arcavon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-inter bg-black antialiased relative`}
      >
        <SplashCursor />
        <FilmGrain />
        <Cursor />
        <Letterbox />
        <SceneNav />
        {children}
      </body>
    </html>
  );
}

