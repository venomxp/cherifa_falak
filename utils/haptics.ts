/**
 * Triggers a short vibration on supported devices.
 * This is used to provide tactile feedback for user interactions,
 * enhancing the native app-like experience.
 */
export const triggerHapticFeedback = () => {
  // Check if the Vibration API is supported by the browser
  if ('vibrate' in navigator) {
    // A short 50ms vibration is typically good for a "tap" feedback
    navigator.vibrate(50);
  }
};
