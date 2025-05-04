<script setup lang="ts">
import type { Post } from '~/components/pages/blog/types'

interface Props {
  post: Post
}

interface Events {
  (e: 'like'): void
  (e: 'delete'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Events>()
</script>

<template>
  <div
      class="bg-surface border border-gray-100
           rounded-2xl shadow-md hover:shadow-lg
           transition p-6 space-y-4">
    <h2 class="text-2xl font-semibold text-textPrimary leading-snug break-words">
      {{ post.title }}
    </h2>

    <p class="text-gray-600 text-sm leading-relaxed break-words">
      {{ post.description }}
    </p>

    <div class="flex justify-between text-xs text-gray-400 font-medium">
      <span>Автор: {{ post.author_name }}</span>
      <span>{{ post.created_at }}</span>
    </div>
    <div class="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
      <button
          @click="emit('like')"
          class="group flex items-center gap-1 text-primary hover:text-primaryLight
               transition duration-150"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="post.isLiked ? 'currentColor' : 'none'"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7"
            class="w-5 h-5 group-active:scale-110 transition-transform"
        >
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.1-4.5-4.69-4.5
               -1.935 0-3.597 1.126-4.312 2.733
               -.715-1.607-2.377-2.733-4.313-2.733
               C5.1 3.75 3 5.765 3 8.25
               c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span class="text-sm font-medium select-none">
          {{ post.likes_count }}
        </span>
      </button>
      <button
          @click="emit('delete')"
          class="text-sm px-4 py-1.5 rounded-lg
               bg-red-600 text-white hover:bg-red-700
               active:scale-95 transition"
      >
        Удалить
      </button>
    </div>
  </div>
</template>
