import React, {
  ReactElement,
  useState,
  SyntheticEvent,
  useMemo,
  useEffect,
} from 'react'
import { Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Task from './components/Task/Task'

const StyledInput = styled(Input)`
  background: #bbbbbb;
  height: 60px;
  font-size: 24px;
  color: #858585;
  &:hover,
  &:focus {
    border-color: #5b5c5b;
    border-inline-end-width: 1px;
  }
`
const StyledButton = styled(Button)`
  border-color: #858585;
  background: #d3d3d3;
  color: #858585;
  margin-left: 8px;
  &:hover {
    color: #5b5c5b !important;
    border-color: #5b5c5b !important;
  }
`

const WrapperTaskList = styled.div`
  max-height: 600px;
  overflow: scroll;
`

const WrapperControls = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`

interface ITask {
  id: string
  text: string
  status: 'complited' | 'active'
}

type Status = 'all' | 'active' | 'complited'

const myToDo = localStorage.getItem('myToDo')

const App = (): ReactElement => {
  const { t } = useTranslation()

  const [todoList, setTodo] = useState<ITask[]>(
    JSON.parse(myToDo ? myToDo : '[]'),
  )

  const [status, setStatus] = useState<Status>('all')

  const [inputValue, setInputValue] = useState('')

  const saveTodoToLocalStorage = () => {
    localStorage.setItem('myToDo', JSON.stringify(todoList))
  }

  useEffect(() => {
    saveTodoToLocalStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList])

  const removeComplited = () => {
    setTodo((prev) => prev.filter(({ status }) => status !== 'complited'))
  }

  const handleAddTask = (e: SyntheticEvent) => {
    const { value: text } = e.target as HTMLInputElement
    const id = uuidv4()
    const newTask: ITask = {
      id,
      text,
      status: 'active',
    }
    setTodo((prev) => [...prev, newTask])
    setInputValue('')
  }

  const handleStatusChange = (newStatusValue: Status) => () => {
    if (newStatusValue !== status) {
      setStatus(newStatusValue)
    }
  }

  const handleTaskStatusChange = (id: string) => {
    setTodo((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          task.status = task.status === 'complited' ? 'active' : 'complited'
        }
        return task
      }),
    )
  }

  const list = useMemo(() => {
    if (status === 'all') {
      return todoList
    }
    return todoList.filter((task) => task.status === status)
  }, [status, todoList])

  return (
    <div className="main-container">
      <div style={{ width: '800px' }}>
        <h1>{t('title')}</h1>
        <WrapperTaskList>
          <StyledInput
            data-testid="addTask"
            id="addTask"
            placeholder={t('addTAsk')}
            type="text"
            onPressEnter={handleAddTask}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          {list.map(({ id, text, status }) => (
            <Task
              text={text}
              status={status}
              key={id}
              id={id}
              handleChange={handleTaskStatusChange}
            />
          ))}
        </WrapperTaskList>
        <WrapperControls>
          <div>
            {t('task', {
              count: todoList.filter(({ status }) => status === 'active')
                .length,
            })}
          </div>
          <div>
            <StyledButton onClick={handleStatusChange('all')}>
              {t('all')}
            </StyledButton>
            <StyledButton onClick={handleStatusChange('active')}>
              {t('active')}
            </StyledButton>
            <StyledButton onClick={handleStatusChange('complited')}>
              {t('complited')}
            </StyledButton>
          </div>
          <StyledButton onClick={removeComplited}>{t('clearAll')}</StyledButton>
        </WrapperControls>
      </div>
    </div>
  )
}

export default App
