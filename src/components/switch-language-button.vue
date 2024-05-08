<template>
  <div class="!text-mehub-black dark:!text-mehub-white relative flex items-center gap-1 hover:cursor-pointer">
    <div class="flex items-center gap-1" @click="modal = true">
      <global-icon></global-icon>
      <div class="text-sm">{{ currentLang?.label }}</div>
      <el-icon size="small">
        <i-ep-arrow-down></i-ep-arrow-down>
      </el-icon>
    </div>

    <div
      v-if="modal"
      ref="modalRef"
      class="before:contents-[''] dark:bg-base-grey-8 absolute bottom-8 left-0 right-[unset] z-[100000] w-[160px] bg-white text-sm shadow before:absolute before:-top-4 before:h-4 before:w-full before:bg-transparent md:left-[unset] md:right-0 md:w-[216px] md:text-base"
    >
      <div
        v-for="(l, index) in locales"
        :key="index"
        class="flex h-10 w-full cursor-pointer items-center justify-between px-3 py-2 hover:bg-grey-1 hover:dark:bg-grey-7"
        @click="handleSwitchLang(l.locale)"
      >
        <div class="flex items-center gap-2">
          <img :src="loadImg(l.icon, context)" width="24" alt="" />
          <div>
            {{ l.label }}
          </div>
        </div>

        <i-ep-check v-if="l.locale === locale" class="text-sm"></i-ep-check>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GlobalIcon from '@/assets/icon/global.svg'
import { onClickOutside, useStorage } from '@vueuse/core'
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadImg } from '@/utils'
import { Environment } from '@/types'

const context = inject<Environment>('kcContext')

const locales = [
  {
    locale: 'vi',
    name: 'vie',
    label: 'Tiếng Việt',
    icon: '/img/vietnam.png',
  },
  {
    locale: 'en',
    name: 'ENG',
    label: 'English (US)',
    icon: '/img/usa.png',
  },
]

const { locale } = useI18n()

const modal = ref(false)
const modalRef = ref(null)

const currentLang = computed(() => {
  return locales.find(lang => lang.locale === locale.value)
})

const lang = useStorage('locale', '')

const handleSwitchLang = (value: string) => {
  locale.value = value
  lang.value = value
  modal.value = !modal.value
}

onClickOutside(modalRef, () => {
  modal.value = false
})
</script>
