<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBlogStore } from '~/components/pages/blog/store/useBlogStore'
import AddPostForm from '~/components/pages/blog/components/AddPostForm.vue'
import PostSearch from '~/components/pages/blog/components/PostSearch.vue'
import PostCard from '~/components/pages/blog/components/PostCard.vue'

const store = useBlogStore()
const { filteredPosts, searchQuery } = storeToRefs(store)
const { addPost, deletePost, likePost } = store
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 space-y-4">
    <AddPostForm @submit="addPost" />
    <PostSearch v-model="searchQuery" />
    <TransitionGroup
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-90"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0 scale-90"
    >
      <PostCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @like="likePost(post.id)"
          @delete="deletePost(post.id)"
      />
    </TransitionGroup>
  </div>
</template>

