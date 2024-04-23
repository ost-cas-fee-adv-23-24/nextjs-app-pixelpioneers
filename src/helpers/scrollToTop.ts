export function scrollToTop() {
    const isBrowser = () => typeof window !== 'undefined';
    // return empty if function is called on server side
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
