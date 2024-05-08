<template>
  <div class="flex h-screen flex-col">
    <header class="flex h-mehub-h-sm items-center justify-between px-5 md:px-6">
      <mehub-logo></mehub-logo>
    </header>

    <main class="flex-1 overflow-y-auto border-b border-t bg-grey-1">
      <div class="grid h-full w-full place-items-center">
        <slot></slot>
      </div>
    </main>

    <footer
      class="flex flex-col items-start gap-2 px-5 py-6 md:h-mehub-h-md md:flex-row md:items-center md:justify-between md:px-6 md:py-0 lg:mx-auto lg:w-mehub-w-md lg:px-0"
    >
      <switch-language-button class="mb-1 md:order-last md:mb-0"></switch-language-button>

      <div class="text-xs">{{ $t('footer.copyRight') }}</div>

      <div class="flex items-center">
        <div class="hover:is-link !text-xs">{{ $t('footer.policy') }}</div>

        <div class="mx-4 h-3 w-px border"></div>

        <div class="hover:is-link !text-xs">{{ $t('footer.terms') }}</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import MehubLogo from '@/assets/icon/logo.svg'
</script>
