import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, FileText } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <>
      <section className="relative h-80 w-full">
        <Image
          src="https://picsum.photos/1920/600"
          alt="Our Team"
          fill
          className="object-cover"
          data-ai-hint="team photo"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            About Raise India Foundation
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24">
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
                    To empower marginalized communities through sustainable initiatives in education, healthcare, and livelihood. We strive to create a world where every individual has the opportunity to live a life of dignity and purpose.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    We envision a self-reliant India where all citizens have access to the resources and opportunities they need to thrive, fostering a society built on equality, justice, and compassion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://picsum.photos/400/500"
                alt="Director of Raise India Foundation"
                fill
                className="object-cover"
                data-ai-hint="portrait photo"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Director's Message</h2>
              <p className="text-lg text-foreground/80">
                "Since our inception, Raise India Foundation has been driven by a single, unwavering belief: that collective action can bring about profound change. We have witnessed firsthand the resilience and potential within our communities, and it is our privilege to work alongside them. Every project we undertake is a step towards a more equitable future. I invite you to join us on this journey of hope and transformation."
              </p>
              <p className="font-bold">- Director's Name</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="text-center">
              <CardContent className="p-8">
                <Award className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-6 text-xl font-bold">Awards & Recognition</h3>
                <p className="mt-2 text-foreground/70">
                  Our work has been recognized by various bodies for its impact and transparency.
                </p>
                <Button variant="link" asChild className="mt-4">
                  <Link href="/awards">View Awards</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <FileText className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-6 text-xl font-bold">Legal & Statutory Documents</h3>
                <p className="mt-2 text-foreground/70">
                  We are committed to transparency and accountability in all our operations.
                </p>
                <Button variant="link" asChild className="mt-4">
                  <Link href="/legal">View Documents</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
