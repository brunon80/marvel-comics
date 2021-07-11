import { Comic } from '../../molecules'
import { render, fireEvent } from '@testing-library/react'

describe('Comic tests', () => {
  const img = 'https://kanto.legiaodosherois.com.br/fnoop/wp-content/uploads/2018/06/legiao_YsS1ljO9w0Vf6mdEZXD4gaCtIheULo8iMGAxzpF_vu.jpg'
  const year ='1986'
  const number = '#36'
  const title = 'Teste de título'
  const onToggleFavorite = jest.fn()

  const setup = () => {
    const utils = render(
      <Comic
        title={title}
        number={number}
        year={year}
        image={img}
        onToggleFavorite={onToggleFavorite}
      />
    )
    const comic = utils.getByLabelText('comic')
    return {
      comic,
      ...utils,
    }
  }

  it('should render a comic', () => {
    const {comic} = setup()
    expect(comic).toBeInTheDocument()
  })

  it('should render a comic with a image', () => {
    const { getByAltText } = setup()
    const image = getByAltText('comic-img')
    expect(image).toBeTruthy()
    expect(image.src).toBe(img)
  })

  it('should render a comic with a title', () => {
    const { getByText } = setup()
    const titleComp = getByText(title)
    expect(titleComp).toBeInTheDocument()
  })

  it('should render a comic with a caption', () => {
    const { getByText } = setup()
    const yearComp = getByText(`${year} ${number}`)
    expect(yearComp).toBeInTheDocument()
  })

  it('should render a comic with a favorite', () => {
    const { getByLabelText } = setup()
    const favorite = getByLabelText('comic-favorite')
    expect(favorite).toBeInTheDocument()
  })

  it('should fire a favorite toggle event', () => {
    const { getByLabelText } = setup()
    const favorite = getByLabelText('comic-favorite')
    fireEvent.click(favorite)
    expect(onToggleFavorite).toHaveBeenCalled()
  })

})