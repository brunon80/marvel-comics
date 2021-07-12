export default function comicFactory(comic) {
  return ({
    id: comic?.id,
    title: comic?.title,
    image: `${comic.thumbnail?.path}.${comic?.thumbnail?.extension}`,
    isFavorite: false
  })
}