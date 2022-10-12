<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} account`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <div>
      <v-form v-model="validated">
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                clearable
                required
                text="name"
                v-model="form.name"
                holder="name"
              ></InputField>
            </v-col>

            <v-col cols="12" sm="4" xs="12">
              <AccountAutocomplete
                clearable
                v-model="form.parent_id"
                text="parent account number"
                holder="parent account number"
              ></AccountAutocomplete>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <AutoAccount
                v-model="form.type_id"
                text="type"
                holder="type"
              ></AutoAccount>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.code"
                text="code"
                holder="code"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.description"
                text="description"
                holder="description"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.notes"
                text="notes"
                holder="notes"
              ></InputField>
            </v-col>

            <v-col v-if="form.type_id == 3" cols="12" sm="4" xs="12">
              <CurrencyAutoComplete
                clearabler
                required
                v-model="form.currency_id"
                text="box currency"
                holder="box currency"
              ></CurrencyAutoComplete>
            </v-col>
            <!-- <v-col cols="12" sm="4" xs="12">
              <v-checkbox
                v-model="form.is_transaction"
                color="primary"
                label="is_transaction"
              />
            </v-col> -->
          </v-row>

          <v-row v-if="form.type_id == 3" dense>
            <v-col>
              <v-card flat>
                <v-card-subtitle>
                  {{ $t("assign user to the account") }}
                  <v-btn @click="expand = !expand" icon>
                    <v-icon small> fas fa-eye</v-icon>
                  </v-btn>
                </v-card-subtitle>

                <v-card-text>
                  <v-expand-transition>
                    <v-card flat v-show="expand">
                      <UserAutocomplete
                        multiple
                        deletable-chips
                        allow-overflow
                        chips
                        return-object
                        v-model="user_account"
                        item_value="user_id"
                        text="sign account to user"
                        holder="sign account to user"
                      ></UserAutocomplete>
                      <table class="text-center user_account-table">
                        <tr>
                          <th>المستخدم</th>
                          <th>الحالة</th>
                          <th>تاريخ الإنشاء</th>
                        </tr>
                        <tr :key="i" v-for="(account, i) in user_account">
                          <td>{{ account.name }}</td>
                          <td>
                            <v-switch
                              dense
                              :true-value="1"
                              :false-value="0"
                              flat
                              hide-details
                              ripple
                              v-model="account.status"
                            >
                            </v-switch>
                          </td>
                          <td>{{ account.created_at }}</td>
                        </tr>
                      </table>
                    </v-card>
                  </v-expand-transition>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="button-responsive">
            <v-col class="text-center">
              <v-btn
                :disabled="!validated"
                @click="save"
                color="primary"
                height="45"
              >
                {{ $t("save") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </div>
  </v-card>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      expand: false,
      validated: false,
      user_account: [],
      form: {},
      entry: {
        statment: "رصيد افتتاحي",
        status: 1,
        date: this.$getDateTime(),
      },
    };
  },
  methods: {
    save() {
      this.$save(this.form, "account").then((data) => {
        if (this.expand && this.user_account[0] && data) {
          this.user_account.forEach((v) => {
            let item = {
              account_id: data.id,
              id: v.id,
              user_id: v.user_id,
              name: v.name,
              status: v.status == 1 ? 1 : 0,
            };
            this.$save(item, "user_account");
          });
        }
        if (
          (data && data.id && this.entry.creditor > 0) ||
          this.entry.creditor > 0
        ) {
          this.$save(this.entry, "entry").then((data) => {
            if (data.id) {
              let transition = {
                debtor: this.entry.debtor,
                creditor: this.entry.creditor,
                entry_id: data.id,
              };
              this.$save(this.entry, "entry_transaction");
            }
          });
        }
        if (data && data.id) {
          this.$store.dispatch("closeDialog");
        }
      });
    },
    // change_city(city_id) {
    //   console.log("Reeeacchhhh");
    //   if (city_id) this.form.city_id = city_id;
    // },
  },
  computed: {
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
      user_accounts: (state) => state.user_account.all,
    }),
  },
  mounted() {
    if (this.dialog_item) {
      this.form = JSON.parse(JSON.stringify(this.dialog_item));
      this.$store.dispatch("user_account/index", {
        account_id: this.dialog_item.id,
        user_id: this.$auth.user.id,
      });
    }
  },
  watch: {
    user_accounts(val) {
      if (val[0]) {
        this.user_account = JSON.parse(JSON.stringify(val));
        this.expand = true;
      }
    },
    user_account(val, old) {
      if (old.length > val.length) {
        let obj = {};
        old.forEach((v, index) => {
          if (index < val.length) {
            if (v.name !== val[index].name) {
              obj = v;
            }
          } else {
            obj = v;
          }
        });
        if (obj.id) {
          this.$store.dispatch("user_account/delete", obj);
        }
      }
      if (val) {
        val = val.map((v) => {
          if (!v.account_id && v.id) {
            v.user_id = v.id;
            delete v.id;
          }
          return v;
        });
      }
    },
  },
};
</script>
  
  <style>
</style>