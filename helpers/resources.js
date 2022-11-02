export default (context) => {
  let t = (v) => context.app.i18n.t(v);
  let boolean_string = (v) => v ? t('yes') : t('no');
  let documents = (v) => ['', t('transfer'), t('exchange'), t('fund_adjusment'), t('inputs'), t('outputs')][v]
  let transactions = (v) => [t('outcoming'), t('incoming')][v]
  let resources = [{
    child: 'account',
    parent: '',
    load_after_store: true,
    headers: ['id', 'account_number', 'name', 'code', 'type.name', 'is_transaction', 'description'],
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
    load_after_store: true,
    headers: ['id', 'date', 'amount', 'currency_name', 'party_name', 'number'],
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
    headers: ['id', 'exchange_id', 'amount', 'currency_name', 'factor', 'amount_after'],
  },
  {
    child: 'transfer',
    parent: '',
    load_after_store: true,
    headers: ['id', 'type', 'issued_at', 'status', 'sender_party.name'],
    functions: [
      {
        key: 'type',
        f: v => {
          return v == 0 ? 'حوالة صادرة' : 'حوالة واردة'
        }
      },
      {
        key: 'status',
        f: v => {
          return v == 1 ? 'معتمدة' : 'مسودة'
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

        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 4 })
      },
      {
        key: 'ac_creditor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 4 })
      },
      {
        key: 'ac_debtor',
        f: v => parseFloat(v).toLocaleString(undefined, { minimumFractionDigits: 4 })
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
    headers: ['id', 'statement', 'created_at'],
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
  },
  {
    child: 'receipt',
    parent: '',
    load_after_store: true,
    headers: ['id', 'type', 'from_account_name', 'to_account_name', 'from_amount', 'exchange_rate', 'to_amount', 'created_at']
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
