import { SettingsForm } from './settings-form';
import { getSiteSettings } from '@/services/firestore';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Site-wide Settings</h1>
      <p className="mb-8 text-muted-foreground">
        Manage key images and content that appear across your public website.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
