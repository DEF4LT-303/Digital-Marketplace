import { Metadata } from "next";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Customize your profile.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "History",
    href: "/history",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <MaxWidthWrapper>
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <div className="flex flex-col sm:flex-row justify-between ">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
              </div>
              <Link href="/">
                <div className="hidden sm:block">
                  <Button variant="ghost">
                    <ArrowLeft size={20} className="mr-2" />
                    Back
                  </Button>
                </div>
                <div className="mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="block sm:hidden"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}