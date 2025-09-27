import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

export default function TermsConditionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="prose lg:prose-lg max-w-4xl mx-auto">
            <h1>Terms and Conditions</h1>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2>Agreement to Terms</h2>
            <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Shreyaskar Social Welfare Foundation (“we,” “us” or “our”), concerning your access to and use of this website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</p>
            <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>

            <h2>Donations</h2>
            <p>All donations made through our third-party payment gateway, PayU, are subject to their terms and conditions. We are not responsible for any issues arising from the payment process but will provide reasonable assistance where possible.</p>
            <p>Donations made to Shreyaskar Social Welfare Foundation are non-refundable. We are a non-profit organization and all funds are used to further our mission. We will issue receipts for all donations for tax exemption purposes as applicable under Indian law.</p>

            <h2>User Representations</h2>
            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms and Conditions; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.</p>
            
            <h2>Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>

            <h2>Governing Law</h2>
            <p>These Terms and Conditions and your use of the Site are governed by and construed in accordance with the laws of India applicable to agreements made and to be entirely performed within the State of Maharashtra, without regard to its conflict of law principles.</p>
            
            <h2>Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
            <p>
                Shreyaskar Social Welfare Foundation<br />
                123 Social Welfare Avenue<br />
                Mumbai, 400001, India<br />
                <a href="mailto:contact@shreyaskar.org">contact@shreyaskar.org</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
