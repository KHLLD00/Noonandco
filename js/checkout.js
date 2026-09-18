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
  const receiptModal = document.getElementById('receipt-modal');
  const receiptImage = document.getElementById('receipt-image');

  let fulfillment = 'pickup';
  let receiptDataUrl = '';

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
      stepper.querySelector('[data-action="inc"]').addEventListener('click', () => {
        const line = getCart().find(l => l.id === id);
        if (line) {
          updateCartQty(id, line.qty + 1);
          renderAll();
        }
      });
      stepper.querySelector('[data-action="dec"]').addEventListener('click', () => {
        const line = getCart().find(l => l.id === id);
        if (line) {
          updateCartQty(id, line.qty - 1);
          renderAll();
        }
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

  function getCustomerDetails() {
    return {
      name: document.getElementById('customer-name').value.trim(),
      phone: document.getElementById('customer-phone').value.trim(),
      address: document.getElementById('customer-address').value.trim()
    };
  }

  function drawReceipt() {
    const cart = getCart();
    const details = getCustomerDetails();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const width = 900;
    const itemHeight = 62;
    const headerHeight = 250;
    const detailsHeight = fulfillment === 'delivery' ? 230 : 190;
    const footerHeight = 90;
    const height = headerHeight + (cart.length * itemHeight) + detailsHeight + footerHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#FBF5EE';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#221A16';
    ctx.textAlign = 'center';
    ctx.font = '800 42px "Arial", sans-serif';
    ctx.fillText('Noon & Co', width / 2, 62);

    ctx.fillStyle = '#C41E1E';
    ctx.font = '700 20px "Arial", sans-serif';
    ctx.fillText('ORDER RECEIPT', width / 2, 100);

    ctx.strokeStyle = '#D8CFC3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(70, 132);
    ctx.lineTo(width - 70, 132);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#8A7A6E';
    ctx.font = '600 18px "Arial", sans-serif';
    ctx.fillText(fulfillment === 'pickup' ? 'PICKUP' : 'DELIVERY', 70, 170);

    ctx.textAlign = 'right';
    ctx.fillText(new Date().toLocaleDateString('en-NG'), width - 70, 170);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#221A16';
    ctx.font = '600 22px "Arial", sans-serif';
    ctx.fillText('Item', 70, 215);
    ctx.textAlign = 'center';
    ctx.fillText('Qty', width / 2, 215);
    ctx.textAlign = 'right';
    ctx.fillText('Amount', width - 70, 215);

    let y = headerHeight;
    cart.forEach(line => {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#221A16';
      ctx.font = '600 21px "Arial", sans-serif';
      ctx.fillText(line.name, 70, y);

      ctx.textAlign = 'center';
      ctx.font = '500 21px "Arial", sans-serif';
      ctx.fillText(String(line.qty), width / 2, y);

      ctx.textAlign = 'right';
      ctx.font = '600 21px "Arial", sans-serif';
      ctx.fillText(formatNaira(line.price * line.qty), width - 70, y);

      ctx.strokeStyle = '#E5DDD3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(70, y + 20);
      ctx.lineTo(width - 70, y + 20);
      ctx.stroke();
      y += itemHeight;
    });

    y += 18;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8A7A6E';
    ctx.font = '500 18px "Arial", sans-serif';
    ctx.fillText('Customer', 70, y);
    ctx.fillText('Phone', 70, y + 34);
    if (fulfillment === 'delivery') ctx.fillText('Address', 70, y + 68);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#221A16';
    ctx.font = '600 18px "Arial", sans-serif';
    ctx.fillText(details.name || '—', width - 70, y);
    ctx.fillText(details.phone || '—', width - 70, y + 34);

    if (fulfillment === 'delivery') {
      const address = details.address || '—';
      const addressLines = wrapText(ctx, address, width - 300);
      addressLines.slice(0, 2).forEach((line, index) => {
        ctx.fillText(line, width - 70, y + 68 + (index * 24));
      });
    }

    y += fulfillment === 'delivery' ? 120 : 90;

    ctx.strokeStyle = '#C41E1E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, y);
    ctx.lineTo(width - 70, y);
    ctx.stroke();

    y += 48;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#221A16';
    ctx.font = '800 25px "Arial", sans-serif';
    ctx.fillText('TOTAL', 70, y);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#C41E1E';
    ctx.fillText(formatNaira(getCartTotal()), width - 70, y);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#8A7A6E';
    ctx.font = '500 16px "Arial", sans-serif';
    ctx.fillText('Thank you for ordering from Noon & Co', width / 2, height - 38);

    return canvas.toDataURL('image/png');
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let current = '';

    words.forEach(word => {
      const test = current ? current + ' ' + word : word;
      if (ctx.measureText(test).width <= maxWidth) {
        current = test;
      } else if (current) {
        lines.push(current);
        current = word;
      } else {
        lines.push(word);
      }
    });

    if (current) lines.push(current);
    return lines;
  }

  function openReceipt() {
    receiptDataUrl = drawReceipt();
    receiptImage.src = receiptDataUrl;
    receiptModal.classList.add('visible');
    receiptModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeReceipt() {
    receiptModal.classList.remove('visible');
    receiptModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openWhatsApp() {
    const message = 'Hi Noon & Co, I\'d like to place an order. Please see the attached receipt for my order details.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
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
    if (getCart().length === 0) return;

    const details = getCustomerDetails();
    if (!details.name || !details.phone || (fulfillment === 'delivery' && !details.address)) {
      alert(fulfillment === 'delivery'
        ? 'Please enter your name, phone number, and delivery address before continuing.'
        : 'Please enter your name and phone number before continuing.');
      return;
    }

    openReceipt();
  });

  document.getElementById('receipt-close').addEventListener('click', closeReceipt);

  receiptModal.addEventListener('click', e => {
    if (e.target === receiptModal) closeReceipt();
  });

  document.getElementById('save-receipt').addEventListener('click', () => {
    if (!receiptDataUrl) return;
    const link = document.createElement('a');
    link.href = receiptDataUrl;
    link.download = `noon-and-co-receipt-${Date.now()}.png`;
    link.click();
  });

  document.getElementById('open-whatsapp').addEventListener('click', openWhatsApp);

  renderAll();
})();
