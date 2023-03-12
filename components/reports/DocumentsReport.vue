<template>
  <div>
    <v-row>
      <v-col cols="12" md="10" sm="12">
        <v-form v-model="validated">
          <v-row>
            <v-col>
              <AutoComplete
                @change="
                  (el) =>
                    el == 0
                      ? (params.receiver_party_id = null)
                      : (params.sender_party_id = null)
                "
                :items="transfers_type"
                v-model="params.type"
                holder="transfer type"
                text="transfer type"
              />
            </v-col>
            <v-col>
              <DatePicker v-model="params.from" holder="from" text="from" />
            </v-col>
            <v-col>
              <DatePicker v-model="params.to" holder="to" text="to" />
            </v-col>
            <v-col v-if="params.type == 0">
              <BeneficiaryAutocomplete
                return-object
                @change="
                  (el) => {
                    params.sender_party_id = el.id;
                    party = el;
                  }
                "
                required
                :value="params.sender_party_id"
                text="the sender"
                holder="the sender"
              >
              </BeneficiaryAutocomplete>
            </v-col>
            <v-col v-else>
              <BeneficiaryAutocomplete
                return-object
                @change="
                  (el) => {
                    params.receiver_party_id = el.id;
                    party = el;
                  }
                "
                required
                :value="params.receiver_party_id"
                text="the receiver"
                holder="the receiver"
              >
              </BeneficiaryAutocomplete>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col class="align-self-center" cols="12" md="2" sm="12">
        <v-btn
          :disabled="!validated"
          :loading="loading"
          @click="getData()"
          class="primary"
          type="submit"
          >{{ $t("download") }}</v-btn
        >
      </v-col>
    </v-row>
    <DataTable
      :params="
        params.sender_party_id || params.receiver_party_id
          ? { ...params }
          : { no_fetch: true }
      "
      module="transfer"
    />
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  props: ["create_one"],
  data() {
    return {
      party: {},
      params: {
        delivering_type: [2],
        sender_party_id: null,
        receiver_party_id: null,
      },
      transfers_type: [
        { id: 1, name: "واردة" },
        { id: 0, name: "صادرة" },
      ],
      loading: false,
      validated: true,
      report_data: {
        currency_id: 1,
        is_file: true,
        return_response: true,
        has_headers: true,
        type: "zip",
        sub_type: "moneyGram",
      },
      //   types: [
      //     { id: "public", name: this.$t("public") },
      //     { id: "detaild", name: this.$t("detaild") },
      //   ],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      setTimeout(() => {
        let params = { ...this.params, transfer_type: this.params.type };

        this.$store
          .dispatch("report/index", {
            ...params,
            ...this.report_data,
          })
          .then((response) => {
            if (response) {
              const blob = new Blob([response], { type: "application/zip" });
              let type = this.params.type || 1;
              const name = ["موي غرام صادرة", "موني غرام صادرة"];
              saveAs(blob, this.party.name + `_${name[type]}_${this.params.from}__${this.params.to}`);
            }
          });
        this.loading = false;
      }, 500);
    },
  },
  watch: {
    create_one: {
      handler(val) {
        if (val) this.$emit("download_item", this.report_data);
      },
    },
  },
  computed: {
    ...mapState({
      report: (state) => state.report.all || [],
    }),
  },
};
</script>
  
  <style>
</style>