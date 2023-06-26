<template>
  <div class="bg-white h-auto py-6 rounded-md overflow-x-scroll">
    <h2 class="text-2xl text-gray-500 font-bold py-4">Regras CLT referente a Férias</h2>
    <ul class="flex flex-col justify-center items-start w-full px-10 py-6 space-y-1 text-gray-500 font-bold dark:text-gray-400">
      <li v-for="(rule, index) in vacationRules" :key="index"
        class="flex w-full items-center border-b-2 border-gray-500 focus-within:border-gray-600 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd" />
        </svg>
        {{ rule }}
      </li>
    </ul>
  </div>
</template>
  
<script>
import { title } from '@/store/title';

export default {
  name: 'RegrasClt',
  data() {
    return {
      vacationRules: [
        "Data da solicitação deve ser 30 dias apartir da data atual.",
        "Férias do tipo Integral o colaborador tem direito à 30 dias corridos de férias.",
        "Férias do tipo Venda, 20 dias corridos de férias e pode vender 10 dias para a empresa.",
        "Férias do tipo Parcial, será 03 (três) períodos, primeiro intervalo não poderá ser maior que 14 dias.",
        "O período de férias anuais é de, no mínimo, 30 dias corridos.",
        "É proibido o início das férias no período de dois dias que antecede feriado ou dia de repouso semanal remunerado!",
        "Durante as férias, o empregado recebe o salário normal acrescido de um terço!",
        "As férias devem ser concedidas até 12 meses após o período aquisitivo!",
        "Caso o empregado não usufrua das férias dentro do período determinado, o empregador deve pagá-las em dobro!",
      ],
    };
  },
  mounted() {
    title.value = `Regras CLT`
  }
};
</script>