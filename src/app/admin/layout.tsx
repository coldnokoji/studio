// This layout file is intentionally left blank. 
// The protected layout is now in /admin/(protected)/layout.tsx
// and the login page has its own layout.

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
