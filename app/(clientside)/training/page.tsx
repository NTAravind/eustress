"use client"
import React from 'react';
import Image from 'next/image';
import {
  Calendar,
  Battery,
  Dumbbell,
  TrendingUp,
  User,
  Laptop,
  Clock,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// ============================================
// CONFIG  SHARED STYLE
// ============================================
const BORDER_COLOR = 'border-neutral-800';
const WHATSAPP_NUMBER = '918660485788';
const ONLINE_ENQUIRY_MSG = "Hi, I'm interested in the Online Training package. Could you share more details?";

const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

const revealText: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: EASING },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASING },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

function HeroSection() {
  return (
    <section
      className={`relative min-h-[100dvh] flex items-center border-b ${BORDER_COLOR} bg-black overflow-hidden pt-20`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]"
        />
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10 py-16 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center min-h-[80vh]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={`flex flex-col justify-center py-10 md:py-20 md:pr-16 md:border-r ${BORDER_COLOR}`}
          >
            <motion.span
              variants={fadeInUp}
              className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 block"
            >
              ONE-ON-ONE TRAINING
            </motion.span>

            <h1 className="font-black uppercase tracking-tighter leading-[0.88] text-white mb-8">
              {["STRONGER.", "SMARTER.", "BUILT FOR YOU."].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    variants={revealText}
                    className={`block text-[13vw] sm:text-[10vw] md:text-[5.5vw] ${
                      i === 2 ? "text-red-600" : "text-white"
                    }`}
                  >
                    {line}
                    {i === 0 && (
                      <motion.span
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block h-2 w-2 md:h-3 md:w-3 bg-red-600 align-middle ml-2"
                      />
                    )}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-md border-t border-neutral-800 pt-6"
            >
              One-on-one training designed around your goals, schedule, and
              recovery capacity to help you{" "}
              <span className="text-white font-medium">
                build strength and make long-term progress.
              </span>
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-red-600 text-white px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] hover:bg-white hover:text-black transition-colors duration-300"
              >
                Get Started
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 border border-neutral-700 text-neutral-300 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] hover:border-white hover:text-white transition-colors duration-300"
              >
                View Pricing
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASING, delay: 0.2 }}
            className="relative w-full h-[55vw] md:h-full md:min-h-[80vh] overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
              className="absolute top-0 left-0 right-0 h-[3px] bg-red-600 z-20 origin-left"
            />

            <Image
              src="/images/image.png"
              alt="Barbell back squat in home gym"
              fill
              priority
              className="object-cover object-center grayscale"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent z-10" />

            <div className="absolute bottom-0 right-0 z-20 bg-black/80 backdrop-blur-sm border-t border-l border-neutral-800 px-5 py-4">
              <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">
                Personal Training
              </p>
              <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-0.5">
                In-Person & Online
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Calendar,
    title: "FITS YOUR SCHEDULE",
    description: "Programs built around your available time, not the other way around.",
  },
  {
    icon: Battery,
    title: "RESPECTS YOUR RECOVERY",
    description: "Training is matched to your recovery capacity for better results and less fatigue.",
  },
  {
    icon: Dumbbell,
    title: "FOCUSED & EFFICIENT",
    description: "Minimal, effective training that delivers maximum results without wasting time.",
  },
  {
    icon: TrendingUp,
    title: "BUILT FOR THE LONG RUN",
    description: "Sustainable progress through consistency, smart training, and ongoing support.",
  },
];

function FeaturesSection() {
  return (
    <section className={`border-b ${BORDER_COLOR} bg-neutral-950`}>
      <div className={`border-b ${BORDER_COLOR} bg-neutral-900`}>
        <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">
            01 — Training Philosophy
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-14 md:mb-20 text-center max-w-3xl mx-auto"
        >
          <motion.span
            variants={fadeInUp}
            className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            TRAINING THAT FITS YOUR LIFE
          </motion.span>
          <motion.div variants={fadeInUp} className="overflow-hidden mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white">
              Training That{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Fits</span>
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: "circOut" }}
                  className="absolute bottom-1 left-0 h-3 md:h-4 w-full bg-red-600 -z-0 opacity-80 skew-x-[-10deg]"
                />
              </span>{" "}
              Your Life
            </h2>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-neutral-400 leading-relaxed"
          >
            Your life, work, and responsibilities are unique. So is your ability
            to recover. That&apos;s why every program is built around the time
            you have and the resources you can commit to&#x2014;so you can perform
            better, get stronger, and stay consistent.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ backgroundColor: "#0d0d0d", y: -4 }}
                className={`group p-8 md:p-10 border-b ${BORDER_COLOR} ${
                  i < features.length - 1 ? "lg:border-r border-neutral-800" : ""
                } ${i % 2 === 0 ? "sm:border-r border-neutral-800" : ""} transition-all duration-300 cursor-default`}
              >
                <div className="mb-6 relative">
                  <div className="w-12 h-12 border border-neutral-800 group-hover:border-red-600 transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
                    <motion.div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <Icon className="w-5 h-5 text-red-600 group-hover:text-white relative z-10 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const inPersonRows = [
  {
    icon: User,
    label: "Single Session",
    sublabel: "1 session",
    price: "₹1,500",
    priceSub: "per session",
    detail: null,
  },
  {
    icon: Calendar,
    label: "1-Month Package",
    sublabel: "12 sessions (valid for 1 month)",
    price: "₹15,000",
    priceSub: "for 12 sessions",
    detail: "₹1,250 per session",
  },
  {
    icon: Calendar,
    label: "3-Month Package",
    sublabel: "36 sessions (valid for 3 months)",
    price: "₹40,000",
    priceSub: "for 36 sessions",
    detail: "₹1,111 per session",
  },
];

function PricingSection() {
  return (
    <section id="pricing" className={`border-b ${BORDER_COLOR} bg-black`}>
      <div className={`border-b ${BORDER_COLOR} bg-neutral-900`}>
        <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">
            02 &#x2014; Pricing
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-14 md:mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            TRANSPARENT RATES
          </motion.span>
          <motion.div variants={fadeInUp} className="overflow-hidden">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-white">
              PRICING
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className={`grid grid-cols-1 md:grid-cols-2 border ${BORDER_COLOR}`}
        >
          <motion.div
            variants={fadeInUp}
            className={`border-b md:border-b-0 md:border-r ${BORDER_COLOR}`}
          >
            <div className="bg-white px-8 py-5">
              <h3 className="text-black font-black uppercase tracking-[0.18em] text-sm">
                IN-PERSON TRAINING
              </h3>
            </div>

            <div>
              {inPersonRows.map((row, i) => {
                const Icon = row.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ backgroundColor: "#0d0d0d" }}
                    className={`flex items-center justify-between gap-4 px-8 py-6 border-b ${BORDER_COLOR} transition-colors duration-200 group`}
                  >
                    <div className="flex items-start gap-5">
                      <div className="mt-0.5 w-9 h-9 flex items-center justify-center border border-neutral-800 group-hover:border-red-600 transition-colors flex-shrink-0 relative overflow-hidden">
                        <motion.div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Icon className="w-4 h-4 text-red-600 group-hover:text-white relative z-10 transition-colors" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm uppercase tracking-wider">
                          {row.label}
                        </p>
                        <p className="text-neutral-400 text-sm mt-1">
                          {row.sublabel}
                        </p>
                        {row.detail && (
                          <p className="text-red-500 text-sm mt-1 font-semibold">
                            {row.detail}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-black text-xl tracking-tight">
                        {row.price}
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        {row.priceSub}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className={`border-t ${BORDER_COLOR} px-8 py-5 flex flex-wrap items-center justify-between gap-4`}>
              <div className="flex items-center gap-2 text-neutral-600">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[11px] uppercase tracking-widest font-medium">
                  All sessions are 60 minutes.
                </span>
              </div>
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in In-Person Training. Could you share more details?")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, backgroundColor: '#fff', color: '#000' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-neutral-700 text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
              >
                Enquire Now
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col">
            <div className="bg-red-600 px-8 py-5">
              <h3 className="text-white font-black uppercase tracking-[0.18em] text-sm">
                ONLINE TRAINING
              </h3>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 py-14 text-center">
              <div className="mb-8 w-16 h-16 border border-neutral-800 flex items-center justify-center">
                <Laptop className="w-7 h-7 text-red-600" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  ₹12,000
                </p>
                <p className="text-red-600 font-bold text-sm uppercase tracking-widest mt-2">
                  / month
                </p>
                <p className="text-neutral-500 text-sm mt-3 mb-8">
                  12 sessions per month
                </p>
              </motion.div>

              <div className={`border-t ${BORDER_COLOR} pt-8 w-full`}>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto">
                  Personalized program with ongoing support, check-ins, and progress tracking.
                </p>
              </div>

              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ONLINE_ENQUIRY_MSG)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 inline-flex items-center gap-3 bg-transparent border border-neutral-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
              >
                Enquire Now
              </motion.a>
            </div>

            <div className={`border-t ${BORDER_COLOR} px-8 py-5 flex items-center gap-2 text-neutral-600`}>
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[11px] uppercase tracking-widest font-medium">
                All sessions are 60 minutes.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 block"
          >
            READY TO START?
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-white mb-10"
          >
            Let&apos;s Build
            <br />
            <span className="text-red-600">Together.</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function TrainingPage() {
  return (
    <main className="bg-neutral-950 min-h-screen text-white selection:bg-red-600 selection:text-white">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
