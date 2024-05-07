<template>
  <div class="p-2 text-2xl">Login</div>

  <button @click="count++">count is {{ count }}</button>

  <form :action="context?.urls.loginAction" class="flex flex-col space-y-2 bg-slate-50 p-4">
    <input v-model="state.username" type="text" name="username" class="border" />
    <input v-model="state.password" type="password" name="password" class="border" />

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { Environment } from '@/types'
import { reactive } from 'vue'
const count = ref(0)
const context = inject<Environment>('kcContext')

const state = reactive({
  username: '',
  password: '',
})
</script>
