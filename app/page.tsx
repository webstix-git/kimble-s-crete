import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CautionTape from "@/components/CautionTape";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import ServiceArea from "@/components/ServiceArea";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FloatingBackToTop } from "@/components/BackToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CautionTape />
        <About />
        <Services />
        <WhyChooseUs />
        <Process />
        <Gallery />
        <ServiceArea />
        <CtaBanner />
        <CautionTape />
        <Contact />
      </main>
      <Footer />
      <FloatingBackToTop />
    </>
  );
}
