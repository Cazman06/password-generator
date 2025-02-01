'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from './components/navigationbar';
import PasswordGenerator from './page';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBar></NavBar>
        <PasswordGenerator></PasswordGenerator>
      </body>
    </html>
  );
}
