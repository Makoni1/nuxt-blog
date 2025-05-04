<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DraftPost } from '~/components/pages/blog/types'

interface Events {
  (e: 'submit', post: DraftPost): void
}
const emit = defineEmits<Events>()
const form = ref<DraftPost>({
  title: '',
  description: '',
  author_name: '',
})

const errors = ref<Record<string, string>>({})
const submitted = ref(false)

watch(() => form.value.title, (val) => {
  if (val.trim().length >= 5) delete errors.value.title
})
watch(() => form.value.description, (val) => {
  if (val.trim()) delete errors.value.description
})
watch(() => form.value.author_name, (val) => {
  if (val.trim()) delete errors.value.author_name
})

function validate() {
  errors.value = {}

  if (form.value.title.trim().length < 5)
    errors.value.title = 'Название должно быть минимум 5 символов'

  if (!form.value.description.trim())
    errors.value.description = 'Описание обязательно'

  if (!form.value.author_name.trim())
    errors.value.author_name = 'Автор обязателен'

  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  submitted.value = true
  if (!validate()) return

  emit('submit', { ...form.value })
  form.value = { title: '', description: '', author_name: '' }
  submitted.value = false
}
</script>

<template>
  <form
      @submit.prevent="handleSubmit"
      class="bg-surface border border-gray-100 shadow-xl rounded-2xl p-8 space-y-6"
  >
    <h3 class="text-2xl font-semibold text-textPrimary">Новый пост</h3>

    <div class="space-y-1">
      <label class="text-sm font-medium text-gray-600">Заголовок</label>
      <input
          v-model="form.title"
          type="text"
          placeholder="Введите заголовок"
          :class="[
          'w-full px-4 py-2 rounded-lg shadow-sm outline-none',
          submitted && errors.title
            ? 'border-2 border-red-500 focus:ring-red-400'
            : 'border border-gray-300 focus:ring-2 focus:ring-primary'
        ]"
      />
      <p v-if="submitted && errors.title" class="text-xs text-red-600">
        {{ errors.title }}
      </p>
    </div>

    <div class="space-y-1">
      <label class="text-sm font-medium text-gray-600">Описание</label>
      <textarea
          v-model="form.description"
          rows="3"
          placeholder="Введите краткое описание"
          :class="[
          'w-full px-4 py-2 rounded-lg shadow-sm resize-none outline-none',
          submitted && errors.description
            ? 'border-2 border-red-500 focus:ring-red-400'
            : 'border border-gray-300 focus:ring-2 focus:ring-primary'
        ]"
      />
      <p v-if="submitted && errors.description" class="text-xs text-red-600">
        {{ errors.description }}
      </p>
    </div>

    <div class="space-y-1">
      <label class="text-sm font-medium text-gray-600">Автор</label>
      <input
          v-model="form.author_name"
          type="text"
          placeholder="Имя автора"
          :class="[
          'w-full px-4 py-2 rounded-lg shadow-sm outline-none',
          submitted && errors.author_name
            ? 'border-2 border-red-500 focus:ring-red-400'
            : 'border border-gray-300 focus:ring-2 focus:ring-primary'
        ]"
      />
      <p v-if="submitted && errors.author_name" class="text-xs text-red-600">
        {{ errors.author_name }}
      </p>
    </div>


    <div class="pt-2">
      <button
          type="submit"
          class="px-6 py-2 rounded-lg font-medium text-white
               bg-primary hover:bg-primaryLight
               transition active:scale-95"
      >
        Добавить пост
      </button>
    </div>

    <p
        v-if="submitted && Object.keys(errors).length > 0"
        class="text-xs text-gray-500 pt-2"
    >
      • Все поля обязательны для заполнения.
    </p>
  </form>
</template>
