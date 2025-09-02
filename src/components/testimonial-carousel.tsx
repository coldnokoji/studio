"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Raise India Foundation is doing phenomenal work. Their dedication to community welfare is truly inspiring. I'm proud to be a supporter.",
    name: 'Priya Sharma',
    affiliation: 'Donor',
  },
  {
    quote: "Interning here was a life-changing experience. I got to see the real impact of our efforts on the ground. The team is passionate and welcoming.",
    name: 'Rahul Verma',
    affiliation: 'Intern',
  },
  {
    quote: "The transparency and commitment of this organization are commendable. You know exactly where your contribution is going and the difference it's making.",
    name: 'Anjali Mehta',
    affiliation: 'Supporter',
  },
];

export function TestimonialCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-60">
                  <blockquote className="text-lg italic text-foreground/80">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-6 font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.affiliation}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
