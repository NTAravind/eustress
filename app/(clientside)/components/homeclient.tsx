"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Workshop } from '@/app/generated/prisma';
import { WorkshopCard } from './workcard'; // Ensure this file exists
import { 
  motion, 
  useScroll, 
  useTransform, 
  Variants, 
  useMotionValue, 
  useSpring 
} from 'framer-motion';

// ============================================
// CONFIG & SHARED STYLES
// ============================================
const BORDER_COLOR = 'border-neutral-800';
const LOGO_PATH = "/images/2-removebg-preview.png"; // Make sure this path is correct
const COACH_IMAGE = "/images/coach.jpg"; // Replace with your coach image path

// Premium easing curve
const EASING:[number,number,number,number] = [0.22, 1, 0.36, 1];

// --- ANIMATION VARIANTS ---

const revealText: Variants = {
  hidden: { y: "100%" },
  visible: { 
    y: "0%", 
    transition: { duration: 0.8, ease: EASING } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: EASING } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ============================================
// 1. HERO SECTION
// ============================================
export function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.header 
      ref={ref}
      className={`border-b ${BORDER_COLOR} relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-neutral-950`}
    >
      {/* Background Grid with slow pulse */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" 
        />
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10 pt-28 pb-10 md:py-20">
        <div className="flex flex-col">
          {/* Logo */}
          <motion.div 
            style={{ y: y2, opacity }}
            className="mb-5 md:mb-8 w-[90px] md:w-[200px] relative"
          >
            <Image 
              src={LOGO_PATH}
              alt="Eustress Performance Brand Logo"
              width={250}
              height={250}
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>

          {/* HEADLINE */}
          <h1 className="text-[15vw] sm:text-[13vw] md:text-[9vw] leading-[0.88] font-black tracking-tighter uppercase select-none text-white">
            <div className="overflow-hidden">
              <motion.span 
                variants={revealText}
                initial="hidden"
                animate="visible"
                className="block"
              >
                Build Strength
                <motion.span 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block h-2.5 w-2.5 md:h-5 md:w-5 bg-red-600 align-baseline ml-2 md:ml-4"
                />
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                variants={revealText}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="block text-neutral-500"
              >
                That Lasts.
              </motion.span>
            </div>
          </h1>
          
          {/* SUBHEADLINE + CTA */}
          <motion.div 
            style={{ y: y1, opacity }} 
            className="mt-7 md:mt-12 border-t border-neutral-800 pt-5 md:pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-2xl text-neutral-400 font-light leading-snug max-w-sm md:max-w-lg"
            >
              Minimalist, evidence-based training for{" "}
              <span className="text-white font-medium">strength, athleticism, and longevity.</span>
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 text-white group cursor-pointer shrink-0"
            >
              <div className="relative overflow-hidden p-2.5 md:p-3 border border-neutral-700 group-hover:border-red-600 transition-colors">
                <motion.div 
                  className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                />
                <ArrowDown className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:text-white transition-colors" />
              </div>
              <span className="uppercase tracking-widest text-[10px] md:text-xs font-bold group-hover:text-red-600 transition-colors">Scroll to Begin</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================
// 2. PHILOSOPHY SECTION
// ============================================
export function PhilosophySection() {
  return (
    <section className={`border-b ${BORDER_COLOR} bg-neutral-950`}>
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={staggerContainer}
          className="max-w-6xl"
        >
          <motion.span variants={fadeInUp} className="text-red-600 block text-xs md:text-sm font-bold tracking-[0.2em] mb-6">
            THE PHILOSOPHY
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-10 md:mb-14"
          >
            Less is{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">more.</span>
              <motion.span
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                className="absolute bottom-1 left-0 h-3 md:h-5 w-full bg-red-600 -z-0 opacity-80 skew-x-[-12deg]"
              />
            </span>
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-neutral-800 pt-8 md:pt-12"
          >
            <p className="text-base md:text-xl text-neutral-300 leading-relaxed">
              Our approach is built around the principle of doing the{" "}
              <span className="text-white font-semibold">minimal training needed to drive progress</span>.
              Training should support life and sport — not compete with them.
            </p>
            <p className="text-base md:text-xl text-neutral-500 leading-relaxed">
              Our programs are designed to be practical, sustainable and effective over the long term.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// 2b. WHO WE HELP SECTION
// ============================================
export function WhoWeHelpSection() {
  const audiences = [
    {
      label: "Busy Individuals",
      description: "Efficient, effective training that fits your schedule and delivers results without wasted hours."
    },
    {
      label: "Beginners",
      description: "Clear guidance and a structured plan so you can start strong and build the right habits from day one."
    },
    {
      label: "Experienced Lifters",
      description: "Intelligent programming to break through plateaus and keep getting stronger, sustainably."
    },
    {
      label: "Athletes",
      description: "Sport-specific strength and conditioning to sharpen your performance without burning out."
    },
    {
      label: "Older Adults",
      description: "Stay strong, independent, and reduce your risk of falls with training built for longevity."
    },
    {
      label: "Everyone Else",
      description: "If you want to build real strength and athleticism that serves you for life — you belong here."
    }
  ];

  return (
    <section className={`border-b ${BORDER_COLOR} bg-black`}>
      <div className={`border-b ${BORDER_COLOR} bg-neutral-900`}>
        <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">00 — Who We Help</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 border-l-0 md:border-l border-r-0 md:border-r border-neutral-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ backgroundColor: "#0a0a0a" }}
              className={`group p-8 md:p-10 border-b border-neutral-800 ${
                i % 3 !== 2 ? "lg:border-r" : ""
              } ${
                i % 2 === 0 ? "sm:border-r lg:border-r-0" : ""
              } ${
                i % 2 === 0 && i % 3 !== 2 ? "sm:border-r lg:border-r" : ""
              } transition-colors duration-300 cursor-default`}
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="mt-1 w-2 h-2 rounded-full bg-red-600 flex-shrink-0"
                />
                <h3 className="text-white font-bold uppercase tracking-widest text-sm group-hover:text-red-500 transition-colors duration-300">
                  {item.label}
                </h3>
              </div>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed pl-6 group-hover:text-neutral-300 transition-colors duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// 3. WORKSHOPS SECTION
// ============================================
interface WorkshopsSectionProps {
  workshops: Workshop[];
}

export function WorkshopsSection({ workshops }: WorkshopsSectionProps) {
  return (
    <section id="programs">
      <div className={`border-b ${BORDER_COLOR} bg-neutral-900`}>
        <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">01 — Workshops</span>
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-neutral-500">
            {workshops.length} Available
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 border-l-0 md:border-l border-r-0 md:border-r border-neutral-800">
        {workshops.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <p className="text-xl md:text-2xl font-bold uppercase text-neutral-500 mb-4">No Workshops Available</p>
            <p className="text-neutral-600">Check back soon for upcoming programs</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {workshops.map((workshop) => (
              <motion.div key={workshop.id} variants={fadeInUp}>
                <WorkshopCard workshop={workshop} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================
// 4. COACH SECTION
// ============================================
interface CoachSectionProps {
  image: string;
  image2?: string;
}

export function CoachSection({ image, image2 }: CoachSectionProps) {
  const curtainReveal: Variants = {
    hidden: { height: "100%" },
    visible: { 
      height: "0%", 
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
    }
  };

  const imageScale: Variants = {
    hidden: { scale: 1.2 },
    visible: { 
      scale: 1, 
      transition: { duration: 1.4, ease: "easeOut" } 
    }
  };

  // Use image2 (the recent photo) if provided, fall back to image
  const displayImage = image2 ?? image;

  return (
    <section id="about" className={`border-b ${BORDER_COLOR}`}>
      <div className={`border-b ${BORDER_COLOR} bg-neutral-900`}>
        <div className="container mx-auto px-4 md:px-8 py-3">
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">02 — The Coach</span>
        </div>
      </div>
      
      <div className="container mx-auto border-l-0 md:border-l border-r-0 md:border-r border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* IMAGE SIDE */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`relative aspect-[3/4] md:aspect-auto md:min-h-[750px] border-b md:border-b-0 md:border-r ${BORDER_COLOR} group overflow-hidden`}
          >
            <motion.div variants={imageScale} className="w-full h-full relative">
              <Image 
                src={displayImage}
                alt="Sandeep Narayan — Strength Coach" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out object-top"
              />
            </motion.div>
            {/* Curtain Overlay */}
            <motion.div variants={curtainReveal} className="absolute inset-0 bg-red-600 z-20" />
            <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur-sm border-t border-r border-neutral-800 p-4 md:p-6 pr-8 md:pr-12 z-30">
              <p className="text-white font-bold uppercase tracking-widest text-xs">Sandeep Narayan</p>
              <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-0.5">Strength Coach &amp; Educator</p>
            </div>
          </motion.div>

          {/* TEXT SIDE */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="p-6 md:p-16 flex flex-col justify-center bg-black"
          >
            <div className="overflow-hidden mb-6 md:mb-8">
              <motion.h2 variants={revealText} className="text-4xl md:text-6xl font-black uppercase leading-[0.9] text-white">
                About<br/><span className="text-neutral-600">the</span><br/>Coach
              </motion.h2>
            </div>
            
            <motion.div variants={fadeInUp} className="space-y-5 text-base md:text-lg text-neutral-300 leading-relaxed">
              <p>
                Hi, I&apos;m Sandeep. I&apos;ve been a{" "}
                <span className="text-white font-medium">strength coach and educator since 2014</span>.
              </p>
              <p>
                Throughout my career, I&apos;ve worked with youth athletes, older adults, and general population clients looking to become stronger, healthier, and more capable. Along the way, I&apos;ve studied a wide range of training methods and earned certifications including NSCA-CSCS and ACSM-CPT.
              </p>

              <div className="border-l-4 border-red-600 pl-6 py-2 my-6">
                <p className="text-white font-medium italic text-base md:text-lg">
                  &quot;After more than a decade of coaching, learning, and refining my methods, I&apos;ve come to believe that lasting results come from doing the basics consistently.&quot;
                </p>
              </div>

              <p>
                My approach is built around helping people gain strength and athleticism through practical, sustainable training — not unnecessary complexity.
              </p>

              {/* One-on-one callout */}
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-bold mb-3">Coaching Availability</p>
                <div className="flex gap-3">
                  {[
                    { label: 'In-Person', detail: 'One-on-one' },
                    { label: 'Online', detail: 'One-on-one' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3, borderColor: '#DC2626' }}
                      className="flex-1 bg-neutral-900 border border-neutral-800 px-4 py-4 transition-colors cursor-default group"
                    >
                      <span className="block text-white font-bold text-xs uppercase tracking-widest group-hover:text-red-500 transition-colors">{item.label}</span>
                      <span className="block text-neutral-500 text-[11px] mt-1.5">{item.detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


// ============================================
// 5. GALLERY SECTION
// ============================================
interface GallerySectionProps {
  images: string[];
}

function GalleryItem({ img, idx }: { img: string, idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div 
      ref={ref}
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      className={`relative aspect-square border-b ${idx % 2 === 0 ? 'border-r' : 'md:border-r'} md:${idx < 3 ? 'border-r' : 'border-r-0'} ${BORDER_COLOR} group overflow-hidden bg-neutral-950 cursor-none`}
    >
      <Image 
        src={img} 
        alt="Gallery" 
        fill 
        className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" 
      />
      
      {/* Custom Cursor element */}
      <motion.div 
        style={{ x, y }}
        className="pointer-events-none absolute top-0 left-0 z-30 hidden md:flex items-center justify-center"
      >
         <motion.div 
           initial={{ scale: 0, opacity: 0 }}
           whileHover={{ scale: 1, opacity: 1 }} // Note: this triggers on parent hover
           className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
         >
           View Shot
         </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <section id="gallery" className={`border-b ${BORDER_COLOR}`}>
      <div className={`border-b ${BORDER_COLOR} bg-neutral-900`}>
        <div className="container mx-auto px-4 md:px-8 py-3">
          <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">03 — Visuals</span>
        </div>
      </div>
      <div className="container mx-auto border-l-0 md:border-l border-r-0 md:border-r border-neutral-800">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {images.map((img, idx) => (
            <GalleryItem key={idx} img={img} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// 6. FOOTER SECTION
// ============================================
export function FooterSection() {
  return (
    <footer id="contact" className="bg-neutral-950 pt-16 md:pt-24 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24 border-b border-neutral-800 pb-16"
        >
          <motion.div variants={fadeInUp}>
            <h2 
              onClick={() => window.location.href = '/training#pricing'}
              className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-8 text-white leading-none group cursor-pointer"
            >
              <motion.span 
                className="block"
                whileHover={{ x: 20 }} 
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Start
              </motion.span>
              <motion.span 
                className="block text-red-600 stroke-text flex items-center gap-4"
                whileHover={{ x: 20, color: "#fff" }} 
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Now. <ArrowRight className="w-12 h-12 md:w-24 md:h-24 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.span>
            </h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-col justify-end items-start space-y-6 md:space-y-8">
            <motion.a 
              href="mailto:contact@eustress.com" 
              whileHover={{ x: 10 }}
              className="group flex items-center gap-4 text-xl md:text-4xl text-neutral-300 hover:text-white transition-colors w-full"
            >
              <span className="border-b border-neutral-800 pb-2 w-full group-hover:border-red-600 transition-colors break-all">contact@eustress.com</span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 -rotate-45 group-hover:rotate-0 group-hover:text-red-600 transition-all flex-shrink-0" />
            </motion.a>
            <div className="text-xl md:text-4xl text-neutral-500 w-full border-b border-neutral-800 pb-2">
              +91 8660485788
            </div>
            <div className="text-xl md:text-4xl text-neutral-500 w-full border-b border-neutral-800 pb-2 flex justify-between items-center">
              <span>Bangalore, India</span>
              <span className="text-xs uppercase tracking-widest bg-neutral-900 px-2 py-1 rounded-sm">HQ</span>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] uppercase tracking-[0.2em] text-neutral-600 gap-4 md:gap-0">
          <p>&copy; {new Date().getFullYear()} Eustress Performance. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
interface HomeClientProps {
  workshops: Workshop[];
}

export default function HomeClient({ workshops }: HomeClientProps) {
  const galleryImages = [
    "/gallery/IMG_2893.png",
    "/gallery/IMG_2894.png",
    "/gallery/IMG_2895.png",
    "/gallery/IMG_2896.png",
    "/gallery/IMG_2897.png",
    "/gallery/IMG_2898.png",
    "/gallery/IMG_2899.png",
    "/gallery/IMG_2900.png",
  ];

  return (
    <main className="bg-neutral-950 min-h-screen text-white selection:bg-red-600 selection:text-white">
      <HeroSection />
      <PhilosophySection />
      <WhoWeHelpSection />
      {/* <WorkshopsSection workshops={workshops} /> */}
      <CoachSection image={COACH_IMAGE} />
      <GallerySection images={galleryImages} />
      {/* View Full Gallery CTA */}
      <div className="bg-neutral-950 border-b border-neutral-800">
        <div className="container mx-auto px-4 md:px-8 py-8 flex items-center justify-between">
          <p className="text-neutral-500 text-[11px] uppercase tracking-[0.2em] font-medium">
            Showing 8 of 12 shots
          </p>
          <motion.a
            href="/gallery"
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] group"
          >
            <span className="group-hover:text-red-500 transition-colors">View Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}