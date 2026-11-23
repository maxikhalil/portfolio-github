(() => {
  const videos = [
    { color: 'Rojo', id: '1249171729', title: "Cuphead \"Baila o Muere\"" },
    { color: 'Amarillo izquierda', id: '1249171663', title: "Ojo" },
    { color: 'Verde agua', id: '1249171661', title: "Demostración VFX" },
    { color: 'Morado', id: '1249171717', title: "Plantilla Projection Mapping" },
    { color: 'Celeste', id: '1249171662', title: "Cruz Roja \"Asistente Adulto Mayor\"" },
    { color: 'Rosa', id: '1249171731', title: "Manifiesto Tesis \"Marmolado\"" },
    { color: 'Verde', id: '1249171660', title: "Taylor Swift Eras" },
    { color: 'Marrón', id: '1249171693', title: "Vivir Así" },
    { color: 'Amarillo derecha', id: '1247714416', title: "Steam" }
  ];
  const dialog = document.getElementById('motionDialog');
  const player = document.getElementById('motionPlayer');
  const close = document.getElementById('motionClose');
  let trigger = null;

  function unload() {
    // Quitar el iframe también detiene el audio y la descarga del video.
    player.replaceChildren();
  }
  function dismiss() {
    unload();
    dialog.close();
    window.navigateDetail?.();
  }
  function open(video, button) {
    unload();
    trigger = button;
    document.getElementById('motionTitle').textContent = video.title;
    document.getElementById('motionVimeo').href = `https://vimeo.com/${video.id}`;
    const iframe = document.createElement('iframe');
    iframe.title = `Reproducir: ${video.title}`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.src = `https://player.vimeo.com/video/${video.id}?autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`;
    player.append(iframe);
    dialog.showModal();
    window.navigateDetail?.(videos.indexOf(video));
    close.focus({ preventScroll: true });
  }
  document.querySelectorAll('#gears .gear').forEach((button, index) => {
    const video = videos[index];
    if (!video) return;
    button.setAttribute('aria-label', `Reproducir: ${video.title}`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'motionDialog');
    button.onclick = () => open(video, button);
  });
  window.restoreDetail = index => {
    if (index == null) { if (dialog.open) dismiss(); return; }
    const button = document.querySelectorAll('#gears .gear')[index];
    if (button && (!dialog.open || trigger !== button)) open(videos[index], button);
  };
  close.addEventListener('click', dismiss);
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    dismiss();
  });
  dialog.addEventListener('close', () => {
    unload();
    trigger?.focus({ preventScroll: true });
  });
  let backdropPress = false;
  dialog.addEventListener('pointerdown', event => {
    const r = dialog.getBoundingClientRect();
    backdropPress = event.target === dialog &&
      (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom);
  });
  dialog.addEventListener('click', event => {
    if (backdropPress && event.target === dialog) dismiss();
    backdropPress = false;
  });
  window.addEventListener('pagehide', unload);
})();
