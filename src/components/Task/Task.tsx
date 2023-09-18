import React from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 10px;
  background: #858584;
  color: #f2f2f2;
  border: 1px solid #656564;
  border-radius: 4px;
  margin: 6px 0;
  display: flex;
`
const TextWrapper = styled.div`
  white-space: normal;
  overflow: scroll;
  overflow-wrap: anywhere;
`

const StyledCheckbox = styled(Checkbox)`
  &:where(.css-dev-only-do-not-override-i0102m).ant-checkbox-wrapper:not(
      .ant-checkbox-wrapper-disabled
    ):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: #d3d3d3;
    border-color: transparent;
  }
  &:where(
      .css-dev-only-do-not-override-i0102m
    ).ant-checkbox-wrapper-checked:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner,
  :where(.css-dev-only-do-not-override-i0102m).ant-checkbox-checked:not(
      .ant-checkbox-disabled
    ):hover
    .ant-checkbox-inner {
    background-color: #d3d3d3;
    border-color: transparent;
  }
  &:where(.css-dev-only-do-not-override-i0102m).ant-checkbox-wrapper:not(
      .ant-checkbox-wrapper-disabled
    ):hover
    .ant-checkbox-inner,
  :where(.css-dev-only-do-not-override-i0102m).ant-checkbox:not(
      .ant-checkbox-disabled
    ):hover
    .ant-checkbox-inner {
    border-color: #5e5d5d;
  }

  :where(.css-dev-only-do-not-override-i0102m).ant-checkbox-checked
    .ant-checkbox-inner {
    background-color: #5e5d5d;
    border-color: #5e5d5d;
  }
`

interface TaskProps {
  text: string
  status: string
  id: string
  handleChange: (id: string) => void
}

const Task = ({ text, status, id, handleChange }: TaskProps) => {
  return (
    <Wrapper
      style={{
        textDecoration: status === 'complited' ? 'line-through' : 'none',
      }}
    >
      <div style={{ margin: '0 12px' }}>
        <StyledCheckbox
          data-testid={text}
          checked={status === 'complited'}
          onChange={() => handleChange(id)}
        />
      </div>
      <TextWrapper>{text}</TextWrapper>
    </Wrapper>
  )
}

export default Task
