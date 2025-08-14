"use client";

import React from "react";
import Button from "./ui/Button";

type Props = {
  text: string;
  url?: string;
  hashtags?: string[];
};

export default function TwitterShareButton({
  text,
  url,
  hashtags = [],
}: Props) {
  const onShare = () => {
    const shareUrl = new URL("https://twitter.com/intent/tweet");
    shareUrl.searchParams.set("text", text);
    if (url) shareUrl.searchParams.set("url", url);
    if (hashtags.length)
      shareUrl.searchParams.set("hashtags", hashtags.join(","));
    window.open(shareUrl.toString(), "_blank");
  };
  return (
    <Button onClick={onShare} variant="secondary" className="gap-2">
      Share on X
    </Button>
  );
}
