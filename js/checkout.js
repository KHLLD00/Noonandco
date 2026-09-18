(function () {
  const WHATSAPP_NUMBER = '2348162702096'; // 0816 270 2096 in international format

  const linesEl = document.getElementById('cart-lines');
  const emptyEl = document.getElementById('empty-cart');
  const summaryCard = document.getElementById('summary-card');
  const summaryCount = document.getElementById('summary-count');
  const summaryTotal = document.getElementById('summary-total');
  const addressField = document.getElementById('address-field');
  const clearBtn = document.getElementById('clear-cart-btn');
  const clearModal = document.getElementById('clear-modal');

  let fulfillment = 'pickup';

  function renderLines() {
    const cart = getCart();

    if (cart.length === 0) {
      linesEl.innerHTML = '';
      emptyEl.style.display = 'block';
      summaryCard.style.display = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    summaryCard.style.display = 'block';

    linesEl.innerHTML = cart.map(line => `
      <li class="cart-line">
        <div class="cart-line-info">
          <span class="menu-item-name">${line.name}</span>
          <span class="cart-line-price">${formatNaira(line.price)} each</span>
        </div>
        <div class="cart-line-right">
          <div class="qty-stepper" data-id="${line.id}">
            <button class="qty-btn" data-action="dec" aria-label="Decrease quantity">–</button>
            <span class="qty-value">${line.qty}</span>
            <button class="qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-line-total">${formatNaira(line.price * line.qty)}</span>
          <button class="remove-btn" data-id="${line.id}">Remove</button>
        </div>
      </li>
    `).join('');

    linesEl.querySelectorAll('.qty-stepper').forEach(stepper => {
      const id = stepper.dataset.id;
      const line = cart.find(l => l.id === id);
      stepper.querySelector('[data-action="inc"]').addEventListener('click', () => {
        updateCartQty(id, line.qty + 1);
        renderAll();
      });
      stepper.querySelector('[data-action="dec"]').addEventListener('click', () => {
        updateCartQty(id, line.qty - 1);
        renderAll();
      });
    });

    linesEl.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
        renderAll();
      });
    });
  }

  function renderSummary() {
    summaryCount.textContent = getCartCount();
    summaryTotal.textContent = formatNaira(getCartTotal());
  }

  function renderAll() {
    renderLines();
    renderSummary();
  }

  document.querySelectorAll('.fulfillment-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      fulfillment = btn.dataset.fulfillment;
      document.querySelectorAll('.fulfillment-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      addressField.style.display = fulfillment === 'delivery' ? 'block' : 'none';
    });
  });

  clearBtn.addEventListener('click', () => {
    clearModal.classList.add('visible');
  });

  document.getElementById('clear-cancel').addEventListener('click', () => {
    clearModal.classList.remove('visible');
  });

  document.getElementById('clear-confirm').addEventListener('click', () => {
    clearCart();
    clearModal.classList.remove('visible');
    renderAll();
  });

  document.getElementById('whatsapp-checkout').addEventListener('click', (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return;

    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();

    const lines = cart.map(l => `• ${l.name} x${l.qty} — ${formatNaira(l.price * l.qty)}`).join('\n');
    let message = `Hi Noon & Co, I'd like to place an order:\n\n${lines}\n\nTotal: ${formatNaira(getCartTotal())}\n\nFulfillment: ${fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}`;
    if (name) message += `\nName: ${name}`;
    if (phone) message += `\nPhone: ${phone}`;
    if (fulfillment === 'delivery' && address) message += `\nAddress: ${address}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  });

  renderAll();
})();
