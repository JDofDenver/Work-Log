"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface ClientNavItemsProps {
  navItems: NavItem[];
}

export function ClientNavItems({ navItems }: ClientNavItemsProps) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Icon size={16} />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </>
  );
}