<template>
  <div>
    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <Title title="create outcomming transfer"></Title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <AutoComplete required :items="transfer_types" text="transfer type" holder="transfer type" />
            </v-col>
            <v-col>
              <DatePicker v-model="item.date" required text="transfer date" holder="test" />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <InputField dashed text="palestinian profit" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" sm="12">
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
          <v-col cols="12" md="3" sm="6">
            <AutoComplete text="beneficiary" holder="beneficiary" required />
          </v-col>
          <v-col>
            <InputField holder="id number" text="id number" required />
          </v-col>
          <v-col>
            <InputField holder="mobile" text="mobile" required />
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
          <v-col cols="12" md="3" sm="6">
            <AutoComplete text="beneficiary" holder="beneficiary" required />
          </v-col>
          <v-col>
            <InputField holder="id number" text="id number" required />
          </v-col>
          <v-col cols="12" md="" sm="6">
            <InputField holder="mobile" text="mobile" required />
          </v-col>
          <v-col>
            <AutoComplete text="country" holder="country" required />
          </v-col>
          <v-col>
            <AutoComplete text="city" holder="city" required />
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <InputField holder="address" text="address" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5" sm="12">
            <v-radio-group mandatory v-model="item.commission_on" row>
              <v-radio value="1" label="العمولة علي المحول"></v-radio>
              <v-radio value="2" label="العمولة علي المستلم"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col class="align-self-center" md="3" sm="12">
            <v-text-field color="#FF7171" style="border-radius: 0px !important" dense outlined slot="append"
              hide-details :label="
                item.is_percentage ? `${$t('commission')} %` : $t('commission')
              " :append-icon="
  item.is_percentage == false
    ? 'fas fa-sort-numeric-up-alt'
    : 'fas fa-percentage'
" @click:append="() => (item.is_percentage = !item.is_percentage)" v-model.number="item.commission">
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title>بيانات الحوالة المالية </v-card-title>
      <v-card-text>
        <v-row class="justify-center">
          <v-col>
            <InputField v-model.number="item.transferringAmount" holder="transfirrig amount" text="transfirrig amount"
              required />
          </v-col>
          <v-col>
            <AutoComplete text="currency" holder="currency" required />
          </v-col>
          <v-col>
            <InputField v-model.number="item.convertToUSD" holder="converting to dollar amount"
              text="converting to dollar amount" required />
          </v-col>
          <v-col>
            <InputField holder="another expenses" text="another expenses" v-model.number="item.otherExpenses" />
          </v-col>
          <v-col>
            <InputField :value="amountWithCommissionAndExpensesComp" dashed holder="مبلغ شامل عمولة"
              text="م.ش عمولة و مصاريف" />
          </v-col>
          <v-col>
            <InputField :value="amountInUSDComp" dashed holder="مبلغ مستلم بالدولار" text="مبلغ مستلم بالدولار" />
          </v-col>
          <v-col>
            <InputField :value="totalAmountInUSDComp" dashed holder="شامل العمولة" text="المبلغ بالدولار ش.ع" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <img src="~/assets/img/icons/to.png" alt="" />
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col>
            <AutoComplete holder="currency to give" text="currency to give" required />
          </v-col>
          <v-col>
            <InputField v-model.number="item.convertToRecvCurr" holder="convert to receiver currency"
              text="convert to receiver currency" required />
          </v-col>
          <v-col>
            <InputField :value="recivedAmountComp" dashed holder="amount to give" text="amount to give" required />
          </v-col>
          <v-col>
            <InputField v-model.number="item.otherExpOnRecv" holder="another expenses on receiver"
              text="another expenses on receiver" />
          </v-col>
          <v-col cols="3">
            <InputField :value="totalRecvAmountComp" dashed holder="final amount to give" text="final amount to give" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="mb-5 pa-3">
      <v-card-title>المكتب</v-card-title>
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="3">
            <AutoComplete holder="beneficiary" text="beneficiary" required />
          </v-col>

          <v-col>
            <AutoComplete holder="currency to office" text="currency to office" required />
          </v-col>

          <v-col>
            <InputField v-model.number="item.officeConvertToUSD" holder="converting to dollar amount"
              text="converting to dollar amount" required />
          </v-col>
          <v-col>
            <InputField :value="officeAmount" dashed holder="office amount" text="office amount" />
          </v-col>
          <v-col>
            <label class="required form-label">عمولة المكتب</label>
            <v-text-field v-model.number="item.officeCommission" color="#FF7171" style="border-radius: 0px !important" dense
              outlined slot="append" hide-details required :label="
                item.is_percentage ? `${$t('commission')} %` : $t('commission')
              " :append-icon="
  item.is_percentage == false
    ? 'fas fa-sort-numeric-up-alt'
    : 'fas fa-percentage'
" @click:append="() => (item.is_percentage = !item.is_percentage)">
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <InputField v-model.number="item.officeReturn" holder="returned" text="returned" />
          </v-col>
          <v-col>
            <InputField :value="totalOfficeAmount" dashed holder="final amount to office"
              text="final amount to office" />
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <v-row>
      <v-col cols="3">
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
              <v-btn v-bind="attrs" v-on="on" color="primary" outlined>الإجراءات</v-btn>
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
  name: "transfer form",
  data() {
    return {
      transfer_types: [{ id: 1, name: "تسليم يد" }],
      item: { is_percentage: false },
    };
  },
  computed: {
    amountWithCommissionAndExpensesComp() {
      console.log("perc: ", this.item.is_percentage)
      console.log("amount: ", this.item.transferringAmount)
      console.log("comm: ", this.item.commission)
      console.log("expenses: ", this.item.otherExpenses)
      let otherExp = (this.item.otherExpenses == undefined ? 0 : this.item.otherExpenses)
      if (this.item.transferringAmount == undefined || this.item.commission == undefined) return;
      let commValue = (this.item.commission_on === '1' ? (this.item.is_percentage ? this.item.commission / 100 * this.item.transferringAmount : this.item.commission) : 0);
      // if(this.item.commission_on === '2') commValue = 0;
      return commValue + this.item.transferringAmount + otherExp;
    },
    amountInUSDComp() {
      console.log("amount: ", this.item.transferringAmount)
      console.log("ratio: ", this.item.convertToUSD)
      if (this.item.transferringAmount == undefined || this.item.convertToUSD == undefined) return;
      return this.item.transferringAmount / this.item.convertToUSD;
    },
    totalAmountInUSDComp() {
      console.log("LastMethod ratio: ", this.item.convertToUSD)
      if (this.item.convertToUSD == undefined || this.amountWithCommissionAndExpensesComp == undefined) return;
      let commValue = (this.item.commission_on === '1' ? (this.item.is_percentage ? this.item.commission / 100 * this.item.transferringAmount : this.item.commission) : 0);
      let otherExp = (this.item.otherExpenses == undefined ? 0 : this.item.otherExpenses)

      return this.amountInUSDComp + commValue + otherExp;
      // console.log("Last Method: ",tot);
      // return tot;
    },
    recivedAmountComp() {
      console.log("Here we gooo")
      console.log("total amount: ", this.amountInUSDComp)
      console.log("comm: ", this.item.commission)
      console.log("convert to recv curr: ", this.item.convertToRecvCurr)
      if (this.item.convertToRecvCurr == undefined || this.amountInUSDComp == null) return;
      console.log("Here we paaaassedd")
      // let otherExp = (this.item.otherExpOnRecv == undefined ? 0 : this.item.otherExpOnRecv)
      // let recvCommission = (this.item.commission_on === '2' ? this.item.commission : 0);
      // recvCommission = (this.item.is_percentage ? recvCommission / 100 * this.item.transferringAmount : recvCommission);
      // console.log("recv Commission: ", recvCommission)
      // console.log("other exp: ", otherExp)
      return this.amountInUSDComp * this.item.convertToRecvCurr
    },
    totalRecvAmountComp() {
      if (this.amountInUSDComp == null || this.item.convertToRecvCurr == undefined) return;
      let commission = (this.item.commission == undefined || this.item.commission_on === '1' ? 0 : this.item.commission);
      commission = (this.item.is_percentage ? commission / 100 * this.amountInUSDComp : commission);
      let otherExp = (this.item.otherExpOnRecv == undefined ? 0 : this.item.otherExpOnRecv);
      return (this.amountInUSDComp - commission - otherExp) * this.item.convertToRecvCurr;
    },
    officeAmount() {
      if (this.totalRecvAmountComp == null || this.item.officeConvertToUSD == undefined) return;
      return this.totalRecvAmountComp / this.item.officeConvertToUSD;
    },
    totalOfficeAmount() {
      if (this.item.officeCommission == undefined || this.officeAmount == null) return;
      let returned = (this.item.officeReturn == undefined ? 0 : this.item.officeReturn);
      let commission = (this.item.is_percentage ? this.item.officeCommission / 100 * this.officeAmount : this.item.officeCommission);

      console.log("Officee::")
      console.log("office Amount: ", this.officeAmount)
      console.log("comm: ", commission)
      console.log("returned: ", returned)
      let tempVar = (this.officeAmount + commission - returned);
      console.log("tempVar: ", tempVar)
      return tempVar;
    }

  }
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
</style>