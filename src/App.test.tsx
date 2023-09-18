import React from 'react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import resources from './locales/index'

beforeEach(() => {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  )
})

test('renders learn react link', () => {
  const linkElement = screen.getByText(/todo list/i)
  expect(linkElement).toBeInTheDocument()
})

describe('Task test', () => {
  test('add todo', () => {
    const linkElement = screen.getByTestId('addTask')
    userEvent.type(linkElement, 'CLEAN THE DISHES{enter}')
    const newTask = screen.getByText('CLEAN THE DISHES')

    expect(newTask).toBeInTheDocument()
  })

  test('delete Task', () => {
    const linkElement = screen.getByTestId('addTask')
    userEvent.type(linkElement, 'CLEAN THE DISHES{enter}')
    const newTask = screen.getByText('CLEAN THE DISHES')
    const newTaskCheckbox = screen.getByTestId('CLEAN THE DISHES')

    const cleanComplitedBtn = screen.getByText('Clear Complited')

    expect(newTaskCheckbox).toBeInTheDocument()

    if (newTaskCheckbox) userEvent.click(newTaskCheckbox)
    userEvent.click(cleanComplitedBtn)

    expect(newTask).not.toBeInTheDocument()
  })

  test('show Active Tasks', () => {
    const linkElement = screen.getByTestId('addTask')
    userEvent.type(linkElement, 'CLEAN THE DISHES{enter}')
    userEvent.type(linkElement, 'CLEAN MY ROOM{enter}')
    const newTask1 = screen.getByText('CLEAN THE DISHES')
    const newTask1Checkbox = screen.getByTestId('CLEAN THE DISHES')
    const newTask2 = screen.getByText('CLEAN MY ROOM')
    const showComplitedTaskBtn = screen.getByText('Complited')

    expect(newTask1).toBeInTheDocument()
    expect(newTask2).toBeInTheDocument()

    if (newTask1Checkbox) userEvent.click(newTask1Checkbox)

    userEvent.click(showComplitedTaskBtn)

    expect(newTask1).toBeInTheDocument()
    expect(newTask2).not.toBeInTheDocument()
  })
})
