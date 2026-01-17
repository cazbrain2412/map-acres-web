"use client";

type Props = {
  className?: string;
};

export function LogoutButton({ className }: Props) {
  async function onLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      // Always go back to login after logout
      window.location.href = "/admin/login";
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className={
        className ||
        "mt-2 w-full rounded-2xl bg-[#225BA0] px-4 py-3 text-sm font-semibold hover:opacity-90"
      }
    >
      Logout
    </button>
  );
}

