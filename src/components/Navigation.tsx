"use client";

import { GradientText } from "@/shared/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/mint", label: "Mint" },
  ];

  return (
    <nav className="bg-black/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <GradientText className="text-xl font-bold">
                RISE Passport
              </GradientText>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-[#7967e5]/20 hover:to-[#ffa0f2]/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
