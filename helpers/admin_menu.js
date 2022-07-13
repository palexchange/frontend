export default [
  {
    icon: "1.png",
    title: "dashboard",
    to: '/dashboard',
    types: {
      admin: true,
    }
  },
  {
    icon: "2.png",
    title: "transfers",
    to: '/dashboard/transfers',
    types: {
      admin: true,
    }
  },
  {
    icon: "3.png",
    title: "exchange",
    to: '/dashboard/categories',
    types: {
      admin: true,
    }
  },
  {
    title: "inputs",
    icon: '4.png',
    to: '/dashboard/daily_meals/form',
    types: {
      admin: true,
    }
  },
  {
    title: "outputs",
    icon: '5.png',
    to: '/dashboard/orders',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "6.png",
    title: "beneficiaries",
    to: '/dashboard/menu',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "7.png",
    title: "reports",
    to: '/dashboard/report',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "8.png",
    title: "entries",
    to: '/dashboard/detailed_report',
    types: {
      admin: true,
      customer: true
    }
  },

];