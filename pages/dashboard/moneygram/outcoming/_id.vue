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
                item.status == 1 ? "????????????" : "??????????"
              }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </Card>
    <Card class="mb-5 px-3">
      <v-card-title style="font-weight: 700"> ???????????? ???????????? </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="3" md="4" sm="6">
            <BeneficiaryAutocomplete
              :readonly="showReadOnly"
              v-model="item.sender_party_id"
              no_fetch
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
          <v-col v-if="!sender_id_image" cols="12" md="4" sm="6" lg="2">
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              :class="
                item.delivering_type == 2 ? 'required form-label' : 'form-label'
              "
              >{{ $t("id image") }}</label
            >
            <v-file-input
              :readonly="showReadOnly"
              required
              min="0"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              dashed
              outlined
              v-on="$listeners"
              :placeholder="$t('id image')"
              prepend-icon=""
              prepend-inner-icon="fa-solid fa-image"
            />
          </v-col>
          <v-col v-else cols="12" md="4" sm="6" lg="2">
            <img width="70" :src="sender_id_image" alt="" />
          </v-col>
          <!-- <v-col cols="12" lg="2" md="4" sm="6">
            <InputField
              required
              :readonly="showReadOnly"
              holder="id number"
              text="id number"
              v-model="item.sender_id_no"
            />
          </v-col> -->
          <v-col cols="12" md="4" sm="6" lg="2">
            <IDsAutoComplete
              :readonly="showReadOnly"
              text="id_no"
              holder="id_no"
              required
              @change="
                (v) => {
                  setReceiverDate(v);
                  item.sender_party_id = v.id;
                }
              "
              return-object
              :value="{ id: item.sender_party_id }"
            />
          </v-col>
          <!-- <v-col cols="12" lg="2" md="4" sm="6">
            <InputField
              required
              :readonly="showReadOnly"
              holder="mobile"
              text="mobile"
              v-model="item.sender_phone"
            />
          </v-col> -->
          <v-col cols="12" md="4" sm="6" lg="2">
            <PhonesAutoComplete
              :readonly="showReadOnly"
              text="phone"
              holder="phone"
              required
              @change="
                (v) => {
                  setReceiverDate(v);
                  item.sender_party_id = v.id;
                }
              "
              return-object
              :value="{ id: item.sender_party_id }"
            />
          </v-col>
          <v-col cols="12" lg="3" md="4" sm="6">
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
      <v-card-title style="font-weight: 700">???????????? ?????????????? </v-card-title>
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
          <!-- <v-col class="lg16" cols="12" md="4" lg="2" sm="6">
            <InputField
              :readonly="showReadOnly"
              holder="id number"
              text="id number"
              v-model="item.receiver_id_no"
            />
          </v-col> -->
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
              return-object
              :value="{ id: item.receiver_party_id }"
            />
          </v-col>
          <!-- <v-col class="lg16" cols="12" md="4" lg="2" sm="6">
            <InputField
              :readonly="showReadOnly"
              holder="mobile"
              text="mobile"
              v-model="item.receiver_phone"
            />
          </v-col> -->
          <v-col cols="12" md="4" sm="6" lg="2">
            <PhonesAutoComplete
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
              <v-radio :value="1" label="?????????????? ?????? ????????????"></v-radio>
              <!-- <v-radio :value="2" label="?????????????? ?????? ??????????????"></v-radio> -->
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
              :label="
                item.is_commission_percentage
                  ? `${$t('extra commission')} %`
                  : $t('extra commission')
              "
              :append-icon="
                item.is_commission_percentage == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  showReadOnly
                    ? ''
                    : (item.is_commission_percentage =
                        !item.is_commission_percentage)
              "
              v-model.number="item.transfer_commission"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title style="font-weight: 700"
        >???????????? ?????????????? ??????????????
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
              holder="???????? ?????????????? ????????????????"
              text="???????? ?????????????? ????????????????"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="totalAmountInUSDComp | money"
              dashed
              holder="???????? ??????????????"
              text="???????????? ???????????????? ??.??"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col class="text-center">
            <img src="~/assets/img/icons/to.png" alt="" />
          </v-col>
        </v-row>
        <v-row class="justify-center responseveCols">
          <v-col>
            <AutoComplete
              :readonly="showReadOnly"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_reference_currency',
                    'exchange_rate_to_reference_currency',
                    'sale',
                    this.currencies[0],
                    v
                  );
                  item.received_currency_id = v.id;
                  item.received_currency = v;
                }
              "
              v-model="item.received_currency_id"
              return-object
              :items="currencies"
              item-name="name"
              holder="currency to give"
              text="currency to give"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.exchange_rate_to_reference_currency"
              holder="convert to receiver currency"
              text="convert to receiver currency"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="recivedAmountComp | money"
              dashed
              holder="amount to give"
              text="amount to give"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.other_amounts_on_receiver"
              holder="another expenses on receiver"
              text="another expenses on receiver"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="totalRecvAmountComp | money"
              dashed
              holder="final amount to give"
              text="final amount to give"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="item.a_received_amount | money"
              dashed
              holder="???????????? ?????????????? ????????????????"
              text="???????????? ?????????????? ????????????????"
            />
          </v-col>
        </v-row> -->
      </v-card-text>
    </Card>
    <!-- <Card class="mb-5 pa-3">
      <v-card-title style="font-weight: 700">????????????</v-card-title>
      <v-card-text>
        <v-row class="responseveCols">
          <v-col cols="5">
            <BeneficiaryAutocomplete
              :readonly="showReadOnly"
              no_fetch
              holder="beneficiary"
              text="beneficiary"
              v-model="item.office_id"
              required
            />
          </v-col>

          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model.number="computed_exchange_rate_to_office_currency"
              @input="
                (new_value) => {
                  showConversionFactor(
                    item.office_currency,
                    'exchange_rate_to_office_currency',
                    new_value
                  );
                }
              "
              holder="conversion price"
              text="conversion price"
              required
            />
          </v-col>
          <v-col cols="3">
            <InputField
              :readonly="showReadOnly"
              :value="item.office_amount | money"
              dashed
              holder="final amount to office in usd"
              text="final amount to office in usd"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card> -->
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
            >??????????</v-btn
          >
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn @click="confirmProcess(1)" class="px-16" color="primary"
            >?????????? ????????????</v-btn
          >
          &nbsp; &nbsp;
          <v-menu offset-x left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary" outlined
                >??????????????????</v-btn
              >
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title> ?????????? ?????????? </v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-print</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item @click="confirmProcess(0)">
                <v-list-item-title> {{ $t("?????? ????????????") }}</v-list-item-title>
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
export default {
  name: "moneygram-outcoming",
  data() {
    return {
      showReadOnly: false,
      sender_id_image: null,

      // currencies_test: [
      //   { id: 1, name: this.$t("dollar"), values: { sale: 1, buy: 1 } },
      //   { id: 2, name: this.$t("denar"), values: { sale: 0.7, buy: 0.69 } },
      //   { id: 3, name: this.$t("shekel"), values: { sale: 3.23, buy: 3.22 } },
      //   { id: 3, name: this.$t("shekel"), values: { sale: 3.32, buy: 3.3 } },
      //   { id: 4, name: this.$t("euro"), values: { sale: 1.03, buy: 1.01 } },
      //   { id: 5, name: this.$t("pound"), values: { sale: 16, buy: 15 } },
      //   { id: 6, name: this.$t("derhm"), values: { sale: 3.63, buy: 3.6 } },
      // ],
      prices: [],
      transfer_types: [
        { id: 1, name: "?????????? ???? ??????????" },
        { id: 2, name: "???????? ????????" },
        { id: 3, name: "?????????? ???? ?????? ????????????" },
      ],
      item: {
        sender_party_id: "",
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
        is_commission_percentage: false,
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
      // let fromInDoller = parseFloat(this.totalAmountInUSDComp) || 0;
      // let finalOfficeAmount = parseFloat(this.totalOfficeAmount) || 0;
      // let recvCurr = this.item.office_currency || null;
      // if (recvCurr == undefined) return;
      // let convParam = this.$newCalcSalePrice(recvCurr, this.currencies[0]);
      // let res = fromInDoller - finalOfficeAmount * convParam;
      // let otherExp = this.item.other_amounts_on_receiver || 0;
      // return res - otherExp;
      return this.item.transfer_commission;
    },
    ...mapState({
      currencies: (state) => state.currency.all,
      one: (state) => state.transfer.one,
    }),
  },
  methods: {
    setReceiverDate(item) {
      if (!item) return;
      this.item.receiver_id_no = item.id_no;
      this.item.receiver_phone = item.phone;
      this.item.receiver_address = item.address;
      this.item.receiver_country_id = item.country_id;
      this.item.receiver_city_id = item.city_id;
    },
    setSenderData(item) {
      if (item.sended_money_gram_count >= 2) {
        this.$swal({
          title: "??????????",
          text: `?????? ?????????????? ?????????????? ?? ${item.name}  ???? :  ${item.sended_money_gram_count}`,

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
        amount = percentage
          ? (transferringAmount * commisson_amount) / 100
          : commisson_amount;
      }

      return amount;
    },
    confirmProcess(status) {
      this.item.status = status;
      this.item.issued_at = this.$getDateTime();
      this.$save(this.item, "transfer", null, "/dashboard/moneygram");
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
      this.$store.dispatch("party/index", { per_page: -1 });
      this.$store.dispatch("currency/index");
      this.$store.dispatch("stock/index");
    }
  },
  watch: {
    one(val) {
      if (val) {
        this.item = { ...val }; //JSON.parse(JSON.stringify(val));
      }
    },
  },
  mounted() {
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