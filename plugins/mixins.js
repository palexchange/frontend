import { saveAs } from "file-saver";
import filter_map from '~/helpers/filter_map';
export default (context, inject) => {
  inject('inputNumberFormat', (number) => {
    let input_number_format = context.store.state.input_number_format
    return input_number_format ? (parseFloat(parseFloat(number).toFixed(input_number_format))).toLocaleString(undefined, {
      minimumFractionDigits: input_number_format
    }) : number
  });
  inject('outputNumberFormat', (number) => {
    let output_number_format = context.store.state.output_number_format || 2
    return number.toFixed(output_number_format)
  });
  inject('download_excel', () => {
    return context.store.dispatch(`excel/update`, item).then((data) => {
    });
  });

  inject('context_menu', (event, item, sidemenu) => {
    console.log(item);
    console.log("context_menu");
    event.preventDefault();
    const cont = {}
    cont.x = event.clientX;
    cont.y = event.clientY;
    cont.slectedRowItemIndex = sidemenu ? item.id : item.item.id;
    cont.showMenu = true;
    cont.item = sidemenu ? item : item.item;
    cont.action = null;
    cont.title = null;
    context.store.dispatch('add_context', cont);
  });
  inject('error_alert', (msg) => {
    context.$toast.error(context.app.i18n.t('you dont have active accounts'));
    // this.$swal
    //   .fire({
    //     title: this.$t("Error Happend"),
    //     text: this.$t(...values),
    //     icon: "error",
    //     confirmButtonText: this.$t("ok"),
    //     confirmButtonColor: "#41b882",
    //   })
    //   .then(() => {
    //     // if (this.redirect) {
    //     //   this.$router.push(this.redirect);
    //     // }
    //     this.$store.dispatch("clearErrors");
    //   });

  });
  inject('get_type_id', (resource) => {
    const morphs = {
      transfer: 1,
      exchange: 2,
      receipt: 3,
      party: 4,
    };

    return morphs[resource]
  });
  inject('upload', (file, resource, data) => {
    if (file) {
      let file_item = {
        file,
        attachable_type: context.$get_type_id(resource),
        attachable_id: data.id
      }
      return context.store.dispatch(`file/store`, file_item);
    }
  });
  inject('save', async (item, resource, form_ref = null, redirect = null, file_attribute = null) => {
    let file = null;
    if (file_attribute) {
      file = item[file_attribute];
    }
    if (redirect) {
      context.store.dispatch('setRedirect', redirect);
      redirect = null
    }
    redirect = null;
    let data = null;
    if (item.id) {
      // context.store.dispatch('setOverlay', true);
      return context.store.dispatch(`${resource}/update`, item);
      context.$upload(file, resource, data);
      // context.store.dispatch('setOverlay', false);
      // context.$toast.success(context.app.i18n.t('updated'));
      if (form_ref)
        form_ref.reset();

    } else {
      // context.store.dispatch('setOverlay', true);
      return context.store.dispatch(`${resource}/store`, item);
      await context.$upload(file, resource, data);
      context.store.dispatch('setOverlay', false);
      // context.$toast.success(context.app.i18n.t('saved'));
      if (form_ref)
        form_ref.reset();
    }
    return data;

  });
  inject('remove', (item, resource, params = null) => {
    console.log(item);
    console.log(resource);
    console.log("☺1♦☻♥");
    if (item.id) {
      context.store.dispatch('setDeleteData', { item, resource, params });
    }
  });
  inject('editPreventer', (item, resource, redirect = null) => {
    if (item.id) {
      context.store.dispatch('setEditData', { item, resource, redirect });
    }
  });
  inject('round', (v) => {
    if (v >= 0 || v < 0) {
      let input_number_format = context.store.state.input_number_format
      return input_number_format ? (parseFloat(parseFloat(v).toFixed(input_number_format))).toLocaleString(undefined, {
        minimumFractionDigits: input_number_format
      }) : v
    } else {
      return '0.00';
    }

  });
  inject('get_setting', async (code) => {
    let setting = await context.store.dispatch("financial_setting/show", code);
    return setting.value;
  });
  inject('translateHeaders', (heads) => {
    if (heads) {
      let new_headers = heads.slice(0, heads.length).map((v) => {
        return v.text ? v : {
          value: v,
          text: context.app.i18n.t(v.replaceAll('.', '_'))
        }
      });
      return new_headers
    }
    return heads
  });
  inject('allowed', (code, action) => {
    let user = context.store.$auth.user;
    if (user) {
      if (user.is_tenant_admin)
        return true;
      let permissions = user.permissions;
      let permission = permissions.find(i => i.code == code);
      if (permission) {
        return permission[action];
      }
      return true;
    }
    return true;
  });
  inject('errors', () => context.store.state.errors);
  inject('clear_filter_params', (filter_params, params) => {
    let keys = Object.keys(filter_params);
    keys.map(key => {
      delete params[key];
      delete filter_params[key];
    })
  });
  inject('render_report', (report, params) => {
    context.store
      .dispatch("pdf_report/index", {
        report,
        params
      })
      .then((data) => {
        console.log(data);
        if (data) {
          let blob = new Blob([data], {
            type: `application/pdf`,
          });
          let url = URL.createObjectURL(blob);
          let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
          if (isMobile) {
            saveAs(blob, 'report');
          }
          let path = context.app.router.resolve(
            {
              name: 'document-pdf-url',
              params: { url },
            });
          window.open(path.href, '_blank');
        }
      });
  });
  inject('getDateTime', () => {
    return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10) + " " + new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(11, 8)
  });
  inject('calcBuyPrice', (from, to) => {
    if (from.id == to.id) {
      return 1;
    } else if (to.id == 1) {
      return (1 / from.values.buy).toFixed(7);
    } else if (from.id == 1) {
      return (to.values.buy);
    } else {
      return ((from.values.buy) * 1 / to.values.buy).toFixed(7);
    }
  });
  inject('calcSalePrice', (from, to) => {
    if (from.id == to.id) {
      return 1;
    } else if (to.id == 1) {
      return (1 / from.values.sale).toFixed(7);
    } else if (from.id == 1) {
      return (to.values.sale);
    } else {
      return ((from.values.sale) * 1 / to.values.sale).toFixed(7);
    }
  });
  inject('newCalcSalePrice', (from, to, digits) => {
    if (!(from && to)) return 0;
    if (from.id == to.id) return 1;
    let from_currency = context.store.state.stock.all.find(v => {
      return v.currency_id == from.id && v.ref_currency_id == 1
    });
    let to_currency = context.store.state.stock.all.find(v => {
      return v.currency_id == to.id && v.ref_currency_id == 1
    });
    if (to.id == 1) {
      if (from_currency) {
        return (1 / from_currency.final_selling_price).toFixed(16);
      }
    } else if (from.id == 1) {
      if (to_currency) {

        return (to_currency.final_selling_price);
      }
    } else {
      let converter = context.store.state.stock.all.find(v => {
        return v.currency_id == from.id && v.ref_currency_id == to.id
      });
      if (converter) {
        return converter.final_selling_price;
      }
      if (to_currency && from_currency) {

        return ((1 / from_currency.final_selling_price) * to_currency.final_selling_price).toFixed(16);
      }
    }


  });
  inject('newCalcBuyPrice', (from, to, digits) => {
    if (!(from && to)) return 0;
    let from_currency = context.store.state.stock.all.find(v => {
      return v.currency_id == from.id && v.ref_currency_id == 1
    });
    let to_currency = context.store.state.stock.all.find(v => {
      return v.currency_id == to.id && v.ref_currency_id == 1
    });

    if (from.id == to.id) {
      return 1;
    } else if (to.id == 1) {
      if (from_currency) {
        return (1 / from_currency.final_purchasing_price).toFixed(16);
      }
    } else if (from.id == 1) {
      if (to_currency) {

        return (to_currency.final_purchasing_price);
      }
    } else {
      let converter = context.store.state.stock.all.find(v => {
        return v.currency_id == from.id && v.ref_currency_id == to.id
      });
      if (converter) {
        return converter.final_purchasing_price;
      }
      if (to_currency && from_currency) {
        return ((1 / from_currency.final_purchasing_price) * to_currency.final_purchasing_price).toFixed(16);
      }
    }

  });
  inject('download_pdf', (ModelAndId) => {
    // context.store.dispatch('pdf/index', ModelAndId).then((response) => {
    context.$axios.$get(`/pdf`, { responseType: "blob", params: ModelAndId }).then((response) => {
      const blob = new Blob([response], { type: "application/pdf" });
      saveAs(blob, "document");
    });
    // context.$axios.$get(`/pdf`, { responseType: "blob", params: ModelAndId })


  });
  inject('filterMenu', (choices, name, item) => {
    return choices.filter(v => {
      if (filter_map[name]) {
        if (filter_map[name][v.title]) {
          return filter_map[name][v.title](item)
        } else {
          return true
        }
      } else {
        return true

      }
    })

  });
}
