const statuses_map = () => {
  const status_map = new Map();
  status_map.set(0, "مسودة")
  status_map.set(1, "معتمدة")
  status_map.set(255, "ملغاة")
  return status_map
}
const moneyFilter = (v, minDigits) => {
  return parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: minDigits || 2 })
}
const transactions_name_map = () => {
  const status_map = new Map();
  status_map.set(0, "صادرة");
  status_map.set(1, "واردة");
  status_map.set(2, "عمولة حوالة");
  status_map.set(3, "عمولة وسيط");
  status_map.set(4, "مرجع");
  status_map.set(5, "عمولة موني غرام إضافية");
  status_map.set(6, "مبلغ حوالة صادرة");
  status_map.set(7, "مصروف");
  status_map.set(8, "ربحية من الوسيط");
  status_map.set(9, "ربحية فرق عملة");
  status_map.set(10, "مبلغ تسليم واردة");
  status_map.set(11, "عمولة حوالة علي الحساب");
  return status_map
}
export default (context) => {
  let t = (v) => context.app.i18n.t(v);
  let boolean_string = (v) => v ? t('yes') : t('no');
  let documents = (v) => ['', t('transfer'), t('exchange'), t('fund_adjusment'), t('inputs'), t('outputs')][v]
  let transactions = (v) => [t('outcoming'), t('incoming')][v]

  const statuses = (status_id) => statuses_map().get(status_id)
  const transactions_statuses = (status_id) => transactions_name_map().get(status_id)
  let resources = [{
    child: 'account',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name', 'description'],
    functions: [{
      key: 'is_transaction',
      f: (v) => boolean_string(v)
    }]
  },
  {
    child: 'item',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'image_url', 'name', 'category.name', 'price', 'price1', 'price2', 'price3', 'description', 'created_at']
  },
  {
    child: 'currency',
    parent: '',
    load_after_store: true,
    // headers:['id','image_url','name','category.name','price','price1','price2','price3','description','created_at']
  },
  {
    child: 'stock',
    parent: '',
    reload_user: true,
    load_after_store: true,
    // headers:['id','image_url','name','category.name','price','price1','price2','price3','description','created_at']
  },
  {
    child: 'stock_transaction',
    parent: '',
    // headers:['id','image_url','name','category.name','price','price1','price2','price3','description','created_at']
  },
  {
    child: 'inventory_log',
    parent: '',
    // headers:['id','image_url','name','category.name','price','price1','price2','price3','description','created_at']
  },
  {
    child: 'daily_meal',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'item.name', 'item.image_url', 'date']
  },
  {
    child: 'order',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'user.name', 'total', 'created_at', 'status', 'notes'],
  },
  {
    child: 'file',
    parent: '',
    has_files: true,
    // load_after_store: true,
    // headers: ['num','id', 'user.name', 'total', 'created_at', 'status', 'notes'],
  },
  {
    child: 'party',
    parent: '',
    headers: ['num', 'account_id', 'image', 'name', 'id_no', 'created_at', 'address', 'country_name', 'phone'],
  },
  {
    child: 'role',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name'],
  },
  {
    child: 'permission',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name'],
  },
  {
    child: 'role_permission',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name'],
  },
  {
    child: 'exchange',
    parent: '',
    reload_user: true,
    load_after_store: true,
    headers: ['num', 'id', 'user_name', 'profit', 'party_name', 'status', 'date'],

    functions: [
      {
        key: 'status',
        f: v => {
          return statuses(v)
        }
      },
    ]
  },
  // {
  //   child: 'receipt',
  //   parent: '',
  //   load_after_store: true,
  //   headers: ['num','id', 'party_name', 'amount', 'currency', 'date', 'factor'],
  // },
  {
    child: 'account_type',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name', 'parent_name'],
  },
  {
    child: 'exchange_detail',
    parent: '',
    load_after_store: false,
    silent: true,
    headers: ['num', 'id', 'exchange_id', 'amount', 'currency_name', 'exchange_rate', 'type'],
    functions: [
      {
        key: 'type',
        f: v => {
          return [t('from'), t('to')][v - 1];
        }
      },]
  },
  {
    child: 'transfer',
    parent: '',
    reload_user: true,
    empty_data: true,
    load_after_store: true,
    headers: ['num', 'id', 'type', 'issued_at', 'user_name', 'delivering_type', 'status', 'sender_party_name', 'receiver_party_name', 'office_name', 'profit'],
    functions: [
      {
        key: 'profit',
        f: v => {
          return (v * 1).toFixed(2)
        }
      },
      {
        key: 'type',
        f: v => {
          return v == 0 ? 'حوالة صادرة' : 'حوالة واردة'
        }
      },
      {
        key: 'delivering_type',
        f: v => {
          return ['تسليم يد', 'موني غرام', 'علي الحساب', 'في الحساب'][v - 1]
        }
      },
      {
        key: 'status',
        f: v => {
          return statuses(v)
        }
      },
    ]
  },
  {
    child: 'user',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name', 'email', 'status', 'role', 'created_at'],
    functions: [{
      key: 'status',
      f: (v) => v == 1 ? t('active') : t('inactive')
    },
    {
      key: 'role',
      f: (v) => v == 1 ? t('admin') : t('user')
    }
    ],
  },
  {
    child: 'category',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'image_url', 'name', 'description', 'created_at'],
  },
  {
    child: 'order_item',
    parent: 'order',
    load_after_store: true,
    headers: ['num', 'id', 'order_id', 'item.name', 'qty', 'item_price']
  },
  {
    child: 'country',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name', 'iso3', 'currency_id']
  },
  {
    child: 'city',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name']
  },
  {
    child: 'setting',
    parent: '',
    load_after_store: true,
    headers: ['num', 'id', 'name', 'type']
  },
  {
    child: 'report',
    parent: '',
    has_headers: true,
    is_file: true,
    functions: [
      {
        key: 'type_name',
        f: v => t(v)
      },
      {
        key: 'document_type',
        f: v => documents(v)
      },
      {
        key: 'transaction_type',
        f: v => transactions_statuses(v)
      },
      // {
      //   key: 'acc_balance',

      //   f: v => {
      //     {
      //       let amount = v;
      //       if (amount == 0) return amount
      //       let minus = amount < 0;
      //       let final = parseFloat(minus ? (amount * -1) : amount).toLocaleString(undefined, { minimumFractionDigits: 2 })
      //       if (minus) {
      //         return `${final} د`;
      //       } else {
      //         return `${final} م`;
      //       }
      //     }
      //   },
      // },
      {
        key: 'ac_creditor',
        f: v => v == null ? null : moneyFilter(v)
      },
      {
        key: 'ac_debtor',
        f: v => v == null ? null : moneyFilter(v)
      },
      {
        key: 'statement',
        f: v => t(v)
      },
      {
        key: 'start_balance',
        f: v => v == null ? null : moneyFilter(v)
      },
      {
        key: 'close_balance',
        f: v => v == null ? null : moneyFilter(v)
      },
      {
        key: 'start_usd_amount',
        f: v => v == null ? null : moneyFilter(v)
      },
      {
        key: 'close_usd_amount',
        f: v => v == null ? null : moneyFilter(v)
      },
      {
        key: 'close_rate',
        f: v => v == null ? null : moneyFilter(v, 4)
      },
      {
        key: 'start_rate',
        f: v => v == null ? null : moneyFilter(v, 4)
      },
      {
        key: 'usd_diff',
        f: v => v == null ? null : moneyFilter(v)
      },
      // {
      //   key: 'balance',
      //   f: v => parseFloat(v).toFixed(4)
      // },
    ]
  },
  {
    child: 'user_account',
    parent: '',
    silent: true,
    load_after_store: false,

  },
  {
    child: 'entry',
    parent: '',

    load_after_store: true,
    headers: ['num', 'id', 'statement', 'inverse_entry_id', 'status', 'created_at'],
    functions: [
      {
        key: 'statement',
        f: v => t(v)
      },

    ]
  },
  {
    child: 'entry_transaction',
    parent: '',
    silent: true,
    load_after_store: false,
    headers: ['num', 'id', 'account_name', 'debtor', 'creditor', 'currency_name', 'exchange_rate', 'ac_debtor', 'ac_creditor', 'transaction_type'],
    functions: [
      {
        key: 'ac_creditor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
      },
      {
        key: 'transaction_type',
        f: v => transactions_statuses(v)
      },
      {
        key: 'ac_debtor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
      },
      {
        key: 'creditor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
      },
      {
        key: 'debtor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
      },


    ]
  },
  {
    child: 'receipt',
    parent: '',
    reload_user: true,
    empty_data: true,
    load_after_store: true,
    headers: ['num', 'id', 'user_name', 'from_account_name', 'to_account_name', "statement", 'from_amount', 'currency_name', 'status', 'created_at'],
    functions: [
      {
        key: 'status',
        f: v => {
          return statuses(v)
        }
      },
    ]
  },
  {
    child: 'export_data',
    parent: '',
    has_headers: true,
    is_file: true

  },
  {
    child: 'pdf',
    parent: '',
    return_response: true,
    is_file: true

  },

  ];
  return resources;
}
