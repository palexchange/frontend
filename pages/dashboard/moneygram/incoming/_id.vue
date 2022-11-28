
<template>
  <div>
    <SideInfoTransfer
      :profit="item.profit"
      :officeProfitComp="officeProfitComp"
    />
    <!-- :t_type="item.delivering_type" -->
    <Card class="d-relative mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="5" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="5">
              <Title
                :title="`${$route.params.id ? '' : 'add '}incoming moneygram`"
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

    <v-btn @click="expand = !expand" icon>
      <v-icon v-if="expand" small> fas fa-eye-slash</v-icon>
      <v-icon v-else small> fas fa-eye</v-icon>
    </v-btn>
    <v-expand-transition>
      <Card class="mb-5 px-3" v-show="expand">
        <v-card-title> بيانات مرسل المبلغ </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <BeneficiaryAutocomplete
                text="beneficiary"
                holder="beneficiary"
                required
                return-object
                :value="item.sender_party_id"
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
    </v-expand-transition>

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
              :value="item.receiver_party_id"
            />
          </v-col>
          <v-col v-if="!receiver_id_image" cols="12" md="4" sm="6" lg="2">
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              :class="
                item.delivering_type == 2 ? 'required form-label' : 'form-label'
              "
              >{{ $t("id image") }}</label
            >
            <v-file-input
              min="0"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              dashed
              :required="true"
              outlined
              v-on="$listeners"
              :rules="rulesss.requiredRules"
              :placeholder="$t('id image')"
              prepend-icon=""
              prepend-inner-icon="fa-solid fa-image"
            />
          </v-col>
          <v-col v-else cols="12" md="4" sm="6" lg="2">
            <img width="70" :src="receiver_id_image" alt="" />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <InputField
              holder="mobile"
              text="mobile"
              required
              v-model="item.receiver_phone"
            />
          </v-col> -->
          <v-col cols="12" md="4" sm="6" lg="2">
            <PhonesAutoComplete
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
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <InputField
              holder="id_no"
              text="id_no"
              required
              v-model="item.receiver_id_no"
            />
          </v-col> -->
          <v-col cols="12" md="4" sm="6" lg="2">
            <IDsAutoComplete
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
          <v-col cols="12" md="2" sm="6" lg="2">
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              :class="
                item.delivering_type == 2 ? 'required form-label' : 'form-label'
              "
              >{{ $t("transfer image") }}</label
            >
            <v-file-input
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

          <!-- <v-col cols="12" md="4" sm="6" lg="2">
              <AutoComplete text="country" holder="country" required />
            </v-col> -->
          <v-col cols="12" md="2" sm="6">
            <InputField
              holder="address"
              text="address"
              v-model="item.receiver_address"
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

    <!-- <Card class="mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-radio-group mandatory v-model="item.commission_side" row>
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
                item.is_commission_percentage
                  ? `${$t('commission')} %`
                  : $t('commission')
              "
              :append-icon="
                item.is_commission_percentage == false
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  (item.is_commission_percentage =
                    !item.is_commission_percentage)
              "
              v-model.number="item.transfer_commission"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </Card> -->
    <Card class="mb-5 pa-3">
      <v-card-title>معلومات الحوالة الموني غرام</v-card-title>
      <v-card-text>
        <v-row class="responseveCols">
          <v-col cols="12" sm="3" v-show="!is_moneygram">
            <InputField
              v-model.number="item.to_send_amount"
              holder="المبلغ المرسل للتسليم"
              text="المبلغ المرسل للتسليم"
              required
            />
          </v-col>

          <!-- <v-col cols="12" sm="3" v-show="!is_moneygram">
            <InputField
              :value="officeAmount | money"
              dashed
              holder="office amount"
              text="office amount"
            />
          </v-col> -->
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <label class="required form-label">
              {{ item.office_commission_type == 1 ? "%" : "" }}
              عمولة إضافة
            </label>
            <v-text-field
              v-model.number="item.office_commission"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              required
              :append-icon="
                item.office_commission_type == 0
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  (item.office_commission_type =
                    item.office_commission_type == 1 ? 0 : 1)
              "
            >
            </v-text-field>
          </v-col>

          <!-- </v-row>
        <v-row dense> -->
          <v-col cols="12" sm="3">
            <InputField
              :value="item.office_amount | money"
              dashed
              holder="final amount to moneygram"
              text="final amount to moneygram"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title>بيانات الحوالة المالية </v-card-title>
      <v-card-text>
        <!-- <v-row class="justify-center responseveCols">
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
              text="العملة الإستلام"
              holder="العملة الإستلام"
              required
            />
          </v-col>
          <v-col>
            <InputField
              v-model.number="item.exchange_rate_to_delivery_currency_view"
              @input="
                (new_value) => {
                  showConversionFactor(
                    currencies.find((e) => e.id == 1),
                    'exchange_rate_to_office_currency',
                    new_value
                  );
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
        </v-row> -->

        <v-row class="justify-center">
          <v-col>
            <AutoComplete
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_reference_currency',
                    'exchange_rate_to_reference_currency',
                    'buy',
                    { id: this.item.office_currency_id },
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
          <v-col>
            <InputField
              :value="item.a_received_amount | money"
              dashed
              holder="final amount to give in usd"
              text="final amount to give in usd"
              required
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
  name: "moneygram-incoming",
  data() {
    return {
      receiver_id_image: null,
      transfer_photo: null,
      expand: null,
      showReadOnly: false,
      rulesss: ruless(this),

      transfer_types: [
        { id: 1, name: "تسليم يد" },
        { id: 2, name: "موني غرام" },
      ],
      charMap: {
        1: "H",
        2: "M",
      },
      totalOfficeAmountFraction: 0,
      rounedRes: 0,
      prices: [],
      item: {
        receiver_party_id: "",
        office_currency_id: 1,
        delivery_currency_id: 1,
        sender_party_id: 1,
        office_id: 2,
        status: 1,
        commission_side: 2,
        type: 1,
        delivering_type: 2,
        reference_currency_id: 1,
        receiver_phone: null,
        receiver_address: null,
        receiver_notes: null,
        sender_id_no: null,
        sender_phone: null,
        sender_address: null,
        is_commission_percentage: false,
        office_commission_type: 0,
        exchange_rate_to_delivery_currency: 1,
        exchange_rate_to_delivery_currency_view: 1,
        exchange_rate_to_reference_currency: null,
        exchange_rate_to_office_currency: 1,
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
    totals() {
      let total = {
        office_amount: 0,
        b: this.item.b,
      };
    },
    is_moneygram() {
      return this.delivering_type == 2;
    },
    recivedAmountInUSDComp() {
      let amount = this.item.to_send_amount || 0;
      let ratio = this.item.exchange_rate_to_delivery_currency || 0;
      let commVal = parseFloat(this.calcCommisson() || 0);
      let res = amount * ratio - commVal;
      return res == 0 ? null : res;
    },
    finalAmountToDeliverComp() {
      // let recvAmountInUSD = parseFloat(this.recivedAmountInUSDComp || 0);
      // let ratio = this.item.exchange_rate_to_reference_currency || null;
      // if (ratio == null) return;
      // let amountToDelv = recvAmountInUSD * ratio;
      // this.item.received_amount = amountToDelv;
      let office_amount = this.item.to_send_amount;
      this.item.final_received_amount = office_amount;
      this.item.office_amount = office_amount;

      let exchange_rate = this.item.exchange_rate_to_reference_currency;
      // console.log(exchange_rate);
      // let factor = exchange_rate < 1 ? exchange_rate : 1 / exchange_rate;
      let tottal = parseFloat(office_amount * exchange_rate);

      this.item.a_received_amount =
        tottal *
        this.$newCalcSalePrice(
          { id: this.item.received_currency_id },
          { id: 1 }
        );
      this.item.received_amount = tottal;
      return tottal;
    },
    officeAmount() {
      let conversionParam = this.item.exchange_rate_to_office_currency || 1,
        totalRecvAmount = parseFloat(this.item.to_send_amount || 0);
      if (this.item.delivering_type == 2) {
        return this.recivedAmountInUSDComp;
      }

      let officeAmount = totalRecvAmount * conversionParam;
      return officeAmount <= 0 ? null : officeAmount;
    },
    totalOfficeAmount() {
      let commission = this.item.office_commission || 0,
        officeAmount = parseFloat(this.item.to_send_amount || 0);
      let returned = this.item.returned_commision || 0;
      commission =
        this.item.office_commission_type == 1
          ? (commission / 100) * officeAmount
          : commission;
      let tempVar = officeAmount - returned + commission;

      this.rounedRes = parseFloat(Number(tempVar).toFixed(0) || null);
      //   console.log("Rounded: ", rounedRes);
      this.totalOfficeAmountFraction = -(this.rounedRes - tempVar);

      this.item.office_amount = tempVar;
      return tempVar ? this.rounedRes : null;
    },
    officeProfitComp() {
      // let fromInDoller = parseFloat(this.recivedAmountInUSDComp) || 0;
      // let finalOfficeAmount = parseFloat(this.totalOfficeAmount) || 0;

      // let recvCurr = this.item.office_currency || null;
      // if (recvCurr == undefined) return;
      // let convParam = this.$newCalcSalePrice(recvCurr, this.currencies[0]);
      // let res = fromInDoller - finalOfficeAmount * convParam;
      // console.table({ fromInDoller, finalOfficeAmount, convParam, res });
      this.item.returned_commision;
      this.finalAmountToDeliverComp;
      this.item.office_commission;
      // let office_amount_usd =
      //   this.finalAmountToDeliverComp *
      //   this.$newCalcBuyPrice(
      //     { id: this.item.received_currency_id },
      //     { id: 1 }
      //   );
      // let s = this.item.a_received_amount;
      // let total = office_amount_usd - s;

      // return (
      //   total -
      //   (this.item.returned_commision || 0) +
      //   (this.item.office_commission || 0)
      // );

      return (
        parseFloat(this.item.office_amount) -
        parseFloat(this.item.a_received_amount)
      );
    },
    ...mapState({
      currencies: (state) => state.currency.all,
    }),
  },
  methods: {
    confirmProcess() {
      this.$save(this.item, "transfer", null, "/dashboard/transfers").then(
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
      // console.log(this.item);
    },
    setReceiverDate(item) {
      if (!item) return;
      console.log(item);
      this.item.receiver_party_id = item.id_no;
      this.receiver_id_image = item.image ? item.image.url : null;
      this.item.receiver_phone = item.phone;
      this.item.receiver_address = item.address;
    },
    setSenderDate(item) {
      this.item.sender_id_no = item.id_no;
      this.item.sender_phone = item.mobile;
      this.item.sender_address = item.address;
    },
    calcCommisson() {
      let to_send_amount = this.item.to_send_amount || 0;
      let commisson_amount = this.item.transfer_commission || 0;
      let percentage = this.item.is_commission_percentage;
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

      //   this.item[vCalc] = parseFloat(
      //     type == "buy"
      //       ? this.$newCalcBuyPrice(fromCurr, toCurr)
      //       : this.$newCalcSalePrice(fromCurr, toCurr)
      //   );

      if (type == "buy") {
        this.item[vCalc] = parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr));
      } else if (type == "sale") {
        this.item[vCalc] = parseFloat(this.$newCalcSalePrice(fromCurr, toCurr));
      } else if (type == "mid") {
        this.item[vCalc] =
          (
            parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) +
            parseFloat(this.$newCalcSalePrice(fromCurr, toCurr))
          ).toFixed(7) / 2;
      }

      if (toCurr.id == 1) {
        let temp = toCurr;
        toCurr = fromCurr;
        fromCurr = temp;
      }

      //   this.item[vModel] = parseFloat(
      //     type == "buy"
      //       ? this.$newCalcBuyPrice(fromCurr, toCurr)
      //       : this.$newCalcSalePrice(fromCurr, toCurr)
      //   );

      if (type == "buy") {
        this.item[vModel] = parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr));
      } else if (type == "sale") {
        this.item[vModel] = parseFloat(
          this.$newCalcSalePrice(fromCurr, toCurr)
        );
      } else if (type == "mid") {
        this.item[vModel] =
          (
            parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) +
            parseFloat(this.$newCalcSalePrice(fromCurr, toCurr))
          ).toFixed(7) / 2;
      }
    },
    showConversionFactor(to, factorModel, new_value) {
      console.log(to, factorModel, new_value);
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
        return value.toLocaleString(undefined, { minimumFractionDigits: 3 });
      }
    },
  },
  created() {
    this.$store.dispatch("currency/index");
    this.$store.dispatch("stock/index");
    this.item.sender_party_id = this.app_setting["general_customer"]
      ? parseFloat(this.app_setting["general_customer"]["value"])
      : null;
    this.item.office_id = this.app_setting["moneygram_account"]
      ? parseFloat(this.app_setting["moneygram_account"]["value"])
      : null;
  },
  mounted() {
    if (this.$route.query.show && this.$route.query.show == "true") {
      this.showReadOnly = true;
    }
  },
  watch: {
    app_setting(val) {
      this.item.sender_party_id = val["general_customer"]
        ? parseFloat(val["general_customer"]["value"])
        : null;
      this.item.office_id = val["moneygram_account"]
        ? parseFloat(val["moneygram_account"]["value"])
        : null;
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
</style>