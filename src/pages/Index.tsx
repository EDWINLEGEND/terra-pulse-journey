
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import GlobalSnapshot from "@/components/GlobalSnapshot";
import DataCharts from "@/components/DataCharts";
import ActNow from "@/components/ActNow";
import Footer from "@/components/Footer";

const Index = () => {
  // Check for dark mode preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <main className="min-h-screen">
      <NavBar />
      <Hero />
      <GlobalSnapshot />
      <DataCharts />
      <ActNow />
      <Footer />
    </main>
  );
};

export default Index;
