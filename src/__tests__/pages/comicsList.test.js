import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import Root from '../../routes/Root'
import { DEFAULT_PAGE_SIZE } from '../../constants'

import '@testing-library/jest-dom/extend-expect'

describe('List of comics screen tests', () => {
  const timeConfig = {
    timeout: 2000
  }

  const setup = (route) => {
    const history = createMemoryHistory()
    if (route) history.push(route)

    const app = render(
        <Router history={history}>
          <Root  />
        </Router>
      )
    return({
      app,
      history
    })
  }

  it('should render a loading at startup', () => {
    const { app }= setup()
    const loading = app.getByLabelText('loading')
    expect(loading).toBeTruthy()
  })

  it('should render a list of comics', async () => {
    const { app }= setup()
    const comics = await app.findAllByLabelText('comic', {  }, timeConfig)
    expect(comics.length).toBe(DEFAULT_PAGE_SIZE)
  })

  it('should click on next page and load new comics', async () => {
    const { app }= setup()
    const leftClick = { button: 0 }

    const oldComics = await app.findAllByLabelText('comic', {  }, timeConfig)

    const next = await app.findByText(/Next Page/i, {}, timeConfig)
    userEvent.click(next, leftClick)
    
    const newComics = await app.findAllByLabelText('comic', {  }, timeConfig)

    oldComics.forEach((comic, index) => {
      expect(comic.textContent !== newComics[index].textContent).toBeTruthy()
    })
  })

  it('should search comics by character name', async () => {
    const { app }= setup()
    const seachInput = app.getByPlaceholderText('Type to search comics by character name and hit enter')
    fireEvent.focus(seachInput)
    fireEvent.change(seachInput, { target: { search: { value: 'deadpool' } } })
    fireEvent.submit(seachInput)

    const comics = await app.findAllByLabelText('comic-title', {  }, timeConfig)
    expect(comics[0].textContent.toLowerCase().includes('deadpool')).toBeTruthy()
  })

  it('should update search input when path changes', () => {
    const { app }= setup('/deadpool')
    const seachInput = app.getByPlaceholderText('Type to search comics by character name and hit enter')
    expect(seachInput.value).toBe('deadpool')
  })
})