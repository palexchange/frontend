export default (context) => {
  let resources = [{
    child: 'account',
    parent: '',
    headers: ['account_number', 'name', 'code', 'type.name', 'is_transaction', 'description'],
    functions: [{
      key: 'account_number',
      f: (v) => context
    }],
    cachable: true
  },
  {
    child: 'assembly',
    parent: ''
  },
  {
    child: 'asset',
    parent: ''
  },
  {
    child: 'batch_assembly',
    parent: '',
    headers: ['date', 'item.name', 'amount', 'status', 'source_store.name', 'destination_store.name']
  },
  {
    child: 'beneficiary',
    parent: '',
    headers: ['code', 'name', 'role', 'email1', 'balance', 'phone1', 'status']
  },
  {
    child: 'bill',
    parent: '',
    headers: ['no', 'code', 'returned_from_bill_id', 'beneficiary.name', 'issue_date', 'net', 'discount_amount', 'vat', 'total_paid', 'total', 'status', 'delivered', 'due_date']
  },
  {
    child: 'casheer_session',
    parent: '',
    headers: ['id', 'pos.name', 'user.name', 'started_at', 'ended_at', 'revenue']
  },
  {
    child: 'consignment',
    parent: '',
    headers: ['code', 'type', 'date', 'source_store.name', 'destination_store.name', 'status']
  },
  {
    child: 'conversion_balance',
    parent: ''
  },
  {
    child: 'default_account',
    parent: ''
  },
  {
    child: 'depreciation',
    parent: ''
  },
  {
    child: 'disposal',
    parent: ''
  },
  {
    child: 'entry',
    parent: '',
    headers: ['no', 'statement', 'date', 'document_type', 'inverse_entry_id', 'status']
  },
  {
    child: 'expense',
    parent: '',
    headers: ['no', 'beneficiary.name', 'created_at', 'total', 'discount_amount', 'net', 'status']
  },
  {
    child: 'financial_setting',
    parent: ''
  },
  {
    child: 'fiscal_year',
    parent: ''
  },
  {
    child: 'item',
    parent: '',
    headers: ['name', 'code', 'collection.name', 'item_type_name', 'unit.name', 'selling_price', 'purchasing_price', 'available_amount', 'cost', 'balance']
  },
  {
    child: 'item_conversion',
    parent: ''
  },
  {
    child: 'note',
    parent: '',
    headers: ['id', 'issue_date', 'beneficiary.name', 'amount', 'status']
  },
  {
    child: 'p_o_s',
    parent: '',
    headers: ['id', 'name', 'beneficiary.name', 'store.name', 'tax.name', 'sales_account.name', 'payments_account.name', 'currency.name']
  },
  {
    child: 'purchase_order',
    parent: '',
    headers: ['no', 'beneficiary.name', 'issue_date', 'total', 'status', 'bill_no']
  },
  {
    child: 'quotation',
    parent: 'item',
  },
  {
    child: 'quotation',
    parent: '',
    headers: ['no', 'beneficiary.name', 'issue_date', 'total', 'status', 'bill_no']

  },
  {
    child: 'receipt',
    parent: '',
    headers: ['no', 'ref_no', 'beneficiary.name', 'account.name', 'amount', 'status', 'date']
  },
  {
    child: 'stock_count',
    parent: '',
    headers: ['code', 'date', 'status']
  },
  {
    child: 'store',
    parent: '',
    headers: ['name', 'is_main_store', 'address', 'notes']
  },
  {
    child: 'tax',
    parent: '',
    headers: ['id', 'name', 'account.name', 'description', 'percentage']
  },
  {
    child: 'transaction',
    parent: ''
  },
  {
    child: 'unit',
    parent: '',
    headers: ['name']
  },
  {
    child: 'user_activity',
    parent: ''
  },
  {
    child: 'user_invitation',
    parent: ''
  },
  {
    child: 'registration',
    parent: ''
  },
  {
    child: 'registration_activation',
    parent: ''
  },
  {
    child: 'plan',
    parent: ''
  },
  {
    child: 'currency',
    parent: ''
  },
  {
    child: 'business_type',
    parent: ''
  },
  {
    child: 'privacy_policy',
    parent: ''
  },
  {
    child: 'tenant',
    parent: '',
    headers: ['id', 'name', 'email', 'owner.name', 'owner.email', 'plan.name', 'created_at', 'subscription_expire_at']
  },
  {
    child: 'subscription',
    parent: '',
    headers: ['id', 'name', 'email', 'plan.name', 'created_at', 'subscription_expire_at']
  },
  {
    child: 'cost_center',
    parent: ''
  },
  {
    child: 'token',
    parent: 'tenant'
  },
  {
    child: 'account_type',
    parent: ''
  },
  {
    child: 'static_account',
    parent: ''
  },
  {
    child: 'password_reset',
    parent: ''
  },
  {
    child: 'entity',
    parent: ''
  },
  {
    child: 'coupon',
    parent: ''
  },
  {
    child: 'user',
    parent: ''
  },
  {
    child: 'user_email',
    parent: ''
  },
  {
    child: 'role',
    parent: ''
  },
  {
    child: 'payment',
    parent: ''
  },
  {
    child: 'collection',
    parent: 'bill'
  },
  {
    child: 'report',
    parent: '',
    has_headers: true
  },
  {
    child: 'setting',
    parent: '',
  },
  {
    child: 'bill_print',
    parent: '',
  },
  {
    child: 'print_template',
    parent: '',
  },
  ];
  return resources;
}
