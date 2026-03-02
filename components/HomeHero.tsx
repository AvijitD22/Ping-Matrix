"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export const HomeHero = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateURL = (input: string) => {
  if (!input || input.trim() === "") {
    return { valid: false, message: "URL is required." };
  }

  if (/\s/.test(input)) {
    return { valid: false, message: "URL cannot contain spaces." };
  }

  let normalized = input.trim();

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = "https://" + normalized;
  }

  try {
    const url = new URL(normalized);
    const hostname = url.hostname;

    // Block localhost
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return { valid: false, message: "Localhost URLs are not allowed." };
    }

    // Check if IPv4
    const ipv4Regex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

    const isIPv4 = ipv4Regex.test(hostname);

    if (isIPv4) {
      // Block private IP ranges
      const privateIPRegex =
        /^(10\.)|(192\.168\.)|(172\.(1[6-9]|2\d|3[0-1])\.)/;

      if (privateIPRegex.test(hostname)) {
        return {
          valid: false,
          message: "Private IP addresses are not allowed.",
        };
      }

      return { valid: true, normalizedUrl: url.toString() };
    }

    // If not IP, validate as domain
    if (!hostname.includes(".")) {
      return {
        valid: false,
        message: "Please enter a valid domain.",
      };
    }

// If not IP, validate as domain
const domainRegex =
  /^(?!-)(?:[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,}$/;

if (!domainRegex.test(hostname)) {
  return {
    valid: false,
    message: "Invalid domain format.",
  };
}

    return { valid: true, normalizedUrl: url.toString() };

  } catch {
    return { valid: false, message: "Please enter a valid URL." };
  }
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const urlValue = (form.elements.namedItem("url") as HTMLInputElement).value;

    const result = validateURL(urlValue);

    if (!result.valid) {
      setErrorMessage(result.message || "An error occurred.");
      setOpen(true);
      return;
    }

    // Success → continue normally
    router.push("/detail/" + encodeURIComponent(result.normalizedUrl!));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[70vw] text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          Monitor Your Website Uptime Instantly
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Enter your website URL below and start tracking uptime, response time,
          and reliability in seconds. No login required.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="url"
            placeholder="https://yourwebsite.com"
            className="h-12 text-base"
            autoComplete="off"
          />
          <Button
            type="submit"
            className="h-12 px-8 text-base font-semibold cursor-pointer"
          >
            Start Monitoring
          </Button>
        </form>
      </div>

      {/* Error Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid URL</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
