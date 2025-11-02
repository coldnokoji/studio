'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Printer } from 'lucide-react';

// Define the props our button will accept
interface PrintButtonProps extends ButtonProps {
  elementId: string; // The ID of the element to print
}

export function PrintButton({
  elementId,
  className,
  ...props
}: PrintButtonProps) {
  
  const handlePrint = () => {
    const printElement = document.getElementById(elementId);
    if (!printElement) {
      console.error(`Element with id "${elementId}" not found.`);
      return;
    }

    const content = printElement.innerHTML;
    const originalPage = document.body.innerHTML;

    // Get styles from the head
    const styles = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('\n');

    // Create a new document body with only our content
    const newBody = `
      <html>
        <head>
          <title>Print Receipt</title>
          ${styles}
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body style="padding: 2rem; background-color: white;">
          ${content}
        </body>
      </html>
    `;

    // Temporarily replace the page's content
    document.body.innerHTML = newBody;

    // Call the print dialog
    window.print();

    // Restore the original page content
    document.body.innerHTML = originalPage;

    // Reload to re-attach event listeners and scripts
    window.location.reload();
  };

  return (
    <Button
      onClick={handlePrint}
      // Use cn() to merge default and passed classNames
      className={cn(
        "bg-brand-orange hover:bg-brand-orange/90", // Your original styles
        className, // Styles passed from the receipt page (e.g., bg-blue-600)
      )}
      {...props}
    >
      <Printer className="mr-2 h-4 w-4" />
      Print or Save as PDF
    </Button>
  );
}