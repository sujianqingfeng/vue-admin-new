<script lang="ts" setup>
  import { watch } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  watch(router, () => {})
</script>
