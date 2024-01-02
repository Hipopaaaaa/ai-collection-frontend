import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllBlogs } from '../api/blogs'

export const useBlogStore = defineStore('Blogs', () => {
  const BlogsList = ref([])
  const isBlogsListEmpty = ref(true)

  // 获取所有博客列表
  const setBlogsList = async () => {
    if (!isBlogsListEmpty.value) {
      return
    }
    const res = await getAllBlogs()
    // console.log('blogsNum', res.length)
    function htmlToPlainText(htmlString) {
      // 使用正则表达式去除HTML标签和HTML实体，并去除换行符、制表符、回车符等空白字符，但保留空格符号
      let plainText = htmlString.replace(/<[^>]*>|&[^;]+;|[\t\r\n]/g, '')

      return plainText
    }
    BlogsList.value = res.map((item) => {
      return {
        slug: item.slug,
        title: {
          rendered: item.title.rendered
        },
        content: htmlToPlainText(item.content.rendered),
        modified: item.modified,
        yoast_head_json: {
          og_image: [
            {
              url: item?.yoast_head_json?.og_image?.[0]?.url
            }
          ]
        }
      }
    })
    isBlogsListEmpty.value = false
  }
  const relactBlogs = ref([])

  // 获取相关文章
  const getRelactBlogs = async (slug) => {
    if (isBlogsListEmpty.value) {
      // console.log('列表为空')
      await setBlogsList()
    }
    const index = BlogsList.value.indexOf(BlogsList.value.find((item) => item.slug === slug))
    // console.log(BlogsList.value.find((item) => item.slug === slug))
    // console.log(index)
    // console.log(BlogsList.value)
    if (index === -1) {
      // console.log('没有找到该文章')
      return []
    }
    if (BlogsList.length < 4) {
      // console.log(BlogsList.value)
      relactBlogs.value = BlogsList.value
      return BlogsList.value
    }
    relactBlogs.value = [
      BlogsList.value[(index + 1) % BlogsList.value.length],
      BlogsList.value[(index + 2) % BlogsList.value.length],
      BlogsList.value[(index + 3) % BlogsList.value.length]
    ]
    // console.log(relactBlogs.value)

    return relactBlogs.value
  }

  return { BlogsList, setBlogsList, getRelactBlogs, relactBlogs }
})