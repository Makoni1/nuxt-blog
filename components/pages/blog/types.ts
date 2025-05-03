export interface Post {
    id: number
    title: string
    description: string
    likes_count: number
    created_at: string
    author_name: string
    isLiked: boolean
}

export interface DraftPost {
    title: string
    description: string
    author_name: string
}
