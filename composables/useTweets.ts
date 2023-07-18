// @ts-ignore
import { useState } from '#app'
import { Tweet } from '@prisma/client'
import { Ref, ref } from 'vue'
export default () => {

  const usePostTweetModal = () => useState('post_tweet_modal', () => ref(false))
  const useReplyTweet = () => useState('reply_tweet', () => ref({}) as Ref<Partial<Tweet>>)

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = false
  }

  const setReplyTo = (tweet: Ref<Partial<Tweet>>) => {
    const replyTweet = useReplyTweet()
    replyTweet.value = tweet
  }

  const openPostTweetModal = (tweet = []) => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = true
    // @ts-ignore
    setReplyTo(tweet)
  }

  const postTweet = (formData: { text: string | Blob; replyTo: string | Blob; mediaFiles: string[] }) => {
    const form = new FormData()

    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)

    formData.mediaFiles.forEach((mediaFile: string, index: number) => {
      form.append('media_file_' + index, mediaFile)
    })

    return useFetchApi('/api/user/tweets', {
      // @ts-ignore
      method: 'POST',
      body: form
    })
  }

  const getTweets = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi('/api/tweets', {
          // @ts-ignore
          method: 'GET',
        })

        resolve(response)
      } catch (error) {
        note.error('Could not get tweets!')
        reject(error)
      }
    })
  }

  const getTweetById = (tweetId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`)

        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }
  const getTweetsByUser = (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/usertweets/${id}`)

        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    postTweet,
    getTweets,
    getTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
    getTweetsByUser
  }
}