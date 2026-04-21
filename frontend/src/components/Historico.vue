<script setup>
import Sidebar from './Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const disciplinas = ref([])


onMounted(() => {
  // Carregar disciplinas do localStorage
  const saved = localStorage.getItem('disciplinas')
  if (saved) {
    disciplinas.value = JSON.parse(saved)
  }
})

const irParaRegistro = () => {
  router.push('/registro')
}


</script>