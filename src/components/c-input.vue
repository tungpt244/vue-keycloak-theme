<template>
  <div ref="_target" class="c-input" :class="{ 'is-invalid': errorMessage }">
    <label v-if="label" :for="attrs?.name as string" class="mb-2 flex items-center space-x-1 text-sm">
      <span>{{ label }}</span>
      <el-tooltip v-if="tooltip" placement="top" effect="light" teleported popper-class="!rounded">
        <template #content>
          <div class="max-w-[240px] text-sm">{{ tooltip }}</div>
        </template>
        <question-icon class="cursor-pointer"></question-icon>
      </el-tooltip>
    </label>

    <div class="flex text-sm">
      <div class="relative flex min-w-0 flex-grow">
        <div
          class="flex flex-grow items-center overflow-hidden rounded border-[1px] bg-white px-2 hover:cursor-pointer disabled:cursor-not-allowed"
          :class="`${_inputBorderClass} ${_inputSizeClass} ${(slots.action || !!copy) && 'rounded-e-none'}`"
          @click="focus"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <div v-if="format === 'currency'" class="c-input_currency pr-1">
            {{ currency }}
          </div>

          <div v-else-if="slots.prefix" class="pr-1">
            <slot name="prefix"></slot>
          </div>

          <input
            :id="String(attrs?.name)"
            ref="_ref"
            v-model="defineModel"
            :name="String(attrs?.name)"
            class="min-w-0 flex-1 font-normal outline-none hover:cursor-text disabled:cursor-not-allowed"
            :disabled="disabled"
            :readonly="readOnly"
            :placeholder="placeholder"
            :class="_inputSizeClass"
            :type="type"
            @blur="handleBlur"
            @focus="handleFocus"
            @input="handleInput"
            @keydown="handleKeyDown"
          />

          <div v-if="clearable" class="pl-1" :class="{ 'w-5': !showClear }">
            <clear-icon v-show="showClear" class="w-4 cursor-pointer" @click.stop="handleClear"></clear-icon>
          </div>

          <div v-if="slots.suffix" class="pl-1">
            <slot name="suffix"></slot>
          </div>
        </div>
      </div>

      <c-copy
        v-if="copy"
        :size="size"
        :disabled="disabled"
        :value="copyValue ?? String(defineModel)"
        class="shrink-0 rounded-s-none border-l-transparent"
      ></c-copy>

      <div v-if="slots.action" class="shrink-0">
        <c-button
          type="outline"
          :size="size"
          :class="slots.action && 'rounded-s-none border-l-transparent'"
          :disabled="disabled"
          @click.stop="handleAction"
        >
          <slot name="action"></slot>
        </c-button>
      </div>
    </div>

    <div v-if="errorMessage && !hideMessage" class="mt-2 flex items-center space-x-1 text-xs text-danger">
      <close-icon class="shrink-0"></close-icon>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClearIcon from '@/assets/icon/clear.svg'
import CloseIcon from '@/assets/icon/error-message.svg'
import QuestionIcon from '@/assets/icon/question.svg'
import { computed, nextTick, onMounted, ref, useAttrs, useSlots } from 'vue'
import { formatCurrency, unCurrencyFormat } from '@/utils'
import { DEFAULT_CURRENCY, MAX_PRICE, SYMBOL_CURRENCY } from '@/constants'

const props = withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    modelValue?: string | number
    size?: 'small' | 'medium' | 'large'
    tooltip?: string
    clearable?: boolean
    errorMessage?: string
    hideMessage?: boolean
    disabled?: boolean
    autofocus?: boolean
    readOnly?: boolean
    type?: string
    format?: 'currency' | 'none'
    currency?: string
    maxPrice?: number
    copy?: boolean
    copyValue?: string
  }>(),
  {
    modelValue: undefined,
    label: undefined,
    placeholder: undefined,
    size: 'large',
    tooltip: undefined,
    clearable: false,
    errorMessage: undefined,
    hideMessage: false,
    disabled: false,
    autofocus: false,
    readonly: false,
    type: 'text',
    format: 'none',
    currency: DEFAULT_CURRENCY,
    maxPrice: MAX_PRICE,
    copy: false,
    copyValue: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string | number): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'input'): void
  (e: 'hover'): void
  (e: 'action'): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const _ref = ref<HTMLInputElement>()
const _target = ref<HTMLElement>()

const isHover = ref(false)
const isFocus = ref(false)
const isTyping = ref(false)
const showClear = computed(() => {
  return props.clearable && defineModel.value && isHover.value
})

const focus = () => {
  isFocus.value = true
  _ref.value?.focus()
}

const blur = () => {
  isFocus.value = false
  isTyping.value = false
  _ref.value?.blur()
}

const mouseenter = () => {
  isHover.value = true
}

const mouseleave = () => {
  isHover.value = false
}

const handleInput = () => {
  emit('input')
  isTyping.value = true
}

const handleBlur = () => {
  emit('blur')
  blur()
}

const handleFocus = () => {
  emit('focus')
  focus()
}

const handleClear = () => {
  emit('update:modelValue', '')
  focus()
}

const handleAction = () => {
  emit('action')
}

onMounted(async () => {
  await nextTick()
  if (_ref.value && props.autofocus) {
    isFocus.value = true
    _ref.value?.focus()
  }
})

const _inputSizeClass = computed(() => {
  if (props.size === 'large') return 'h-9'
  if (props.size === 'medium') return 'h-8'
  return ''
})

const _inputBorderClass = computed(() => {
  if (props.disabled) return 'border-grey-1 !cursor-not-allowed !bg-grey-1 !text-grey-4'
  if (props.errorMessage) return 'border-danger'
  if (isFocus.value) return 'border-grey-9'
  if (isHover.value) return 'border-grey-5'
  return 'border-grey-2'
})

const computedModel = computed(() => {
  if (!props.modelValue || props.format !== 'currency') {
    return props.modelValue
  }

  if (props.modelValue && typeof props.modelValue === 'string') {
    return formatCurrency(parseInt(props.modelValue), 0, SYMBOL_CURRENCY)
  }

  return formatCurrency(props.modelValue, 0, SYMBOL_CURRENCY)
})

const validateValue = (value: number | string) => {
  if (Number(value) > props.maxPrice) {
    return false
  }
  return true
}

const handleUpdateModelValue = (value: string | number | undefined) => {
  if (!value) return

  if (props.format !== 'currency') {
    return emit('update:modelValue', value)
  }

  value = unCurrencyFormat(value)
  if (!validateValue(value)) {
    return
  }

  return emit('update:modelValue', value)
}

const BLOCKED_CHARACTERS = ['+', '-', 'E', 'e']
const handleKeyDown = (e: Event | KeyboardEvent) => {
  if (props.format !== 'currency') return
  if (BLOCKED_CHARACTERS.includes((e as KeyboardEvent).key)) {
    e.preventDefault()
  }
}

const defineModel = computed({
  get: () => {
    return computedModel.value
  },
  set: handleUpdateModelValue,
})

defineExpose({
  focus,
  blur,
})
</script>

<style lang="scss">
/* Hide arrow input type number */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield; /* eslint-disable-line */
}
</style>
