import { mapState } from "vuex";
export default {
    // data() {
    //     return {
    //         static_currencies: [
    //             { currency_id: 1, }
    //         ]
    //     }
    // },
    computed: {
        ...mapState({
            app_setting: (state) => state.app_settings
        })
    },
    filters: {
        money(value) {
            console.log("in the filter here man ");
            console.log(value);
            if (value) {
                return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
            }
        },
    },
}