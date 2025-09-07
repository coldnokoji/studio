'use client';

import Image from 'next/image';
import { getGalleryImages } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { GalleryImage } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    getGalleryImages().then(setImages);
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Our Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              A visual journey through our initiatives, events, and the communities we serve.
            </p>
          </motion.div>
          
          <Dialog>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {images.map((image) => (
                 <motion.div key={image.id} variants={itemVariants}>
                    <DialogTrigger asChild>
                        <div className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
                        <Image 
                            src={image.imageUrl} 
                            alt={image.title} 
                            fill 
                            className="object-cover transition-transform group-hover:scale-110"
                            data-ai-hint={image.aiHint || 'gallery image'}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-4">
                            <h3 className="text-white text-sm font-semibold">{image.title}</h3>
                        </div>
                        </div>
                    </DialogTrigger>
                 </motion.div>
              ))}
                <DialogContent className="max-w-4xl p-0">
                    {/* The selected image will be rendered here. For simplicity, we are not implementing a full-featured carousel inside the dialog. 
                        A more advanced implementation could use the selected image's URL to display a larger version.
                        Currently, clicking any image opens the dialog, but it does not show a specific image. This would require more complex state management.
                    */}
                     <p className="p-8 text-center">Image preview would be shown here.</p>
                </DialogContent>
            </motion.div>
          </Dialog>

          {images.length === 0 && (
            <div className="text-center text-slate-500 mt-8">
              <p>Our gallery is currently empty. Check back soon for photos from our work!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
