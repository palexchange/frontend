
<template>
  <div>
    <SideInfoTransfer
      :profit="item.profit"
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
              {{ $t("transfer stats") }}<span class="show-text">??????????</span>
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
        <v-card-title> ???????????? ???????? ???????????? </v-card-title>
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
      <v-card-title>???????????? ?????????????? </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="6" lg="2">
            <BeneficiaryAutocomplete
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
              :value="{ id: item.reciver_party_id }"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
            <InputField
            :readonly="showReadOnly"
              holder="id_no"
              text="id_no"
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
              :value="{ id: item.reciver_party_id }"
            />
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6" lg="2">
              <AutoComplete text="country" holder="country" required />
            </v-col> -->
          <v-col cols="12" md="2" sm="6">
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
              :readonly="showReadOnly" holder="address" text="address" />
            </v-col> -->
        </v-row>
      </v-card-text>
    </Card>
    <!-- <v-btn @click="expand2 = !expand2" icon>
      <v-icon v-if="expand2" small> fas fa-eye-slash</v-icon>
      <v-icon v-else small> fas fa-eye</v-icon>
    </v-btn>
    <v-expand-transition>
      <Card v-show="expand2" class="mb-5">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" sm="12">
              <v-radio-group mandatory v-model="item.commission_side" row>
                <v-radio :value="2" label="?????????????? ?????? ??????????????"></v-radio>
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
      </Card>
    </v-expand-transition> -->
    <Card class="mb-5 pa-3">
      <v-card-title>???????????? ???????????? ??????????????</v-card-title>
      <v-card-text>
        <v-row class="responseveCols">
          <v-col cols="12" sm="2">
            <BeneficiaryAutocomplete
              :readonly="showReadOnly"
              holder="???????????? ????????????"
              text="???????????? ????????????"
              required
              v-model="item.office_id"
            />
          </v-col>
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.to_send_amount"
              holder="???????????? ??????????????"
              text="???????????? ??????????????"
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
                  item.office_currency_id = v;
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
            :readonly="showReadOnly"
              :value="officeAmount | money"
              dashed
              holder="office amount"
              text="office amount"
            />
          </v-col> -->
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <!--  (?????? ?????? ???????????? ???? ???????????? ????????????)" -->
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.returned_commision"
              holder="?????????? ????????????"
              text="?????????? ????????????"
            />
          </v-col>
          <v-col cols="12" sm="2" v-show="!is_moneygram">
            <label
              class="form-label"
              style="color: rgba(0, 0, 0); font-size: 16px"
            >
              {{ item.office_commision_type == 1 ? "%" : "" }}
              ????????
            </label>
            <v-text-field
              :readonly="showReadOnly"
              v-model.number="item.office_commision"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
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

          <v-col cols="12" sm="3" v-show="!is_moneygram">
            <InputField
              :readonly="showReadOnly"
              :value="totalOfficeAmount | money"
              dashed
              holder="final amount to office"
              text="final amount to office"
            />
          </v-col>
          <!-- </v-row>
        <v-row dense> -->
          <v-col cols="12" sm="3">
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
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title>???????????? ???????????? ?????????????? </v-card-title>
      <v-card-text>
        <!-- <v-row class="justify-center responseveCols">
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
              text="???????????? ????????????????"
              holder="???????????? ????????????????"
              required
            />
          </v-col>
          <v-col>
            <InputField
            :readonly="showReadOnly"
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
            :readonly="showReadOnly"
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
              :readonly="showReadOnly"
              v-model="item.received_currency_id"
              @change="
                (v) => {
                  computed_exchange_rate_to_reference_currency =
                    getMidCurrencyToCurrency(
                      { id: item.office_currency_id },
                      v
                    ).toFixed(5) * 1;
                  item.received_currency_id = v.id;
                }
              "
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
              v-model.number="computed_exchange_rate_to_reference_currency"
              holder="convert to receiver currency"
              text="convert to receiver currency"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              dashed
              v-model.number="item.received_amount_no_commision"
              holder="final amount to give"
              text="final amount to give"
              required
            />
          </v-col>
          <v-col>
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              class="form-label"
              >{{ $t("?????????? ????????????") }}</label
            >
            <v-text-field
              :readonly="showReadOnly"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
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
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.received_amount"
              holder="final amount to give after commission "
              text="final amount to give after commission"
              @change="(v) => setFinalAmount(v)"
              required
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="item.a_received_amount | money"
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
      <v-col cols="12" xs="12">
        <v-checkbox :label="$t('send sms to the sender')"> </v-checkbox>
      </v-col>
    </v-row>
    <v-row v-if="!showReadOnly" class="justify-center">
      <v-card color="transparent" flat>
        <v-card-actions>
          <v-btn @click="confirmProcess" class="px-16" color="primary"
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
              <v-list-item>
                <v-list-item-title> {{ $t("?????? ????????????") }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon small>fas fa-save</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item>
                <v-list-item-title> ?????????? ?????? ????????????</v-list-item-title>
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
  name: "incoming-transfer",
  data() {
    return {
      from_office_curr: {},
      to_reference_currency: {},
      expand: false,
      expand2: false,
      receiver_id_image: null,
      transfer_photo: null,
      showReadOnly: false,
      rulesss: ruless(this),
      transfer_types: [{ id: 1, name: "?????????? ????" }],
      charMap: {
        1: "H",
        2: "M",
      },
      totalOfficeAmountFraction: 0,
      rounedRes: 0,
      prices: [],
      item: {
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
        is_commission_percentage: true,
        office_commision_type: 0,
        exchange_rate_to_delivery_currency: 0,
        exchange_rate_to_delivery_currency_view: null,
        exchange_rate_to_reference_currency_view: null,
        exchange_rate_to_reference_currency: null,
        exchange_rate_to_office_currency: null,
        exchange_rate_to_office_currency_view: null,
        received_amount_no_commision: 0,
        received_amount: 0,
        a_received_amount: 0,
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
    computed_exchange_rate_to_reference_currency: {
      set: function (val) {
        if (val > 0) {
          if (
            this.from_office_curr.weight > this.to_reference_currency.weight
          ) {
            this.item.exchange_rate_to_reference_currency = (1 / val).toFixed(
              5
            ); //0.7 , 1.42
          } else {
            this.item.exchange_rate_to_reference_currency = val;
          }
        }
      },
      get: function () {
        if (this.from_office_curr.weight > this.to_reference_currency.weight) {
          return (
            (1 / this.item.exchange_rate_to_reference_currency).toFixed(5) || 1
          ); // 0.7
        } else {
          return this.item.exchange_rate_to_reference_currency || 1;
        }
      },
    },
    calcCommisson() {
      let received_amount = this.item.received_amount_no_commision || 0;
      let commisson_amount = this.item.transfer_commission || 0;

      let percentage = this.item.is_commission_percentage;
      let amount = 0;
      if (commisson_amount > 0) {
        amount = percentage
          ? (received_amount * commisson_amount) / 100
          : commisson_amount;
      }

      return amount || 0;
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
    finalAmountToDeliverComp() {
      // let recvAmountInUSD = parseFloat(this.recivedAmountInUSDComp || 0);
      // let ratio = this.item.exchange_rate_to_reference_currency || null;
      // if (ratio == null) return;
      // let amountToDelv = recvAmountInUSD * ratio;
      // this.item.received_amount = amountToDelv;
      // console.log("aaahahahaaaa hhhaaa hhaaa hhhaaahhhaa hhhaaa hhhaaa");
      this.item.received_amount;
      this.item.returned_commision;
      this.item.office_commision;
      this.totalOfficeAmount;
      this.item.a_received_amount;
      this.item.exchange_rate_to_reference_currency;
      let office_amount = this.item.to_send_amount;
      // this.item.office_amount_in_office_currency = this.item.to_send_amount;
      this.item.final_received_amount = office_amount;

      let exchange_rate = this.item.exchange_rate_to_reference_currency;
      // console.log(exchange_rate);
      // let factor = exchange_rate < 1 ? exchange_rate : 1 / exchange_rate;
      // let tottal =
      //   this.item.office_currency_id == 1
      //     ? parseFloat(office_amount * exchange_rate)
      //     : parseFloat(office_amount / exchange_rate);

      // let factor = this.$newCalcSalePrice(
      //   { id: this.item.received_currency_id },
      //   { id: 1 },
      //   11
      // );

      let sale = this.$newCalcSalePrice(
        { id: this.item.received_currency_id },
        { id: 1 },
        12
      );
      let buy = this.$newCalcBuyPrice(
        { id: this.item.received_currency_id },
        { id: 1 },
        12
      );
      let factor = (buy * 1 + sale * 1) / 2;
      let tottal = exchange_rate * this.item.to_send_amount || 0;

      this.item.received_amount_no_commision =
        parseFloat(tottal).toFixed(4) || 0;
      this.item.received_amount =
        parseFloat(tottal - this.calcCommisson).toFixed() || 0;
      this.item.a_received_amount =
        (parseFloat(tottal - this.calcCommisson) * (factor || 0) * 1).toFixed(
          1
        ) || 0;

      // this.item.received_amount = tottal;
      return tottal || 0;
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
      let commission = this.item.office_commision || 0;
      // /
      //   this.item.exchange_rate_to_office_currency || 0,
      let officeAmount = parseFloat(this.item.to_send_amount || 0);
      let returned = this.item.returned_commision || 0;
      // /
      //   this.item.exchange_rate_to_office_currency || 0;
      commission =
        this.item.office_commision_type == 1
          ? (commission / 100) * officeAmount
          : commission;
      let tempVar = officeAmount - returned + commission;

      this.rounedRes = parseFloat(Number(tempVar).toFixed(0) || null);
      //   console.log("Rounded: ", rounedRes);
      this.totalOfficeAmountFraction = -(this.rounedRes - tempVar);

      this.item.office_amount = this.item.exchange_rate_to_office_currency
        ? (tempVar * this.item.exchange_rate_to_office_currency).toFixed(1)
        : tempVar.toFixed(1);
      this.item.office_amount_in_office_currency = tempVar
        ? this.rounedRes
        : null;
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
      this.item.office_commision;
      this.totalOfficeAmount;
      this.item.a_received_amount;
      this.item.exchange_rate_to_reference_currency;
      this.finalAmountToDeliverComp;

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
      //   (this.item.office_commision || 0)
      // );
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
    getMidCurrencyToCurrency(from, to) {
      if (from == undefined || to == undefined) return null;
      const from_curr = this.currencies.find((el) => el.id == from.id);
      this.from_office_curr = from_curr;
      this.to_reference_currency = to;

      let buy = 1;
      let sale = 1;
      if (from_curr.weight < to.weight) {
        sale = this.$newCalcSalePrice(from, to);
        buy = this.$newCalcBuyPrice(from, to);
      } else {
        sale = this.$newCalcSalePrice(to, from);
        buy = this.$newCalcBuyPrice(to, from);
      }
      const mid = (sale * 1 + buy * 1) / 2;
      return mid.toFixed(5) * 1;
    },
    setFinalAmount(amount) {
      this.item.exchange_rate_to_reference_currency = parseFloat(
        (parseFloat(amount) + parseFloat(this.calcCommisson)) /
          this.item.to_send_amount
      ).toFixed(7);
      this.item.exchange_rate_to_reference_currency_view = parseFloat(
        (parseFloat(amount) + parseFloat(this.calcCommisson)) /
          this.item.to_send_amount
      ).toFixed(7);
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
      // console.log(item);
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
      if (fromCurr == null || toCurr == null) return;

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
          (
            parseFloat(this.$newCalcBuyPrice(toCurr, fromCurr)) * 1 +
            parseFloat(this.$newCalcSalePrice(toCurr, fromCurr)) * 1
          ).toFixed(7) / 2;
        this.item[vCalc] =
          (
            parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) * 1 +
            parseFloat(this.$newCalcSalePrice(fromCurr, toCurr)) * 1
          ).toFixed(7) / 2;
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
      //     ).toFixed(7) / 2;
      // }
    },
    showConversionFactor(to, factorModel, new_value) {
      // console.log(to, factorModel, new_value);
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

    if (process.client) {
      if (this.$route.params.id) {
        this.$store.dispatch("transfer/show", this.$route.params.id);
      }
    }
  },
  mounted() {
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