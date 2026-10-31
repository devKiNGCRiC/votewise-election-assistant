"use client";

import { useEffect } from "react";

// Registers /sw.js in production so visited pages keep working offline.
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // offline support is a bonus; the site works without it
    });
  }, []);
  return null;
}
