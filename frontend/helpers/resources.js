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
    child: 'assembly',
    parent: ''
  },
  {
    child: 'item',
    parent: '',
    headers:['id','image_url','name','price','price1','price2','price3','description','created_at']
  },
  {
    child: 'daily_meal',
    parent: '',
    headers:['id','item.name','item.image_url','date']
  },
  {
    child: 'order',
    parent: '',
    headers:['id','user.name','total','created_at','status','notes'],
  },
  {
    child: 'user',
    parent: '',
    headers:['id','name','email','phone','address','status','category','created_at'],
  },
  {
    child: 'order_item',
    parent: 'order',
    headers:['id','order_id','item.name','qty','item_price']
  },
  {
    child: 'report',
    parent: '',
    has_headers: true
  },
  ];
  return resources;
}
