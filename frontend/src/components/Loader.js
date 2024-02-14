import React from 'react'

const Loader = () => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
    </div>
  )
}

export default Loader
