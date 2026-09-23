# Noon & Co

A modern restaurant ordering website for **Noon & Co**, designed to give customers a simple and convenient way to browse the menu, build an order, generate a receipt, and send the order to the restaurant through WhatsApp.

## Overview

The website provides customers with:

- Location-based menus for **Abuja and Lagos**
- Menu browsing by category
- Food and drink selection
- Shopping cart functionality
- Pickup and delivery options
- Customer details collection
- Nigerian phone number validation
- Automatic order receipt generation
- Receipt image download
- WhatsApp order handoff
- Responsive mobile-friendly navigation

## Ordering Flow

1. Customer selects their location.
2. Customer browses the available menu.
3. Items are added to the cart.
4. Customer chooses **Pickup** or **Delivery**.
5. Customer enters their name and phone number.
6. For delivery, the customer provides their address.
7. The website generates an order receipt.
8. Customer saves the receipt.
9. Customer opens WhatsApp and manually attaches the receipt before sending the order.

## Key Features

### Menu

Menus are organized by categories including:

- Meals
- Noodles
- Combos
- Sides
- Drinks
- Food Bowls

Menu availability and pricing can vary by location.

### Shopping Cart

Customers can:

- Add items to their cart
- Increase or decrease quantities
- Remove items
- Review their order
- View the order total before checkout

Cart data is stored locally in the customer's browser.

### Receipt Generation

The checkout flow generates a branded receipt containing:

- Noon & Co logo
- Order information
- Selected items
- Quantities
- Customer details
- Order type
- Total amount

The receipt can be saved as an image and manually attached to WhatsApp.

### WhatsApp Ordering

After generating the receipt, customers can open WhatsApp with a short pre-filled message.

The customer manually attaches the generated receipt before sending the order to Noon & Co.

> Delivery fees are confirmed separately through WhatsApp and are not included in the displayed order total.

## Technology

The website intentionally uses a lightweight architecture:

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- HTML Canvas API
- WhatsApp deep linking

No backend or database is required for the current ordering flow.

## Project Structure

```
Noonandco/
├── assets/
│   └── images and branding assets
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── cart.js
│   ├── checkout.js
│   └── main.js
├── index.html
├── menu.html
├── cart.html
└── README.md
```

## Local Development

Because this is a static website, it can be run without a backend.

Clone the repository:

```bash
git clone https://github.com/KHLLD00/Noonandco.git
```

Open the project in a code editor and launch it using a local development server.

## Deployment

The website can be deployed using GitHub Pages or another static hosting provider.

## Important Notes

- Orders are not stored in a central database.
- Cart data is stored locally in the customer's browser.
- WhatsApp is the final communication channel for submitting orders.
- Customers manually attach their generated receipt to the WhatsApp conversation.
- Delivery fees are confirmed separately through WhatsApp.

## Project Status

**Status:** Active development

The project is designed to provide a simple, professional restaurant ordering experience while keeping the technical setup lightweight and easy to maintain.
