import { Button as PixiButton } from '@pixi/ui';
import { Graphics } from 'pixi.js';

import React from 'react'

const Button = ({canvas}) => {
    const [buttonElement, setButtonElement] = React.useState<PixiButton | null>(new PixiButton());
    console.log(buttonElement);

  const buttonEl =       new Graphics()
          .rect(0, 0, 100, 50)
          .fill(0xFFFFFF);

          
 buttonEl.onPress.connect(() => console.log('onPress'));
          
 canvas.addChild(buttonEl.view)
  return (
    <div>hi</div>
  )
}

export default Button
