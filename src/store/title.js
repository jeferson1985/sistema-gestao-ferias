import { ref, readonly } from 'vue'

const title_name = localStorage.getItem('title') || 'Título'
export const title = ref(title_name)

const sidebar = ref(false)

export const toggle_sidebar = (mode = 'none') => {
  if (mode === 'show') {
    sidebar.value = true
  } else if (mode === 'dismiss') {
    sidebar.value = false
  } else {
    sidebar.value = !sidebar.value
  }
}

export const show_sidebar = readonly(sidebar)
