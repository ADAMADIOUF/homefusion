import React from 'react'

const Message = ({ variant, children }) => {
  return <div className={`message ${variant}`}>{children}</div>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
