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
import Admodel from '@/components/Admodel'
const inter = Inter({ subsets: ["latin"] });
interface NavigationItem {
  name: string;
  link: string;
  category?: string;
}

const navigationData: NavigationItem[] = [
  { name: "Home", link: "/" , category: "Home" },
  { name: "Blouse Designs", link: "/blouse-designs", category: "Bespoke" },
 


  
 { name: "Haldi", link: "/lining-fabric-store", category: "Wedding" },
 { name: "Mehendi", link: "/lining-fabric-store", category: "Wedding" },
 { name: "Reception", link: "/lining-fabric-store", category: "Wedding" },
 { name: "Sangeet", link: "/lining-fabric-store", category: "Wedding" },
 { name: "Wedding", link: "/lining-fabric-store", category: "Wedding" },
 { name: "Reception", link: "/lining-fabric-store", category: "Wedding" },

 { name: "Birthday", link: "/lining-fabric-store", category: "Celebration" },
 { name: "Mundan", link: "/lining-fabric-store", category: "Celebration" },
 { name: "Namkaran", link: "/lining-fabric-store", category: "Celebration" },
 { name: "Upanayana", link: "/lining-fabric-store", category: "Celebration" },

 { name: "Men", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Women", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Kids", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Toddler", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Family", link: "/lining-fabric-store", category: "Festival Corner" },

 { name: "BEAUTY & SPA", link: "/spa", category: "Wholesale" },
 { name: "HOSPITAL", link: "/hospital", category: "Wholesale" },
 { name: "HOTEL", link: "/hotel", category: "Wholesale" },
 { name: "RESTAURANT & BAR", link: "/restaurant", category: "Wholesale" },
 { name: "SCHOOL UNIFORMS", link: "/school-uniforms", category: "Wholesale" },
 { name: "COLLEGE UNIFORMS", link: "/college-uniforms", category: "Wholesale" },
 { name: "CORPORATE UNIFORMS", link: "/corporate-uniforms", category: "Wholesale" },

 { name: "Main Fabric Store", link: "/Fabric_Store", category: "Store" },
  { name: "Lining Fabric Store", link: "/Lining_Store", category: "Store" },

  
 { name: "My Account", link: "/main-fabric-store", category: "Setting" },
 { name: "Saved Address", link: "/lining-fabric-store", category: "Setting" },
 { name: "Order History", link: "/main-fabric-store", category: "Setting" },
  { name: "Terms and Policy", link: "/lining-fabric-store", category: "Setting" },

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
          <Admodel/>
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
