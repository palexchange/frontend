<template>
  <div>
    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <Title title="create incoming transfer"></Title>
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
          <v-col cols="12" md="3" sm="6">
            <AutoComplete text="beneficiary" holder="beneficiary" required />
          </v-col>
          <v-col cols="12" md="2">
            <label style="color: rgba(139, 139, 139, 0.93)" class="required form-label">{{ $t("id image") }}</label>
            <v-file-input min="0" color="#FF7171" style="border-radius: 0px !important" dense :disabled="dashed"
              :required="true" outlined v-on="$listeners" :rules="rulesss.requiredRules" :placeholder="$t('id image')"
              prepend-icon="" prepend-inner-icon="fa-solid fa-image" />
          </v-col>
          <v-col cols="12" md="2" sm="6">
            <InputField holder="mobile" text="mobile" required />
          </v-col>
          <v-col>
            <AutoComplete text="country" holder="country" required />
          </v-col>
          <v-col>
            <AutoComplete text="city" holder="city" required />
          </v-col>
          <v-col cols="12" md="2" sm="6">
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
" @click:append="() => (item.is_percentage = !item.is_percentage)">
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
            <InputField v-model.number="item.RatioToUSD" holder="converting to dollar amount"
              text="converting to dollar amount" required />
          </v-col>


          <v-col>
            <InputField :value="recivedAmountInUSDComp" dashed
              holder="recived amount in USD" text="recived amount in USD" />
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
            <InputField v-model.number="item.recvCurr" holder="convert to receiver currency" text="convert to receiver currency" required />
          </v-col>
          <v-col>
            <InputField :value="finalAmountToDeliverComp" dashed holder="final amount to give" text="final amount to give" required />
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
            <InputField v-model.number="item.officeConvertToUSD" holder="converting to dollar amount" text="converting to dollar amount" required />
          </v-col>
          <v-col>
            <InputField :value="officeAmount" dashed holder="office amount" text="office amount" />
          </v-col>
          <v-col>
            <label class="required form-label">عمولة المكتب</label>
            <v-text-field v-model.number="item.officeCommission" color="#FF7171" style="border-radius: 0px !important" dense outlined slot="append"
              hide-details required :label="
                item.is_percentage ? `${$t('commission')} %` : $t('commission')
              " :append-icon="
  item.is_percentage == false
    ? 'fas fa-sort-numeric-up-alt'
    : 'fas fa-percentage'
" @click:append="() => (item.is_percentage = !item.is_percentage)">
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <InputField v-model.number="item.officeReturn" holder="returned" text="returned" required />
          </v-col>
          <v-col>
            <InputField :value="totalOfficeAmount" dashed holder="final amount to office" text="final amount to office" />
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
import ruless from "~/helpers/rules";
export default {
  data() {
    return {
      rulesss: ruless(this),
      transfer_types: [{ id: 1, name: "تسليم يد" }],
      item: { is_percentage: false },
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
      if(this.item.transferringAmount == undefined || this.item.RatioToUSD == undefined) return;
      
      return this.item.transferringAmount / this.item.RatioToUSD;
    },
    finalAmountToDeliverComp() {
      if(this.recivedAmountInUSDComp == null || this.item.recvCurr == undefined) return;
      return this.recivedAmountInUSDComp * this.item.recvCurr;
    },
    officeAmount() {
      if (this.finalAmountToDeliverComp == null || this.item.officeConvertToUSD == undefined) return;
      return this.finalAmountToDeliverComp / this.item.officeConvertToUSD;
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
</style>