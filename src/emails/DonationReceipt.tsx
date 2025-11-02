// src/emails/DonationReceipt.tsx

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { toWords } from "number-to-words";
import type { Donation } from "@/lib/types"; // <-- THIS IS THE FIX

// --- TODO: Update these with your NGO's details ---
const NGO_NAME = "NAAM FOUNDATION"; // Example
const NGO_ADDRESS_LINE_1 = "Building No. 1, Example Road";
const NGO_ADDRESS_LINE_2 = "Mumbai - 400001, Maharashtra, India";
const NGO_EMAIL = "info@naamfoundation.org";
const NGO_PHONE = "+91 99999 88888";
const NGO_80G_INFO =
  "All donations are eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961.";
const LOGO_URL = "https://your-ngo-website.org/logo.png"; // TODO: Update this to a full, public URL of your logo

// UPDATED: This interface now matches your Donation type AND includes baseUrl
interface DonationReceiptEmailProps extends Omit<Donation, 'id'> {
  id: string;
  baseUrl: string; // <-- ACCEPT THE PROP
}

// Helper function to format the date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// Helper to format amount to words
const getAmountInWords = (amount: number) => {
  return toWords(amount)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


export const DonationReceiptEmail = (props: DonationReceiptEmailProps) => {
  const {
    id,
    name,
    amount,
    donationDate,
    txnid,
    pan,
    purpose,
    paymentMode,
    phone,
    address,
    baseUrl, // <-- GET THE PROP
  } = props;

  const formattedDate = formatDate(donationDate);
  const formattedAmount = formatCurrency(amount);
  const amountInWords = getAmountInWords(amount);

  return (
    <Html>
      <Head />
      <Preview>
        Thank you for your donation to {NGO_NAME}. Here is your receipt.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img src={LOGO_URL} width="150" alt={`${NGO_NAME} Logo`} />
            <Text style={headerAddress}>
              {NGO_ADDRESS_LINE_1}, {NGO_ADDRESS_LINE_2}
              <br />
              {NGO_EMAIL} | {NGO_PHONE}
            </Text>
          </Section>

          {/* Title */}
          <Section style={content}>
            <Heading style={heading}>Donation Receipt</Heading>
            <Text style={paragraph}>Dear {name},</Text>
            <Text style={paragraph}>
              Thank you for your generous donation to {NGO_NAME}. Your support
              helps us continue our mission. Please find the details of your
              donation below.
            </Text>

            {/* Receipt Details */}
            <Section style={infoBox}>
              <InfoRow label="Receipt No:" value={id} />
              <InfoRow label="Receipt Date:" value={formattedDate} />
              <InfoRow label="Transaction ID:" value={txnid} />
              <InfoRow label="Payment Mode:" value={paymentMode} />
            </Section>

            {/* Donor Information */}
             <Section style={infoBox}>
              <Heading as="h3" style={infoBoxTitle}>Donor Information</Heading>
              <InfoRow label="Donor Name:" value={name} />
              <InfoRow label="Email:" value={props.email} />
              <InfoRow label="Phone:" value={phone} />
              <InfoRow label="PAN No:" value={pan} />
              <InfoRow label="Address:" value={address} />
            </Section>


            {/* Donation Table */}
            <Section style={tableSection}>
              <table style={table} cellPadding="0" cellSpacing="0">
                <thead style={tableHead}>
                  <tr>
                    <th style={tableCellHeader}>Description</th>
                    <th style={tableCellHeaderAmount}>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody style={tableBody}>
                  <tr>
                    <td style={tableCell}>{purpose}</td>
                    <td style={tableCellAmount}>{formattedAmount}</td>
                  </tr>
                </tbody>
                <tfoot style={tableFooter}>
                  <tr>
                    <td style={tableCellFooterTotal}>Total Amount:</td>
                    <td style={tableCellAmount}>{formattedAmount}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={tableCellFooterWords}>
                      <strong>In Words:</strong> {amountInWords} Rupees Only
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Section>

            <Text style={paragraph}>
              <strong>{NGO_80G_INFO}</strong>
            </Text>

            <Hr style={hr} />
            
            {/* --- FIX: Use the baseUrl prop to build links --- */}
            <Section style={linksSection}>
              <Button
                style={button}
                href={`${baseUrl}/donate/receipt/${txnid}`}
              >
                View Receipt Online
              </Button>
              <Button
                style={button}
                href={`${baseUrl}/donate/certificate/${txnid}`}
              >
                Download 80G Certificate
              </Button>
            </Section>
            
            <Text style={smallPrint}>
              This is a computer-generated receipt and does not require a
              physical signature.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} {NGO_NAME}. All rights reserved.
            </Text>
            <Link style={footerLink} href={baseUrl}>
              Visit our website
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Helper component for email
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <Text style={infoRow}>
    <span style={infoLabel}>{label}</span>
    <span style={infoValue}>{value || "-"}</span>
  </Text>
);

export default DonationReceiptEmail;

// --- STYLES ---

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  margin: "40px auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const header = {
  padding: "24px",
  borderBottom: "1px solid #e6e6e6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const headerAddress = {
  fontSize: "12px",
  color: "#555",
  textAlign: "right" as const,
  lineHeight: "1.5",
};

const content = {
  padding: "32px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#007bff", // Blue color
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#f9f9ff",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
  border: "1px solid #eee",
};

const infoBoxTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 12px",
  borderBottom: "1px solid #eee",
  paddingBottom: "8px",
};


const infoRow = {
  fontSize: "14px",
  color: "#333",
  display: "flex",
  justifyContent: "space-between",
  margin: "8px 0",
};

const infoLabel = {
  fontWeight: "600",
  color: "#555",
};

const infoValue = {
  fontWeight: "500",
  color: "#111",
};

const tableSection = {
  margin: "32px 0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e6e6e6",
};

const tableHead = {
  backgroundColor: "#f6f9fc",
};

const tableCellHeader = {
  padding: "12px 16px",
  textAlign: "left" as const,
  fontSize: "12px",
  color: "#555",
  textTransform: "uppercase" as const,
  fontWeight: "600",
};

const tableCellHeaderAmount = {
  ...tableCellHeader,
  textAlign: "right" as const,
};

const tableBody = {
  borderTop: "1px solid #e6e6e6",
};

const tableCell = {
  padding: "16px",
  fontSize: "16px",
  color: "#333",
  borderBottom: "1px solid #e6e6e6",
};

const tableCellAmount = {
  ...tableCell,
  textAlign: "right" as const,
  fontWeight: "600",
};

const tableFooter = {
  backgroundColor: "#f6f9fc",
  borderTop: "2px solid #e6e6e6",
  fontWeight: "bold",
};

const tableCellFooterTotal = {
  ...tableCell,
  textAlign: "right" as const,
  borderBottom: "none",
};

const tableCellFooterWords = {
  ...tableCell,
  paddingTop: "16px",
  fontSize: "14px",
  fontWeight: "500",
  borderBottom: "none",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "32px 0",
};

const linksSection = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 24px",
  margin: "0 8px",
};

const smallPrint = {
  fontSize: "12px",
  color: "#888",
  textAlign: "center" as const,
  lineHeight: "1.5",
  marginTop: "16px",
};

const footer = {
  padding: "24px",
  borderTop: "1px solid #e6e6e6",
  textAlign: "center" as const,
  backgroundColor: "#fafafa",
};

const footerText = {
  fontSize: "12px",
  color: "#888",
  margin: "0 0 8px 0",
};

const footerLink = {
  fontSize: "12px",
  color: "#007bff",
  textDecoration: "underline",
};