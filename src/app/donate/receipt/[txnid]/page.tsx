
import { getDonationByTxnId } from '@/services/firestore';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default async function DonationReceiptPage({ params }: { params: { txnid: string } }) {
  const donation = await getDonationByTxnId(params.txnid);

  if (!donation) {
    notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <header className="bg-gray-50 border-b border-gray-200 p-8">
            <div className="flex justify-between items-center">
                <div className="scale-125 origin-left">
                    <Logo />
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-slate-800">Donation Receipt</h1>
                    <p className="text-gray-500">Transaction ID: {donation.txnid}</p>
                </div>
            </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Billed To</h2>
              <p className="font-medium text-gray-800">{donation.name}</p>
              <p className="text-gray-600">{donation.email}</p>
            </div>
            <div className="text-right">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Donation Date</h2>
              <p className="font-medium text-gray-800">{new Date(donation.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-600 uppercase">Description</th>
                <th className="p-3 text-right text-sm font-semibold text-gray-600 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">
                  {donation.isRecurring ? 'Monthly Donation' : 'One-time Donation'} to Shreyaskar Social Welfare Foundation
                </td>
                <td className="p-3 text-right">₹{donation.amount.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="p-3 text-right font-bold text-gray-800">Total</td>
                <td className="p-3 text-right font-bold text-gray-800">₹{donation.amount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-10 text-center text-sm text-gray-600">
            <p className="font-semibold">Thank you for your generous contribution!</p>
            <p className="mt-2 max-w-xl mx-auto">Your donation is vital for our mission. All donations are tax-exempt under Section 80G of the Income Tax Act, India. This document serves as your official receipt.</p>
          </div>
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-200 p-8 text-xs text-gray-500 text-center">
            <p>Shreyaskar Social Welfare Foundation</p>
            <p>123 Social Welfare Avenue, Mumbai, 400001, India | contact@shreyaskar.org</p>
             <div className="mt-6 print:hidden">
                 <Button onClick={() => window.print()} className="bg-brand-orange hover:bg-brand-orange/90">
                    <Printer className="mr-2 h-4 w-4" />
                    Print or Save as PDF
                </Button>
            </div>
        </footer>
      </div>
    </div>
  );
}
