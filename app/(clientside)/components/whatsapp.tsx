"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// CONFIG
// ============================================
const WHATSAPP_NUMBER = "918660485788";
const PREFILLED_MESSAGE = "Hi, I'm interested in joining a workshop.";
const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ============================================
// COMPONENT
// ============================================
export function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASING, delay: 1.2 }}
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 flex items-center gap-3"
    >
      {/* Slide-in label */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2, ease: EASING }}
            className="hidden md:block text-[10px] uppercase font-bold tracking-[0.2em] text-white bg-neutral-900 border border-neutral-800 px-3 py-2 whitespace-nowrap"
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-12 h-12 bg-white group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-none">
          <span className="absolute inset-0 animate-ping bg-white opacity-20 group-hover:opacity-0 transition-opacity duration-300" />
        </span>

        {/* Icon */}
        <WhatsAppIcon className="w-5 h-5 text-black transition-transform duration-300 group-hover:scale-110" />
      </a>
    </motion.div>
  );
}

// ============================================
// MINIMAL FILLED SVG ICON
// ============================================
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.523 5.824L.057 23.428a.5.5 0 0 0 .609.61l5.657-1.455A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.214-3.724.957.984-3.63-.235-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
    </svg>
  );
}