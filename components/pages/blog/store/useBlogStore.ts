import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Post, DraftPost } from '../types'

export const useBlogStore = defineStore('blog', () => {
    const posts = ref<Post[]>([])
    const searchQuery = ref('')

    const filteredPosts = computed(() =>
        posts.value.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    )

    const addPost = (newPost: DraftPost) => {
        const post: Post = {
            ...newPost,
            id: Date.now(),
            created_at: new Date().toLocaleDateString(),
            likes_count: 0,
            isLiked: false,
        }
        posts.value.unshift(post)
    }


    const deletePost = (id: number) => {
        posts.value = posts.value.filter((post) => post.id !== id)
    }

    function likePost(id: number) {
        const post = posts.value.find(p => p.id === id)
        if (post) {
            if (post.isLiked) {
                post.likes_count--
                post.isLiked = false
            } else {
                post.likes_count++
                post.isLiked = true
            }
        }
    }

    return {
        posts,
        searchQuery,
        filteredPosts,
        addPost,
        deletePost,
        likePost,
    }
})
