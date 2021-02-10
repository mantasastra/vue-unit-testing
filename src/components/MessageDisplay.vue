<template>
  <div>
    <p v-if="loading" data-testid="loading">loading...</p>
    <p v-else-if="error" data-testid="error-message">{{ error }}</p>
    <p v-else-if="!error && !loading" data-testid="message">
      {{ message.text }}
    </p>
  </div>
</template>

<script>
import { getMessage } from '@/services/axios'

export default {
  name: 'MessageDisplay',
  data() {
    return {
      message: {},
      loading: false,
      error: null,
    }
  },
  async created() {
    this.loading = true

    try {
      this.message = await getMessage()
    } catch (err) {
      this.error = 'Oops! Something went wrong!'
    }

    this.loading = false
  },
}
</script>

<style scoped></style>
