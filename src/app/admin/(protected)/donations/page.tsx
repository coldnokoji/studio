// src/app/admin/(protected)/donations/page.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  getAllDonations, // <-- FIX 1: Import the correct function
} from "@/services/firestore";
import { Donation } from "@/lib/types";

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export default async function DonationsPage() {
  const donations = await getAllDonations(); // <-- FIX 2: Call the correct function

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Donations</h1>
        <Button asChild>
          <Link href="/admin/donations/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Donation
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation: Donation) => (
              <TableRow key={donation.id}>
                <TableCell>
                  {new Date(donation.donationDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="font-medium">{donation.name}</TableCell>
                <TableCell>{donation.email}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(donation.amount)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      donation.status === "success"
                        ? "default"
                        : "destructive"
                    }
                    className={donation.status === "success" ? "bg-green-600" : ""}
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {donation.isRecurring ? (
                    <Badge variant="outline">Recurring</Badge>
                  ) : (
                    <Badge variant="secondary">One-time</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}