"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const BORDER_COLOR = 'border-neutral-800';
const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ALL_IMAGES = [
  { src: '/gallery/IMG_2893.png', alt: 'Training session 1' },
  { src: '/gallery/IMG_2894.png', alt: 'Training session 2' },
  { src: '/gallery/IMG_2895.png', alt: 'Training session 3' },
  { src: '/gallery/IMG_2896.png', alt: 'Training session 4' },
  { src: '/gallery/IMG_2897.png', alt: 'Training session 5' },
  { src: '/gallery/IMG_2898.png', alt: 'Training session 6' },
  { src: '/gallery/IMG_2899.png', alt: 'Training session 7' },
  { src: '/gallery/IMG_2900.png', alt: 'Training session 8' },
  { src: '/gallery/IMG_2901.png', alt: 'Training session 9' },
  { src: '/gallery/IMG_2902.png', alt: 'Training session 10' },
  { src: '/gallery/IMG_2903.png', alt: 'Training session 11' },
  { src: '/gallery/IMG_2904.png', alt: 'Training session 12' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASING } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASING } },
};

interface LightboxProps {
  images: typeof ALL_IMAGES;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center border border-neutral-700 text-white hover:bg-red-600 hover:border-red-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="absolute top-5 left-5 z-10 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">
        {index + 1} / {images.length}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center border border-neutral-700 text-white hover:bg-red-600 hover:border-red-600 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASING }}
        className="relative w-[85vw] h-[80vh] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center border border-neutral-700 text-white hover:bg-red-600 hover:border-red-600 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={"relative w-10 h-10 flex-shrink-0 border-2 transition-all duration-200 overflow-hidden " + (i === index ? 'border-red-600' : 'border-neutral-700 opacity-50 hover:opacity-100')}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="40px" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function GalleryItem({ img, idx, onClick }: { img: (typeof ALL_IMAGES)[0]; idx: number; onClick: (i: number) => void; }) {
  return (
    <motion.div
      variants={gridItem}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(idx)}
      className={"relative aspect-square border-b " + BORDER_COLOR + " " + (idx % 3 !== 2 ? "border-r " + BORDER_COLOR : "") + " group overflow-hidden bg-neutral-900 cursor-pointer"}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
          View
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i === null ? 0 : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length));
  const next = () => setLightboxIdx((i) => (i === null ? 0 : (i + 1) % ALL_IMAGES.length));

  return (
    <main className="bg-neutral-950 min-h-screen text-white selection:bg-red-600 selection:text-white">

      <section className={"pt-32 pb-12 border-b " + BORDER_COLOR + " bg-black relative overflow-hidden"}>
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeInUp} className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-5 block">
              EUSTRESS PERFORMANCE
            </motion.span>
            <div className="overflow-hidden mb-4">
              <motion.h1 variants={fadeInUp} className="text-[16vw] sm:text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.88] text-white">
                Gallery
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block h-3 w-3 md:h-5 md:w-5 bg-red-600 align-middle ml-3"
                />
              </motion.h1>
            </div>
            <motion.div variants={fadeInUp} className={"flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t " + BORDER_COLOR + " pt-6"}>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
                A look inside the gym — training, movement, and the work that goes into building strength that lasts.
              </p>
              <span className="text-neutral-600 text-[11px] uppercase tracking-[0.2em] font-bold flex-shrink-0">
                {ALL_IMAGES.length} shots
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={"border-b " + BORDER_COLOR}>
        <div className={"border-b " + BORDER_COLOR + " bg-neutral-900"}>
          <div className="container mx-auto px-4 md:px-8 py-3">
            <span className="uppercase text-[10px] font-bold tracking-[0.2em] text-white">03 — Visuals</span>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3"
        >
          {ALL_IMAGES.map((img, i) => (
            <GalleryItem key={i} img={img} idx={i} onClick={openLightbox} />
          ))}
        </motion.div>
      </section>

      <section className="bg-neutral-950 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeInUp} className="text-red-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
              WANT RESULTS LIKE THESE?
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-8">
              Start Your<br /><span className="text-red-600">Journey.</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/training"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300"
              >
                View Training Options
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 border border-neutral-700 text-neutral-300 px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:border-white hover:text-white transition-colors duration-300"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={ALL_IMAGES}
            index={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
