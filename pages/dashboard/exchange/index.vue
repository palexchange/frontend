<template>
  <div>
    <v-row>
      <v-col cols="7">
        <Card class="mb-5 pt-3 pl-3 pr-6">
          <v-row class="mb-1">
            <v-col cols="7">
              <v-row class="text-h6 mb-4">
                <v-col>
                  <Title title="create an exchange process"></Title>
                </v-col>
              </v-row>
              <v-row class="mb-4">
                <v-col>
                  <AutoComplete text="beneficiary" holder="beneficiary" required />
                </v-col>
                <v-col>
                  <DatePicker v-model="item.date" required text="transfer date" holder="test" />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5" class="text-h5 mt-5 text-left">
              {{ $t("process id") }}:<span class="show-text mr-4">1616#</span>
            </v-col>
          </v-row>
        </Card>
      </v-col>
      <v-col>
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
          <v-col cols="2">
            <InputField text="amount to exchange" holder="amount to exchange" required />
          </v-col>
          <v-col cols="2" class="ml-40">
            <AutoComplete text="currency" holder="currency" required />
          </v-col>
          <v-col cols="2" class="text-center column-text font-weight-black py-2 mr-15">
            <span> {{ $t("reminder") }}:0 </span>
          </v-col>
          <v-col cols="5" class="text-h6 d-flex justify-end">
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
              <td><span class="text-h6 font-weight-black text-right mr-5">{{ $t("exchange to") }}</span></td>
              <td><span class="column-text mr-3">{{ $t("amount to exchange") }}</span></td>
              <td><span class="column-text mr-3">{{ $t("conversion price") }}</span></td>
              <td><span class="column-text mr-2">{{ $t("edited conversion price") }}</span></td>
            </tr>


            <tr class="text-right ">
              <td><span class="column-text text-right text-h6 ">{{ $t("dollar") }}</span></td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" background-color="#e7e6e6" style="border-radius: 7px !important"
                  dense outlined disabled :rules="[]" />
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("amount rounding") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("delete fraction") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("complete fraction") }}</v-btn>
              </td>
            </tr>
            <tr class="text-right ">
              <td><span class="column-text text-right text-h6  mb-4">{{ $t("shekel") }}</span></td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" background-color="#e7e6e6" style="border-radius: 7px !important"
                  dense outlined disabled :rules="[]" />
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("amount rounding") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("delete fraction") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("complete fraction") }}</v-btn>
              </td>
            </tr>
            <tr class="text-right ">
              <td><span class="column-text text-right text-h6 mb-4">{{ $t("dinar") }}</span></td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" background-color="#e7e6e6" style="border-radius: 7px !important"
                  dense outlined disabled :rules="[]" />
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("amount rounding") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("delete fraction") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("complete fraction") }}</v-btn>
              </td>
            </tr>
            <tr class="text-right ">
              <td><span class="column-text text-right text-h6 mb-4">{{ $t("euro") }}</span></td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" background-color="#e7e6e6" style="border-radius: 7px !important"
                  dense outlined disabled :rules="[]" />
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("amount rounding") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("delete fraction") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("complete fraction") }}</v-btn>
              </td>
            </tr>
            <tr class="text-right ">
              <td><span class="column-text text-right text-h6 mb-4">{{ $t("pound") }}</span></td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" color="#FF7171" style="border-radius: 7px !important" dense outlined
                  :rules="[]" />
              </td>
              <td>
                <v-text-field hide-details="auto" class="mt-4" min="0" background-color="#e7e6e6" style="border-radius: 7px !important"
                  dense outlined disabled :rules="[]" />
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("amount rounding") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("delete fraction") }}</v-btn>
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("complete fraction") }}</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- <v-row class="mt-5 no-gutters" align="center">
        <v-col cols="1" class="text-right mr-5"><span class="text-h6 font-weight-black">{{$t("exchange to")}}</span></v-col>
        <v-col cols="2" class="text-right" > <span class="column-text">{{$t("amount to exchange")}}</span> </v-col>
        <v-col cols="2" class="text-right" > <span class="column-text">{{$t("conversion price")}}</span> </v-col>
        <v-col cols="3" class="text-right" > <span class="column-text">{{$t("edited conversion price")}}</span> </v-col>
      </v-row>
      
      <v-row >
        <v-row >
          <v-col  class="text-right mr-5">  <span class="column-text">{{$t("dollar")}}</span> </v-col>
          <v-col  class="text-right"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField :disabled="true"> </InputField></v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("reminder")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("amount rounding")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("delete fraction")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("complete fraction")}}</v-btn> </v-col>
        </v-row>
        <v-row >
          <v-col  class="text-right mr-5">  <span class="column-text">{{$t("shekle")}}</span> </v-col>
          <v-col  class="text-right"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField > </InputField></v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("reminder")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("amount rounding")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("delete fraction")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("complete fraction")}}</v-btn> </v-col>
        </v-row>
        <v-row >
          <v-col  class="text-right mr-5">  <span class="column-text">{{$t("dinar")}}</span> </v-col>
          <v-col  class="text-right"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField > </InputField></v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("reminder")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("amount rounding")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("delete fraction")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("complete fraction")}}</v-btn> </v-col>
        </v-row>
        <v-row >
          <v-col  class="text-right mr-5">  <span class="column-text">{{$t("euro")}}</span> </v-col>
          <v-col  class="text-right"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField > </InputField></v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("reminder")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("amount rounding")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("delete fraction")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("complete fraction")}}</v-btn> </v-col>
        </v-row>
        <v-row >
          <v-col  class="text-right mr-5">  <span class="column-text">{{$t("pound")}}</span> </v-col>
          <v-col  class="text-right"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField> </InputField></v-col>
          <v-col  class="text-right mr-3"> <InputField > </InputField></v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("reminder")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("amount rounding")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("delete fraction")}}</v-btn> </v-col>
          <v-col  class="text-right mr-3"> <v-btn color="primary">{{$t("complete fraction")}}</v-btn> </v-col>
        </v-row>
      </v-row>-->
    </Card>

    <v-row justify="center" class="mt-5 mb-5">
      <v-col cols="4">
        <v-btn height="50" width="300" class="text-center" color="primary">
          <v-spacer></v-spacer>&nbsp;{{ $t("execute process") }}<v-spacer></v-spacer>
          <v-icon dence >fas fa-solid fa-check</v-icon>
          
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn height="50" width="300" class="text-center white--text" color="#6A3D9A">
          <v-spacer></v-spacer>&nbsp;&nbsp;&nbsp;{{ $t("print receipt") }}<v-spacer></v-spacer>
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
      item: {},
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
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

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th {
  border-bottom: none !important;
}
</style>
