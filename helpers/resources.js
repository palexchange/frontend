export default (context) => {
  let t = (v) => context.app.i18n.t(v);
  let boolean_string = (v) => v ? t('yes') : t('no');
  let resources = [{
    child: 'account',
    parent: '',
    load_after_store: false,
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
    child: 'exchange',
    parent: '',
    load_after_store: true,
    headers: ['id', 'date', 'amount', 'currency', 'party_name', 'number'],
  },
  {
    child: 'receipt',
    parent: '',
    load_after_store: true,
    headers: ['id', 'party_name', 'amount', 'currency', 'date', 'factor'],
  },
  {
    child: 'exchange_detail',
    parent: '',
    load_after_store: true,
    headers: ['id', 'exchange_id', 'amount', 'name', 'currency', 'factor', 'amount_after'],
    functions: [{
      key: 'name',
      f: v => {
        return v.context.app.i18n
      }
    }
    ]
  },
  {
    child: 'transfer',
    parent: '',
    load_after_store: true,
    headers: ['id', 'type', 'issued_at', 'status', 'sender_id_no', 'sender_phone', 'sender_address'],
    functions: [{
      key: 'type',
      f: v => {
        return v == 1 ? 'حوالة صادرة' : 'حوالة واردة'
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
    child: 'report',
    parent: '',
    has_headers: true

  },

  ];
  return resources;
}
