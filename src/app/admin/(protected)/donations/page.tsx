import { getDonations } from '@/services/firestore';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';

export default async function AdminDonationsPage() {
  const donations = await getDonations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Txn ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{donation.name}</TableCell>
                <TableCell>{donation.email}</TableCell>
                <TableCell className="font-medium">
                  <span className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {donation.amount.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-xs">{donation.txnid}</TableCell>
                <TableCell>
                   <Badge variant={donation.status === 'success' ? 'default' : 'destructive'} className={donation.status === 'success' ? 'bg-green-600' : ''}>
                    {donation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
             {donations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center">No donations have been made yet.</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
