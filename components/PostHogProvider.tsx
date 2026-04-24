"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false,
      autocapture: true,
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        posthog.capture("page_hidden", {
          $current_url: window.location.href,
        }, { transport: "sendBeacon" });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
