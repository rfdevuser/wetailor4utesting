import Image from "next/image";
import ChatLandingPage from '@/components/ChatLandingPage'
import { Metadata } from "next";
import Hero from "@/components/Hero";
 import B2BNav from "@/components/B2BNav"
 import WeddingLandingPage from '@/components/WeddingLandingPage'
 import FabricLandingPage from '@/components/FabricLandingPage'
 import CelebrationLandingPage from '@/components/CelebrationLandingPage'
 import FestivalLandingPage from '@/components/FestivalLandingPage'
export const metadata: Metadata = {
  title: "WeTailor4u",
  description: "Welcome to WeTailor4u",
  // other metadata
};

export default function Home() {
  return (
    <>


    <B2BNav/>

 <Hero />
 
 <WeddingLandingPage/>
 <CelebrationLandingPage/>
 <FabricLandingPage/>

 <FestivalLandingPage/>
 {/* <ChatLandingPage/> */}
     </>
  );
}
