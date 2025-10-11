
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

// Ensure NEXT_PUBLIC_BASE_URL is read correctly on the server
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? (process.env.NEXT_PUBLIC_BASE_URL.startsWith('http') ? process.env.NEXT_PUBLIC_BASE_URL : `https://${process.env.NEXT_PUBLIC_BASE_URL}`)
  : 'http://localhost:3000';

export const DonationReceiptEmail = ({ donation }: DonationReceiptEmailProps) => {
  const logoUrl = `${baseUrl}/ngologo.png`;
  const receiptUrl = `${baseUrl}/donate/receipt/${donation.txnid}`;
  const certificateUrl = `${baseUrl}/donate/certificate/${donation.txnid}`;

  return (
    <Html>
      <Head />
      <Preview>Thank you for your donation to Shreyaskar Foundation!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logoUrl} width="64" height="64" alt="Shreyaskar Foundation Logo" />
          </Section>
          <Heading style={h1}>Thank You, {donation.name}!</Heading>
          <Text style={text}>
            Your generous donation of **₹{donation.amount.toFixed(2)}** has been successfully received. On behalf of everyone at Shreyaskar Social Welfare Foundation, we are incredibly grateful for your support.
          </Text>
          <Text style={text}>
            Your contribution is vital to our mission and helps us create a lasting impact. You can now view and download your official receipt and a special certificate of appreciation.
          </Text>
          
          <Section style={btnContainer}>
            <Link style={button} href={receiptUrl}>
              View & Download Receipt
            </Link>
          </Section>

          <Section style={btnContainer}>
            <Link style={{ ...button, ...buttonSecondary }} href={certificateUrl}>
              Get Your Appreciation Certificate
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
};

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

const btnContainer = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const button = {
  backgroundColor: '#F97316', // brand-orange
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
};

const buttonSecondary = {
    backgroundColor: '#FBBF24', // brand-yellow
    color: '#1E293B', // slate-800
}

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
