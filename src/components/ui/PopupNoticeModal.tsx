"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys, queryFns } from "@/src/lib/queries";

const STORAGE_KEY = "bk_popup_seen";

export default function PopupNoticeModal() {
  const [visible, setVisible] = useState(false);

  const { data: notice } = useQuery({
    queryKey: queryKeys.activePopupNotice(),
    queryFn: queryFns.activePopupNotice,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!notice) return;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (seen !== notice.id) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [notice]);

  const dismiss = () => {
    if (!notice) return;
    try { localStorage.setItem(STORAGE_KEY, notice.id); } catch { /* noop */ }
    setVisible(false);
  };

  if (!visible || !notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-[#1e2a26]">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#2a3832] dark:text-gray-300 dark:hover:bg-[#354a40]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Logo */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="relative h-10 w-44">
            <Image
              src="/best-khabar-green1.png"
              alt="Best Khabar"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 text-center">
          <h2 className="mb-4 text-xl font-bold text-ink dark:text-gray-100">
            {notice.title}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {notice.content.split("\n").map((para, i) =>
              para.trim() ? (
                <p key={i}>{para}</p>
              ) : null
            )}
          </div>

          <button
            onClick={dismiss}
            className="mt-8 rounded-xl border border-line px-10 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gray-50 dark:border-[#2a3832] dark:text-gray-200 dark:hover:bg-[#2a3832]"
          >
            {notice.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
