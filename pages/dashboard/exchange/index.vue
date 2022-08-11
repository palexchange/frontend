<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" lg="7">
        <Card class="mb-5 pt-3 pl-3 pr-6">
          <v-row class="mb-1">
            <v-col cols="12" xs="12" sm="6" lg="6">
              <v-row class="text-h6 mb-4">
                <v-col>
                  <Title title="create an exchange process"></Title>
                </v-col>
              </v-row>
              <v-row class="mb-4">
                <v-col cols="12" xs="12" sm="6" lg="6">
                  <AutoComplete
                    text="beneficiary"
                    holder="beneficiary"
                    required
                  />
                </v-col>
                <v-col cols="12" xs="12" sm="6" lg="6">
                  <DatePicker
                    v-model="item.date"
                    required
                    text="transfer date"
                    holder="test"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              lg="6"
              class="text-h5 mt-5 text-left"
              justify="left"
            >
              {{ $t("process id") }}:<span class="show-text mr-4">1616#</span>
            </v-col>
          </v-row>
        </Card>
      </v-col>
      <v-col cols="12" xs="12" lg="5">
        <Card>
          <!-- <v-row no-gutters class="flex-column text-h6 mt-5 mr-5">
             <v-col class="text-right mb-4">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-user</v-icon>
              {{ $t("user") }}<span class="show-text"> محمد#</span>
            </v-col>
             <v-col class="text-right mb-4">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-arrow-down</v-icon>
              {{ $t("today transactions profit") }}<span class="show-text">1616#</span>
            </v-col>
             <v-col class="text-right mb-4">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-clock</v-icon>
              {{ $t("today transactions count") }}<span class="show-text mr-10" >1616#</span>
            </v-col>
          </v-row> -->

          <!-- <v-row class="text-right text-h6 mt-5 mr-5"> -->
          <v-row class="text-right text-h6 mt-5 mr-5">
            <v-col cols="1">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-user</v-icon>
            </v-col>
            <v-col cols="6" class="mr-5">
              {{ $t("user") }}
            </v-col>
            <v-col cols="4"> <span class="show-text">1616#</span> </v-col>
          </v-row>
          <v-row class="text-right text-h6 mt-5 mr-5">
            <v-col cols="1">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-arrow-down</v-icon>
            </v-col>
            <v-col cols="6" class="mr-5">
              {{ $t("today transactions profit") }}
              <!--<span class="show-text">1616#</span> -->
            </v-col>
            <v-col cols="4"> <span class="show-text">1616#</span> </v-col>
          </v-row>
          <v-row class="text-right text-h6 mt-5 mr-5 mb-5">
            <v-col cols="1">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-clock</v-icon>
            </v-col>
            <v-col cols="6" class="mr-5">
              {{ $t("today transactions count") }}
              <!--<span class="show-text">1616#</span> -->
            </v-col>
            <v-col cols="4"> <span class="show-text">1616#</span> </v-col>
          </v-row>
          <!-- </v-row> -->
        </Card>
      </v-col>
    </v-row>

    <Card>
      <v-card-text>
        <v-row class="" align="center">
          <v-col cols="12" xs="12" sm="4" md="3">
            <InputField
              text="amount to exchange"
              holder="amount to exchange"
              required
            />
          </v-col>
          <v-col cols="12" xs="12" sm="4" md="3" class="ml-40">
            <AutoComplete
              :items="currensies"
              v-model="item.values"
              item-text="name"
              item-value="values"
              text="currency"
              holder="currency"
              required
            />
          </v-col>
          <v-col cols="1" md="2">
            <v-spacer></v-spacer>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="3"
            md="3"
            lg="1"
            class="text-center column-text font-weight-black py-2"
          >
            <span> {{ $t("reminder") }}:0 </span>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="3"
            class="text-h6 d-flex justify-end"
          >
            <span>
              {{ $t("exchange profit") }}: <span class="text-h6">0.05</span>$
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="pr-3 pb-3">
      <!-- <v-row class="mt-3">
        <v-col cols="2" class=""><span class="text-h6 font-weight-black mr-3">{{$t("exchange to")}}</span></v-col>
        <v-col cols="2" class="" > <span >{{$t("amount to exchange")}}</span> </v-col>
        <v-col class="" > <span >{{$t("conversion price")}}</span> </v-col>
        <v-col class="" > <span >{{$t("edited conversion price")}}</span> </v-col>
     </v-row> -->
      <v-simple-table class="my_tabel mt-3 mb-3">
        <template v-slot:default>
          <tbody>
            <tr class="text-right text-h6 font-weight-black">
              <td>
                <span
                  class="fs-18 font-weight-black text-right"
                  style="white-space: nowrap"
                  >{{ $t("exchange to") }}</span
                >
              </td>
              <td>
                <span class="column-text mr-3" style="white-space: nowrap">{{
                  $t("amount to exchange")
                }}</span>
              </td>
              <td>
                <span class="column-text mr-3" style="white-space: nowrap">{{
                  $t("conversion price")
                }}</span>
              </td>
              <td>
                <span class="column-text mr-2" style="white-space: nowrap">{{
                  $t("edited conversion price")
                }}</span>
              </td>
            </tr>
            <ExchangeRow
              :key="i"
              v-for="(currency, i) in currensies"
              :name="currency.name"
            />
          </tbody>
        </template>
      </v-simple-table>
    </Card>

    <v-row justify="center" class="mt-5 mb-5">
      <v-col cols="4">
        <v-btn height="50" class="text-center" color="primary">
          <v-spacer></v-spacer>&nbsp;{{ $t("execute process")
          }}<v-spacer></v-spacer>
          <v-icon dence>fas fa-solid fa-check</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn height="50" class="text-center white--text" color="#6A3D9A">
          <v-spacer></v-spacer>&nbsp;&nbsp;&nbsp;{{ $t("print receipt")
          }}<v-spacer></v-spacer>
          <v-icon dence>fas fa-solid fa-print</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currensies: [
        {
          id: 1,
          name: "dollar",
          values: { sale: 1, buy: 1 },
        },
        {
          id: 2,
          name: "shekel",
          values: { sale: 0.29, buy: 0.3 },
        },
        {
          id: 3,
          name: "dinar",
          values: { sale: 0.29, buy: 0.3 },
        },
        {
          id: 4,
          name: "euro",
          values: { sale: 0.29, buy: 0.3 },
        },
        {
          id: 5,
          name: "pound",
          values: { sale: 0.29, buy: 0.3 },
        },
      ],
      item: { values: {} },
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
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
  font-size: 20px !important;
}

.column-text {
  background-color: #e6e6e6;
  font-size: 13px;
  border-radius: 4px;
  padding: 5px 8px;
}

/* .theme--light.v-input input::placeholder, 
.theme--light.v-input textarea::placeholder{
   color: rgb(0, 0, 0 , 1) !important;
  opacity: 1 !important;

} */
.my_tabel table tr td {
  border: none !important;
  border-radius: 50px !important;
}

.my_tabel table tr:hover {
  background-color: initial !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: none !important;
}

@media (max-width: 600px) {
  .responseveCols > div > button {
    min-width: 100px !important;
    max-width: 100px !important;
  }
}
@media (max-width: 1280px) {
  .responseveCols > div > button {
    min-width: 200px !important;
    max-width: 200px !important;
  }
}
@media (min-width: 1280px) {
  .responseveCols > div > button {
    min-width: 300px !important;
    max-width: 300px !important;
  }
}
</style>
