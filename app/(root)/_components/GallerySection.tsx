"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ShareButton from "@/components/Button/ShareButton";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const GallerySection: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600",
      alt: "Campus Building",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
      alt: "Library",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600",
      alt: "Laboratory",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
      alt: "Classroom",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600",
      alt: "Lounge",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600",
      alt: "Cafeteria",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600",
      alt: "Study Area",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
      alt: "Garden",
    },
  ];

  return (
    <section className="py-20 px-4 bg-primary/4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Campus <span className="text-primary">Gallery</span>
          </h2>
          <p className="mt-4 text-gray-500">
            Click any image to view in full size
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <motion.div
              key={image.id}
              layoutId={`img-container-${image.id}`}
              onClick={() => setSelectedImg(image)}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedImg(null)}
            >
              <motion.div
                layoutId={`img-container-${selectedImg.id}`}
                className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImg.src}
                  alt={selectedImg.alt}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white mt-6 text-xl font-semibold"
              >
                {selectedImg.alt}
              </motion.h3>

              {/* Thumbnails */}
              <div className="mt-10 flex gap-3 overflow-x-auto pb-4 max-w-full no-scrollbar">
                {images.map((img) => (
                  <div
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImg(img);
                    }}
                    className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImg.id === img.id
                        ? "border-primary scale-110 shadow-lg"
                        : "border-transparent opacity-50"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <button className="absolute top-8 right-8 text-white text-3xl">
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center mt-8">
        <ShareButton text="See More..." />
      </div>
    </section>
  );
};

export default GallerySection;
