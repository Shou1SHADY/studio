
"use client";

import { useLanguage } from "@/hooks/use-language";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
    const { t } = useLanguage();
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t("admin_dashboard_title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t("admin_dashboard_description")}
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/login">{t("admin_dashboard_return_button")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
