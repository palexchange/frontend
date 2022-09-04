export default {
    party: {
        menu_btns: [
            {
                title: "edit",
                icon: "fas fa-pen",
            },
            // {
            //     title: "activate",
            //     icon: "fas fa-check",
            // },
            // {
            //     title: "stop",
            //     icon: "fas fa-ban",
            // },
            {
                title: "delete",
                icon: "fas fa-trash",
            },
        ],
    },
    transfer: {
        menu_btns: [
            {
                title: "edit",
                icon: "fas fa-pen",
            },
            // {
            //     title: "show",
            //     icon: "fas fa-eye",
            // },
            {
                title: "delete",
                icon: "fas fa-trash",

            },
        ],
    },
    daily_meal: {
        menu_btns: [
            {
                title: "edit",
                icon: "fas fa-pen",
            },
            {
                title: "delete",
                icon: "fas fa-times",

            },
        ],
    },
    category: {
        menu_btns: [
            {
                title: "edit",
                icon: "fas fa-pen",
            },
            {
                title: "delete",
                icon: "fas fa-times",

            },
        ],
    },
    order: {
        menu_btns: [
            {
                title: "edit",
                icon: "fas fa-pen",
            },
            {
                title: "confirm",
                icon: "fas fa-pen",
                types: {
                    admin: true,
                }
            },
            {
                title: "finalize",
                icon: "fas fa-pen",
                types: {
                    admin: true,
                }
            },
            {
                title: "print",
                icon: "fas fa-print",
                types: {
                    admin: true,
                }
            },
            {
                title: "cancel",
                icon: "fas fa-times",
                types: {
                    admin: true,
                    customer: true
                }
            },
        ],
    },

}
