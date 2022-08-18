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
                :items="transfer_types"
                text="transfer type"
                holder="transfer type"
              />
            </v-col>
            <v-col>
              <DatePicker
                v-model="item.date"
                required
                text="transfer date"
                holder="test"
              />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <InputField :value="officeProfitComp | money" dashed text="palestinian profit" />
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
            <AutoComplete text="beneficiary" holder="beneficiary" required />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <InputField holder="address" text="address" />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <InputField holder="notes" text="notes" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5 px-3">
      <v-card-title>بيانات المستلم </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="6" lg="2">
            <AutoComplete text="beneficiary" holder="beneficiary" required />
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
            <InputField holder="mobile" text="mobile" required />
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="2">
            <AutoComplete text="country" holder="country" required />
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="2">
            <AutoComplete text="city" holder="city" required />
          </v-col>
          <v-col cols="12" md="4" sm="6" lg="2">
            <InputField holder="address" text="address" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-radio-group mandatory v-model="item.commission_on" row>
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
                item.is_percentage ? `${$t('commission')} %` : $t('commission')
              "
              :append-icon="
                item.is_percentage == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="() => (item.is_percentage = !item.is_percentage)"
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
              v-model.number="item.transferringAmount"
              holder="transfirrig amount"
              text="transfirrig amount"
              required
            />
          </v-col>
          <v-col>
            <AutoComplete @change="
                (v) => signCurrency('RatioToUSD', 'buy', v, currencies[0])
              "
              v-model="item.senderConvertingCurrAuto"
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
              v-model.number="item.RatioToUSD"
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
                (v) =>
                  signCurrency(
                    'recvCurrParam',
                    'buy',
                    this.currencies[0],
                    v
                  )
              "
              v-model="item.recvCurrAuto"
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
              v-model.number="item.recvCurrParam"
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
            <AutoComplete holder="beneficiary" text="beneficiary" required />
          </v-col>

          <v-col>
            <AutoComplete
              v-model="item.officeCurrencyAuto"
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
              v-model.number="item.officeCommission"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              required
              :label="
                item.is_percentageO ? `${$t('commission')} %` : $t('commission')
              "
              :append-icon="
                item.is_percentageO == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="() => (item.is_percentageO = !item.is_percentageO)"
            >
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <InputField
              v-model.number="item.officeReturn"
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
          <v-btn class="px-16" color="primary">إتمام العملة</v-btn>
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
import ruless from "~/helpers/rules";
export default {
  data() {
    return {
      rulesss: ruless(this),
      transfer_types: [
        { id: 1, name: "تسليم يد" },
        { id: 1, name: "موني غرام" },
      ],
      currencies: [
        { id: 1, name: this.$t("dollar"), values: { sale: 1, buy: 1 } },
        { id: 2, name: this.$t("denar"), values: { sale: 0.7, buy: 0.69 } },
        { id: 3, name: this.$t("shekel"), values: { sale: 3.23, buy: 3.22 } },
        { id: 3, name: this.$t("shekel"), values: { sale: 3.32, buy: 3.3 } },
        { id: 4, name: this.$t("euro"), values: { sale: 1.03, buy: 1.01 } },
        { id: 5, name: this.$t("pound"), values: { sale: 16, buy: 15 } },
        { id: 6, name: this.$t("derhm"), values: { sale: 3.63, buy: 3.6 } },
      ],
      item: {
        is_percentage: false,
        is_percentageO: false,
        RatioToUSD: null,
        recvCurrParam: null,
        officeConversionParam: null,
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
      let amount = this.item.transferringAmount || 0;
      let ratio = this.item.RatioToUSD || 0;
      let commVal = parseFloat(this.calcCommisson() || 0);
      let res = (amount - commVal) * ratio ;
      return res == 0 ? null : res;
    },
    finalAmountToDeliverComp() {
      let recvAmountInUSD = parseFloat(this.recivedAmountInUSDComp || 0);
      let ratio = this.item.recvCurrParam || null;
      if(ratio == null) return;
      let amountToDelv = recvAmountInUSD * ratio;
      return amountToDelv;
    },
    officeAmount() {
      let conversionParam = this.item.officeConversionParam || 1,
        totalRecvAmount = parseFloat(this.finalAmountToDeliverComp || 0);
      let officeAmount = totalRecvAmount * conversionParam;
      return officeAmount <= 0 ? null : officeAmount;
    },
    totalOfficeAmount() {
      let commission = this.item.officeCommission || 0,
        officeAmount = parseFloat(this.officeAmount || 0);
      let returned = this.item.officeReturn || 0;
      commission = this.item.is_percentageO
        ? (commission / 100) * officeAmount
        : commission;
      let res = officeAmount + commission - returned;
      return res <= 0 ? null : res;
    },
    officeProfitComp() {
      let fromInDoller = parseFloat(this.recivedAmountInUSDComp) || 0;
      let finalOfficeAmount = parseFloat(this.totalOfficeAmount) || 0;
      console.table({ fromInDoller, finalOfficeAmount });
      let recvCurr = this.item.officeCurrencyAuto || null;
      if (recvCurr == undefined) return;
      let convParam = this.$calcBuyPrice(recvCurr, this.currencies[0]);
      let res = fromInDoller - finalOfficeAmount * convParam;
      console.table({ fromInDoller, finalOfficeAmount, convParam, res });
      return res;
    },
  },
  methods: {
    calcCommisson() {
      let transferringAmount = this.item.transferringAmount || 0;
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