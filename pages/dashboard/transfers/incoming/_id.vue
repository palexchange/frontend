<template>
  <div>
    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <Title title="add incoming transfer"></Title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <AutoComplete
                required
                v-model="item.delivering_type"
                :items="transfer_types"
                text="transfer type"
                holder="transfer type"
              />
            </v-col>
            <v-col>
              <DatePicker
                v-model="item.issued_at"
                required
                text="transfer date"
                holder="test"
              />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <InputField
                :value="officeProfitComp | money"
                dashed
                text="palestinian profit"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-row no-gutters class="flex-column text-h6">
            <v-col class="align-self-strach text-left mb-4">
              <span>
                {{ $t("transfer number") }}
                <span class="show-text">1616#</span>
              </span>
            </v-col>

            <v-col class="text-left mb-4">
              {{ $t("refrence number") }}<span class="show-text">1616#</span>
            </v-col>
            <v-col class="text-left mb-4">
              {{ $t("transfer stats") }}<span class="show-text">مسودة</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </Card>

    <Card class="mb-5 px-3">
      <v-card-title> بيانات المرسل </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="6">
            <BeneficiaryAutocomplete
              text="beneficiary"
              holder="beneficiary"
              required
              return-object
              @change="
                (v) => {
                  setSenderDate(v);
                  item.sender_party_id = v.id;
                }
              "
            />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <InputField
              holder="address"
              text="address"
              v-model="item.sender_address"
            />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <InputField
              holder="notes"
              text="notes"
              v-model="item.sender_notes"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5 px-3">
      <v-card-title>بيانات المستلم </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="6" lg="2">
            <BeneficiaryAutocomplete
              text="beneficiary"
              holder="beneficiary"
              required
              @change="
                (v) => {
                  setReceiverDate(v);
                  item.receiver_party_id = v.id;
                }
              "
              return-object
              :value="item.reciver_party_id"
            />
          </v-col>
          <v-col ccols="12" md="4" sm="6" lg="2">
            <label
              style="color: rgba(139, 139, 139, 0.93)"
              class="required form-label"
              >{{ $t("id image") }}</label
            >
            <v-file-input
              min="0"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              :disabled="dashed"
              :required="true"
              outlined
              v-on="$listeners"
              :rules="rulesss.requiredRules"
              :placeholder="$t('id image')"
              prepend-icon=""
              prepend-inner-icon="fa-solid fa-image"
            />
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="2">
            <InputField
              holder="mobile"
              text="mobile"
              required
              v-model="item.reciver_phone"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <AutoComplete text="country" holder="country" required />
          </v-col> -->
          <v-col cols="12" md="3" sm="6">
            <InputField
              holder="address"
              text="address"
              v-model="item.reciver_address"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <AutoComplete text="city" holder="city" required />
          </v-col> -->
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <InputField holder="address" text="address" />
          </v-col> -->
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-radio-group mandatory v-model="item.commision_side" row>
              <v-radio :value="2" label="العمولة علي المستلم"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col class="align-self-center" md="3" sm="12">
            <v-text-field
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              :label="
                item.is_commision_percentage
                  ? `${$t('commission')} %`
                  : $t('commission')
              "
              :append-icon="
                item.is_commision_percentage == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  (item.is_commision_percentage = !item.is_commision_percentage)
              "
              v-model.number="item.commission"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5 pa-3">
      <v-card-title>بيانات الحوالة المالية </v-card-title>
      <v-card-text>
        <v-row class="justify-center responseveCols">
          <v-col>
            <InputField
              v-model.number="item.to_send_amount"
              holder="transfirrig amount"
              text="transfirrig amount"
              required
            />
          </v-col>
          <v-col>
            <AutoComplete
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_delivery_currency',
                    'exchange_rate_to_delivery_currency_view',
                    'buy',
                    v,
                    currencies[0]
                  );
                  item.delivery_currency_id = v.id;
                }
              "
              v-model="item.delivery_currency"
              :items="currencies"
              item-name="name"
              return-object
              text="currency"
              holder="currency"
              required
            />
          </v-col>
          <v-col>
            <InputField
              v-model.number="item.exchange_rate_to_delivery_currency_view"
              @input=" (new_value) => {
                showConversionFactor(
                  currencies.find((e) => e.id == 1),
                  'exchange_rate_to_office_currency',
                  new_value
                )
              }
              "
              holder="converting to dollar amount"
              text="converting to dollar amount"
              required
            />
          </v-col>

          <v-col>
            <InputField
              :value="recivedAmountInUSDComp | money"
              dashed
              holder="recived amount in USD"
              text="recived amount in USD"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center responseveCols">
            <img src="~/assets/img/icons/to.png" alt="" />
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col>
            <AutoComplete
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
                }
              "
              v-model="item.received_currency"
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
              v-model.number="item.exchange_rate_to_reference_currency"
              holder="convert to receiver currency"
              text="convert to receiver currency"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :value="finalAmountToDeliverComp | money"
              dashed
              holder="final amount to give"
              text="final amount to give"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5 pa-3">
      <v-card-title>المكتب</v-card-title>
      <v-card-text>
        <v-row class="justify-center responseveCols">
          <v-col cols="3">
            <BeneficiaryAutocomplete
              holder="beneficiary"
              text="beneficiary"
              required
              v-model="item.office_id"
            />
          </v-col>

          <v-col>
            <AutoComplete
              v-model="item.office_currency"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_office_currency',
                    'exchange_rate_to_office_currency_view',
                    'sale',
                    item.received_currency,
                    v
                  );
                  item.office_currency_id = v.id;
                }
              "
              return-object
              :items="currencies"
              item-name="name"
              holder="currency to office"
              text="currency to office"
              required
            />
          </v-col>

          <v-col>
            <InputField
              v-model.number="item.exchange_rate_to_office_currency_view"
              @input=" (new_value) => {
                showConversionFactor(
                  item.office_currency,
                  'exchange_rate_to_office_currency',
                  new_value
                )
              }
              "
              holder="conversion price"
              text="conversion price"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :value="officeAmount | money"
              dashed
              holder="office amount"
              text="office amount"
            />
          </v-col>
          <v-col>
            <label class="required form-label">
              {{ item.office_commision_type == 1 ? "%" : "" }}
              عمولة المكتب
            </label>
            <v-text-field
              v-model.number="item.office_commision"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              required
              :append-icon="
                item.office_commision_type == 0
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  (item.office_commision_type =
                    item.office_commision_type == 1 ? 0 : 1)
              "
            >
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <InputField
              v-model.number="item.returned_commision"
              holder="returned"
              text="returned"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :value="totalOfficeAmount | money"
              dashed
              holder="final amount to office"
              text="final amount to office"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <v-row>
      <v-col cols="12" xs="12">
        <v-checkbox :label="$t('send sms to the sender')"> </v-checkbox>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-card color="transparent" flat>
        <v-card-actions>
          <v-btn @click="confirmProcess" class="px-16" color="primary"
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
              <v-list-item>
                <v-list-item-title> {{ $t("حفظ كمسودة") }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-save</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-title> ترحيل علي الحساب</v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-arrow-left</v-icon>
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
  data() {
    return {
      rulesss: ruless(this),
      transfer_types: [
        { id: 1, name: "تسليم يد" },
        { id: 2, name: "موني غرام" },
      ],
      prices: [],
      item: {
        commision_side: 2,
        type: 2,
        reference_currency_id: 1,
        reciver_phone: null,
        reciver_address: null,
        receiver_notes: null,
        sender_id_no: null,
        sender_phone: null,
        sender_address: null,
        is_commision_percentage: false,
        office_commision_type: 0,
        exchange_rate_to_delivery_currency: null,
        exchange_rate_to_delivery_currency_view: null,
        exchange_rate_to_reference_currency: null,
        exchange_rate_to_office_currency: null,
        exchange_rate_to_office_currency_view: null,
      },
      // a:0,
      // b:0,
      //recivedAmountInUSD:0
    };
  },
  // methods: {
  //     recivedAmountInUSDFunc() {
  //         // this.a = 45
  //         // this.b = this.a * 3.5
  //         let temp = this.item.a * this.item.b;
  //         console.log("Amount: ",this.item.a);
  //         console.log("Ratio to USD: ",this.item.b);
  //         this.recivedAmountInUSD = temp;
  //         return temp;
  //       }
  // },
  computed: {
    recivedAmountInUSDComp() {
      let amount = this.item.to_send_amount || 0;
      let ratio = this.item.exchange_rate_to_delivery_currency || 0;
      let commVal = parseFloat(this.calcCommisson() || 0);
      let res = (amount - commVal) * ratio;
      return res == 0 ? null : res;
    },
    finalAmountToDeliverComp() {
      let recvAmountInUSD = parseFloat(this.recivedAmountInUSDComp || 0);
      let ratio = this.item.exchange_rate_to_reference_currency || null;
      if (ratio == null) return;
      let amountToDelv = recvAmountInUSD * ratio;
      this.item.received_amount = amountToDelv;
      return amountToDelv;
    },
    officeAmount() {
      let conversionParam = this.item.exchange_rate_to_office_currency || 1,
        totalRecvAmount = parseFloat(this.finalAmountToDeliverComp || 0);
      if (this.item.delivering_type == 2) {
        return this.recivedAmountInUSDComp;
      }

      let officeAmount = totalRecvAmount * conversionParam;
      return officeAmount <= 0 ? null : officeAmount;
    },
    totalOfficeAmount() {
      let commission = this.item.office_commision || 0,
        officeAmount = parseFloat(this.officeAmount || 0);
      let returned = this.item.returned_commision || 0;
      commission =
        this.item.office_commision_type == 1
          ? (commission / 100) * officeAmount
          : commission;
      let tempVar = officeAmount - commission + returned;
      return tempVar <= 0 ? null : tempVar;
    },
    officeProfitComp() {
      let fromInDoller = parseFloat(this.recivedAmountInUSDComp) || 0;
      let finalOfficeAmount = parseFloat(this.totalOfficeAmount) || 0;

      let recvCurr = this.item.office_currency || null;
      if (recvCurr == undefined) return;
      let convParam = this.$newCalcSalePrice(recvCurr, this.currencies[0]);
      let res = fromInDoller - finalOfficeAmount * convParam;
      console.table({ fromInDoller, finalOfficeAmount, convParam, res });
      let otherExp = this.item.other_amounts_on_receiver || 0;
      return res - otherExp;
    },
    ...mapState({
      currencies: (state) => state.currency.all,
    }),
  },
  methods: {
    confirmProcess() {
      this.$save(this.item, "transfer", null, "/dashboard/transfers");
      // console.log(this.item);
    },
    setReceiverDate(item) {
      this.item.reciver_id_no = item.id_no;
      this.item.reciver_phone = item.mobile;
      this.item.reciver_address = item.address;
    },
    setSenderDate(item) {
      this.item.sender_id_no = item.id_no;
      this.item.sender_phone = item.mobile;
      this.item.sender_address = item.address;
    },
    calcCommisson() {
      let to_send_amount = this.item.to_send_amount || 0;
      let commisson_amount = this.item.commission || 0;
      let percentage = this.item.is_commision_percentage;
      let amount = 0;
      if (commisson_amount > 0) {
        amount = percentage
          ? (to_send_amount * commisson_amount) / 100
          : commisson_amount;
      }

      return amount;
    },
    signCurrency(vCalc, vModel, type, fromCurr, toCurr) {
      if (fromCurr == null || toCurr == null) return;

      this.item[vCalc] = parseFloat(
        type == "buy"
          ? this.$newCalcBuyPrice(fromCurr, toCurr)
          : this.$newCalcSalePrice(fromCurr, toCurr)
      );

      if (toCurr.id == 1) {
        let temp = toCurr;
        toCurr = fromCurr;
        fromCurr = temp;
      }

      this.item[vModel] = parseFloat(
        type == "buy"
          ? this.$newCalcBuyPrice(fromCurr, toCurr)
          : this.$newCalcSalePrice(fromCurr, toCurr)
      );
    },
    showConversionFactor(to, factorModel, new_value) {
      console.log(to,factorModel,new_value);
      if(!to || !factorModel) return;
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
    this.$store.dispatch("currency/index");
    this.$store.dispatch("stock/index");
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
</style>