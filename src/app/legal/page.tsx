import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const documents = [
  { name: 'Registration Certificate', href: '#' },
  { name: '80G & 12A Certificates', href: '#' },
  { name: 'FCRA Certificate', href: '#' },
  { name: 'Annual Report 2023', href: '#' },
  { name: 'Annual Report 2022', href: '#' },
  { name: 'Audited Financial Statement 2023', href: '#' },
  { name: 'Audited Financial Statement 2022', href: '#' },
];

export default function LegalPage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Legal & Statutory Documents
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          We are committed to maintaining transparency and accountability in all our operations.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Our Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {documents.map((doc) => (
              <li key={doc.name}>
                <Link href={doc.href} passHref>
                  <a target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-foreground/80">{doc.name}</span>
                    </div>
                    <span className="text-sm text-primary hover:underline">Download</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
