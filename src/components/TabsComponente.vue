<template>
  <!-- <DoubleDropdownButton></DoubleDropdownButton> -->
  <div class="items-center w-full">
    <div class="flex justify-between items-center mb-4">
      <ul class="mobile:flex">
        <li v-for="(tab, index) in tabList" :key="index" class="flex px-3 sm:px-4 py-1.5 text-sm sm:text-base" :class="{
          [`text-gray-500 md:border-b-2 md:border-gray-700 md:dark:border-gray-900  font-bold`]:
            index + 1 === activeTab,
          'text-grey': index + 1 !== activeTab,
        }">
          <label :for="`${index}`" class="cursor-pointer block" v-text="tab" />
          <input :id="`${index}`" v-model="activeTab" type="radio" :value="index + 1" class="hidden" />
        </li>
      </ul>
      <slot name="buttons" />
    </div>
    <template v-for="(tab, index) in tabList">
      <div v-if="index + 1 === activeTab" :key="index" class="flex-grow">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>
  
<script>
// import DoubleDropdownButton from "@/components/DoubleDropdownButton.vue"
export default {
  name: 'TabsComponente',
  components: {  },
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: () => 'vertical',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
    openTab: { type: Number, default: 1 },
  },
  emits: ['change-tab'],
  data: () => ({
    activeTab: 1,
  }),
  watch: {
    activeTab() {
      this.$emit('change-tab', this.activeTab)
    },
  },
  mounted() {
    if (this.openTab != 1) {
      this.activeTab = this.openTab
    }
  },
}
</script>
  