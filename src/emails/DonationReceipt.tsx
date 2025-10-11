import { Donation } from '@/lib/types';
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Heading,
} from '@react-email/components';
import * as React from 'react';

interface DonationReceiptEmailProps {
  donation: Donation;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const logoUrl = `${baseUrl}/ngologo.png`;

export const DonationReceiptEmail = ({ donation }: DonationReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Donation Receipt from Shreyaskar Social Welfare Foundation</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img src={logoUrl} width="64" height="64" alt="Shreyaskar Foundation Logo" />
        </Section>
        <Heading style={h1}>Thank You for Your Generous Donation</Heading>
        <Text style={text}>
          Dear {donation.name},
        </Text>
        <Text style={text}>
          On behalf of the entire Shreyaskar Social Welfare Foundation team, thank you for your generous contribution. Your support is vital to our mission and helps us create a lasting impact in the communities we serve.
        </Text>
        
        <Section style={receiptContainer}>
            <Heading as="h2" style={receiptHeading}>Donation Receipt</Heading>
            <Section style={receiptItem}>
                <Text style={receiptLabel}>Amount:</Text>
                <Text style={receiptValue}>₹{donation.amount.toFixed(2)}</Text>
            </Section>
            <Section style={receiptItem}>
                <Text style={receiptLabel}>Date:</Text>
                <Text style={receiptValue}>{new Date(donation.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
            </Section>
            <Section style={receiptItem}>
                <Text style={receiptLabel}>Transaction ID:</Text>
                <Text style={receiptValue}>{donation.txnid}</Text>
            </Section>
            <Section style={receiptItem}>
                <Text style={receiptLabel}>Payment Type:</Text>
                <Text style={receiptValue}>{donation.isRecurring ? 'Monthly Recurring' : 'One-time'}</Text>
            </Section>
        </Section>
        
        <Text style={text}>
          Your contribution is tax-exempt under Section 80G of the Income Tax Act. This email serves as your official receipt.
        </Text>
        <Text style={text}>
          To learn more about how your donation is making a difference, please visit our website.
        </Text>
        <Section style={btnContainer}>
          <Link style={button} href={baseUrl}>
            Visit Our Website
          </Link>
        </Section>
        <Text style={{ ...text, marginTop: '20px' }}>
          Warmly,
          <br />
          The Shreyaskar Social Welfare Foundation Team
        </Text>
        <Section style={footer}>
            <Text style={footerText}>
                Shreyaskar Social Welfare Foundation | 123 Social Welfare Avenue, Mumbai, 400001, India
            </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default DonationReceiptEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #eaeaea',
};

const logoContainer = {
    textAlign: 'center' as const,
    margin: '20px 0',
}

const h1 = {
  color: '#1d3557',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const text = {
  color: '#4a4a4a',
  fontSize: '14px',
  lineHeight: '24px',
};

const receiptContainer = {
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
}

const receiptHeading = {
    color: '#1d3557',
    fontSize: '18px',
    margin: '0 0 16px 0',
    textAlign: 'center' as const,
}

const receiptItem = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
}

const receiptLabel = {
    color: '#6c757d',
    fontSize: '14px',
    margin: 0,
}

const receiptValue = {
    color: '#1d3557',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0,
}

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#F97316',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const footer = {
    marginTop: '20px',
    borderTop: '1px solid #eaeaea',
    paddingTop: '20px',
}

const footerText = {
    color: '#6c757d',
    fontSize: '12px',
    textAlign: 'center' as const,
}
