export { default as AccountAutocomplete } from '../..\\components\\AccountAutocomplete.vue'
export { default as AddAccount } from '../..\\components\\AddAccount.vue'
export { default as AddAccountType } from '../..\\components\\AddAccountType.vue'
export { default as AddBeneficiary } from '../..\\components\\AddBeneficiary.vue'
export { default as AddCity } from '../..\\components\\AddCity.vue'
export { default as AddRole } from '../..\\components\\AddRole.vue'
export { default as AddType } from '../..\\components\\AddType.vue'
export { default as AutoAccount } from '../..\\components\\AutoAccount.vue'
export { default as AutoComplete } from '../..\\components\\AutoComplete.vue'
export { default as BaseFilter } from '../..\\components\\BaseFilter.vue'
export { default as BeneficiaryAutocomplete } from '../..\\components\\BeneficiaryAutocomplete.vue'
export { default as Boxes } from '../..\\components\\Boxes.vue'
export { default as Breadcrumbs } from '../..\\components\\Breadcrumbs.vue'
export { default as Card } from '../..\\components\\Card.vue'
export { default as CityAutocomplete } from '../..\\components\\CityAutocomplete.vue'
export { default as CountryAutocomplete } from '../..\\components\\CountryAutocomplete.vue'
export { default as CrudHeader } from '../..\\components\\CrudHeader.vue'
export { default as CurrencyAutoComplete } from '../..\\components\\CurrencyAutoComplete.vue'
export { default as CurrencySheet } from '../..\\components\\CurrencySheet.vue'
export { default as DataTable } from '../..\\components\\DataTable.vue'
export { default as DatePicker } from '../..\\components\\DatePicker.vue'
export { default as EditRole } from '../..\\components\\EditRole.vue'
export { default as ExchangeRow } from '../..\\components\\ExchangeRow.vue'
export { default as FileUpload } from '../..\\components\\FileUpload.vue'
export { default as IDsAutoComplete } from '../..\\components\\IDsAutoComplete.vue'
export { default as InputField } from '../..\\components\\InputField.vue'
export { default as LocaleTextInput } from '../..\\components\\LocaleTextInput.vue'
export { default as MenuComponent } from '../..\\components\\MenuComponent.vue'
export { default as NumberInput } from '../..\\components\\NumberInput.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as PhonesAutoComplete } from '../..\\components\\PhonesAutoComplete.vue'
export { default as RoleAutocomplete } from '../..\\components\\RoleAutocomplete.vue'
export { default as SideInfoTransfer } from '../..\\components\\SideInfoTransfer.vue'
export { default as SideMenu } from '../..\\components\\SideMenu.vue'
export { default as SliderCard } from '../..\\components\\SliderCard.vue'
export { default as TimePicker } from '../..\\components\\TimePicker.vue'
export { default as Title } from '../..\\components\\Title.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as TypeAutoComplete } from '../..\\components\\TypeAutoComplete.vue'
export { default as UserActiveAccounts } from '../..\\components\\UserActiveAccounts.vue'
export { default as UserAutocomplete } from '../..\\components\\UserAutocomplete.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as ChartsEighth } from '../..\\components\\charts\\eighth.vue'
export { default as ChartsFifth } from '../..\\components\\charts\\Fifth.vue'
export { default as ChartsFirst } from '../..\\components\\charts\\first.vue'
export { default as ChartsFourth } from '../..\\components\\charts\\Fourth.vue'
export { default as ChartsNinth } from '../..\\components\\charts\\ninth.vue'
export { default as ChartsSecond } from '../..\\components\\charts\\Second.vue'
export { default as ChartsSeventh } from '../..\\components\\charts\\seventh.vue'
export { default as ChartsSixth } from '../..\\components\\charts\\Sixth.vue'
export { default as ChartsTenth } from '../..\\components\\charts\\tenth.vue'
export { default as ChartsThird } from '../..\\components\\charts\\Third.vue'
export { default as FiltersBookFilter } from '../..\\components\\filters\\BookFilter.vue'
export { default as FiltersCategoryFilter } from '../..\\components\\filters\\CategoryFilter.vue'
export { default as FiltersCustomerFilter } from '../..\\components\\filters\\CustomerFilter.vue'
export { default as FiltersDetailedReportFilter } from '../..\\components\\filters\\DetailedReportFilter.vue'
export { default as FiltersInventoryBatchFilter } from '../..\\components\\filters\\InventoryBatchFilter.vue'
export { default as FiltersItemFilter } from '../..\\components\\filters\\ItemFilter.vue'
export { default as FiltersOrderFilter } from '../..\\components\\filters\\OrderFilter.vue'
export { default as FiltersReportFilter } from '../..\\components\\filters\\ReportFilter.vue'
export { default as ReportsAccountingReport } from '../..\\components\\reports\\AccountingReport.vue'
export { default as ReportsPartiesReportOneCurrTotal } from '../..\\components\\reports\\PartiesReportOneCurrTotal.vue'
export { default as ReportsPartiesReportTotals } from '../..\\components\\reports\\PartiesReportTotals.vue'
export { default as ReportsProfitReport } from '../..\\components\\reports\\ProfitReport.vue'
export { default as RoleAdd } from '../..\\components\\role\\Add.vue'
export { default as RoleBindPermission } from '../..\\components\\role\\BindPermission.vue'
export { default as RoleShowPermission } from '../..\\components\\role\\ShowPermission.vue'
export { default as SettingsAccounts } from '../..\\components\\settings\\Accounts\\Index.vue'
export { default as SettingsCloseingAccountsCreate } from '../..\\components\\settings\\CloseingAccounts\\Create.vue'
export { default as SettingsCloseingAccounts } from '../..\\components\\settings\\CloseingAccounts\\Index.vue'
export { default as SettingsOpeningAccountsCreate } from '../..\\components\\settings\\OpeningAccounts\\Create.vue'
export { default as SettingsOpeningAccounts } from '../..\\components\\settings\\OpeningAccounts\\Index.vue'
export { default as SettingsEntryCreate } from '../..\\components\\settings\\Entry\\Create.vue'
export { default as SettingsEntry } from '../..\\components\\settings\\Entry\\Index.vue'
export { default as SettingsUsersCreate } from '../..\\components\\settings\\Users\\Create.vue'
export { default as SettingsUsers } from '../..\\components\\settings\\Users\\Index.vue'
export { default as SettingsUsersRoleManagement } from '../..\\components\\settings\\Users\\RoleManagement.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
