import permission_map from './permission_map';

export default (context, inject) => {
  inject('menus_filters', (name, title, item) => {
    let user = context.store.$auth.user;
    let permissions = user ? user.permissions : [];
    let allowed = (name, action, code = null, tax = false) => {
      if (!user)
        return false;
      if (user.role == 1)
        return true;
      if (user.is_tenant_admin || tax)
        return true;
      let p = permissions.find(i => i.code == (code || permission_map[name]) && i[action]);
      let country = user.tenant.country || {};
      if (tax) {
        console.log(country);
        return p != null && !country.tax_restrictive;
      }
      return p != null;
    };
    let acl = {
      purchases_bill: {
        delete(item) {
          return item ? (item.status != 0) && allowed(name, 'delete', null, true) : false;
        },
        confirm(item) {
          return item ? item.status == 0 && allowed(name, 'confirm') : false;
        },
        edit_bill(item) {
          return item ? item.status != 0 && allowed(name, 'edit', null, true) : false;
        },
        // print(item) {
        //   return allowed(name, 'view');
        // },
        return(item) {
          return item ? item.status == 1 && allowed(name, 'store') : false;
        },
        add_payment(item) {
          return item ? (item.net == item.total_paid || item.status == 1) && allowed(name, 'delete', 'association') : false;
        },
      },
      sales_bill: {
        delete(item) {
          return item ? (item.status != 0) && allowed(name, 'delete', null, true) : false;
        },
        confirm(item) {
          return item ? item.status == 0 && allowed(name, 'confirm') : false;
        },
        deliver(item) {
          return item ? item.status != 0 && allowed(name, 'edit') : false;
        },
        edit_bill(item) {
          return item ? item.status != 0 && allowed(name, 'edit', null, true) : false;
        },
        // print(item) {
        //   return true;
        //   return allowed(name, 'view');
        // },
        // print_pos_size(item) {
        //   return true;

        //   return item ? item.status == 1 && allowed(name, 'view') : false;
        // },
        return(item) {
          return item ? item.status == 1 && allowed(name, 'store','credit_note') : false;
        },
        collect(item) {
          return item ? item.status == 1 && allowed(name, 'store', 'collection') : false;
        },
        add_payment(item) {
          return item ? (item.net == item.total_paid || item.status == 1) && allowed(name, 'store', 'association') : false;
        },
        send_email(item) {
          return item ? allowed(name, 'store') : false;
        },
        make_note(item) {
          return item ? allowed('credit_note', 'store') : false;
        },
      },
      accounts: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
      },
      assets: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
      },
      expenses: {
        delete(item) {
          return item ? allowed(name, 'delete', null, true) : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit', null, true) : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view') : false;
        // },
      },
      entries: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? !item.document_type && !item.document_id && allowed(name, 'edit') : false;
        },
      },
      cost_centers: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
      },
      qutation: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit_edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
        show(item) {
          return item ? allowed(name, 'view') : false;
        },
        create_bill(item) {
          return item ? allowed('sales_bill', 'add') && !item.bill_id : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view') : false;
        // },
      },
      purchases_order: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit_edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
        show_bill(item) {
          return item ? allowed(name, 'view') : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view') : false;
        // },
      },
      catch_receipt: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit_edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
        show_bill(item) {
          return item ? allowed(name, 'view') : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view') : false;
        // },
        send_email(item) {
          return item ? allowed(name, 'store') : false;
        },
      },
      cashing_receipt: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit_edit(item) {
          return item ? allowed(name, 'edit') : false;
        },
        show_bill(item) {
          return item ? allowed(name, 'view') : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view') : false;
        // },
        send_email(item) {
          return item ? allowed(name, 'store') : false;
        },
      },
      credit_note: {
        delete(item) {
          return item ? allowed(name, 'delete', null, true) : false;
        },
        edit_edit(item) {
          return item ? allowed(name, 'edit', null, true) : false;
        },
        show_bill(item) {
          return item ? allowed(name, 'view','credit_note') : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view','credit_note') : false;
        // },
        send_email(item) {
          return item ? allowed(name, 'store') : false;
        },
      },
      debit_note: {
        delete(item) {
          return item ? allowed(name, 'delete', null, true) : false;
        },
        edit_edit(item) {
          return item ? allowed(name, 'edit', null, true) : false;
        },
        show_bill(item) {
          return item ? allowed(name, 'view') : false;
        },
        // print(item) {
        //   return item ? allowed(name, 'view') : false;
        // },
        send_email(item) {
          return item ? allowed(name, 'store') : false;
        },
      },
      beneficiaries: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      items: {
        // transaction_items(item) {
        //   return item ? allowed(name, 'edit') : false;
        // },
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      stores: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      units: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      stock_counts: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      users: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      taxs: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      coupon: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      currencies: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      outgoing_consignment: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      take_consignment: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      transformation_consignment: {
        delete(item) {
          return item ? allowed(name, 'delete') : false;
        },
        edit(item) {
          return item ? allowed(name, 'edit') : false;
        },

      },
      batchAssembly: {

        start(item) {
          return item ? (item.status == 0) : false;
        },
        finish(item) {
          return item ? (item.status == 1) : false;
        },

      },


    };
    if (acl[name]) {
      if (acl[name][title]) {
        return acl[name][title](item);
      }
    }
    return true;

  })
}
