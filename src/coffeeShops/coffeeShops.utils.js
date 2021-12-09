export const parseCategory = (category) => {
  let categoryObj = []
  if (category) {
    const categories = category.match(/#[\w]+/g)
    categoryObj = categories.map((element) => ({
      where: { name: element },
      create: { name: element, slug: element },
    }))
  }
  return categoryObj
}
