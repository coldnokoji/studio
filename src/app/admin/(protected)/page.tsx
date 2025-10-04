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
            <CardTitle>View Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">See a history of all successful donations.</p>
            <Button asChild>
              <Link href="/admin/donations">Go to Donations</Link>
            </Button>
          </CardContent>
        </Card>
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
            <CardTitle>Manage Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, edit, or delete gallery images.</p>
            <Button asChild>
              <Link href="/admin/gallery">Go to Gallery</Link>
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
         <Card>
          <CardHeader>
            <CardTitle>Manage News</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create and publish news articles.</p>
            <Button asChild>
              <Link href="/admin/news">Go to News</Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Manage Impact Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Share success stories and testimonials.</p>
            <Button asChild>
              <Link href="/admin/impact">Go to Impact Stories</Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>View Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">See who has signed up to volunteer.</p>
            <Button asChild>
              <Link href="/admin/volunteers">Go to Volunteers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
