import React, { useState } from 'react';

const colors = ['blue', 'red',  'yellow',  'green'];

const ColorSlides = () => {
  const [color, changeColor] = useState(0);
  const left = () => {
    if (color > 0) {
      changeColor(color - 1)
    } else {
      changeColor(3)
    }
  }
  const right = () => {
    if (color < 3) {
      changeColor(color + 1)
    } else {
      changeColor(0)
    }
  }
  const btnStyle = {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    width: 50,
    height: 50,
    marginTop: -25,
    fontSize: '36px',
    lineHeight: '45px',
    color: 'white',
    c: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    textAlign: 'center',
  }
  return (
    <div style={{ position: 'relative', height: 400, margin: '0 20px', overflow: 'hidden' }}>
      < div style={{
        whiteSpace: 'nowrap',
        backgroundColor: colors[color],
        width: '100%',
        height: '100%'
      }}>
      </div>
      <span style={{ ...btnStyle, left: 5, }} onClick={left}>{'<'}</span>
      <span style={{ ...btnStyle, right: 5 }} onClick={right}>{'>'}</span>
    </div>
  )
};

export default ColorSlides;
