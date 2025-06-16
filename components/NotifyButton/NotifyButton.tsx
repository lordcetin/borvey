// components/NotifyButton.tsx
"use client";

import { useEffect, useState } from "react";
import { registerServiceWorker } from "@/utils/register_sw";
import {
  requestNotificationPermission,
  showBrowserNotification,
} from "@/utils/showNotification";

export default function NotifyButton() {
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    registerServiceWorker();
    requestNotificationPermission().then(setPermission);
  }, []);

  return (
    <button
      disabled={permission !== "granted"}
      onClick={() => showBrowserNotification("Merhaba 👋", "Bu bir test bildirimi",'/')}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      Bildirim Gönder
    </button>
  );
}
