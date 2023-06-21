<template>
  <q-skeleton type="QChip" />
</template>

<script lang="ts" setup>
const { logout } = useAuth()
onMounted(() => {
  logout()
  useRouter().push('/')
})
</script>

<style lang="scss" scoped>

</style>