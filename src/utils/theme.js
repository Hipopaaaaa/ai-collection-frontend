// 控制主题切换
export function selectTheme(theme) {
  const el = document.querySelector('html')

  el.classList.remove('theme-light')
  el.classList.remove('theme-dark')
  el.classList.add('theme-' + theme)
  localStorage.setItem('theme', JSON.stringify(theme))
}

export function getTheme() {
  let theme = JSON.parse(localStorage.getItem('theme'))
  if (!theme) {
    // 如果没用主题设置默认主题为dark
    theme = 'dark'
  }
  return theme
}

// 获取系统主题
export function getSystemTheme() {
  if (process.client) {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return theme
  }
}
