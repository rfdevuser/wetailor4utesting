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
  { name: "Blouse Designs", link: "/MTM_Blouse", category: "Bespoke" },
 


  
 { name: "Haldi", link: "/WeddingCategoryPage/haldi", category: "Wedding" },
 { name: "Mehendi", link: "/WeddingCategoryPage/mehendi", category: "Wedding" },
 { name: "Reception", link: "/WeddingCategoryPage/reception", category: "Wedding" },
 { name: "Sangeet", link: "/WeddingCategoryPage/sangeet", category: "Wedding" },
 { name: "Wedding", link: "/WeddingCategoryPage/wedding", category: "Wedding" },
 { name: "Engagement", link: "/WeddingCategoryPage/engagement", category: "Wedding" },

 { name: "Birthday", link: "/lining-fabric-store", category: "Celebration" },
 { name: "Mundan", link: "/lining-fabric-store", category: "Celebration" },
 { name: "Namkaran", link: "/lining-fabric-store", category: "Celebration" },
 { name: "Upanayana", link: "/lining-fabric-store", category: "Celebration" },

 { name: "Men", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Women", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Kids", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Toddler", link: "/lining-fabric-store", category: "Festival Corner" },
 { name: "Family", link: "/lining-fabric-store", category: "Festival Corner" },

 { name: "BEAUTY & SPA", link: "/B2BsubCategoryPage/BeautyandSpa", category: "Corporate Uniforms" },
 { name: "HOSPITAL", link: "/B2BsubCategoryPage/Hospital", category: "Corporate Uniforms" },
 { name: "HOTEL", link: "/B2BsubCategoryPage/Hotel", category: "Corporate Uniforms" },
 { name: "RESTAURANT & BAR", link: "/B2BsubCategoryPage/ResturantandBar", category: "Corporate Uniforms" },
 { name: "SCHOOL UNIFORMS", link: "/B2BsubCategoryPage/SchoolUniform", category: "Corporate Uniforms" },
 { name: "COLLEGE UNIFORMS", link: "/B2BsubCategoryPage/CollegeUniforms", category: "Corporate Uniforms" },
 { name: "CORPORATE UNIFORMS", link: "/B2BsubCategoryPage/CorporateUniforms", category: "Corporate Uniforms" },

 { name: "Main Fabric Store", link: "/Fabric_Store", category: "Store" },
  { name: "Lining Fabric Store", link: "/Lining_Store", category: "Store" },

  
 { name: "My Account", link: "/MyAccount", category: "Setting" },
 { name: "Custom Room", link: "/CustomerRoom", category: "Setting" },
 { name: "Send Your Fabric", link: "/SendYourFabric", category: "Setting" },
 { name: "Saved Address", link: "/CustomerAddress", category: "Setting" },
 { name: "Order History", link: "/OrderHistory", category: "Setting" },
  { name: "Terms and Policy", link: "/TermsAndConditions", category: "Setting" },

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
