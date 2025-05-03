<script setup lang="ts">
interface Props { modelValue: string }
const props = defineProps<Props>()
const emit = defineEmits<{ (e:'update:modelValue', v:string):void }>()

const update = (e: Event) =>
    emit('update:modelValue', (e.target as HTMLInputElement).value)

const clear  = () => emit('update:modelValue', '')
</script>

<template>
  <div class="relative w-full">
    <input
        :value="modelValue"
        @input="update"
        type="text"
        placeholder="Поиск по заголовку…"
        class="w-full px-4 py-2 pr-12 rounded-lg shadow-sm
             bg-surface text-textPrimary
             focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <button
        v-if="modelValue"
        @click="clear"
        class="absolute right-3 top-1/2 -translate-y-1/2
             flex items-center justify-center
             w-8 h-8 rounded-full
             bg-primaryLight/20 text-primary
             hover:bg-primaryLight hover:text-white
             transition"
        aria-label="Очистить"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-[18px] h-[18px]" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="3"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

