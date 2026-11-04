"use client";

import { useSyncExternalStore } from "react";

function subscribeToSession(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("session-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("session-change", callback);
  };
}

function getSessionSnapshot() {
  if (typeof window === "undefined" || !localStorage.getItem("token")) {
    return null;
  }
  return localStorage.getItem("user") ?? "";
}

function getServerSessionSnapshot() {
  return null;
}

export function useSession() {
  const storedUser = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSessionSnapshot
  );

  return { isLoggedIn: storedUser !== null, storedUser };
}
