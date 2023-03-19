import { createApp } from 'vue' 
import MyApp from './App.vue'
import "./index.css"
import router from './router'
import VCalendar from 'v-calendar';
import Userfront from "@userfront/core" ;  

const app = createApp(MyApp)

app.use(VCalendar)
app.use(router)
app.use(Userfront)
app.mount('#app')