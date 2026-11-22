(() => {
  const current = document.currentScript.dataset.layout;
  const url = new URL(window.location.href);
  const requested = url.searchParams.get('layout');
  const pinned = ['mobile', 'desktop'].includes(requested) ? requested : null;
  // Direct mobile links still work as previews; the main entry chooses automatically.
  const automatic = !pinned && (current === 'desktop' || requested === 'auto');
  const portrait = window.matchMedia('(max-width: 900px) and (orientation: portrait)');

  function selectLayout() {
    const desired = pinned || (automatic ? (portrait.matches ? 'mobile' : 'desktop') : current);
    if (desired === current) return;
    const target = new URL(desired === 'mobile' ? 'mobile.html' : './', url);
    target.search = url.search;
    target.hash = url.hash;
    target.searchParams.set('layout', pinned || 'auto');
    window.location.replace(target.href);
  }

  selectLayout();
  if (automatic) {
    portrait.addEventListener('change', selectLayout);
    window.addEventListener('pageshow', selectLayout);
  }
})();
