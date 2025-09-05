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
    quote: "The mission of Shreyaskar Foundation is deeply inspiring. I'm excited to see the positive impact they will have on the community.",
    name: 'Priya Sharma',
    affiliation: 'Early Supporter',
  },
  {
    quote: "It's wonderful to see a new organization with such a clear and holistic vision. I'm looking forward to volunteering with them.",
    name: 'Rahul Verma',
    affiliation: 'Volunteer',
  },
  {
    quote: "The focus on service and compassion is what our society needs. I believe this foundation will achieve great things.",
    name: 'Anjali Mehta',
    affiliation: 'Well-wisher',
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
