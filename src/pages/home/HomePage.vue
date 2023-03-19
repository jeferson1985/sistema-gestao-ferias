<template>
  <div class="flex justify-center rounded-md bg-white h-full overflow-hidden px-16 py-24">
    <h1 class="absolute a51:top-32 mobile:top-28 top-24 left-16 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-700 md:hidden">Sunset</h1>
    <div
      class="card md:flex justify-center px-10 py-12 w-auto md:w-full hidden h-64 md:h-96 lg:h-96 xl:h-48 text-2xl font-extrabold text-transparent rounded-lg">
      <h1 class="text-white font-extrabold">{{ typedText }}
      </h1>
    </div>
    <img src="https://img.freepik.com/fotos-gratis/turista-apontando-para-cima_1368-7017.jpg?w=2000" alt=""
      class="max-w-md h-img 2xl:h-big" />
  </div>
</template>

<script>
import { title } from "@/store/title";
import { addMessage } from "@/store/alert";
import api from "@/services/api";

export default {
  name: "HomePage",
  data: () => ({
    user_info: "",
    complete_name: "",
    first_name: "",
    last_name: "",
    typedText: "",
    text: "Supere desafios, acredite em si mesmo e ilumine o mundo com sua força e determinação!",
    speed: 50,
  }),
  async mounted() {
    try {
      await this.getUsers(); // Aguarda a conclusão da função getUsers()
      const user_name = this.user_info.complete_name;
      title.value = `Bem Vindo à Sunset - ${user_name}`;
    } catch (error) {
      console.error(error);
    }
    this.typeWriterEffect()
  },
  methods: {
    typeWriterEffect() {
      let index = 0;

      const type = () => {
        if (index < this.text.length) {
          this.typedText += this.text.charAt(index);
          index++;
          setTimeout(type, this.speed);
        }
      };

      type();
    },
    async getUsers() {
      try {
        const response = await api.get(`/api/v1/whoami/`);
        const data = response.data;
        this.user_info = {
          complete_name: data.first_name + " " + data.last_name,
        };
      } catch (error) {
        addMessage("error", error);
      }
    },
  },
};
</script>

<style>
.card {
  transform: translateY(0);
  box-shadow:
    inset 0 0 60px whitesmoke,
    inset 20px 0 80px #f0f,
    inset -20px 0 80px #0ff,
    inset 20px 0 300px #f0f,
    inset -20px 0 300px #0ff,
    0 0 50px #fff,
    10px 0 80px rgb(254, 255, 255);
}
</style>