"use client";

import Link from "next/link";
import Button from "./ui/Button";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between py-4">
      <Link href="/" className="text-lg font-semibold rise-gradient-text">
        RISE Passport
      </Link>
      <nav className="flex items-center gap-3">
        <a href="https://docs.risechain.com/" target="_blank" rel="noreferrer">
          <Button variant="ghost">Docs</Button>
        </a>
        <a
          href="https://twitter.com/intent/tweet?text=RISE%20Passport"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="secondary">Share</Button>
        </a>
      </nav>
    </header>
  );
}
