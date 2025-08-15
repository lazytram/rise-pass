"use client";

import { signIn } from "next-auth/react";
import Button from "./ui/Button";

export default function DiscordLoginButton() {
  return (
    <Button onClick={() => signIn("discord", { callbackUrl: "/reveal" })}>
      Login with Discord
    </Button>
  );
}
