<template>
  <div>
    <button v-if="loggedIn" data-testid="logout-button">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      loggedIn: false,
    }
  },
}
</script>

<style scoped></style>
