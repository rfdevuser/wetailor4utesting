"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apollo/ApolloClient';
import { Provider } from "react-redux";
import store from '@/redux/store'
import HelpWidget from '@/components/HelpWidget'
import AuthChecker from '@/components/AuthExpiryChecker/AuthChecker'
import ChatLandingPage from '@/components/ChatLandingPage'
const inter = Inter({ subsets: ["latin"] });
const navigationData = [
  { name: "Home", link: "/" },
  { name: "Blouse Designs", link: "/MTM_Blouse" },
  { name: "Main Fabric Store", link: "/Fabric_Store" },
  { name: "Lining Fabric Store", link: "/Lining_Store" },
  { name: "BEAUTY & SPA", link: "/B2BsubCategoryPage/1" },
  { name: "HOSPITAL", link: "/B2BsubCategoryPage/2" },
  { name: "HOTEL", link: "/B2BsubCategoryPage/3" },
  { name: "RESTAURANT & BAR", link: "/B2BsubCategoryPage/4" },
  { name: "SCHOOL UNIFORMS", link: "/B2BsubCategoryPage/5" },
  { name: "COLLEGE UNIFORMS", link: "/B2BsubCategoryPage/6" },
  { name: "CORPORATE UNIFORMS", link: "/B2BsubCategoryPage/7" },
  
];



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      
      <head />

      <body className={`bg-white dark:bg-black ${inter.className}`}>
      <Provider store={store}>
      <ApolloProvider client={client}>
      <AuthChecker>
      
          <Header />
          
        <Sidebar navigationData={navigationData}  />
       
          {children}
         
          <Footer/>
       
          <ChatLandingPage/>
          </AuthChecker>
          </ApolloProvider>
          </Provider>
        </body>
    </html>
  );
}
