"use client";

import { useEffect, useState } from "react";
import { Button, Input, Accordion, AccordionItem, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, ShieldAlert, Truck, RefreshCw,} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";


const FAQ_ITEMS = [
  {
    id: "1",
    icon: <Truck className="text-emerald-500" size={20} />,
    title: "How long does the organic food delivery take?",
    content: "For Dhaka city, we deliver within 24 to 48 hours. For deliveries outside Dhaka, it usually takes 3 to 5 business days depending on your location. We ensure premium temperature-controlled packaging to keep items fresh.",
  },
  {
    id: "2",
    icon: <ShieldAlert className="text-emerald-500" size={20} />,
    title: "Are your honey and ghee 100% pure and chemical-free?",
    content: "Yes, absolutely! Every batch of our organic raw honey and traditional cow ghee undergoes strict lab testing. We guarantee zero artificial preservatives, zero added sugar, and absolute chemical-free processing.",
  },
  {
    id: "3",
    icon: <RefreshCw className="text-emerald-500" size={20} />,
    title: "What is your return or refund policy?",
    content: "If you receive a damaged product or find any quality issues upon unboxing, please contact us within 24 hours with a picture/video. We offer a hassle-free replacement or a full refund immediately.",
  },
  {
    id: "4",
    icon: <HelpCircle className="text-emerald-500" size={20} />,
    title: "Do you offer bulk purchasing or corporate gifting?",
    content: "We provide attractive discount packages for bulk orders and customizable corporate organic gift sets. Please reach out via our contact number or submit a query on this page for custom pricing.",
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

 
  const filteredFAQs = FAQ_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full min-h-screen pt-30 bg-[#f8f9fa] dark:bg-[#0b0f19] text-slate-950 dark:text-white transition-colors duration-300 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION 1: HERO HEADER & SEARCH BAR */}
        <section className="text-center max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-wider"
          >
            Help Center
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            How Can We <span className="text-[#00b76c] dark:text-[#00b76c]">Support</span> You?
          </motion.h1>

      
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-2"
          >
            <Input
              type="text"
              placeholder="Search for answers (e.g., delivery, purity, honey...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
        
              className="max-w-xl mx-auto font-medium"
            />
          </motion.div>
        </section>

        {/* SECTION 2: GRID CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Frequently Asked Questions (Hero UI Accordion) */}
          <div className="lg:col-span-8 space-y-6" data-aos="fade-right">
            <h2 className="text-2xl font-bold tracking-tight px-1">Frequently Asked Questions</h2>
            
            {filteredFAQs.length > 0 ? (
              <Accordion 
    
                className="px-0"
                
              >
                {filteredFAQs?.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    aria-label={faq.title}
                
                  >
                    {faq.content}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-[#151c2c] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-400 font-medium">No answers found matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Right Side: Quick Support Card & Contact Trigger */}
          <div className="lg:col-span-4 flex flex-col justify-between" data-aos="fade-left">
            <Card className="bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/60 shadow-sm rounded-3xl p-6 h-full flex flex-col justify-between">
              <div className="p-0 space-y-6 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 dark:bg-green-500/20 text-[#00b76c] dark:text-[#00b76c] rounded-2xl w-fit">
                    <MessageSquare size={26} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Still Need Assistance?</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    If you could not find your answer in our FAQs, do not worry! Our dedicated organic care executives are online to resolve your issues instantly.
                  </p>
                </div>

       
                <div className="pt-8">
                  <Button
                    className="relative w-full text-base font-bold text-white rounded-xl py-6 shadow-md shadow-orange-500/10 dark:shadow-none overflow-hidden group bg-[#00b76c] z-10 transition-colors duration-300"
                  
                  >
                  
                    <span className="absolute inset-0 bg-[#00b76c] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-[-1]" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </Card>

      
            <div className="w-[85%] h-3 bg-black/5 dark:bg-black/30 blur-md rounded-full mx-auto mt-4 pointer-events-none hidden lg:block" />
          </div>

        </div>

      </div>
    </main>
  );
}