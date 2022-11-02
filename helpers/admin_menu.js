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
    icon: "arrows-exchange.png",
    title: "settings",
    to: '/dashboard/settings',
    types: {
      admin: true
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
    ]
  },

];