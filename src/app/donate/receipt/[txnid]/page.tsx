import { getDonationByTxnId } from "@/services/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PrintButton } from "@/components/ui/print-button";
import { toWords } from "number-to-words";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Logo } from '@/components/logo';

// --- TODO: FILL IN ALL YOUR NGO DETAILS HERE ---
const NGO_NAME = "Shreyaskar";
const NGO_SUBTITLE = "SOCIAL WELFARE FOUNDATION";
const NGO_HINDI_TEXT = "सेवा परमो धर्मः"; // Service is the highest duty
const NGO_REG_OFFICE = "832-G, Nyay Khand-1, Indira Puram, Near Sai Mandir, Ghaziabad- 201014 Utter Pradesh.";
const NGO_EMAIL = "info@shreyaskarfoundation.com";
const NGO_MOBILE = "9768000257/138";

// Organization Details (Left side)
const CIN_NO = "U85500UP2025NPL227438";
const SECTION_8_LICENCE = "170505";
const NGO_PAN = "ABQCS6673P";
const REG_80G = "ABQCS6673PF2025101"; // Leave empty if not available

// Bank Details (Right side)
const BANK_NAME = "Axis Bank";
const ACCOUNT_NO = "925020037943327";
const IFSC_CODE = "UTIB0004497";
const BRANCH = "Noida Sec-74";

const TAX_EXEMPTION_TEXT = "Donation Exempted Covered U/S 80G/12A of the Income Tax Act.1961";
// --- END OF TODO ---

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ txnid: string }>;
}) {
  const { txnid } = await params;
  const donation = await getDonationByTxnId(txnid);

  if (!donation || donation.status !== 'success') {
    notFound();
  }

  // Format amount to words
  const amountInWords = toWords(donation.amount || 0)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Format the date to DD-MM-YYYY
  const donationDate = new Date(donation.donationDate || new Date()).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  // Format the amount
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(donation.amount || 0);

  return (
    <>
      <Header />
      {/* Main content area */}
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Printable Area */}
          <div id="printable-receipt" className="bg-white shadow-xl rounded-none overflow-hidden p-0">

            {/* Border wrapper */}
            <div className="border-4 border-black m-0">

              {/* Header Section with Logo */}
              <div className="border-b-2 border-black p-4">
                {/* Devanagari text and Logo - vertically stacked and centered */}
                <div className="flex flex-col items-center">
                  {/* Devanagari text on top */}
                  <p className="text-sm font-semibold mb-2">{NGO_HINDI_TEXT}</p>

                  {/* Logo below */}
                  <Logo />
                </div>

                {/* Contact Details Below */}
                <div className="mt-4 text-xs text-center">
                  <p className="font-semibold">Reg. Office: {NGO_REG_OFFICE}</p>
                  <div className="flex justify-center gap-8 mt-1">
                    <p><span className="font-semibold">Email :</span> {NGO_EMAIL}</p>
                    <p><span className="font-semibold">Mobile :</span> {NGO_MOBILE}</p>
                  </div>
                </div>
              </div>


              {/* DONATION RECEIPT Title */}
              <div className="text-center py-2 border-b-2 border-black">
                <h2 className="text-2xl font-bold tracking-wider">DONATON RECEIPT</h2>
              </div>

              {/* Receipt Number and Date */}
              <div className="flex justify-between px-4 py-2 border-b border-black text-sm">
                <div>Receipt No: <span className="font-semibold">{donation.id}</span></div>
                <div>Date : <span className="font-semibold">{donationDate}</span></div>
              </div>

              {/* NGO Details and Bank Details Table */}
              <div className="border-b-2 border-black">
                <div className="grid grid-cols-3">
                  {/* NGO Details - Left Column */}
                  <div className="col-span-1 border-r border-black">
                    <div className="bg-gray-100 border-b border-black px-3 py-1 font-bold text-center text-sm">
                      NGO Details
                    </div>
                    <div className="text-xs">
                      <div className="border-b border-gray-300 px-3 py-1.5">
                        <span className="font-semibold">CIN No :</span> {CIN_NO}
                      </div>
                      <div className="border-b border-gray-300 px-3 py-1.5">
                        <span className="font-semibold">Section 8 Licence No :</span> {SECTION_8_LICENCE}
                      </div>
                      <div className="border-b border-gray-300 px-3 py-1.5">
                        <span className="font-semibold">NGO PAN No :</span> {NGO_PAN}
                      </div>
                      <div className="px-3 py-1.5">
                        <span className="font-semibold">80G Reg No :</span> {REG_80G || "-"}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details - Middle Column */}
                  <div className="col-span-1 border-r border-black">
                    <div className="bg-gray-100 border-b border-black px-3 py-1 font-bold text-center text-sm">
                      Bank Details
                    </div>
                    <div className="text-xs">
                      <div className="border-b border-gray-300 px-3 py-1.5">
                        <span className="font-semibold">Bank Name :</span> {BANK_NAME}
                      </div>
                      <div className="border-b border-gray-300 px-3 py-1.5">
                        <span className="font-semibold">Account No :</span> {ACCOUNT_NO}
                      </div>
                      <div className="border-b border-gray-300 px-3 py-1.5">
                        <span className="font-semibold">IFSC :</span> {IFSC_CODE}
                      </div>
                      <div className="px-3 py-1.5">
                        <span className="font-semibold">Branch :</span> {BRANCH}
                      </div>
                    </div>
                  </div>

                  {/* QR Code / Scan for Donation - Right Column */}
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="text-center text-xs font-semibold">
                      Scan for Donation
                      {/* You can add QR code image here if needed */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              <div className="px-4 py-3 border-b-2 border-black">
                <p className="text-sm">
                  <span className="font-bold">Recevied with thanks from Mr./Mrs. {donation.name}, Pan No- {(donation.pan || "").toUpperCase()}</span>
                </p>
                <p className="text-sm mt-1">
                  Rupees. <span className="font-semibold">{amountInWords} Only</span>
                </p>
                <p className="text-sm mt-1">
                  on account of membership/donation to {NGO_NAME} {NGO_SUBTITLE} by <span className="font-semibold">{donation.paymentMode || "Online"}</span>
                </p>
              </div>

              {/* Amount Box and Signatures */}
              <div className="px-4 py-6">
                <div className="flex justify-between items-start">
                  {/* Amount Box */}
                  <div className="border-2 border-black px-6 py-3 inline-block">
                    <p className="text-lg font-bold">{formattedAmount}</p>
                  </div>

                  {/* Signatures Section */}
                  <div className="flex gap-12 items-end">
                    <div className="text-center">
                      <div className="h-16 w-32 flex items-center justify-center mb-1">
                        {/* Signature space */}
                      </div>
                      <div className="border-t border-black pt-1 text-xs">Received by</div>
                    </div>

                    <div className="text-center">
                      <div className="h-16 w-32 flex items-center justify-center mb-1">
                        {/* Signature space */}
                      </div>
                      <div className="border-t border-black pt-1 text-xs">Treasurer Signature</div>
                    </div>

                    <div className="text-center">
                      <div className="h-16 w-32 flex items-center justify-center mb-1">
                        {/* Signature space */}
                      </div>
                      <div className="border-t border-black pt-1 text-xs">Secretary Signature</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Exemption Footer */}
              <div className="text-center py-2 bg-white border-t-2 border-black">
                <p className="text-sm font-semibold">{TAX_EXEMPTION_TEXT}</p>
              </div>

            </div>
          </div>

          {/* Non-printable Area */}
          <div className="mt-8 text-center no-print">
            <PrintButton
              elementId="printable-receipt"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}