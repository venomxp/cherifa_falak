import { translations } from '../localization/translations';

const TIMEOUT_ID_KEY = 'notification_timeout_id';

// Helper to get a random item from an array
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const postNotificationMessage = () => {
    // Ensure service worker is ready before posting a message
    if (!navigator.serviceWorker.ready) {
        console.error("Service worker not ready.");
        return;
    }

    const lang = (localStorage.getItem('language') as 'ar' | 'en' | 'fr') || 'ar';
    const t = translations[lang];

    // Fallback to English if a key is missing in the current language
    const getTranslation = (key: keyof (typeof translations)['en']) => (t as any)[key] || translations.en[key];

    const notificationBodies = [
        getTranslation('notificationBody1'),
        getTranslation('notificationBody2'),
        getTranslation('notificationBody3'),
        getTranslation('notificationBody4'),
    ].filter(Boolean);

    if (notificationBodies.length === 0) return;

    const title = getTranslation('notificationTitle');
    const options: NotificationOptions = {
        body: getRandomItem(notificationBodies),
        icon: '/vite.svg',
        tag: 'falkom-daily-reminder', // Use a tag to prevent stacking notifications
    };
    
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
    });
};

export const scheduleDailyNotification = () => {
    // Clear any previously scheduled timeout to prevent duplicates
    cancelAllNotifications();

    const now = new Date();
    const nextNotification = new Date();
    
    // Schedule for 10:00 AM
    nextNotification.setHours(10, 0, 0, 0);

    // If it's already past 10 AM today, schedule for 10 AM tomorrow
    if (now.getTime() > nextNotification.getTime()) {
        nextNotification.setDate(nextNotification.getDate() + 1);
    }
    
    const delay = nextNotification.getTime() - now.getTime();
    
    // Schedule the next notification
    const timeoutId = setTimeout(() => {
        postNotificationMessage();
        // After showing, reschedule for the next day
        scheduleDailyNotification();
    }, delay);

    // Store the timeout ID so we can clear it from other parts of the app
    localStorage.setItem(TIMEOUT_ID_KEY, String(timeoutId));
};

export const cancelAllNotifications = () => {
    const timeoutId = localStorage.getItem(TIMEOUT_ID_KEY);
    if (timeoutId) {
        clearTimeout(Number(timeoutId));
        localStorage.removeItem(TIMEOUT_ID_KEY);
    }
    
    // Also remove any currently visible notification from our app
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(registration => {
            registration.getNotifications({tag: 'falkom-daily-reminder'}).then(notifications => {
                notifications.forEach(notification => notification.close());
            });
        });
    }
};
