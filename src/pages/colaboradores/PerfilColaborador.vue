<template>
  <div class="flex flex-col bg-white h-128 rounded-lg">
    <h1 class="flex px-8 py-4 font-bold">Dados do colaborador</h1>
    <div class="flex">
      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Nome</h1>
        <span class="flex">{{ dataList.dadosColaborador.nome }}</span>
        <hr />
        <h1 class="flex text-light-gray">CPF</h1>
        <span class="flex">{{ dataList.dadosColaborador.cpf }}</span>
        <hr />
      </div>

      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Sobrenome</h1>
        <span class="flex">{{ dataList.dadosColaborador.sobreNome }}</span>
        <hr />
        <h1 class="flex text-light-gray">RG</h1>
        <span class="flex">{{ dataList.dadosColaborador.rg }}</span>
        <hr />
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">E-mail</h1>
        <span class="flex">{{ dataList.dadosColaborador.email }}</span>
        <hr />
      </div>
      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Telefone</h1>
        <span class="flex">{{ dataList.dadosColaborador.telefone }}</span>
        <hr />
      </div>
      <P></P>
    </div>
    <h1 class="flex px-8 py-4">Endereço colaborador</h1>
    <div class="flex">
      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Endereço</h1>
        <span class="flex">{{ dataList.enderecoColaborador.logradouro }}</span>
        <hr />
        <h1 class="flex text-light-gray">Complemento</h1>
        <span class="flex">{{ dataList.enderecoColaborador.complemento }}</span>
        <hr />
      </div>

      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Número</h1>
        <span class="flex">{{ dataList.enderecoColaborador.numero }}</span>
        <hr />
        <h1 class="flex text-light-gray">CEP</h1>
        <span class="flex">{{ dataList.enderecoColaborador.cep }}</span>
        <hr />
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Bairro</h1>
        <span class="flex">{{ dataList.enderecoColaborador.bairro }}</span>
        <hr />
        <h1 class="flex text-light-gray">Estado</h1>
        <span class="flex">{{ dataList.enderecoColaborador.estado }}</span>
        <hr />
      </div>

      <div class="flex flex-col w-1/2 gap-4 px-8 py-4">
        <h1 class="flex text-light-gray">Cidade</h1>
        <span class="flex">{{ dataList.enderecoColaborador.cidade }}</span>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerfilColaborador",
  data: () => ({
    dataList: {
      dadosColaborador: {
        nome: 'Carlos',
        sobreNome: 'Silva',
        cpf: '033.654.986-77',
        rg: '4.895.623',
        email: 'senac@gmail.com',
        telefone: '048999653256'
      },
      enderecoColaborador: {
        logradouro: 'Rua da praça',
        numero: '123',
        complemento: 'complemento',
        cep: '00000-000',
        bairro: 'Bairro da praça',
        estado: 'Estado da praça',
        cidade: 'Palhoça'
      },
    }
  }),
  mounted() {
    const tab = this.$route.query.tab;
    const tabNumber = parseInt(tab);
    if (!isNaN(tabNumber)) {
      this.openTab = tabNumber;
    } else {
      this.openTab = 1;
    }
  },
  methods: {},
};
</script>

<style>
h1 {
  font-weight: bold;
}
</style>
