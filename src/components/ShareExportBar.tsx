"use client";

import React from "react";
import Button from "./ui/Button";
import * as htmlToImage from "html-to-image";

type Props = {
  targetId: string;
  tweetText: string;
  fileName?: string;
};

export default function ShareExportBar({
  targetId,
  tweetText,
  fileName = "rise-passport.png",
}: Props) {
  const [isWorking, setIsWorking] = React.useState(false);
  const [exportedFile, setExportedFile] = React.useState<File | null>(null);

  const captureToFile = async (): Promise<File> => {
    const node = document.getElementById(targetId);
    if (!node) throw new Error("Target element not found");

    // Ensure all <img> within the node are fully decoded before capture
    const imgs = Array.from(node.querySelectorAll("img")) as HTMLImageElement[];
    await Promise.all(
      imgs.map(async (img) => {
        try {
          if (img.complete && img.naturalWidth > 0) return;
          if (
            typeof (img as unknown as { decode: () => Promise<void> })
              .decode === "function"
          ) {
            await (img as unknown as { decode: () => Promise<void> }).decode();
          } else {
            await new Promise<void>((resolve, reject) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => reject(), { once: true });
            });
          }
        } catch {
          // ignore decode errors; image may still render
        }
      })
    );

    const filterNode = (el: Element | DocumentFragment | null) => {
      // Allow non-element nodes (e.g., text) to pass
      const node = el as Element | null;
      if (
        !node ||
        typeof (node as unknown as { hasAttribute: () => boolean })
          .hasAttribute !== "function"
      )
        return true;
      return !(node as HTMLElement).hasAttribute("data-export-ignore");
    };

    let dataUrl: string | null = null;
    try {
      dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#08080c",
        filter: filterNode,
        style: { transform: "none" },
      });
    } catch {
      const fallbackBlob = await htmlToImage.toBlob(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#08080c",
        filter: filterNode,
        style: { transform: "none" },
      });
      if (fallbackBlob) {
        dataUrl = URL.createObjectURL(fallbackBlob);
      }
    }

    if (!dataUrl) throw new Error("Failed to render image");
    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], fileName, { type: "image/png" });
  };

  const onExport = async () => {
    if (isWorking) return;
    setIsWorking(true);
    try {
      const file = await captureToFile();
      setExportedFile(file);
      // trigger download
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2500);
    } catch (err) {
      console.error(err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsWorking(false);
    }
  };

  const onShare = () => {
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", tweetText);

    window.open(intent.toString(), "_blank");
  };

  return (
    <div className="flex items-center gap-3" data-export-ignore>
      <Button onClick={onExport} disabled={isWorking} className="gap-2">
        {isWorking
          ? "Preparing…"
          : exportedFile
          ? "Re-export PNG"
          : "Export PNG"}
      </Button>
      <Button onClick={onShare} variant="secondary" className="gap-2">
        Share on X
      </Button>
    </div>
  );
}
