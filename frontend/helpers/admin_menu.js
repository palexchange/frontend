export default [
  {
    icon: "fas fa-users",
    title: "Customers",
    to: '/dashboard/customers',
    types: {
      admin: true,
    }
  },
  {
    icon: "mdi-book",
    title: "Items",
    to: '/dashboard/items',
    types: {
      admin: true,
    }
  },
  {
    title: "Daily Meal",
    icon: 'fas fa-list',
    to: '/dashboard/daily_meals/form',
    types: {
      admin: true,
    }
  },
  {
    title: "Orders",
    icon: 'fas fa-archive',
    to: '/dashboard/orders',
    types: {
      admin: true,
      customer:true
    }
  },
  {
    icon: "fas fa-utensils",
    title: "Menu",
    to: '/dashboard/menu',
    types: {
      admin: true,
      customer:true
    }
  },
  {
    icon: "mdi-school",
    title: "Account Statement Report",
    to: '/dashboard/report',
    types: {
      admin: true,
      customer:true
    }
  },
  {
    icon: "mdi-school",
    title: "Detailed Report",
    to: '/dashboard/detailed_report',
    types: {
      admin: true,
      customer:true
    }
  },
];