"use client";

import { useState, useEffect } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    
    console.log("Contact Data Submitted:", data);

  
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      e.currentTarget.reset();
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  return (
    <main className="w-full min-h-screen pt-30 bg-[#f8f9fa] dark:bg-[#0b0f19] text-slate-950 dark:text-white transition-colors duration-300 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* SECTION 1: HEADER (Framer Motion Intro) */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-wider"
          >
            Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            We would Love to{" "}
            <span className="text-[#00b76c] dark:text-[#00b76c]">Hear</span>{" "}
            From You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-500 dark:text-slate-400 font-medium"
          >
            Have questions about our organic products, bulk orders, or delivery?
            Reach out to us, and our team will respond as fast as possible.
          </motion.p>
        </section>

        {/* Success Alert Popup */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 font-semibold text-sm shadow-sm"
            >
              <CheckCircle2 size={20} className="shrink-0" />
              Your message has been sent successfully! We will contact you soon.
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 2: CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Side: Contact Cards & Info (AOS) */}
          <div
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
            data-aos="fade-right"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Contact Information
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                Feel free to connect via phone or email. You can also visit our
                head office or corporate eco-farm center directly.
              </p>
            </div>

            {/* Info Cards Container */}
            <div className="space-y-4 my-auto py-6">
              {/* Call Card */}
              <div className="flex items-center gap-4 bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/40 p-5 rounded-2xl transition-all duration-300 hover:border-emerald-500/30">
                <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Phone / WhatsApp
                  </h4>
                  <p className="text-base font-bold mt-0.5">01754318654</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/40 p-5 rounded-2xl transition-all duration-300 hover:border-emerald-500/30">
                <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Email Address
                  </h4>
                  <p className="text-base font-bold mt-0.5">
                    support@organio.com
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/40 p-5 rounded-2xl transition-all duration-300 hover:border-emerald-500/30">
                <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Our Location
                  </h4>
                  <p className="text-base font-bold mt-0.5">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Bottom Subtle Shadow (Consistent style) */}
            <div className="w-[85%] h-3 bg-black/5 dark:bg-black/30 blur-md rounded-full mx-auto pointer-events-none hidden lg:block" />
          </div>

          {/* Right Side: Contact Form (AOS + Hero UI Wrapper) */}
          <div
            className="lg:col-span-7 bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 md:p-10 shadow-sm"
            data-aos="fade-left"
          >
            <form onSubmit={handleFormSubmit} className="space-y-6">
             
              <div className="flex flex-col gap-6">
                <Input
                  name="name"
                  type="text"
                  placeholder="MD Limon"
                  className="font-medium"
                />

                <Input
                  name="email"
                  type="email"
                  placeholder="limon@example.com"
                  className="font-medium"
                />

                <Input
                  name="subject"
                  type="text"
                  placeholder="Bulk Inquiry / Product Query"
                  variant="primary"
                  className="font-medium"
                />

                <TextArea
                  name="message"
                  placeholder="Write your beautiful query here..."
                  variant="primary"
                  className="font-medium"
                />
              </div>

             
              <div className="pt-2">
                <Button
                  type="submit"
                  isPending={loading}
                  className="relative w-full text-base font-bold text-white rounded-xl py-6 shadow-md shadow-orange-500/10 dark:shadow-none overflow-hidden group bg-[#ff7a45] z-10 transition-colors duration-300"
                >
                 
                  <span className="absolute inset-0 bg-[#00b76c] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-[-1]" />

                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* SECTION 3: GOOGLE MAP MOCKUP (AOS) */}
        <section
          className="w-full h-[350px] rounded-3xl overflow-hidden border border-slate-200/40 dark:border-slate-800/40 relative shadow-sm"
          data-aos="zoom-in"
        >
          <iframe
            title="Organio HQ Location Map"
            src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d58435.59473873406!2d90.35424856860012!3d23.739404285741695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026741%3A0x2f9748b61de85300!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="dark:invert dark:grayscale dark:contrast-125"
          />
        </section>
      </div>
    </main>
  );
}
