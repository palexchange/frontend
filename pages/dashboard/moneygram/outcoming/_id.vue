<template>
  <div class="main-moneygram-class">
    <SideInfoTransfer
      :profit="item.profit"
      :officeProfitComp="officeProfitComp"
    >
      <v-row>
        <v-col cols="12" sm="12"> {{ $t("outcoming moneygram") }} </v-col>
      </v-row>
    </SideInfoTransfer>

    <Card class="d-relative mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="5" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="5">
              <Title
                :title="`${$route.params.id ? '' : 'add '}outcoming moneygram`"
              ></Title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <DatePicker
                :readonly="showReadOnly"
                v-model="item.issued_at"
                required
                text="transfer date"
                holder="test"
              />
            </v-col>

            <!-- <v-col cols="12" md="4" sm="12">
              <InputField
                :readonly="showReadOnly"
                v-bind="item.officeProfit"
                dashed
                text="palestinian profit"
                :value="(item.profit || officeProfitComp) | money"
              />
            </v-col> -->
          </v-row>
        </v-col>
        <v-col cols="12" md="2" sm="12">
          <div class="text-center">
            <img width="100" src="/moneygram.png" alt="" />
          </div>
        </v-col>
        <v-col cols="12" md="5" sm="12">
          <v-row no-gutters class="flex-column text-h6">
            <v-col cols="12" class="align-self-strach text-left mb-4">
              <!-- <span v-if="!showReadOnly">
                {{ $t("todays profit") }}<span class="show-text">000</span>
              </span> -->
              <span>
                {{ $t("transfer number") }}
                <span class="show-text">{{ item.id }}#</span>
              </span>
            </v-col>

            <v-col class="text-left mb-4">
              {{ $t("refrence number")
              }}<span class="show-text"
                >{{ this.$route.params.id ? item.refreance_numebr : "" }}#</span
              >
            </v-col>
            <v-col class="text-left mb-4">
              {{ $t("transfer stats")
              }}<span class="show-text">{{
                item.status == 1 ? "معتمدة" : "مسودة"
              }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </Card>
    <Card class="mb-5 px-3">
      <v-card-title style="font-weight: 700"> بيانات المرسل </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="3" md="4" sm="6">
            <BeneficiaryAutocomplete
              :readonly="showReadOnly"
              v-model="item.sender_party_id"
              text="beneficiary"
              holder="beneficiary"
              required
              return-object
              @change="
                (v) => {
                  setSenderData(v);
                  item.sender_party_id = v.id;
                }
              "
            />
          </v-col>
          <v-col v-if="item.sender_party.image">
            <img width="70" :src="item.sender_party.image.url" alt="" />
          </v-col>
          <v-col v-else-if="sender_id_image" cols="12" md="4" sm="6" lg="2">
            <img width="70" :src="sender_id_image" alt="" />
          </v-col>
          <v-col v-else cols="12" md="4" sm="6" lg="2">
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              :class="
                item.delivering_type == 2 ? 'required form-label' : 'form-label'
              "
              >{{ $t("id image") }}</label
            >
            <v-file-input
              :readonly="showReadOnly"
              v-model="image_file"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              v-on="$listeners"
              :placeholder="$t('id image')"
              prepend-icon=""
              prepend-inner-icon="fa-solid fa-image"
            />
          </v-col>

          <v-col cols="12" md="4" sm="6" lg="2">
            <IDsAutoComplete
              no_fetch
              :readonly="showReadOnly"
              text="id_no"
              holder="id_no"
              required
              @change="
                (v) => {
                  setSenderData(v);
                  item.sender_party_id = v.id;
                }
              "
              return-object
              :value="{ id: item.sender_party_id }"
            />
          </v-col>

          <v-col>
            <PhonesAutoComplete
              no_fetch
              :readonly="showReadOnly"
              text="phone"
              holder="phone"
              required
              @change="
                (v) => {
                  setSenderData(v);
                  item.sender_party_id = v.id;
                }
              "
              return-object
              :value="{ id: item.sender_party_id }"
            />
          </v-col>
          <v-col v-if="item.image">
            <img width="70" :src="item.image.url" alt="" />
          </v-col>
          <v-col v-else>
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              :class="
                item.delivering_type == 2 ? 'required form-label' : 'form-label'
              "
              >{{ $t("transfer image") }}</label
            >
            <v-file-input
              :disabled="showReadOnly"
              min="0"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              dashed
              :required="true"
              outlined
              v-on="$listeners"
              v-model="transfer_photo"
              :rules="rulesss.requiredRules"
              :placeholder="$t('transfer image')"
              prepend-icon=""
              prepend-inner-icon="fa-solid fa-image"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              holder="address"
              text="address"
              v-model="item.sender_address"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 px-3">
      <v-card-title style="font-weight: 700">بيانات المستلم </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <BeneficiaryAutocomplete
              :readonly="showReadOnly"
              v-model="item.receiver_party_id"
              no_fetch
              text="beneficiary"
              holder="beneficiary"
              @change="
                (v) => {
                  setReceiverDate(v);
                  item.receiver_party_id = v.id;
                }
              "
              return-object
              required
            />
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="2">
            <IDsAutoComplete
              :readonly="showReadOnly"
              text="id_no"
              holder="id_no"
              required
              @change="
                (v) => {
                  setReceiverDate(v);
                  item.receiver_party_id = v.id;
                }
              "
              no_fetch
              return-object
              :value="{ id: item.receiver_party_id }"
            />
          </v-col>

          <v-col cols="12" md="4" sm="6" lg="2">
            <PhonesAutoComplete
              no_fetch
              :readonly="showReadOnly"
              text="phone"
              holder="phone"
              required
              @change="
                (v) => {
                  setReceiverDate(v);
                  item.receiver_party_id = v.id;
                }
              "
              return-object
              :value="{ id: item.receiver_party_id }"
            />
          </v-col>
          <!-- <v-col>
            <CountryAutocomplete
              v-model="item.receiver_country_id"
              text="country"
              holder="country"
              :readonly="showReadOnly"
            />
          </v-col> -->

          <v-col>
            <InputField
              :readonly="showReadOnly"
              holder="address"
              text="address"
              v-model="item.receiver_address"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5" sm="12">
            <v-radio-group
              :readonly="showReadOnly"
              mandatory
              v-model="item.commission_side"
              row
            >
              <v-radio :value="1" label="العمولة علي المحول"></v-radio>
              <!-- <v-radio :value="2" label="العمولة علي المستلم"></v-radio> -->
            </v-radio-group>
          </v-col>

          <v-col class="align-self-center" md="3" sm="12">
            <v-text-field
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              :readonly="showReadOnly"
              outlined
              slot="append"
              hide-details
              @change="count++"
              :label="$t('extra commission') + ' $ '"
              v-model.number="item.transfer_commission"
            >
            </v-text-field>
          </v-col>
          <v-col class="align-self-center" md="2" sm="12">
            <CurrencyAutoComplete
              @change="setCommissionFactor"
              holder="commission currency"
              hide-details
              v-model="item.transfer_commission_currency"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title style="font-weight: 700"
        >بيانات الحوالة المالية
      </v-card-title>
      <v-card-text>
        <v-row class="justify-center responseveCols">
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.to_send_amount"
              holder="transfirrig amount"
              text="transfirrig amount"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.office_commission"
              holder="commission"
              text="commission"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="amountInUSDComp | money"
              dashed
              holder="مبلغ للتسليم بالدولار"
              text="مبلغ للتسليم بالدولار"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="totalAmountInUSDComp | money"
              dashed
              holder="شامل العمولة"
              text="المبلغ بالدولار ش.ع"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <v-row>
      <v-col>
        <v-checkbox :label="$t('send sms to the sender')"> </v-checkbox>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-card color="transparent" flat>
        <v-card-actions v-if="showReadOnly">
          <v-btn
            outlined
            @click="$router.push('/dashboard/moneygram')"
            class="px-16"
            color="primary"
            >إغلاق</v-btn
          >
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn @click="confirmProcess(1)" class="px-16" color="primary"
            >إتمام العملة</v-btn
          >
          &nbsp; &nbsp;
          <v-menu offset-x left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary" outlined
                >الإجراءات</v-btn
              >
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title> طباعة ايصال </v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-print</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item @click="confirmProcess(0)">
                <v-list-item-title> {{ $t("حفظ كمسودة") }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-save</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ruless from "~/helpers/rules";
export default {
  name: "moneygram-outcoming",
  data() {
    return {
      count: 1,

      image_file: null,
      transfer_photo: null,
      rulesss: ruless(this),
      showReadOnly: false,
      sender_id_image: null,

      prices: [],
      transfer_types: [
        { id: 1, name: "تسليم يد نقداً" },
        { id: 2, name: "موني غرام" },
        { id: 3, name: "تسليم يد على الحساب" },
      ],
      item: {
        transfer_commission_currency: 1,
        transfer_commission_exchange_rate: 1,
        sender_party_id: "",
        sender_party: {},
        receiver_party_id: 1,
        office_id: 2,
        office_currency_id: 1,
        delivery_currency_id: 1,
        commission_side: 1,
        type: 0,
        delivering_type: 2,
        reference_currency_id: 1,
        reciver_phone: null,
        reciver_address: null,
        receiver_notes: null,
        sender_id_no: null,
        sender_phone: null,
        sender_address: null,
        is_commission_percentage: 0,
        office_commission_type: 0,
        received_currency_id: 1,
        exchange_rate_to_delivery_currency: 1,
        exchange_rate_to_delivery_currency_view: 1,
        exchange_rate_to_reference_currency: 1,
        exchange_rate_to_office_currency: 1,
        exchange_rate_to_office_currency_view: null,
      },
      usdCurr: null,
    };
  },
  computed: {
    computed_exchange_rate_to_delivery_currency: {
      get: function () {
        return this.item.exchange_rate_to_delivery_currency_view
          ? this.item.exchange_rate_to_delivery_currency_view
          : parseFloat(this.item.exchange_rate_to_delivery_currency) || null;
      },
      set: function (newValue) {
        this.item.exchange_rate_to_delivery_currency_view = newValue;
      },
    },
    computed_exchange_rate_to_office_currency: {
      get: function () {
        return this.item.exchange_rate_to_office_currency_view
          ? this.item.exchange_rate_to_office_currency_view
          : parseFloat(this.item.exchange_rate_to_office_currency) || null;
      },
      set: function (newValue) {
        this.item.exchange_rate_to_office_currency_view = newValue;
      },
    },
    amountWithCommissionAndExpensesComp() {
      let otherExp = this.item.other_amounts_on_sender || 0;
      let transferringAmount = this.item.to_send_amount || 0;
      let comval = this.item.commission_side == 2 ? 0 : this.calcCommisson();
      let total = comval + transferringAmount + otherExp;
      return total > 0 ? total : null;
    },
    amountInUSDComp() {
      if (
        this.item.to_send_amount == undefined ||
        this.item.exchange_rate_to_delivery_currency == undefined
      )
        return;
      let total =
        this.item.to_send_amount * this.item.exchange_rate_to_delivery_currency;
      this.item.a_received_amount = total;
      this.item.received_amount = total;
      return total;
    },
    totalAmountInUSDComp() {
      // let convert_param = this.item.exchange_rate_to_delivery_currency || 1;
      // let total = parseFloat(this.amountInUSDComp || 0);
      // let commVal =
      //   this.item.commission_side == 1
      //     ? parseFloat((this.calcCommisson() || 0) * convert_param)
      //     : 0;
      // let otherExp = (this.item.other_amounts_on_sender || 0) * convert_param;
      // let final = commVal + total + otherExp;
      // this.item.final_received_amount = final;
      // this.item.office_amount = final;
      let total = parseFloat(this.amountInUSDComp || 0);
      let final = total + (this.item.office_commission || 0);
      this.item.final_received_amount = final;
      this.item.office_amount = final;
      this.item.office_amount_in_office_currency = final;
      return final;
    },
    recivedAmountComp() {
      let conversionParam = this.item.exchange_rate_to_reference_currency || 0,
        amountInUSD = parseFloat(this.amountInUSDComp || 0);
      let res = conversionParam * amountInUSD;
      this.item.received_amount = res;
      return res <= 0 ? null : res;
    },
    totalRecvAmountComp() {
      let amountInUSD = parseFloat(this.amountInUSDComp || 0),
        conversionParam = this.item.exchange_rate_to_reference_currency || 0;
      let commission =
        this.item.commission_side == 1 ? 0 : this.calcCommisson() || 0;
      let otherExp = this.item.other_amounts_on_receiver || 0;
      let res = (amountInUSD - commission - otherExp) * conversionParam;
      let factor = this.$newCalcSalePrice(
        { id: this.item.received_currency_id },
        { id: 1 }
      );
      let sub_factor = this.$newCalcBuyPrice(
        { id: this.item.received_currency_id },
        { id: 1 }
      );
      this.item.a_received_amount = factor
        ? res * (factor < 1 ? factor : sub_factor)
        : null;
      return res <= 0 ? null : res;
    },
    officeAmount() {
      let conversionParam = this.item.exchange_rate_to_office_currency || 1,
        totalRecvAmount = parseFloat(this.totalRecvAmountComp || 0);
      let officeAmount = totalRecvAmount * conversionParam;
      return officeAmount <= 0 ? null : officeAmount;
    },
    totalOfficeAmount() {
      let commission = this.item.office_commission || 0,
        officeAmount = parseFloat(this.officeAmount || 0);

      let returned = this.item.returned_commission || 0;
      commission =
        this.item.office_commission_type == 1
          ? (commission / 100) * officeAmount
          : commission;
      let tempVar = officeAmount + commission - returned;
      //  $newCalcBuyPrice(item.office_currency,{id:1}) ;

      return tempVar <= 0 ? null : tempVar;
    },
    officeProfitComp() {
      this.count;
      let amount = this.item.transfer_commission * 1;
      let factor = this.item.transfer_commission_exchange_rate * 1;
      return this.item.transfer_commission_currency == 4
        ? amount * factor
        : amount / factor;
    },
    ...mapState({
      currencies: (state) => state.currency.all,
      one: (state) => state.transfer.one,
      one_party: (state) => state.party.one,
      stocks: (state) => state.stock.all,
    }),
  },
  methods: {
    setCommissionFactor(curr_id) {
      this.item.transfer_commission_exchange_rate = this.stocks.find(
        (e) => e.currency_id == curr_id
      ).close_mid;
    },
    setReceiverDate(item) {
      if (!item) return;
      this.item.receiver_id_no = item.id_no;
      this.item.receiver_phone = item.phone;
      this.item.receiver_address = item.address;
      this.item.receiver_country_id = item.country_id;
      this.item.receiver_city_id = item.city_id;
    },
    setSenderData(item) {
      this.image_file = null;
      this.$store.dispatch("party/show", item.id);
    },
    signCurrency(vCalc, vModel, type, fromCurr, toCurr) {
      if (fromCurr == null || toCurr == null) return;

      this.item[vCalc] = parseFloat(
        type == "buy"
          ? this.$newCalcSalePrice(fromCurr, toCurr)
          : this.$newCalcBuyPrice(fromCurr, toCurr)
      );

      if (toCurr.id == 1) {
        let temp = toCurr;
        toCurr = fromCurr;
        fromCurr = temp;
      }

      this.item[vModel] = parseFloat(
        type == "buy"
          ? this.$newCalcSalePrice(fromCurr, toCurr)
          : this.$newCalcBuyPrice(fromCurr, toCurr)
      );
    },
    calcCommisson() {
      let transferringAmount = this.item.to_send_amount || 0;
      let commisson_amount = this.item.transfer_commission || 0;
      let percentage = this.item.is_commission_percentage;
      let amount = 0;
      if (commisson_amount != 0) {
        amount =
          percentage == 1
            ? (transferringAmount * commisson_amount) / 100
            : commisson_amount;
      }

      return amount;
    },
    confirmProcess(status) {
      this.item.status = status;
      this.item.issued_at = this.$getDateTime();
      this.$save(this.item, "transfer", null, "/dashboard/moneygram").then(
        (data) => {
          if (this.transfer_photo) {
            this.$save(
              {
                file: this.transfer_photo,
                attachable_type: 1,
                attachable_id: data.id,
                silent: true,
              },
              "file"
            );
          }
        }
      );
    },

    showConversionFactor(to, factorModel, new_value) {
      if (!to || !factorModel) return;
      this.item[factorModel] =
        to.id == 1
          ? parseFloat(1 / parseFloat(new_value)).toFixed(7)
          : parseFloat(new_value).toFixed(7);
    },
  },
  filters: {
    money(value) {
      if (value) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
  },
  created() {
    if (process.client) {
      if (this.$route.params.id) {
        this.$store.dispatch("transfer/show", this.$route.params.id);
      }
      // this.$store.dispatch("party/index", { per_page: -1 });
      if (!this.currencies[0]) {
        this.$store.dispatch("currency/index");
      }
    }
  },
  watch: {
    image_file(file) {
      if (file) {
        if (!this.item.sender_party_id) return;
        let docment_data = {
          id: this.item.sender_party_id,
        };

        this.$upload(file, "party", docment_data).then((data) => {
          this.$store.dispatch("party/show", docment_data.id);
        });
      }
    },
    one(val) {
      if (val) {
        this.item = { ...val }; //JSON.parse(JSON.stringify(val));
      }
    },
    one_party: {
      handler(item) {
        if (!item) return;
        if (item.sended_money_gram_count >= 2) {
          this.$swal({
            title: "تحذير",
            text: `عدد الحركات السابقة ل ${item.name}  هو :  ${item.sended_money_gram_count}`,

            icon: "warning",
            confirmButtonText: this.$t("ok"),
          });
        }
        if (!item) return;
        this.item.sender_id_no = item.id_no;
        this.sender_id_image = item.image ? item.image.url : null;
        this.item.sender_phone = item.phone;
        this.item.sender_address = item.address;
      },
      deep: true,
    },
  },
  mounted() {
    if (!this.$route.params.id) {
      this.item.started_at = this.$getDateTime();
    }
    if (this.$route.query.show && this.$route.query.show == "true") {
      this.showReadOnly = true;
    }
  },
};
</script>

<style>
.show-text {
  background-color: #e6e6e6;
  border-radius: 4px;
  padding: 5px 8px;
  width: 50px !important;
  margin: 20px 18px;
}
.theme--light.v-input--is-disabled input {
  color: rgb(0, 0, 0, 1) !important;
  opacity: 1 !important;
  font-size: 20px !important ;
}

@media (max-width: 600px) {
  .responseveCols > div {
    min-width: 100% !important;
  }
}
@media (max-width: 1280px) {
  .responseveCols > div {
    min-width: 50% !important;
  }
}
@media (min-width: 1264px) {
  .lg5-custome-row > div {
    width: 20% !important;
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
  .lg-one-and-half {
    width: 13% !important;
    max-width: 13% !important;
    flex-basis: 13% !important;
  }
  .lg16 {
    width: 18% !important;
    max-width: 18% !important;
    flex-basis: 18% !important;
  }
}

/* .theme--light.v-input input::placeholder, 
.theme--light.v-input textarea::placeholder{
   color: rgb(0, 0, 0 , 1) !important;
  opacity: 1 !important;

} */
/* #c0faac !important */
</style>