import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="py-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the admin area. This is a placeholder for future features
            like portfolio management and analytics.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/login">Return to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
