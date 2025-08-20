"use client";

import React from "react";
import Button from "../../components/ui/Button";
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
      <Button
        onClick={onExport}
        disabled={isWorking}
        className="gap-2 px-6 py-3"
      >
        {isWorking
          ? "Preparing…"
          : exportedFile
          ? "Re-export PNG"
          : "Export PNG"}
      </Button>
      <Button onClick={onShare} variant="secondary" className="gap-2 px-6 py-3">
        Share on{" "}
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Button>
    </div>
  );
}
