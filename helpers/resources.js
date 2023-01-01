const statuses_map = () => {
  const map = new Map();
  map.set(0, "مسودة")
  map.set(1, "معتمدة")
  map.set(255, "ملغاة")
  return map
}
export default (context) => {
  let t = (v) => context.app.i18n.t(v);
  let boolean_string = (v) => v ? t('yes') : t('no');
  let documents = (v) => ['', t('transfer'), t('exchange'), t('fund_adjusment'), t('inputs'), t('outputs')][v]
  let transactions = (v) => [t('outcoming'), t('incoming')][v]

  const statuses = (status_id) => statuses_map().get(status_id)
  let resources = [{
    child: 'account',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name', 'description'],
    functions: [{
      key: 'is_transaction',
      f: (v) => boolean_string(v)
    }]
  },
  {
    child: 'item',
    parent: '',
    load_after_store: true,
    headers: ['id', 'image_url', 'name', 'category.name', 'price', 'price1', 'price2', 'price3', 'description', 'created_at']
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
    headers: ['id', 'item.name', 'item.image_url', 'date']
  },
  {
    child: 'order',
    parent: '',
    load_after_store: true,
    headers: ['id', 'user.name', 'total', 'created_at', 'status', 'notes'],
  },
  {
    child: 'file',
    parent: '',
    has_files: true,
    // load_after_store: true,
    // headers: ['id', 'user.name', 'total', 'created_at', 'status', 'notes'],
  },
  {
    child: 'party',
    parent: '',
    load_after_store: true,
    headers: ['id', 'image', 'name', 'id_no', 'created_at', 'address', 'default_currency_id', 'country_id', 'phone'],
  },
  {
    child: 'role',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name'],
  },
  {
    child: 'permission',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name'],
  },
  {
    child: 'role_permission',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name'],
  },
  {
    child: 'exchange',
    parent: '',
    reload_user: true,
    load_after_store: true,
    headers: ['id', 'date', 'user.name', 'amount', 'currency_name', 'party_name', 'status', 'number'],

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
  //   headers: ['id', 'party_name', 'amount', 'currency', 'date', 'factor'],
  // },
  {
    child: 'account_type',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name', 'parent_name'],
  },
  {
    child: 'exchange_detail',
    parent: '',
    load_after_store: false,
    silent: true,
    headers: ['id', 'exchange_id', 'amount', 'currency_name', 'factor', 'amount_after'],
  },
  {
    child: 'transfer',
    parent: '',
    reload_user: true,
    load_after_store: true,
    headers: ['id', 'type', 'issued_at', 'user.name', 'delivering_type', 'status', 'sender_party.name', 'receiver_party.name', 'office.name', 'profit'],
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
          return ['تسليم يد', 'موني غرام', 'علي الحساب'][v - 1]
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
    headers: ['id', 'name', 'email', 'status', 'role', 'created_at'],
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
    headers: ['id', 'image_url', 'name', 'description', 'created_at'],
  },
  {
    child: 'order_item',
    parent: 'order',
    load_after_store: true,
    headers: ['id', 'order_id', 'item.name', 'qty', 'item_price']
  },
  {
    child: 'country',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name', 'iso3', 'currency_id']
  },
  {
    child: 'city',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name']
  },
  {
    child: 'setting',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name', 'type']
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
        f: v => transactions(v)
      },
      {
        key: 'acc_balance',

        f: v => {
          let amount = parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
          return amount < 0 ? ((amount * -1) + ' د') : (amount + ' م')
        }
      },
      {
        key: 'ac_creditor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
      },
      {
        key: 'ac_debtor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
      },
      {
        key: 'statement',
        f: v => t(v)
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
    reload_user: true,
    load_after_store: true,
    headers: ['id', 'statement', 'inverse_entry_id', 'created_at'],
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
    headers: ['id', 'account_name', 'debtor', 'creditor', 'currency_name', 'exchange_rate', 'ac_debtor', 'ac_creditor'],
    functions: [
      {
        key: 'ac_creditor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 2 })
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
    load_after_store: true,
    headers: ['id', 'type', 'from_account_name', 'to_account_name', 'from_amount', 'exchange_rate', 'to_amount', 'status', 'created_at'],
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

  ];
  return resources;
}
