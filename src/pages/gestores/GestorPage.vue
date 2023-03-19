<template>
  <div>
    <TabsComponente :tab-list="tabList" color="color">
      <template #tabPanel-1>
        <SolicitacoesPage />
      </template>
    </TabsComponente>
  </div>
</template>

<script>
import TabsComponente from "@/components/TabsComponente.vue";
import SolicitacoesPage from "@/pages/rh/SolicitacoesPage.vue";
import { title } from "@/store/title";

export default {
  name: "GestorPage",
  components: {
    TabsComponente,
    SolicitacoesPage,
  },
  data() {
    return {
      color: 'orange-300',
      tabList: [
        "Solicitações",
        "Aprovadas",
        "Recusadas",
        "Histórico",
      ],
    };
  },
  mounted() {
    title.value = "Gestores";
  },
  methods: {},
};
</script>
