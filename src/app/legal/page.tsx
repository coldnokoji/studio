import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

const documents = [
  { name: 'Registration Certificate (Pending)', href: '#' },
  { name: '80G & 12A Certificates (Pending)', href: '#' },
  { name: 'FCRA Certificate (Pending)', href: '#' },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Legal & Statutory Documents
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              We are committed to maintaining transparency and accountability in all our operations. Our legal documentation is currently under process.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Our Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {documents.map((doc) => (
                    <li key={doc.name}>
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-foreground/60">{doc.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Coming Soon</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
