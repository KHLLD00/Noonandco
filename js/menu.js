(function () {
  let currentCity = getCity();
  let currentCategoryId = null;

  const tabsEl = document.getElementById('category-tabs');
  const noteEl = document.getElementById('category-note');
  const itemsEl = document.getElementById('menu-items');
  const cartBar = document.getElementById('cart-bar');
  const cartBarSummary = document.getElementById('cart-bar-summary');

  function getCategories() {
    return MENU_DATA[currentCity].categories;
  }

  function getCategory(id) {
    return getCategories().find(c => c.id === id);
  }

  function renderTabs() {
    const categories = getCategories();
    if (!categories.find(c => c.id === currentCategoryId)) {
      currentCategoryId = categories[0].id;
    }
    tabsEl.innerHTML = categories.map(c =>
      `<button data-cat="${c.id}" class="${c.id === currentCategoryId ? 'active' : ''}">${c.label}</button>`
    ).join('');
    tabsEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategoryId = btn.dataset.cat;
        renderTabs();
        renderItems();
      });
    });
  }

  function stepperHtml(id, qty) {
    return `
      <div class="qty-stepper" data-id="${id}">
        <button class="qty-btn" data-action="dec" aria-label="Decrease quantity">–</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
      </div>`;
  }

  function renderItems() {
    const category = getCategory(currentCategoryId);
    noteEl.textContent = category.note || '';
    noteEl.style.display = category.note ? 'block' : 'none';
    const cart = getCart();

    itemsEl.innerHTML = category.items.map(item => {
      if (item.sizes) {
        const sizeButtons = item.sizes.map(size => {
          const lineId = `${item.id}::${size.label}`;
          const line = cart.find(l => l.id === lineId);
          return line
            ? `<div class="size-option size-option-active">${size.label} · ${formatNaira(size.price)} ${stepperHtml(lineId, line.qty)}</div>`
            : `<button class="size-option" data-id="${lineId}" data-name="${item.name} (${size.label})" data-price="${size.price}">${size.label} · ${formatNaira(size.price)}</button>`;
        }).join('');
        return `
          <li class="menu-list-item sized">
            <div class="menu-item-name">${item.name}</div>
            <div class="size-options">${sizeButtons}</div>
          </li>`;
      }

      if (item.options) {
        const selected = item.options.find(option =>
          cart.some(line => line.id === `${item.id}::${option}`)
        ) || item.options[0];

        const lineId = `${item.id}::${selected}`;
        const line = cart.find(l => l.id === lineId);
        const control = line
          ? stepperHtml(lineId, line.qty)
          : `<button class="btn-add" data-id="${lineId}" data-name="${item.name} (${selected})" data-price="${item.price}">Add</button>`;

        return `
          <li class="menu-list-item">
            <div>
              <div class="menu-item-name">${item.name}</div>
              ${item.description ? `<div class="menu-item-desc">${item.description}</div>` : ''}
              <select class="drink-option" data-drink-id="${item.id}">
                ${item.options.map(option => `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`).join('')}
              </select>
            </div>
            <div class="menu-item-right">
              <span class="menu-item-price">${formatNaira(item.price)}</span>
              ${control}
            </div>
          </li>`;
      }

      const line = cart.find(l => l.id === item.id);
      const control = line
        ? stepperHtml(item.id, line.qty)
        : `<button class="btn-add" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add</button>`;

      return `
        <li class="menu-list-item">
          <div>
            <div class="menu-item-name">${item.name}</div>
            ${item.description ? `<div class="menu-item-desc">${item.description}</div>` : ''}
          </div>
          <div class="menu-item-right">
            <span class="menu-item-price">${formatNaira(item.price)}</span>
            ${control}
          </div>
        </li>`;
    }).join('');

    wireItemControls();
    updateCartBar();
  }

  function wireItemControls() {
    itemsEl.querySelectorAll('.btn-add, .size-options > button.size-option').forEach(btn => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, btn.dataset.name, Number(btn.dataset.price), 1);
        renderItems();
      });
    });

    itemsEl.querySelectorAll('.drink-option').forEach(select => {
      select.addEventListener('change', () => renderItems());
    });
    itemsEl.querySelectorAll('.qty-stepper').forEach(stepper => {
      const id = stepper.dataset.id;
      const cart = getCart();
      const line = cart.find(l => l.id === id);
      const currentQty = line ? line.qty : 0;
      stepper.querySelector('[data-action="inc"]').addEventListener('click', () => {
        updateCartQty(id, currentQty + 1);
        renderItems();
      });
      stepper.querySelector('[data-action="dec"]').addEventListener('click', () => {
        updateCartQty(id, currentQty - 1);
        renderItems();
      });
    });
  }

  function updateCartBar() {
    const count = getCartCount();
    cartBar.classList.toggle('visible', count > 0);
    cartBarSummary.textContent = `${count} item${count === 1 ? '' : 's'} · ${formatNaira(getCartTotal())}`;
  }

  document.querySelectorAll('.city-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.city === currentCity);
    btn.addEventListener('click', () => {
      currentCity = btn.dataset.city;
      setCity(currentCity);
      document.querySelectorAll('.city-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryId = null;
      renderTabs();
      renderItems();
    });
  });

  renderTabs();
  renderItems();
})();
