
import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";
import React from "react";

const layoutPage = ({ children }: { children: React.ReactNode })=> {

  
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Navbar></Navbar>
      </header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default layoutPage;