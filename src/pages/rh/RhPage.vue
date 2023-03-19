<template>
  <div>
    <TabsComponente :tab-list="tabList">
      <template #tabPanel-1>
        <SolicitacoesPage />
      </template>
      <template #tabPanel-2>
        <SolicitacoesAprovadas />
      </template>
      <template #tabPanel-3>
        <SolicitacoesRecusadas />
      </template>
      <template #tabPanel-4>
        <HistoricList />
      </template>
    </TabsComponente>
  </div>
</template>

<script>
import TabsComponente from "@/components/TabsComponente.vue";
import SolicitacoesPage from "@/pages/rh/SolicitacoesPage.vue";
import HistoricList from "./HistoricList.vue";
import SolicitacoesAprovadas from "@/pages/rh/SolicitacoesAprovadas.vue"
import SolicitacoesRecusadas from "@/pages/rh/SolicitacoesRecusadas.vue"
import { title } from "@/store/title";

export default {
  name: "RhPage",
  components: {
    TabsComponente,
    SolicitacoesPage,
    SolicitacoesAprovadas,
    SolicitacoesRecusadas,
    HistoricList,
  },
  data() {
    return {
      tabList: [
        "Solicitações",
        "Aprovadas",
        "Recusadas",
        "Histórico",
      ],
      openTab: 0,
    };
  },
  mounted() {
    title.value = "Solicitações";
  },
  methods: {},
};
</script>
