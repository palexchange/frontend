export { default as AddBeneficiary } from '../..\\components\\AddBeneficiary.vue'
export { default as AutoComplete } from '../..\\components\\AutoComplete.vue'
export { default as BaseFilter } from '../..\\components\\BaseFilter.vue'
export { default as BeneficiaryAutocomplete } from '../..\\components\\BeneficiaryAutocomplete.vue'
export { default as Boxes } from '../..\\components\\Boxes.vue'
export { default as Breadcrumbs } from '../..\\components\\Breadcrumbs.vue'
export { default as Card } from '../..\\components\\Card.vue'
export { default as CrudHeader } from '../..\\components\\CrudHeader.vue'
export { default as CurrencySheet } from '../..\\components\\CurrencySheet.vue'
export { default as DataTable } from '../..\\components\\DataTable.vue'
export { default as DatePicker } from '../..\\components\\DatePicker.vue'
export { default as ExchangeRow } from '../..\\components\\ExchangeRow.vue'
export { default as FileUpload } from '../..\\components\\FileUpload.vue'
export { default as InputField } from '../..\\components\\InputField.vue'
export { default as LocaleTextInput } from '../..\\components\\LocaleTextInput.vue'
export { default as NumberInput } from '../..\\components\\NumberInput.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as SideMenu } from '../..\\components\\SideMenu.vue'
export { default as SliderCard } from '../..\\components\\SliderCard.vue'
export { default as TimePicker } from '../..\\components\\TimePicker.vue'
export { default as Title } from '../..\\components\\Title.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as FiltersBookFilter } from '../..\\components\\filters\\BookFilter.vue'
export { default as FiltersCategoryFilter } from '../..\\components\\filters\\CategoryFilter.vue'
export { default as FiltersCustomerFilter } from '../..\\components\\filters\\CustomerFilter.vue'
export { default as FiltersDetailedReportFilter } from '../..\\components\\filters\\DetailedReportFilter.vue'
export { default as FiltersInventoryBatchFilter } from '../..\\components\\filters\\InventoryBatchFilter.vue'
export { default as FiltersItemFilter } from '../..\\components\\filters\\ItemFilter.vue'
export { default as FiltersOrderFilter } from '../..\\components\\filters\\OrderFilter.vue'
export { default as FiltersReportFilter } from '../..\\components\\filters\\ReportFilter.vue'

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
