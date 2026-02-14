// Suppress noisy console network errors from blocked ad scripts (adblockers)
// This listens for global error events and prevents them from spamming the console
// when an extension or client blocks external ad scripts like adsbygoogle.

window.addEventListener('error', function (event) {
    try {
        const filename = event.filename || '';
        const message = (event.message || '').toString();

        // Common host and script name used by Google AdSense/ads scripts
        if (filename.includes('pagead2.googlesyndication.com') || filename.includes('adsbygoogle.js')) {
            // Prevent default logging for this error
            event.preventDefault();
            return true;
        }

        // Some blockers surface as network errors containing ERR_BLOCKED_BY_CLIENT
        if (message.includes('ERR_BLOCKED_BY_CLIENT') && (filename.includes('googlesyndication') || filename.includes('adsbygoogle'))) {
            event.preventDefault();
            return true;
        }
    } catch (e) {
        // fallback: don't block other errors
    }
});

// Also listen for unhandledrejection just in case a promise related to ad loading rejects
window.addEventListener('unhandledrejection', function (evt) {
    try {
        const reason = (evt.reason || '').toString();
        if (reason.includes('ERR_BLOCKED_BY_CLIENT') || reason.includes('googlesyndication') || reason.includes('adsbygoogle')) {
            evt.preventDefault();
            return true;
        }
    } catch (e) {}
});
