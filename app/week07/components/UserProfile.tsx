"use client";

import { useMemo } from "react";
import { useSession } from "../hooks/useSession";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

export default function UserProfile() {
  const { storedUser } = useSession();
  const user = useMemo(() => {
    if (!storedUser) return null;
    try {
      const parsed: unknown = JSON.parse(storedUser);
      if (typeof parsed !== "object" || parsed === null) return null;
      const data = parsed as Record<string, unknown>;
      return {
        name: typeof data.name === "string" ? data.name : undefined,
        email: typeof data.email === "string" ? data.email : undefined,
        role: typeof data.role === "string" ? data.role : undefined,
      } satisfies User;
    } catch (error) {
      console.error("Could not read saved user profile:", error);
      return null;
    }
  }, [storedUser]);

  return (
    <div className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
      <p
        className={
          storedUser !== null
            ? "font-semibold text-green-700"
            : "font-semibold text-gray-600"
        }
      >
        {storedUser !== null ? "Logged in" : "Not logged in"}
      </p>
      {storedUser !== null && user && (
        <>
          <p>{user.name || user.email || "User"}</p>
          {user.email && user.name && <p className="text-gray-600">{user.email}</p>}
          {user.role && <p className="text-gray-600">Role: {user.role}</p>}
        </>
      )}
    </div>
  );
}
