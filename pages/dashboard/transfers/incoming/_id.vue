
<template>
  <div>
    <SideInfoTransfer
      :profit="item.profit"
      :key="refreshKey"
      :officeProfitComp="officeProfitComp"
      :t_type="item.delivering_type"
    >
      <v-row>
        <v-col cols="12" sm="12"> {{ $t("incoming transfer") }} </v-col>
      </v-row>
    </SideInfoTransfer>
    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="8" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="3">
              <Title title="add incoming transfer"></Title>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <AutoComplete
                :readonly="showReadOnly"
                required
                v-model="item.delivering_type"
                :items="transfer_types"
                text="transfer type"
                holder="transfer type"
              />
            </v-col>
            <v-col>
              <DatePicker
                :readonly="showReadOnly"
                v-model="item.issued_at"
                required
                text="transfer date"
                holder="test"
              />
            </v-col>

            <v-col>
              <InputField
                :readonly="showReadOnly"
                v-model="item.number"
                text="refrence number"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-row no-gutters class="flex-column text-h6">
            <v-col
              v-if="$route.params.id"
              class="align-self-strach text-left mb-4"
            >
              <span>
                {{ $t("transfer number") }}
                <span class="show-text"
                  >{{
                    (charMap[item.delivering_type] || "") + (item.id || "")
                  }}#</span
                >
              </span>
            </v-col>

            <v-col class="text-left mb-4">
              {{ $t("refrence number") }}
              <span class="show-text"> #</span>
            </v-col>
            <v-col class="text-left mb-4">
              {{ $t("transfer stats") }}<span class="show-text">مسودة</span>
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
      <Card v-show="expand" class="mb-5 px-3">
        <v-card-title> بيانات مرسل المبلغ </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" sm="6">
              <BeneficiaryAutocomplete
                :readonly="showReadOnly"
                text="beneficiary"
                holder="beneficiary"
                :value="item.sender_party_id"
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
                :readonly="showReadOnly"
                holder="address"
                text="address"
                v-model="item.sender_address"
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <InputField
                :readonly="showReadOnly"
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
              no_fetch
              :readonly="showReadOnly"
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
          <!-- <v-col v-if="!receiver_id_image" cols="12" md="4" sm="6" lg="2">
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
          </v-col> -->
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <InputField
            type="text"
            :readonly="showReadOnly"
              holder="mobile"
              text="mobile"
              v-model="item.receiver_phone"
            />
          </v-col> -->
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
              :value="{ id: item.reciver_party_id }"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <InputField
            type="text"
            :readonly="showReadOnly"
              holder="id_no"
              text="id_no"
              v-model="item.receiver_id_no"
            />
          </v-col> -->
          <v-col cols="12" md="4" sm="6" lg="2">
            <IDsAutoComplete
              no_fetch
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
              :value="{ id: item.reciver_party_id }"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
              <AutoComplete text="country" holder="country" required />
            </v-col> -->
          <v-col cols="12" md="3">
            <InputField
              :readonly="showReadOnly"
              holder="address"
              text="address"
              v-model="item.receiver_address"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
              <AutoComplete text="city" holder="city" required />
            </v-col> -->
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
              <InputField
              type="text"
              :readonly="showReadOnly" holder="address" text="address" />
            </v-col> -->
          <v-col cols="12" md="3">
            <InputField
              :readonly="showReadOnly"
              holder="notes"
              text="notes"
              v-model="item.receiver_notes"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title>بيانات الوسيط المالية</v-card-title>
      <v-card-subtitle style="w">
        <v-checkbox
          v-model="item.on_dollar_account"
          dense
          label="ترصيد علي الدولار"
        >
        </v-checkbox>
      </v-card-subtitle>
      <v-card-text>
        <v-row align="center" class="responseveCols">
          <v-col cols="12" sm="2">
            <BeneficiaryAutocomplete
              no_fetch
              :readonly="showReadOnly"
              holder="الوسيط المرسل"
              text="الوسيط المرسل"
              required
              v-model="item.office_id"
            />
          </v-col>
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <InputField
              type="text"
              :readonly="showReadOnly"
              v-model.number="item.to_send_amount"
              holder="المبلغ المُرسل"
              text="المبلغ المُرسل"
              required
            />
          </v-col>
          <v-col cols="12" sm="2">
            <AutoComplete
              :readonly="showReadOnly"
              v-model="item.office_currency_id"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_office_currency',
                    'exchange_rate_to_office_currency_view',
                    'mid',
                    { id: v },
                    { id: 1 }
                  );
                  item.delivery_currency_id = v;
                }
              "
              :items="currencies"
              item-name="name"
              holder="currency to office"
              text="currency to office"
              required
            />
          </v-col>

          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <InputField
              type="text"
              :readonly="showReadOnly"
              v-model.number="item.exchange_rate_to_office_currency_view"
              @input="
                (new_value) => {
                  showConversionFactor(
                    { id: 1 },
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
          <!-- <v-col cols="12" sm="3" v-show="!is_moneygram">
            <InputField
            type="text"
            :readonly="showReadOnly"
              :value="officeAmount | money"
              dashed
              holder="office amount"
              text="office amount"
            />
          </v-col> -->
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <!--  (يتم خصم المبلغ من المبلغ المرسل)" -->

            <label
              class="form-label"
              style="color: rgba(0, 0, 0); font-size: 16px"
            >
              {{ item.returned_commission_type == 1 ? "%" : "" }}
              عمولة الوسيط
            </label>
            <v-text-field
              type="text"
              placeholder="عمولة الوسيط"
              :readonly="showReadOnly"
              v-model.number="item.returned_commission"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              :append-icon="
                item.returned_commission_type == 0
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  (item.returned_commission_type =
                    item.returned_commission_type == 1 ? 0 : 1)
              "
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <label
              class="form-label"
              style="color: rgba(0, 0, 0); font-size: 16px"
            >
              {{ item.office_commission_type == 1 ? "%" : "" }}
              مرجع
            </label>
            <v-text-field
              type="text"
              :disabled="item.dollar_returned"
              :readonly="showReadOnly"
              v-model.number="item.office_commission"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
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

          <v-col cols="12" sm="3" v-show="!is_moneygram">
            <InputField
              type="text"
              :readonly="showReadOnly"
              :value="totalOfficeAmount"
              dashed
              holder="final amount to office"
              text="final amount to office"
            />
          </v-col>
          <!-- </v-row>
        <v-row dense> -->
          <v-col cols="12" sm="3">
            <InputField
              type="text"
              :readonly="showReadOnly"
              v-model.number="item.office_amount"
              holder="final amount to office in usd"
              text="final amount to office in usd"
              @change="
                refreshKey++;
                $nextTick(() => {
                  refreshKey++;
                });
              "
            />
          </v-col>
          <v-col cols="2">
            <v-checkbox
              @change="item.office_commission_type = 0"
              v-model="item.dollar_returned"
              dense
              label="مرجع دولار"
            >
            </v-checkbox>
          </v-col>
          <v-col
            v-if="item.dollar_returned"
            cols="12"
            sm="2"
            v-show="!is_moneygram"
          >
            <label
              class="form-label"
              style="color: rgba(0, 0, 0); font-size: 16px"
            >
              {{ item.office_commission_type == 1 ? "%" : "" }}
              مرجع
            </label>
            <v-text-field
              :readonly="showReadOnly"
              @input="
                (v) => {
                  item.office_commission =
                    1 * (v / item.exchange_rate_to_office_currency).toFixed(2);
                }
              "
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="mb-5 pa-3">
      <v-card-title>بيانات المبلغ للتسليم </v-card-title>
      <v-card-text>
        <v-row class="justify-center">
          <v-col>
            <AutoComplete
              :readonly="showReadOnly"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_reference_currency',
                    'exchange_rate_to_reference_currency_view',
                    'mid',
                    { id: this.item.office_currency_id },
                    v
                  );
                  item.received_currency_id = v.id;
                  refreshKey++;
                  $nextTick(() => {
                    refreshKey++;
                  });
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
              @change="
                refreshKey++;
                $nextTick(() => {
                  refreshKey++;
                });
              "
              type="text"
              :readonly="showReadOnly"
              @keydown.enter="
                showConversionFactor_ibr(
                  $event,
                  item.office_currency_id,
                  item.received_currency,
                  'exchange_rate_to_reference_currency',
                  'exchange_rate_to_reference_currency_view'
                )
              "
              v-model.number="item.exchange_rate_to_reference_currency_view"
              holder="convert to receiver currency"
              text="convert to receiver currency"
            />
          </v-col>
          <v-col>
            <InputField
              type="text"
              :readonly="showReadOnly"
              dashed
              @change="refreshKey++"
              v-model.number="item.received_amount"
              holder="final amount to give"
              text="final amount to give"
              required
            />
          </v-col>
          <v-col>
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              class="form-label"
              >{{ $t("عمولة الزبون") }}</label
            >
            <v-text-field
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              :append-icon="
                item.is_commission_percentage == 0
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @change="
                refreshKey++;
                $nextTick(() => {
                  refreshKey++;
                });
              "
              @click:append="
                () => {
                  item.is_commission_percentage =
                    item.is_commission_percentage == 0 ? 1 : 0;
                  refreshKey++;
                  $nextTick(() => {
                    refreshKey++;
                  });
                }
              "
              v-model.number="item.transfer_commission"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <InputField
              type="text"
              :readonly="showReadOnly"
              @change="refreshKey++"
              v-model.number="item.final_received_amount"
              holder="final amount to give after commission "
              text="final amount to give after commission"
              required
            />
          </v-col>
          <v-col :key="item.final_received_amount">
            <InputField
              type="text"
              :readonly="showReadOnly"
              :value="a_received_amount_computed | money"
              holder="final amount to give in usd"
              text="final amount to give in usd"
              required
              dashed
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <v-row v-if="!showReadOnly">
      <!-- <v-col cols="12" xs="12">
        <v-checkbox :label="$t('send sms to the sender')"> </v-checkbox>
      </v-col> -->
    </v-row>
    <v-row v-if="!showReadOnly" class="justify-center">
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
              <!-- <v-list-item>
                <v-list-item-title> طباعة ايصال </v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-print</v-icon>
                </v-list-item-icon>
              </v-list-item> -->
              <!-- <v-list-item>
                <v-list-item-title> {{ $t("حفظ كمسودة") }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-save</v-icon>
                </v-list-item-icon>
              </v-list-item> -->
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
  name: "incoming-transfer",
  data() {
    return {
      count: 1,
      refreshKey: 1,

      expand: false,
      expand2: false,
      receiver_id_image: null,
      transfer_photo: null,
      showReadOnly: false,
      rulesss: ruless(this),
      transfer_types: [
        { id: 1, name: "تسليم يد" },
        { id: 4, name: "تسليم يد في الحساب" },
      ],
      charMap: {
        1: "H",
        2: "M",
      },
      totalOfficeAmountFraction: 0,
      rounedRes: 0,
      prices: [],
      item: {
        office_commission: 0,
        on_dollar_account: true,
        receiver_id_no: "",
        receiver_phone: "",
        receiver_address: "",
        reciver_party_id: "",
        delivering_type: 1,
        status: 1,
        commission_side: 2,
        type: 1,
        reference_currency_id: 1,
        receiver_phone: null,
        receiver_address: null,
        receiver_notes: null,
        sender_id_no: null,
        sender_phone: null,
        sender_address: null,
        is_commission_percentage: 0,
        office_commission_type: 0,
        returned_commission_type: 0,
        returned_commission:0,
        transfer_commission:0,
        exchange_rate_to_delivery_currency: 0,
        exchange_rate_to_delivery_currency_view: null,
        exchange_rate_to_reference_currency_view: null,
        exchange_rate_to_reference_currency: null,
        exchange_rate_to_office_currency: null,
        exchange_rate_to_office_currency_view: null,
      },
    };
  },

  computed: {
    calcCommisson() {
      let received_amount = this.item.received_amount || 0;
      let commisson_amount = this.item.transfer_commission || 0;

      let percentage = this.item.is_commission_percentage;
      let amount = 0;
      if (commisson_amount > 0) {
        amount =
          percentage == 1
            ? (received_amount * commisson_amount) / 100
            : commisson_amount;
      }

      return amount;
    },
    is_moneygram() {
      return this.delivering_type == 2;
    },
    recivedAmountInUSDComp() {
      let amount = this.item.to_send_amount || 0;
      let ratio = this.item.exchange_rate_to_delivery_currency || 0;
      let commVal = parseFloat(this.calcCommisson || 0);
      let res = amount * ratio - commVal;
      return res == 0 ? null : res;
    },
    a_received_amount_computed() {
      this.refreshKey;
      console.log("test a_received_amount_computed a_received_amount_computed");
      var operators = {
        "*": (a, b) => {
          return a * b;
        },
        "/": (a, b) => {
          return a / b;
        },
        // ...
      };
      let factor = this.stocks.find(
        (e) => e.currency_id == this.item.received_currency_id
      )?.close_mid;
      this.item.transfer_commission_exchange_rate = factor;
      let op = "/";
      if (this.item.received_currency_id == 4) op = "*";

      let tottal =
        (operators[op](this.item.final_received_amount, factor) * 1).toFixed(
          0
        ) || 0;
      this.item.a_received_amount_exchange_rate =
        this.item.received_currency_id == 4 ? 1 / factor : factor;
      // this.item.received_amount = tottal;
      this.item.a_received_amount = tottal;
      return tottal || 0;
    },
    finalAmountToDeliverComp() {
      this.item.received_amount;
      this.item.returned_commission;
      this.item.office_commission;
      this.totalOfficeAmount;
      this.item.a_received_amount;
      this.item.exchange_rate_to_reference_currency;
      let office_amount = this.item.to_send_amount;
      // this.item.office_amount_in_office_currency = this.item.to_send_amount;

      let exchange_rate = this.item.exchange_rate_to_reference_currency;
      console.log("exchange_rate");
      console.log(exchange_rate);

      let tottal = exchange_rate * this.item.to_send_amount || 0;

      this.item.received_amount = parseFloat(tottal).toFixed(1) || 0;

      this.item.final_received_amount =
        parseFloat(tottal - this.calcCommisson).toFixed(0) || 0;
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
      let commission = this.item.office_commission || 0;
      // /
      //   this.item.exchange_rate_to_office_currency || 0,
      let officeAmount = parseFloat(this.item.to_send_amount || 0);
      let row_returned = this.item.returned_commission;
      let returned =
        this.item.returned_commission_type == 1
          ? (row_returned / 100) * officeAmount
          : row_returned;
      // /
      //   this.item.exchange_rate_to_office_currency || 0;
      commission =
        this.item.office_commission_type == 1
          ? (commission / 100) * officeAmount
          : commission;
      let tempVar = officeAmount - returned + commission;

      this.rounedRes = parseFloat(Number(tempVar).toFixed(0) || null);
      //   console.log("Rounded: ", rounedRes);
      this.totalOfficeAmountFraction = -(this.rounedRes - tempVar);

      var operators = {
        "*": (a, b) => {
          return a * b;
        },
        "/": (a, b) => {
          return a / b;
        },
      };
      const op = this.item.office_currency_id == 4 ? "/" : "*";
      this.item.office_amount = this.item.exchange_rate_to_office_currency
        ? operators[op](
            tempVar,
            this.item.exchange_rate_to_office_currency
          ).toFixed(0)
        : tempVar.toFixed(0);
      this.item.office_amount_in_office_currency = tempVar
        ? this.rounedRes
        : null;
      console.log("{ tempVar, rounedRes: this.rounedRes }");
      console.log({ tempVar, rounedRes: this.rounedRes });
      return tempVar ? this.rounedRes : null;
    },
    officeProfitComp() {
      this.item.exchange_rate_to_reference_currency_view;
      this.refreshKey;
      this.item.returned_commission;
      this.item.office_commission;
      this.totalOfficeAmount;
      this.item.a_received_amount;
      this.item.exchange_rate_to_reference_currency;
      this.finalAmountToDeliverComp;
      return (
        parseFloat(this.item.office_amount) -
        parseFloat(this.item.a_received_amount)
      );
    },
    ...mapState({
      stocks: (state) => state.stock.all,
      one: (state) => state.transfer.one,
      currencies: (state) => state.currency.all,
    }),
  },
  methods: {
    setFinalAmount(amount) {
      this.item.a_received_amount = 0;
      // this.item.exchange_rate_to_reference_currency = parseFloat(
      //   (amount * 1 + this.calcCommisson * 1) / this.item.to_send_amount
      // ).toFixed(16);
      // this.item.exchange_rate_to_reference_currency_view = parseFloat(
      //   (parseFloat(amount) + parseFloat(this.calcCommisson)) /
      //     this.item.to_send_amount
      // ).toFixed(16);
      // this.officeProfitComp;
    },
    confirmProcess() {
      this.item.issued_at = this.$getDateTime();
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
      this.item.receiver_id_no = item.id_no;
      this.receiver_id_image = item.image ? item.image.url : null;
      this.item.receiver_phone = item.phone;
      this.item.receiver_address = item.address;
      this.item.reciver_party_id = item.id;
    },
    setSenderDate(item) {
      this.item.sender_id_no = item.id_no;
      this.item.sender_phone = item.mobile;
      this.item.sender_address = item.address;
    },

    signCurrency(vCalc, vModel, type, fromCurr, toCurr) {
      if (fromCurr == undefined || toCurr == undefined) return;
      if (!fromCurr) return;
      if (!toCurr) return;
      fromCurr = this.currencies.find((x) => x.id == fromCurr.id);
      console.log("FromCurr Modern: ", fromCurr);
      console.log("ToCurr Modern: ", toCurr);

      // fromCurr = {id: fromCurr};
      //   this.item[vCalc] = parseFloat(
      //     type == "buy"
      //       ? this.$newCalcBuyPrice(fromCurr, toCurr)
      //       : this.$newCalcSalePrice(fromCurr, toCurr)
      //   );

      if (type == "buy") {
        this.item[vCalc] = parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr));

        let exchange_rate = this.item[vCalc];
        let reverse_exchange_rate = parseFloat(
          this.$newCalcBuyPrice(toCurr, fromCurr)
        );
        this.item[vModel] = Math.max(exchange_rate, reverse_exchange_rate);
        // let from_stock = this.stocks.find((v) => v.currency_id == fromCurr.id);
        // let to_stock = this.stocks.find((v) => v.currency_id == toCurr.id);
        // if (from_stock.mid < 1 && from_stock.mid < to_stock.mid) {
        //   this.item[vModel] = Math.min(exchange_rate, reverse_exchange_rate);
        // } else {
        //   this.item[vModel] = Math.max(exchange_rate, reverse_exchange_rate);
        // }
      } else if (type == "sale") {
        this.item[vCalc] = parseFloat(this.$newCalcSalePrice(fromCurr, toCurr));

        let exchange_rate = this.item[vCalc];
        let reverse_exchange_rate = parseFloat(
          this.$newCalcSalePrice(toCurr, fromCurr)
        );
        this.item[vModel] = Math.max(exchange_rate, reverse_exchange_rate);
        // let from_stock = this.stocks.find((v) => v.currency_id == fromCurr.id);
        // let to_stock = this.stocks.find((v) => v.currency_id == toCurr.id);
        // if (from_stock.mid < 1) {
        //   this.item[vModel] = Math.min(exchange_rate, reverse_exchange_rate);
        // } else {
        //   this.item[vModel] = Math.max(exchange_rate, reverse_exchange_rate);
        // }
      } else if (type == "mid") {
        this.item[vModel] =
          parseFloat(
            (
              parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) +
              parseFloat(this.$newCalcSalePrice(fromCurr, toCurr))
            ).toFixed(16)
          ) / 2;

        if (fromCurr == undefined || toCurr == undefined) return;
        if (!fromCurr) return;
        if (!toCurr) return;
        if (toCurr.weight * 1 > fromCurr.weight * 1) {
          this.item[vModel] = (1 / this.item[vModel]).toFixed(16);
        }
        this.item[vCalc] =
          parseFloat(
            (
              parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) +
              parseFloat(this.$newCalcSalePrice(fromCurr, toCurr))
            ).toFixed(16)
          ) / 2;

        console.log(
          "View: ",
          parseFloat(this.$newCalcBuyPrice(toCurr, fromCurr))
        );
        console.log("Calc: ", this.item[vCalc]);
        console.log("ToCurr: ", toCurr);
        console.log("FromCurr: ", fromCurr);
      }

      // if (toCurr.id == 1) {
      //   let temp = toCurr;
      //   toCurr = fromCurr;
      //   fromCurr = temp;
      // }

      //   this.item[vModel] = parseFloat(
      //     type == "buy"
      //       ? this.$newCalcBuyPrice(fromCurr, toCurr)
      //       : this.$newCalcSalePrice(fromCurr, toCurr)
      //   );

      // if (type == "buy") {
      //   this.item[vModel] = parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr));
      // } else if (type == "sale") {
      //   this.item[vModel] = parseFloat(
      //     this.$newCalcSalePrice(fromCurr, toCurr)
      //   );
      // } else if (type == "mid") {
      //   this.item[vModel] =
      //     (
      //       parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) +
      //       parseFloat(this.$newCalcSalePrice(fromCurr, toCurr))
      //     ).toFixed(16) / 2;
      // }
    },
    showConversionFactor(to, factorModel, new_value) {
      console.log(to, factorModel, new_value);
      if (!to || !factorModel) return;
      this.item[factorModel] =
        to.id == 1
          ? parseFloat(1 / parseFloat(new_value)).toFixed(16)
          : parseFloat(new_value).toFixed(16);
    },
    showConversionFactor_ibr(
      $event,
      fromCurr_id,
      toCurr,
      calcModel,
      viewModel
    ) {
      let new_value = $event.target.value;
      let old_value = this.item[viewModel];

      let from = this.currencies.find((x) => x.id == fromCurr_id);
      let to = toCurr;
      console.log("From: ", from);
      console.log("To: ", to);
      if (to.weight * 1 > from.weight * 1) {
        // this.item[viewModel] = parseFloat(new_value);
        new_value = (1 / new_value).toFixed(16);
        this.item[calcModel] = parseFloat(new_value).toFixed(16) * 1;
      } else {
        this.item[calcModel] = $event.target.value;
      }
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
    if (!this.currencies[0]) {
      this.$store.dispatch("currency/index");
    }
    if (!this.stocks[0]) {
      this.$store.dispatch("stock/index");
    }
    this.item.sender_party_id = this.app_setting["general_customer"]
      ? parseFloat(this.app_setting["general_customer"]["value"])
      : null;

    if (process.client) {
      if (this.$route.params.id) {
        this.$store.dispatch("transfer/show", this.$route.params.id);
      }
    }
  },
  mounted() {
    if (!this.$route.params.id) {
      this.item.started_at = this.$getDateTime();
    }
    if (this.$route.query.show && this.$route.query.show == "true") {
      this.showReadOnly = true;
    }
  },
  watch: {
    one(val) {
      if (val) {
        this.item = { ...val }; //JSON.parse(JSON.stringify(val));
        this.item.exchange_rate_to_office_currency_view =
          this.one.exchange_rate_to_office_currency;
        this.item.exchange_rate_to_reference_currency_view =
          this.one.exchange_rate_to_reference_currency;
        this.item.received_currency = { id: val.received_currency_id };
      }
    },
    app_setting(val) {
      this.item.sender_party_id = val["general_customer"]
        ? parseFloat(val["general_customer"]["value"])
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