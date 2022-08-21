<template>
  <div>
    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <Title title="add outcomming transfer"></Title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <AutoComplete
                required
                :value="item.type"
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
                v-bind="item.officeProfit"
                dashed
                text="palestinian profit"
                :value="officeProfitComp | money"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="1
        2"
          md="6"
          sm="12"
        >
          <v-row no-gutters class="flex-column text-h6">
            <v-col cols="12" class="align-self-strach text-left mb-4">
              <span>
                {{ $t("todays profit") }}<span class="show-text">0400</span>
              </span>
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
          <v-col cols="12" lg="3" md="4" sm="6">
            <AutoComplete text="beneficiary" holder="beneficiary" required :value="item.sender_party_id" />
          </v-col>
          <v-col cols="12" lg="2" md="4" sm="6">
            <InputField holder="id number" text="id number" required :value="item.sender_id_no" />
          </v-col>
          <v-col cols="12" lg="2" md="4" sm="6">
            <InputField holder="mobile" text="mobile" required :value="item.sender_phone" />
          </v-col>
          <v-col cols="12" lg="3" md="4" sm="6">
            <InputField holder="address" text="address" :value="item.sender_address" />
          </v-col>
          <v-col cols="12" lg="2" md="4" sm="6">
            <InputField holder="notes" text="notes" :value="item.sender_notes" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 px-3">
      <v-card-title>بيانات المستلم </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" lg="3" sm="6">
            <AutoComplete text="beneficiary" holder="beneficiary" required :value="item.reciver_party_id" />
          </v-col>
          <v-col cols="12" md="4" lg="2" sm="6">
            <InputField holder="id number" text="id number" required :value="item.reciver_id_no" />
          </v-col>
          <v-col cols="12" md="4" lg="2" sm="6">
            <InputField holder="mobile" text="mobile" required :value="item.reciver_phone" />
          </v-col>
          <v-col cols="12" md="4" lg="1" sm="6">
            <AutoComplete text="country" holder="country" required :value="item.reciver_country_id" />
          </v-col>
          <v-col cols="12" md="4" lg="2" sm="6">
            <AutoComplete text="city" holder="city" required :value="item.city_id" />
          </v-col>
          <v-col cols="12" md="4" lg="2" sm="6">
            <InputField holder="address" text="address" :value="item.reciver_address" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5" sm="12">
            <v-radio-group mandatory v-model="item.commision_side" row>
              <v-radio value="1" label="العمولة علي المحول"></v-radio>
              <v-radio value="2" label="العمولة علي المستلم"></v-radio>
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
                item.is_commision_percentage ? `${$t('commission')} %` : $t('commission')
              "
              :append-icon="
                item.is_commision_percentage == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="() => (item.is_commision_percentage = !item.is_commision_percentage)"
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
                (v) => signCurrency('exchange_rate_to_delivery_currency', 'buy', v, currencies[0])
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
              v-model.number="item.exchange_rate_to_delivery_currency"
              holder="converting to dollar amount"
              text="converting to dollar amount"
              required
            />
          </v-col>
          <v-col>
            <InputField
              holder="another expenses"
              text="another expenses"
              v-model.number="item.other_amounts_on_sender"
            />
          </v-col>
          <v-col>
            <InputField
              :value="amountWithCommissionAndExpensesComp | money"
              dashed
              holder="مبلغ شامل عمولة"
              text="م.ش عمولة و مصاريف"
            />
          </v-col>
          <v-col>
            <InputField
              :value="amountInUSDComp | money"
              dashed
              holder="مبلغ مستلم بالدولار"
              text="مبلغ مستلم بالدولار"
            />
          </v-col>
          <v-col>
            <InputField
              :value="totalAmountInUSDComp | money"
              dashed
              holder="شامل العمولة"
              text="المبلغ بالدولار ش.ع"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <img src="~/assets/img/icons/to.png" alt="" />
          </v-col>
        </v-row>
        <v-row class="justify-center responseveCols">
          <v-col>
            <AutoComplete
              @change="
                (v) =>
                  signCurrency(
                    'exchange_rate_to_reference_currency',
                    'buy',
                    this.currencies[0],
                    v
                  )
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
              :value="recivedAmountComp | money"
              dashed
              holder="amount to give"
              text="amount to give"
              required
            />
          </v-col>
          <v-col>
            <InputField
              v-model.number="item.other_amounts_on_receiver"
              holder="another expenses on receiver"
              text="another expenses on receiver"
            />
          </v-col>
          <v-col cols="3">
            <InputField
              :value="totalRecvAmountComp | money"
              dashed
              holder="final amount to give"
              text="final amount to give"
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
            <AutoComplete holder="beneficiary" text="beneficiary" required />
          </v-col>

          <v-col>
            <AutoComplete
              v-model="item.office_currency"
              @change="
                (v) =>
                  signCurrency(
                    'officeConversionParam',
                    'sale',
                    item.recvCurrAuto,
                    v
                  )
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
              v-model.number="item.officeConversionParam"
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
            <label class="required form-label">عمولة المكتب</label>
            <v-text-field
              v-model.number="item.office_commision"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              required
              :label="
                item.office_commision_type ? `${$t('commission')} %` : $t('commission')
              "
              :append-icon="
                item.office_commision_type == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="() => (item.office_commision_type = !item.office_commision_type)"
            >
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <InputField
              v-model.number="item.returned_commision"
              holder="returned"
              text="returned"
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
      <v-col>
        <v-checkbox :label="$t('send sms to the sender')"> </v-checkbox>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-card color="transparent" flat>
        <v-card-actions>
          <v-btn @click="confirmProcess" class="px-16" color="primary">إتمام العملة</v-btn>
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
export default {
  name: "transfer-form",
  data() {
    return {
      currencies: [
        { id: 1, name: this.$t("dollar"), values: { sale: 1, buy: 1 } },
        { id: 2, name: this.$t("denar"), values: { sale: 0.7, buy: 0.69 } },
        { id: 3, name: this.$t("shekel"), values: { sale: 3.23, buy: 3.22 } },
        { id: 3, name: this.$t("shekel"), values: { sale: 3.32, buy: 3.3 } },
        { id: 4, name: this.$t("euro"), values: { sale: 1.03, buy: 1.01 } },
        { id: 5, name: this.$t("pound"), values: { sale: 16, buy: 15 } },
        { id: 6, name: this.$t("derhm"), values: { sale: 3.63, buy: 3.6 } },
      ],
      prices: [],
      transfer_types: [
        { id: 1, name: "تسليم يد" },
        { id: 1, name: "موني غرام" },
      ],
      item: {
        is_commision_percentage: false,
        office_commision_type: false,
        exchange_rate_to_delivery_currency: null,
        exchange_rate_to_reference_currency: null,
        officeConversionParam: null,
      },
    };
  },
  computed: {
    amountWithCommissionAndExpensesComp() {
      let otherExp = this.item.other_amounts_on_sender || 0;
      let transferringAmount = this.item.to_send_amount || 0;
      let comval = this.item.commission_on === "2" ? 0 : this.calcCommisson();
      let total = comval + transferringAmount + otherExp;
      return total > 0 ? total : null;
    },
    amountInUSDComp() {
      if (
        this.item.to_send_amount == undefined ||
        this.item.exchange_rate_to_delivery_currency == undefined
      )
        return;
      return this.item.to_send_amount * this.item.exchange_rate_to_delivery_currency;
    },
    totalAmountInUSDComp() {
      let convert_param = this.item.exchange_rate_to_delivery_currency || 1;
      let total = parseFloat(this.amountInUSDComp || 0);
      let commVal = parseFloat((this.calcCommisson() || 0) * convert_param);
      let otherExp = (this.item.other_amounts_on_sender || 0) * convert_param;
      let final = commVal + total + otherExp;
      return final > 0 ? final : null;
    },
    recivedAmountComp() {
      let conversionParam = this.item.exchange_rate_to_reference_currency || 0,
        amountInUSD = parseFloat(this.amountInUSDComp || 0);
      let res = conversionParam * amountInUSD;
      return res <= 0 ? null : res;
    },
    totalRecvAmountComp() {
      let amountInUSD = parseFloat(this.amountInUSDComp || 0),
        conversionParam = this.item.exchange_rate_to_reference_currency || 0;
      let commission =
        this.item.commission_on === "1" ? 0 : this.calcCommisson() || 0;
      let otherExp = this.item.other_amounts_on_receiver || 0;
      let res = (amountInUSD - commission - otherExp) * conversionParam;
      return res <= 0 ? null : res;
    },
    officeAmount() {
      let conversionParam = this.item.officeConversionParam || 1,
        totalRecvAmount = parseFloat(this.totalRecvAmountComp || 0);
      let officeAmount = totalRecvAmount * conversionParam;
      return officeAmount <= 0 ? null : officeAmount;
    },
    totalOfficeAmount() {
      let commission = this.item.office_commision || 0,
        officeAmount = parseFloat(this.officeAmount || 0);
      let returned = this.item.returned_commision || 0;
      commission = this.item.office_commision_type
        ? (commission / 100) * officeAmount
        : commission;
      let tempVar = officeAmount + commission - returned;
      return tempVar <= 0 ? null : tempVar;
    },
    officeProfitComp() {
      let fromInDoller = parseFloat(this.totalAmountInUSDComp) || 0;
      let finalOfficeAmount = parseFloat(this.totalOfficeAmount) || 0;
      console.table({ fromInDoller, finalOfficeAmount });
      let recvCurr = this.item.office_currency || null;
      if (recvCurr == undefined) return;
      let convParam = this.$calcBuyPrice(recvCurr, this.currencies[0]);
      let res = fromInDoller - finalOfficeAmount * convParam;
      console.table({ fromInDoller, finalOfficeAmount, convParam, res });
      let otherExp = this.item.other_amounts_on_receiver || 0;
      return res - otherExp;
    },
  },
  methods: {
    signCurrency(vName, type, fromCurr, toCurr) {
      console.log(vName);
      console.log(type);
      console.log(fromCurr);
      console.log(toCurr);

      let fromCurrObj = fromCurr;
      let toCurrObj = toCurr;

      if (fromCurrObj == null || toCurrObj == null) return;

      this.item[vName] = parseFloat(
        type == "buy"
          ? this.$calcBuyPrice(fromCurrObj, toCurrObj)
          : this.$calcSalePrice(fromCurrObj, toCurrObj)
      );
    },
    calcCommisson() {
      let transferringAmount = this.item.to_send_amount || 0;
      let commisson_amount = this.item.commission || 0;
      let percentage = this.item.is_percentage;
      let amount = 0;
      if (commisson_amount > 0) {
        amount = percentage
          ? (transferringAmount * commisson_amount) / 100
          : commisson_amount;
      }

      return amount;
    },
    confirmProcess(){
      console.log(this.item)
    },
  },
  filters: {
    money(value) {
      if (value) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
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
/* .theme--light.v-input input::placeholder, 
.theme--light.v-input textarea::placeholder{
   color: rgb(0, 0, 0 , 1) !important;
  opacity: 1 !important;

} */
</style>