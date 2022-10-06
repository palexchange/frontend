export default (context) => {
  let t = (v) => context.app.i18n.t(v);
  let boolean_string = (v) => v ? t('yes') : t('no');
  let resources = [{
    child: 'account',
    parent: '',
    load_after_store: true,
    headers: ['actions', 'account_number', 'name', 'code', 'type.name', 'is_transaction', 'description'],
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
    child: 'exchange',
    parent: '',
    load_after_store: true,
    headers: ['id', 'date', 'amount', 'currency_name', 'party_name', 'number'],
  },
  {
    child: 'receipt',
    parent: '',
    load_after_store: true,
    headers: ['id', 'party_name', 'amount', 'currency', 'date', 'factor'],
  },
  {
    child: 'account_type',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name', 'parent_name'],
  },
  {
    child: 'exchange_detail',
    parent: '',
    load_after_store: true,
    headers: ['id', 'exchange_id', 'amount', 'currency_name', 'factor', 'amount_after'],
  },
  {
    child: 'transfer',
    parent: '',
    load_after_store: true,
    headers: ['id', 'type', 'issued_at', 'status', 'sender_party_id'],
    functions: [{
      key: 'type',
      f: v => {
        return v == 0 ? 'حوالة صادرة' : 'حوالة واردة'
      }
    }
    ]
  },
  {
    child: 'user',
    parent: '',
    load_after_store: true,
    headers: ['id', 'name', 'email', 'phone', 'address', 'status', 'category', 'created_at'],
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
    functions: [
      {
        key: 'type_name',
        f: v => t(v)
      },
      // {
      //   key: 'a_balance',
      //   f: v => parseFloat(v).toFixed(4)
      // },
      // {
      //   key: 'balance',
      //   f: v => parseFloat(v).toFixed(4)
      // },
    ]
  },

  ];
  return resources;
}
