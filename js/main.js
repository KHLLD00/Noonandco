// Shared navigation, city selection, and homepage menu preview.
(function () {
  const savedCity = getCity();

  document.querySelectorAll('.city-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.city === savedCity);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.city-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setCity(btn.dataset.city);
      renderHomepagePreview(btn.dataset.city);
    });
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  const preview = document.getElementById('homepage-menu-preview');
  const tabs = document.querySelectorAll('.menu-tabs button[data-category]');

  function renderHomepagePreview(city, categoryId = 'meals') {
    if (!preview || typeof MENU_DATA === 'undefined') return;

    const categories = MENU_DATA[city].categories;
    const category = categories.find(c => c.id === categoryId) || categories[0];

    tabs.forEach(btn => {
      const active = btn.dataset.category === category.id;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    preview.innerHTML = category.items.slice(0, 5).map(item => {
      const price = item.sizes ? Math.min(...item.sizes.map(s => s.price)) : item.price;
      const label = item.sizes ? `From ${formatNaira(price)}` : formatNaira(price);
      return `<li><span class="menu-item-name">${item.name}</span><span class="menu-item-price">${label}</span></li>`;
    }).join('');
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => renderHomepagePreview(getCity(), btn.dataset.category));
  });

  renderHomepagePreview(savedCity);
})();