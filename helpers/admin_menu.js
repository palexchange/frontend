export default [
  {
    icon: "1.png",
    title: "dashboard",
    to: '/dashboard',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "2.png",
    title: "transfers",
    to: '/dashboard/transfers',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "moneygram.png",
    title: "moneygram",
    to: '/dashboard/moneygram',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "3.png",
    title: "exchange",
    to: '/dashboard/exchange',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    title: "inputs",
    icon: '4.png',
    to: '/dashboard/inputs',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    title: "outputs",
    icon: '5.png',
    to: '/dashboard/outputs',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "6.png",
    title: "beneficiaries",
    to: '/dashboard/beneficiaries',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "7.png",
    title: "reports",
    to: '/dashboard/reports',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "8.png",
    title: "inventory",
    to: '/dashboard/inventory',
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "8.png",
    title: "inventory profit",
    to: '/dashboard/profit',
    just_admin: true,
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "8.png",
    title: "user inventory profit",
    to: '/dashboard/user-profit',
    just_admin: true,
    types: {
      admin: true,
      customer: true
    }
  },
  {
    icon: "arrows-exchange.png",
    title: "settings",
    to: '/dashboard/settings',
    types: {
      role: 1
    },
    items: [
      {
        icon: "arrows-exchange.png",
        title: "exchange prices",
        to: '/dashboard/settings/pricing',
      },
      {
        icon: "arrows-exchange.png",
        title: "accounting settings",
        to: '/dashboard/settings',
      },
      {
        icon: "arrows-exchange.png",
        title: "roles",
        to: '/dashboard/settings/roles',
      },
      {
        icon: "arrows-exchange.png",
        title: "app settings",
        to: '/dashboard/settings/settings',
      },
      {
        icon: "arrows-exchange.png",
        title: "short cuts",
        to: '/dashboard/settings/short-cuts',
      },
    ]
  },

];