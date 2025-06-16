// utils/notify.ts
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) {
    alert("Tarayıcınız bildirimleri desteklemiyor.");
    return "denied";
  }

  if (Notification.permission === "granted") return "granted";

  const permission = await Notification.requestPermission();
  return permission;
}

export function showBrowserNotification(
  title: string,
  body: string,
  url: string
) {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg?.showNotification(title, {
          body,
          icon: "/icon.png",
          data: { url }, // tıklanınca açılacak url
        });
      });
    }
  }
}
