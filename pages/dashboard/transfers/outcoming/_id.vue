<template>
  <div>
    <SideInfoTransfer
      :profit="item.profit"
      :officeProfitComp="officeProfitComp"
      :t_type="item.delivering_type"
    >
      <v-row>
        <v-col cols="12" sm="12"> {{ $t("outcoming transfer") }} </v-col>
      </v-row>
    </SideInfoTransfer>

    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="5">
              <Title
                :title="`${$route.params.id ? '' : 'add '}outcoming transfer`"
              ></Title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="5">
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
        <v-col cols="12" md="6" sm="12">
          <v-row no-gutters class="flex-column text-h6">
            <v-col cols="12" class="align-self-strach text-left mb-4">
              <span v-if="!showReadOnly">
                {{ $t("todays profit") }}<span class="show-text">000</span>
              </span>
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
      <v-card-title> ???????????? ???????????? </v-card-title>
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
                  setSenderDate(v);
                  item.sender_party_id = v.id;
                }
              "
            />
          </v-col>
          <!-- <v-col cols="12" lg="2" md="4" sm="6">
            <InputField
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
                  setSenderDate(v);
                  item.sender_party_id = v.id;
                }
              "
              return-object
              :value="{ id: item.sender_party_id }"
            />
          </v-col>
          <!-- <v-col cols="12" lg="2" md="4" sm="6">
            <InputField
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
                  setSenderDate(v);
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
          <v-col cols="12" lg="2" md="4" sm="6">
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
    <Card class="mb-5 px-3">
      <v-card-title>???????????? ?????????????? </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" lg="3" sm="6">
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
          <!-- <v-col class="lg-one-and-half" cols="12" md="4" lg="2" sm="6">
            <InputField
              :readonly="showReadOnly"
              holder="id number"
              text="id number"
              v-model="item.receiver_id_no"
            />
          </v-col> -->
          <v-col class="lg-one-and-half" cols="12" md="4" lg="2" sm="6">
            <IDsAutoComplete
              :readonly="showReadOnly"
              append-icon=""
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
          <!-- <v-col class="lg-one-and-half" cols="12" md="4" lg="2" sm="6">
            <InputField
              :readonly="showReadOnly"
              holder="mobile"
              text="mobile"
              v-model="item.receiver_phone"
            />
          </v-col> -->
          <v-col class="lg-one-and-half" cols="12" md="4" lg="2" sm="6">
            <PhonesAutoComplete
              :readonly="showReadOnly"
              append-icon=""
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
          <v-col>
            <CountryAutocomplete
              v-model="item.receiver_country_id"
              text="country"
              holder="country"
              :readonly="showReadOnly"
            />
          </v-col>
          <v-col>
            <CityAutocomplete
              :readonly="showReadOnly"
              v-model="item.receiver_city_id"
              text="city"
              holder="city"
            />
          </v-col>
          <v-col class="lg16" cols="12" md="3" sm="6">
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
              <v-radio :value="2" label="?????????????? ?????? ??????????????"></v-radio>
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
      <v-card-title>???????????? ?????????????? ?????????????? </v-card-title>
      <v-card-text>
        <v-row dense class="justify-center responseveCols">
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
              :readonly="showReadOnly"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_delivery_currency',
                    'exchange_rate_to_delivery_currency_view',
                    'mid',
                    v,
                    currencies[0]
                  );
                  item.delivery_currency_id = v.id;
                }
              "
              v-model="item.delivery_currency_id"
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
              :readonly="showReadOnly"
              v-model.number="computed_exchange_rate_to_delivery_currency"
              @input="
                (new_value) => {
                  showConversionFactor(
                    currencies.find((e) => e.id == 1),
                    'exchange_rate_to_delivery_currency',
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
              :value="amountInUSDComp | money"
              dashed
              holder="???????? ?????????? ????????????????"
              text="???????? ?????????? ????????????????"
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
        <v-row dense>
          <v-col class="text-center">
            <img src="~/assets/img/icons/to.png" alt="" />
          </v-col>
        </v-row>
        <v-row dense class="justify-center responseveCols">
          <v-col>
            <AutoComplete
              :readonly="showReadOnly"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_reference_currency',
                    'exchange_rate_to_reference_currency',
                    'mid',
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
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title>????????????</v-card-title>
      <v-card-text>
        <v-row dense class="justify-center responseveCols">
          <v-col cols="3">
            <BeneficiaryAutocomplete
              :readonly="showReadOnly"
              no_fetch
              holder="???????????? ????????????"
              text="???????????? ????????????"
              v-model="item.office_id"
              required
            />
          </v-col>

          <v-col>
            <AutoComplete
              :readonly="showReadOnly"
              v-model="item.office_currency_id"
              @change="
                (v) => {
                  signCurrency(
                    'exchange_rate_to_office_currency',
                    'exchange_rate_to_office_currency_view',
                    'mid',
                    item.received_currency,
                    v
                  );
                  item.office_currency_id = v.id;
                  item.office_currency = v;
                  computed_office_exchange_rate_to_usd =
                    (1 / getMidCurrencyTousd(v)).toFixed(5) * 1;
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
          <v-col>
            <InputField
              :readonly="showReadOnly"
              :value="officeAmount | money"
              dashed
              holder="office amount"
              text="office amount"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              class="required form-label"
              >{{ item.office_commission_type == 1 ? "%" : "" }}
              ?????????? ????????????
            </label>
            <v-text-field
              :readonly="showReadOnly"
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
                  showReadOnly
                    ? ''
                    : (item.office_commission_type =
                        item.office_commission_type == 1 ? 0 : 1)
              "
            >
            </v-text-field>
          </v-col>
          <v-col>
            <label
              style="color: rgba(0, 0, 0); font-size: 16px"
              class="required form-label"
              >{{ item.returned_commission_type == 1 ? "%" : "" }}
              ????????????
            </label>
            <v-text-field
              :readonly="showReadOnly"
              v-model.number="item.returned_commission"
              color="#FF7171"
              style="border-radius: 0px !important"
              dense
              outlined
              slot="append"
              hide-details
              required
              :append-icon="
                item.returned_commission_type == 0
                  ? 'fas fa-sort-numeric-up-alt'
                  : 'fas fa-percentage'
              "
              @click:append="
                () =>
                  showReadOnly
                    ? ''
                    : (item.returned_commission_type =
                        item.returned_commission_type == 1 ? 0 : 1)
              "
            >
            </v-text-field>
          </v-col>
          <!-- <v-col cols="3">
            <InputField
              :readonly="showReadOnly"
              v-model.number="item.returned_commission"
              holder="returned"
              text="returned"
            />
          </v-col> -->
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model="item.office_amount_in_office_currency"
              @change="
                (v) =>
                  (computed_exchange_rate_to_office_currency = parseFloat(
                    v / officeAmount
                  ))
              "
              holder="final amount to office"
              text="final amount to office"
            />
          </v-col>
          <v-col>
            <InputField
              :readonly="showReadOnly"
              v-model="computed_office_exchange_rate_to_usd"
              holder="exchange rate to usd"
              text="exchange rate to usd"
            />
          </v-col>
          <v-col>
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
            @click="$router.push('/dashboard/transfers')"
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
  name: "transfer-form",
  data() {
    return {
      showReadOnly: false,
      prices: [],
      transfer_types: [
        { id: 1, name: "?????????? ???? ??????????" },
        { id: 3, name: "?????????? ???? ?????? ????????????" },
      ],
      item: {
        sender_party_id: "",
        sender_id_no: "",
        sender_phone: "",
        sender_address: "",
        receiver_id_no: "",
        receiver_phone: "",
        receiver_address: "",
        receiver_party_id: "",
        commission_side: 1,
        type: 0,
        delivering_type: 1,
        reference_currency_id: 1,
        reciver_phone: null,
        reciver_address: null,
        receiver_notes: null,
        sender_id_no: null,
        sender_phone: null,
        sender_address: null,
        is_commission_percentage: false,
        office_commission_type: 0,
        returned_commission_type: 0,
        office_exchange_rate_to_usd: 0,
        exchange_rate_to_delivery_currency: null,
        exchange_rate_to_delivery_currency_view: null,
        exchange_rate_to_reference_currency: null,
        exchange_rate_to_office_currency: null,
        exchange_rate_to_office_currency_view: null,
      },
      usdCurr: null,
    };
  },
  computed: {
    computed_office_exchange_rate_to_usd: {
      set: function (val) {
        if (val > 0) {
          this.item.office_exchange_rate_to_usd = 1 / val; //0.7 , 1.42
        }
      },
      get: function () {
        return 1 / (this.item.office_exchange_rate_to_usd || 1); // 0.7
      },
    },
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
      return total > 0 ? total.toFixed() : null;
    },
    amountInUSDComp() {
      if (
        this.item.to_send_amount == undefined ||
        this.item.exchange_rate_to_delivery_currency == undefined
      )
        return;
      return (
        this.item.to_send_amount * this.item.exchange_rate_to_delivery_currency
      ).toFixed();
    },
    totalAmountInUSDComp() {
      let convert_param = this.item.exchange_rate_to_delivery_currency || 1;
      let total = parseFloat(this.amountInUSDComp || 0);
      let commVal =
        this.item.commission_side == 1
          ? parseFloat(
              (this.calcCommisson(
                this.computed_exchange_rate_to_delivery_currency
              ) || 0) * convert_param
            )
          : 0;
      let otherExp = (this.item.other_amounts_on_sender || 0) * convert_param;
      let final = commVal + total + otherExp;
      this.item.final_received_amount = final;
      return final > 0 ? final.toFixed() : null;
    },
    recivedAmountComp() {
      let conversionParam = this.item.exchange_rate_to_reference_currency || 0,
        amountInUSD = parseFloat(this.amountInUSDComp || 0);
      let res = (conversionParam * amountInUSD * 1).toFixed();
      this.item.received_amount = res;
      return res <= 0 ? null : res;
    },
    totalRecvAmountComp() {
      let amountInUSD = parseFloat(this.amountInUSDComp || 0),
        conversionParam = this.item.exchange_rate_to_reference_currency || 0;
      let commission =
        this.item.commission_side == 1 ? 0 : this.calcCommisson() || 0;
      let otherExp = this.item.other_amounts_on_receiver || 0;
      let res = (
        (amountInUSD - commission - otherExp) *
        conversionParam
      ).toFixed();
      // let factor = this.$newCalcSalePrice(
      //   { id: this.item.received_currency_id },
      //   { id: 1 }
      // );
      // let sub_factor = this.$newCalcBuyPrice(
      //   { id: this.item.received_currency_id },
      //   { id: 1 }
      // );
      // const mid = (factor * 1 + sub_factor * 1) / 2;
      // console.table({
      //   mid,
      //   factor,
      //   sub_factor,
      // });

      let convParam =
        1 /
        (this.item.exchange_rate_to_reference_currency /
          this.item.exchange_rate_to_office_currency);
      const a_amount = (res * convParam || 0).toFixed();

      // const a_amount = (res * mid).toFixed();
      // console.table({
      //   res,
      //   a_amount,
      //   exchange_rate: this.item.exchange_rate_to_reference_currency,
      // });
      this.item.a_received_amount = a_amount;

      return res <= 0 ? null : res;
    },
    officeAmount() {
      let conversionParam = this.item.exchange_rate_to_office_currency || 1,
        totalRecvAmount = parseFloat(this.totalRecvAmountComp || 0);
      let officeAmount = totalRecvAmount * conversionParam;
      return officeAmount <= 0 ? null : officeAmount;
    },
    totalOfficeAmount() {
      // * exchange_rate
      let commission = this.item.office_commission || 0;
      let officeAmount = parseFloat(this.officeAmount || 0);
      const returned_amount =
        this.item.returned_commission_type == 1
          ? (this.item.returned_commission / 100) * officeAmount
          : this.item.returned_commission;

      // * exchange_rate
      let returned = returned_amount || 0;
      commission =
        this.item.office_commission_type == 1
          ? (commission / 100) * officeAmount
          : commission;
      let tempVar = officeAmount + commission - returned;
      //  $newCalcBuyPrice(item.office_currency,{id:1}) ;
      const sale = this.$newCalcSalePrice(
        { id: this.item.office_currency_id },
        { id: 1 }
      );
      const buy = this.$newCalcBuyPrice(
        { id: this.item.office_currency_id },
        { id: 1 }
      );

      const mid = (sale * 1 + buy * 1) / 2;
      this.item.office_amount = this.item.office_currency_id
        ? parseFloat(
            tempVar * (this.item.office_exchange_rate_to_usd || mid)
          ).toFixed()
        : parseFloat(tempVar).toFixed();
      this.item.office_amount_in_office_currency =
        parseFloat(tempVar).toFixed();
      return tempVar <= 0 ? null : parseFloat(tempVar).toFixed();
    },
    officeProfitComp() {
      let fromInDoller = parseFloat(this.totalAmountInUSDComp) || 0;
      let finalOfficeAmount = (this.totalOfficeAmount * 1).toFixed() * 1 || 0;
      finalOfficeAmount = (this.item.office_amount * 1).toFixed() * 1 || 0;

      let finalOfficeAmount2 = this.item.a_received_amount * 1;

      let recvCurr = this.item.office_currency || null;
      if (recvCurr == undefined) return;

      return fromInDoller - finalOfficeAmount;
      // let fromInDoller = parseFloat(this.totalAmountInUSDComp) || 0;
      // let finalOfficeAmount = parseFloat(this.totalOfficeAmount) || 0;
      // let recvCurr = this.item.office_currency || null;
      // if (recvCurr == undefined) return;
      // let convParam =
      //   1 /
      //   (this.item.exchange_rate_to_reference_currency /
      //     this.item.exchange_rate_to_office_currency);
      // let res = fromInDoller - (finalOfficeAmount * convParam).toFixed();
      // console.table({ res, convParam });
      // let otherExp = this.item.other_amounts_on_receiver || 0;
      // return res - otherExp;
    },
    ...mapState({
      currencies: (state) => state.currency.all,
      one: (state) => state.transfer.one,
      stocks: (state) => state.stock.all,
    }),
  },
  methods: {
    getMidCurrencyTousd(currency) {
      if (currency == undefined) return null;
      const sale = this.$newCalcSalePrice({ id: currency.id }, { id: 1 });
      const buy = this.$newCalcBuyPrice({ id: currency.id }, { id: 1 });
      const mid = (sale * 1 + buy * 1) / 2;
      return mid.toFixed(5) * 1;
    },
    setReceiverDate(item) {
      if (!item) return;
      this.item.receiver_id_no = item.id_no;
      this.item.receiver_phone = item.phone;
      this.item.receiver_address = item.address;
      this.item.receiver_country_id = item.country_id;
      this.item.receiver_city_id = item.city_id;
    },
    setSenderDate(item) {
      if (!item) return;
      this.item.sender_id_no = item.id_no;
      this.item.sender_phone = item.phone;
      this.item.sender_address = item.address;
    },
    signCurrency(vCalc, vModel, type, fromCurr, toCurr) {
      if (fromCurr == null || toCurr == null) return;

      console.log("FromCurr: ", fromCurr);

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
              parseFloat(this.$newCalcBuyPrice(toCurr, fromCurr)) +
              parseFloat(this.$newCalcSalePrice(toCurr, fromCurr))
            ).toFixed(7)
          ) / 2;
        this.item[vCalc] =
          parseFloat(
            (
              parseFloat(this.$newCalcBuyPrice(fromCurr, toCurr)) +
              parseFloat(this.$newCalcSalePrice(fromCurr, toCurr))
            ).toFixed(7)
          ) / 2;
      }
    },
    calcCommisson(exchange_rate) {
      let transferringAmount = this.item.to_send_amount || 0;
      let commisson_amount = exchange_rate
        ? this.item.transfer_commission * exchange_rate
        : this.item.transfer_commission || 0;
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
      this.$save(this.item, "transfer", null, "/dashboard/transfers");
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
        this.computed_office_exchange_rate_to_usd =
          val.office_exchange_rate_to_usd;
      }
    },
  },
  mounted() {
    if (this.$route.query.show && this.$route.query.show == "true") {
      this.showReadOnly = true;
    }
    // console.log(this.app_setting);
    // this.item.sender_id = this.app_setting["transfer_commission_account_id"]
    //   ? parseFloat(this.app_setting["transfer_commission_account_id"]["value"])
    //   : null;
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