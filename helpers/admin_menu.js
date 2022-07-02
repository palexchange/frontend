export default [
  {
    icon: "fas fa-users",
    title: "customers",
    to: '/dashboard/customers',
    types: {
      admin: true,
    }
  },
  {
    icon: "mdi-book",
    title: "items",
    to: '/dashboard/items',
    types: {
      admin: true,
    }
  },
  {
    icon: "mdi-bookmark",
    title: "categories",
    to: '/dashboard/categories',
    types: {
      admin: true,
    }
  },
  {
    title: "daily_meals",
    icon: 'fas fa-list',
    to: '/dashboard/daily_meals/form',
    types: {
      admin: true,
    }
  },
  {
    title: "orders",
    icon: 'fas fa-archive',
    to: '/dashboard/orders',
    types: {
      admin: true,
      customer:true
    }
  },
  {
    icon: "fas fa-utensils",
    title: "menu",
    to: '/dashboard/menu',
    types: {
      admin: true,
      customer:true
    }
  },
  {
    icon: "mdi-school",
    title: "account_statement_report",
    to: '/dashboard/report',
    types: {
      admin: true,
      customer:true
    }
  },
  {
    icon: "mdi-school",
    title: "detailed_report",
    to: '/dashboard/detailed_report',
    types: {
      admin: true,
      customer:true
    }
  },
  
];