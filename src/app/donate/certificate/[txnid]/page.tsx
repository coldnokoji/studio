import { getDonationByTxnId } from "@/services/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PrintButton } from "@/components/ui/print-button";
import { toWords } from "number-to-words";
import { Logo } from "@/components/logo";

// --- TODO: FILL IN ALL YOUR NGO DETAILS ---
const NGO_NAME = "Shreyaskar";
const NGO_SUBTITLE = "SOCIAL WELFARE FOUNDATION";
const NGO_ADDRESS = "832-G, Nyay Khand-1, Indira Puram, Near Sai Mandir, Ghaziabad- 201014 Utter Pradesh";
const NGO_PAN = "ABQCS6673P";
const NGO_REGISTRATION_NO = "U85500UP2025NPL227438";
const SECTION_8_LICENCE = "170505";
// --- END OF TODO ---

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ txnid: string }>;
}) {
  const { txnid } = await params;
  const donation = await getDonationByTxnId(txnid);

  if (!donation || donation.status !== 'success') {
    notFound();
  }

  const donationDate = formatDate(donation.donationDate || new Date().toISOString());
  const formattedAmount = formatCurrency(donation.amount || 0);
  const amountInWords = toWords(donation.amount || 0)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          <div
            id="printable-certificate"
            className="bg-white shadow-2xl rounded-lg overflow-hidden relative"
            style={{
              background: 'linear-gradient(to bottom, #fffbeb 0%, #ffffff 100%)',
            }}
          >
            {/* Decorative Corner Borders */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-amber-600 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-amber-600 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-amber-600 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-amber-600 rounded-br-lg"></div>

            {/* Decorative Pattern Background */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="30" fill="#d97706" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#d97706" strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>

            <div className="relative z-10 p-12 md:p-16">
              {/* Header with Logo */}
              <div className="text-center mb-8">
                <div className="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
                  <Logo />
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-3"></div>
                <p className="text-xs text-gray-600 max-w-2xl mx-auto">{NGO_ADDRESS}</p>
                <p className="text-xs text-gray-600 mt-1">
                  CIN: {NGO_REGISTRATION_NO} | PAN: {NGO_PAN} | Section 8 Licence: {SECTION_8_LICENCE}
                </p>
              </div>

              {/* Certificate Title */}
              <div className="text-center my-12">
                <div className="inline-block">
                  <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 tracking-wide mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    Certificate of Appreciation
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600"></div>
                    <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  In Recognition of Generous Contribution
                </p>
              </div>

              {/* Certificate Body */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 shadow-inner border border-amber-200">
                  <p className="text-center text-lg text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                    This is to certify that
                  </p>

                  <h3 className="text-3xl font-bold text-center text-amber-900 mb-6" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                    {donation.name}
                  </h3>

                  <p className="text-center text-gray-700 leading-relaxed mb-4">
                    has made a generous donation of
                  </p>

                  <div className="bg-white rounded-lg p-6 shadow-md mb-4 border-2 border-amber-300">
                    <p className="text-4xl font-bold text-center text-amber-800">
                      {formattedAmount}
                    </p>
                    <p className="text-center text-sm text-gray-600 mt-2 italic">
                      ({amountInWords} Rupees Only)
                    </p>
                  </div>

                  <p className="text-center text-gray-700 leading-relaxed mb-4">
                    towards <strong>{donation.purpose || "Donation"}</strong> on <strong>{donationDate}</strong>
                  </p>

                  <div className="bg-amber-100 border-l-4 border-amber-600 p-4 mt-6 rounded">
                    <p className="text-sm text-gray-800">
                      <strong>Tax Benefit:</strong> This donation qualifies for tax exemption under Section 80G of the Income Tax Act, 1961.
                      Transaction ID: <span className="font-mono text-xs">{donation.txnid}</span>
                    </p>
                  </div>
                </div>

                {/* Gratitude Message */}
                <div className="text-center mt-8 mb-12">
                  <p className="text-lg text-amber-900 italic font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                    "Your kindness makes a difference in countless lives"
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    We deeply appreciate your generous support and commitment to our cause
                  </p>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-end pt-8 border-t-2 border-amber-200">
                  <div className="text-left">
                    <p className="text-xs text-gray-500 mb-1">Certificate No: {donation.id}</p>
                    <p className="text-xs text-gray-500">Issue Date: {donationDate}</p>
                    <p className="text-xs text-gray-500 mt-2">Donor PAN: {(donation.pan || "").toUpperCase()}</p>
                  </div>

                  <div className="text-center">
                    <div className="mb-2">
                      <div className="h-16 w-40 flex items-end justify-center">
                        {/* Signature space */}
                        <div className="border-b-2 border-gray-400 w-full"></div>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Authorized Signatory</p>
                    <p className="text-xs text-gray-600">{NGO_NAME}</p>
                    <div className="mt-2">
                      <svg className="w-12 h-12 mx-auto text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>
          </div>

          {/* Print Button */}
          <div className="mt-8 text-center no-print">
            <PrintButton
              elementId="printable-certificate"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}