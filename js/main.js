// City toggle — persists choice so menu.html opens on the right city
const savedCity = getCity();
document.querySelectorAll('.city-toggle button').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.city === savedCity);
  btn.addEventListener('click', () => {
    document.querySelectorAll('.city-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setCity(btn.dataset.city);
  });
});

// Menu category tabs (visual state for now — same reason)
document.querySelectorAll('.menu-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
