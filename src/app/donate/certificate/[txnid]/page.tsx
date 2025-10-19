
import { getDonationByTxnId, getSiteSettings } from '@/services/firestore';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import Image from 'next/image';

export default async function DonationCertificatePage({ params }: { params: { txnid: string } }) {
  const donation = await getDonationByTxnId(params.txnid);
  const settings = await getSiteSettings();

  if (!donation) {
    notFound();
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-8 flex items-center justify-center font-serif print:bg-white">
      <div 
        className="w-full max-w-4xl bg-white shadow-2xl rounded-lg relative overflow-hidden print:shadow-none" 
        style={{ border: '10px solid transparent', borderImage: 'url(/border-pattern.svg) 30 round' }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'url(/ngologo.png)', backgroundSize: '300px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
        <main className="p-8 sm:p-16 text-center relative z-10">
          <header className="mb-8">
             <div className="mx-auto mb-6" style={{ width: '80px'}}>
                <Logo />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-widest text-slate-700 uppercase">
              Certificate of Appreciation
            </h1>
          </header>

          <section className="mb-8">
            <p className="text-lg text-slate-600">This certificate is proudly presented to</p>
            <p className="text-4xl sm:text-5xl font-bold text-brand-orange my-4 tracking-wide">
              {donation.name}
            </p>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              in grateful recognition of your generous contribution. Your support empowers us to continue our mission of fostering a compassionate and self-reliant society.
            </p>
          </section>

          <section className="flex justify-center items-center gap-8 mb-10">
             <div className="text-center">
                <p className="font-bold text-slate-700 border-t-2 border-slate-300 pt-2 mt-2">{settings.founderName}</p>
                <p className="text-sm text-slate-500">Founder</p>
            </div>
          </section>
          
          <footer className="text-xs text-slate-500">
            <p>Issued on: {new Date(donation.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            <p>Transaction ID: {donation.txnid}</p>
          </footer>
        </main>
         <div className="absolute bottom-4 right-4 print:hidden">
            <Button onClick={() => window.print()} variant="ghost" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print or Save as PDF
            </Button>
        </div>
      </div>
    </div>
  );
}
