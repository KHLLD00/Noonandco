// Menu data transcribed from Noon & Co's Abuja and Lagos menu sheets.
// Food Bowls (bulk/party sizes) are Abuja-only.

const MENU_DATA = {
  abuja: {
    categories: [
      {
        id: 'meals',
        label: 'Meals',
        items: [
          { id: 'a-jollof-rice', name: 'Jollof Rice', price: 3000 },
          { id: 'a-fried-rice', name: 'Fried Rice', price: 3000 },
          { id: 'a-jollof-native-spaghetti', name: 'Jollof/Native Spaghetti', price: 3500 },
          { id: 'a-beans-porridge', name: 'Beans Porridge', price: 4000 },
          { id: 'a-yam-porridge', name: 'Yam Porridge', price: 3500 },
          { id: 'a-boiled-yam-egg', name: 'Boiled Yam and Egg Sauce', price: 5000 },
          { id: 'a-rice-beans-ponmo', name: 'Rice and Beans (with Ponmo Sauce)', price: 4500 },
          { id: 'a-stir-fried-chicken-fried-rice', name: 'Stir-Fried Chicken Fried Rice', price: 6000 },
          { id: 'a-coconut-rice', name: 'Coconut Rice', price: 6500 },
          { id: 'a-native-rice', name: 'Native Rice', price: 3500 },
          { id: 'a-stir-fried-spaghetti', name: 'Stir-Fried Spaghetti', price: 3500 }
        ]
      },
      {
        id: 'noodles',
        label: 'Noodles',
        items: [
          { id: 'a-beef-noodles-mini', name: 'Stir-Fried Beef Noodles (Mini)', price: 4500 },
          { id: 'a-beef-noodles', name: 'Stir-Fried Beef Noodles', price: 6500 },
          { id: 'a-sausage-noodles', name: 'Stir-Fried Sausage Noodles', price: 3500 },
          { id: 'a-chicken-noodles', name: 'Stir-Fried Chicken Noodles', price: 6500 },
          { id: 'a-special-nosh-noodles', name: 'Special Nosh Noodles', description: 'Loaded with chicken, beef and sausages', price: 8000 }
        ]
      },
      {
        id: 'combos',
        label: 'Combos',
        items: [
          { id: 'a-plantain-egg-sauce', name: 'Plantain and Egg Sauce', price: 5500 },
          { id: 'a-fried-plantain-yam-egg', name: 'Fried Plantain and Yam with Egg Sauce', price: 7000 },
          { id: 'a-fried-yam-egg', name: 'Fried Yam with Egg Sauce', price: 5500 }
        ]
      },
      {
        id: 'sides',
        label: 'Sides',
        items: [
          { id: 'a-chicken-18', name: 'Chicken 1/8', price: 2500 },
          { id: 'a-goatmeat', name: 'Goatmeat', price: 2000 },
          { id: 'a-turkey', name: 'Turkey', price: 8500 },
          { id: 'a-beef', name: 'Beef', price: 2000 },
          { id: 'a-fish', name: 'Fish', price: 2000 },
          { id: 'a-plantain', name: 'Plantain', price: 1500 },
          { id: 'a-coleslaw', name: 'Coleslaw', price: 1500 },
          { id: 'a-boiled-egg', name: 'Boiled Egg', price: 500 },
          { id: 'a-omelette', name: 'Omelette', price: 2500 }
        ]
      },
      {
        id: 'drinks',
        label: 'Drinks',
        items: [
          { id: 'a-soft-drink', name: 'Soft Drink', price: 800, options: ['Coke', 'Fanta', 'Sprite'] },
          { id: 'a-fresh-juice', name: 'Fresh Juice', price: 4000 },
          { id: 'a-water', name: 'Water', price: 500 }
        ]
      },
      {
        id: 'food-bowls',
        label: 'Food Bowls',
        note: 'Party-size orders, sold by the litre',
        items: [
          { id: 'fb-basmati-jollof', name: 'Basmati Jollof Rice', sizes: [{ label: '2.4L', price: 25000 }, { label: '3.5L', price: 32000 }, { label: '4.5L', price: 39000 }] },
          { id: 'fb-basmati-fried', name: 'Basmati Fried Rice', sizes: [{ label: '2.4L', price: 27000 }, { label: '3.5L', price: 34000 }, { label: '4.5L', price: 41000 }] },
          { id: 'fb-coconut-rice', name: 'Coconut Rice', sizes: [{ label: '2.4L', price: 35000 }, { label: '3.5L', price: 42000 }, { label: '4.5L', price: 49000 }] },
          { id: 'fb-asun-jollof', name: 'Asun Jollof Rice', sizes: [{ label: '2.4L', price: 30000 }, { label: '3.5L', price: 37000 }, { label: '4.5L', price: 44000 }] },
          { id: 'fb-asun-spaghetti', name: 'Asun Spaghetti', sizes: [{ label: '2.4L', price: 30000 }, { label: '3.5L', price: 37000 }, { label: '4.5L', price: 44000 }] },
          { id: 'fb-native-rice', name: 'Native Rice', sizes: [{ label: '2.4L', price: 35000 }, { label: '3.5L', price: 42000 }, { label: '4.5L', price: 49000 }] },
          { id: 'fb-stew', name: 'Stew', sizes: [{ label: '2.4L', price: 25000 }, { label: '3.5L', price: 32000 }, { label: '4.5L', price: 39000 }] },
          { id: 'fb-yam-porridge', name: 'Yam Porridge', sizes: [{ label: '2.4L', price: 15000 }, { label: '3.5L', price: 22000 }, { label: '4.5L', price: 29000 }] },
          { id: 'fb-side-chicken', name: 'Chicken (4pcs)', price: 10000 },
          { id: 'fb-side-beef', name: 'Beef (4pcs)', price: 7500 },
          { id: 'fb-side-goatmeat', name: 'Goat Meat (4pcs)', price: 7500 },
          { id: 'fb-side-fish', name: 'Fish (4pcs)', price: 7500 }
        ]
      }
    ]
  },
  lagos: {
    categories: [
      {
        id: 'meals',
        label: 'Meals',
        items: [
          { id: 'l-jollof-rice', name: 'Jollof Rice', price: 3000 },
          { id: 'l-fried-rice', name: 'Fried Rice', price: 3000 },
          { id: 'l-jollof-spaghetti', name: 'Jollof Spaghetti', price: 3500 },
          { id: 'l-beans-porridge', name: 'Beans Porridge', price: 4500 },
          { id: 'l-yam-porridge', name: 'Yam Porridge', price: 4000 },
          { id: 'l-boiled-yam-egg', name: 'Boiled Yam and Egg Sauce', price: 5000 },
          { id: 'l-rice-beans-ponmo', name: 'Rice and Beans (with Ponmo Sauce)', price: 4500 },
          { id: 'l-stir-fried-chicken-fried-rice', name: 'Stir-Fried Chicken Fried Rice', price: 6000 },
          { id: 'l-stir-fried-spaghetti', name: 'Stir-Fried Spaghetti', price: 3500 }
        ]
      },
      {
        id: 'noodles',
        label: 'Noodles',
        items: [
          { id: 'l-beef-noodles-mini', name: 'Stir-Fried Beef Noodles (Mini)', price: 4500 },
          { id: 'l-beef-noodles', name: 'Stir-Fried Beef Noodles', price: 6500 },
          { id: 'l-sausage-noodles', name: 'Stir-Fried Sausage Noodles', price: 4000 },
          { id: 'l-chicken-noodles', name: 'Stir-Fried Chicken Noodles', price: 6500 },
          { id: 'l-special-nosh-noodles', name: 'Special Nosh Noodles', description: 'Loaded with chicken, beef and sausages', price: 8500 }
        ]
      },
      {
        id: 'combos',
        label: 'Combos',
        items: [
          { id: 'l-plantain-egg-sauce', name: 'Plantain and Egg Sauce', price: 6000 },
          { id: 'l-fried-plantain-yam-egg', name: 'Fried Plantain and Yam with Egg Sauce', price: 7500 },
          { id: 'l-fried-yam-egg', name: 'Fried Yam with Egg Sauce', price: 6000 }
        ]
      },
      {
        id: 'sides',
        label: 'Sides',
        items: [
          { id: 'l-chicken-18', name: 'Chicken 1/8', price: 3000 },
          { id: 'l-goatmeat', name: 'Goatmeat', price: 2000 },
          { id: 'l-turkey', name: 'Turkey', price: 8500 },
          { id: 'l-fish', name: 'Fish', price: 2000 },
          { id: 'l-plantain', name: 'Plantain', price: 1500 },
          { id: 'l-coleslaw', name: 'Coleslaw', price: 1500 },
          { id: 'l-boiled-egg', name: 'Boiled Egg', price: 500 },
          { id: 'l-omelette', name: 'Omelette', price: 2500 }
        ]
      },
      {
        id: 'drinks',
        label: 'Drinks',
        items: [
          { id: 'l-soft-drink', name: 'Soft Drink', price: 800, options: ['Coke', 'Fanta', 'Sprite'] },
          { id: 'l-water', name: 'Water', price: 500 }
        ]
      }
    ]
  }
};
