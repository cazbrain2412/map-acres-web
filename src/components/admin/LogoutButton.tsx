"use client";

export default function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        } finally {
          window.location.href = "/admin/login";
        }
      }}
    >
      Logout
    </button>
  );
}

