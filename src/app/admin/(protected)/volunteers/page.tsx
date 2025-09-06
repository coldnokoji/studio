import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getVolunteerApplications } from '@/services/firestore';
import { Button } from '@/components/ui/button';
import { deleteVolunteerApplicationAction } from './actions';

export default async function AdminVolunteersPage() {
  const applications = await getVolunteerApplications();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Volunteer Applications</h1>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <CardTitle>{app.name}</CardTitle>
              <CardDescription>Applied on {new Date(app.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href={`mailto:${app.email}`} className="text-primary hover:underline">{app.email}</a></p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Area of Interest:</strong> {app.areaOfInterest}</p>
                <p><strong>Availability:</strong> {app.availability}</p>
              </div>
               <form action={deleteVolunteerApplicationAction.bind(null, app.id)} className="mt-4">
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
            </CardContent>
          </Card>
        ))}
        {applications.length === 0 && (
          <p>No volunteer applications yet.</p>
        )}
      </div>
    </div>
  );
}
