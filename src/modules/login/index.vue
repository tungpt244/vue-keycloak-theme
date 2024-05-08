<template>
  <default-layout>
    <div class="flex h-full w-full bg-white md:h-fit md:w-mehub-w-sm lg:w-mehub-w-md">
      <div class="hidden flex-1 border-r px-6 py-9 lg:block lg:px-9">
        <div class="mb-9"><img :src="loadImg('/img/welcome.png', context)" width="360" alt="" /></div>

        <div class="space-y-2">
          <div class="text-2xl font-semibold">{{ t('auth.login.welcome') }}</div>
          <div>{{ t('auth.login.welcome_') }}</div>
        </div>
      </div>

      <div class="w-full px-6 py-9 md:w-mehub-w-sm lg:px-9">
        <div class="mb-4 text-xl font-semibold">{{ t('auth.login.title') }}</div>

        <form :action="context?.urls.loginAction" method="POST" class="flex flex-col space-y-3">
          <c-input v-model="state.username" name="username" :label="t('auth.login.email')" />

          <c-input
            v-model="state.password"
            :type="showPassword ? 'password' : 'text'"
            name="password"
            :label="t('auth.login.password')"
          >
            <template v-if="state.password" #suffix>
              <eye-open v-if="showPassword" class="w-4" @click.stop="toggle"></eye-open>
              <eye-close v-else class="w-4" @click.stop="toggle"></eye-close>
            </template>
          </c-input>

          <div class="flex items-center justify-between">
            <div>
              <div
                v-if="context?.permissions.rememberMe && !context.permissions.usernameEditDisabled"
                class="flex items-center space-x-2"
              >
                <el-checkbox></el-checkbox>
                <span>{{ t('auth.login.rememberMe') }}</span>

                <input name="rememberMe" type="hidden" :checked="state.loginRememberMe" />
              </div>
            </div>

            <a :href="context?.urls.loginResetCredentials" class="is-link">
              {{ t('auth.forgotPassword.title') }}
            </a>
          </div>

          <div class="py-2">
            <c-button size="large" type="primary" tag="submit" class="w-full">{{ t('auth.login.title') }}</c-button>
          </div>

          <div v-if="context?.social" class="space-y-4">
            <div class="flex items-center">
              <div class="h-px w-full border-t"></div>
              <div class="px-4">{{ t('auth.login.or') }}</div>
              <div class="h-px w-full border-t"></div>
            </div>
            <div class="space-y-3">
              <a :href="context.social[0].loginUrl" class="block">
                <c-button type="outline" size="large" class="w-full">
                  {{ t('auth.login.continueWith', { social: 'Google' }) }}
                  <template #prefix>
                    <google-icon class=""></google-icon>
                  </template>
                </c-button>
              </a>

              <a :href="context.social[0].loginUrl" class="block">
                <c-button type="outline" size="large" class="w-full">
                  {{ t('auth.login.continueWith', { social: 'Youtube' }) }}
                  <template #prefix>
                    <youtube-icon class="mr-px"></youtube-icon>
                  </template>
                </c-button>
              </a>
            </div>
          </div>

          <div class="mt-2 flex items-center justify-center space-x-1 py-1">
            <span>{{ t('auth.login.dontHaveAccount') }}</span>
            <a class="is-link" :href="context?.urls.registration">{{ t('auth.login.register') }}</a>
          </div>
        </form>
      </div>
    </div>
  </default-layout>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EyeOpen from '@/assets/icon/eye-open.svg'
import EyeClose from '@/assets/icon/eye-close.svg'
import GoogleIcon from '@/assets/icon/google.svg'
import YoutubeIcon from '@/assets/icon/youtube.svg'
import { loadImg } from '@/utils'

import { Environment } from '@/types'

const context = inject<Environment>('kcContext')
const showPassword = ref(false)
const toggle = () => {
  showPassword.value = !showPassword.value
}

const { t } = useI18n()

const state = reactive({
  username: '',
  password: '',
  loginRememberMe: context?.forms.loginRememberMe,
})
</script>
