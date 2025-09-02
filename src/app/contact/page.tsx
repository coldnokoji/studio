import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              We'd love to hear from you. Get in touch with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <div className="space-y-4 text-foreground/80">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <span>123 Philanthropy Lane<br/>New Delhi, 110001, India</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <a href="tel:+911234567890" className="hover:text-primary">+91 123 456 7890</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <a href="mailto:contact@raiseindia.org" className="hover:text-primary">contact@raiseindia.org</a>
                  </div>
                </div>
              </div>
              <div className="h-96 w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.261259585918!2d77.21952231508219!3d28.62194218242144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4a5c5c5c5d%3A0x8e0f2f7d3e4b3b3d!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1678886055555!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Raise India Foundation Office"
                ></iframe>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                  <Input id="name" type="text" placeholder="Your Name" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                  <Input id="email" type="email" placeholder="Your Email" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</label>
                  <Input id="subject" type="text" placeholder="Subject" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                  <Textarea id="message" placeholder="Your Message" rows={5} className="mt-1" />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
