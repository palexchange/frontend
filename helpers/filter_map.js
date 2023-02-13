export default {
    receipt: {
        edit: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }

        },
        cancel: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }
        },

    },
    transfer: {
        edit: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }

        },
        cancel: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }
        },
        print: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }
        },

    },
    exchange: {
        edit: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }

        },
        cancel: (item) => {
            if (item != null) {
                return (item.status != 255)
            } else {
                return true
            }
        },

    },


}