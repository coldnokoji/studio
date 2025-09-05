import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Awards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, edit, or delete awards and recognitions.</p>
            <Button asChild>
              <Link href="/admin/awards">Go to Awards</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, edit, or delete past events.</p>
            <Button asChild>
              <Link href="/admin/events">Go to Events</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, edit, or delete team members.</p>
            <Button asChild>
              <Link href="/admin/team">Go to Team</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
