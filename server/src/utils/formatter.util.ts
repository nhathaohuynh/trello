export const slugify = (text: string) => {
  if (!text) return ''

  return String(text)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const pagingSkip = (page: number, limit: number) => {
  if (!page || !limit) return 0

  if (page <= 0 || limit <= 0) return 0

  return 1 * (page - 1) * limit
}
