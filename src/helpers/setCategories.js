const { mainDashboard } = require('@/configs').default

const access = {
  change: ['Account_manager', 'SuperAdmin'],
  read: ['View_only']
}

export const setCategories = function (categories) {
  const section = mainDashboard.find(item => item.refresh === 'tickets')
  section.children = []
  categories.forEach((title, index) => section.children.push({
    title,
    route: 'tickets',
    path: `/tickets/${categories[index].toKebab()}`,
    params: { section: categories[index].toKebab() },
    icon: 'mdi-ballot-outline',
    access
  }))

  section.children.push({
    title: 'Archive',
    route: 'tickets-archived',
    path: '/tickets-archived',
    params: { section: 'archived' },
    icon: 'mdi-archive-search',
    access
  })

  window[Symbol.for('vue.instance')].$emit('ticket-categories-updated')

  return true
}
