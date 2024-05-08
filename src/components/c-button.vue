<template>
  <button
    :class="{ ...objectSizeClass, ...objectTypeClass, ...objectPressClass, ...objectCommonClass }"
    :disabled="disabled"
    class="flex items-center justify-center gap-1 overflow-hidden"
    :type="tag"
    @mousedown="isPress = true"
    @mouseup="isPress = false"
  >
    <div v-if="slots.prefix && shape === 'normal'">
      <slot name="prefix"></slot>
    </div>

    <div :class="textClass">
      <slot></slot>
    </div>

    <div v-if="slots.suffix && shape === 'normal'">
      <slot name="suffix"></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    shape?: 'circle' | 'normal' | 'square'
    loading?: boolean
    size?: 'small' | 'medium' | 'large'
    type?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'overlay'
    disabled?: boolean
    textClass?: string
    isActive?: boolean
    tag?: 'button' | 'submit' | 'reset'
  }>(),
  {
    shape: 'normal',
    loading: false,
    size: 'medium',
    type: 'primary',
    disabled: false,
    textClass: undefined,
    isActive: false,
    tag: 'button',
  },
)

const slots = useSlots()
const isPress = ref(false)

const objectCommonClass = computed(() => {
  return {
    'rounded disabled:cursor-not-allowed border-[1px]': true,
    '!rounded-full !p-0 !aspect-square': props.shape === 'circle',
    '!aspect-square': props.shape === 'square',
    'animate-pulse duration-50': props.loading,
  }
})

const objectSizeClass = computed(() => {
  return {
    'h-6 px-2 py-1 text-xs': props.size === 'small',
    'h-8 px-3 py-2 text-xs': props.size === 'medium',
    'h-9 px-3 py-2 text-sm': props.size === 'large',
  }
})

const objectTypeClass = computed(() => {
  return {
    'bg-blue-5 text-white hover:bg-blue-4 disabled:text-grey-4 disabled:bg-grey-1 border-transparent':
      props.type === 'primary',
    'bg-grey-1 text-primary-text hover:bg-grey-2 disabled:text-grey-4 disabled:bg-grey-1 border-transparent':
      props.type === 'secondary',
    'bg-grey-0 text-primary-text hover:bg-grey-0 border-grey-2 hover:border-grey-5 disabled:text-grey-3 disabled:bg-grey-0 disabled:border-grey-2':
      props.type === 'outline',
    'bg-red-5 text-white hover:bg-red-4 disabled:text-grey-4 disabled:bg-grey-1 border-transparent':
      props.type === 'danger',
    'bg-grey-0 text-primary-text hover:bg-grey-2 disabled:text-grey-4 disabled:bg-grey-0 border-transparent':
      props.type === 'ghost',
    'bg-grey-9 bg-opacity-60 text-white hover:bg-opacity-80 disabled:text-grey-4 disabled:bg-grey-0 border-transparent':
      props.type === 'overlay',
  }
})

const objectPressClass = computed(() => {
  if (props.isActive) {
    return {
      '!bg-blue-5': props.type === 'primary',
      '!bg-grey-1': props.type === 'secondary' || props.type === 'ghost',
      '!border-grey-9': props.type === 'outline',
      '!bg-red-5': props.type === 'danger',
      '!bg-opacity-60': props.type === 'overlay',
    }
  }
  return (
    isPress.value && {
      '!bg-blue-5': props.type === 'primary',
      '!bg-grey-1': props.type === 'secondary' || props.type === 'ghost',
      '!border-grey-9': props.type === 'outline',
      '!bg-red-5': props.type === 'danger',
      '!bg-opacity-60': props.type === 'overlay',
    }
  )
})
</script>
