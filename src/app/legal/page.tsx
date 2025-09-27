import Link from 'next/link';
import { FileText, PieChart, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

const documents = [
  { name: 'Registration Certificate (Pending)', href: '#' },
  { name: '80G & 12A Certificates (Pending)', href: '#' },
  { name: 'FCRA Certificate (Pending)', href: '#' },
  { name: 'Annual Report 2023-2024 (Upcoming)', href: '#' },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Transparency & Governance
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              We are committed to maintaining the highest standards of transparency and accountability in all our operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Landmark className="h-6 w-6 text-brand-orange" />
                        Legal & Statutory Documents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-foreground/80">
                        Our legal documentation is currently under process. We will upload all relevant certificates here as soon as they are available.
                    </p>
                    <ul className="divide-y divide-border">
                    {documents.map((doc) => (
                        <li key={doc.name}>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span className="text-foreground/80">{doc.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{doc.name.includes('Pending') || doc.name.includes('Upcoming') ? 'Coming Soon' : 'View'}</span>
                        </div>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-6 w-6 text-brand-orange" />
                            Financial Transparency
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-6 text-foreground/80">
                            We believe that every penny counts. Here's a planned breakdown of how we utilize the funds we receive to maximize our impact.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Program Services & Initiatives</span>
                                    <span className="text-sm font-medium text-foreground">85%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2.5">
                                    <div className="bg-brand-teal h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Administration & Overheads</span>
                                    <span className="text-sm font-medium text-foreground">10%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2.5">
                                    <div className="bg-brand-orange h-2.5 rounded-full" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Fundraising</span>
                                    <span className="text-sm font-medium text-foreground">5%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2.5">
                                    <div className="bg-brand-yellow h-2.5 rounded-full" style={{ width: '5%' }}></div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground">
                            This is a projected allocation. Our first annual report with detailed financials will be published at the end of the fiscal year.
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Legal Policies</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Link href="/terms-conditions" className="text-primary hover:underline">Terms & Conditions</Link>
                        <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
