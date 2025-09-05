import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://picsum.photos/1920/1080"
                  alt="Our Team working in the community"
                  fill
                  className="object-cover"
                  data-ai-hint="team photo"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    About Shreyaskar Social Welfare Foundation
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    Laying the groundwork for a compassionate and self-reliant society through dedicated service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-muted/50">
          <div className="container max-w-5xl">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Our Mission & Vision
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">
                      To empower communities by fostering sustainable development in education, healthcare, environment, and livelihood. We are dedicated to creating a foundation of opportunity for every individual to lead a life of dignity and purpose.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">
                      We envision a self-reliant and compassionate India, where all citizens have the resources and opportunities they need to thrive, contributing to a society built on the principles of service, equality, and justice.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="container max-w-5xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://picsum.photos/400/500"
                  alt="Founder of Shreyaskar Social Welfare Foundation"
                  fill
                  className="object-cover"
                  data-ai-hint="portrait photo"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Founder's Message</h2>
                <p className="text-lg text-foreground/80">
                  "With a firm belief in 'Seva Paramo Dharma' - service as our highest duty - we have embarked on this journey. Shreyaskar Social Welfare Foundation is born from a desire to create tangible change from the ground up. Every small step we take today in education, health, and our environment is a seed planted for a better tomorrow. I invite you to join us in nurturing these seeds of hope and building a brighter future together."
                </p>
                <p className="font-bold">- Founder's Name</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
