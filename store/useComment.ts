import { create } from 'zustand'

interface CommentStore {
  commentCreate: boolean
  setCommentCreate: (value: boolean) => void
}

const useComment = create<CommentStore>((set) => ({
  commentCreate: false,
  setCommentCreate: (value) => set({ commentCreate: value }),
}))

export default useComment
