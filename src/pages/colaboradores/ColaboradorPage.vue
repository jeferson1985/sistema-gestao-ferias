<template>
  <div>
    <TabsComponente :tab-list="tabList" :color="color">
      <template #tabPanel-1>
        <SolicitacoesFerias />
      </template>
      <template #tabPanel-2>
        <SolicitacoesPage />
      </template>
      <template #tabPanel-3>
        <AlteraSenhaPage />
      </template>
    </TabsComponente>
  </div>
</template>

<script>
import TabsComponente from "@/components/TabsComponente.vue";
import SolicitacoesPage from "@/pages/rh/SolicitacoesPage.vue";
import SolicitacoesFerias from "@/pages/colaboradores/SolicitacaoFerias.vue";
import AlteraSenhaPage from "@/pages/colaboradores/AlteraSenhaPage";

export default {
  name: "ColaboradorPage",
  components: {
    TabsComponente,
    SolicitacoesPage,
    SolicitacoesFerias,
    AlteraSenhaPage,
  },
  data() {
    return {
      tabList: [
        "Solicitar férias",
        "Minhas solicitações",
        "Alterar senha",
      ],
    };
  },
};
</script>
