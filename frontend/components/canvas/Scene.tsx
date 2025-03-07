import { ShaderGradientCanvas } from '@shadergradient/react'

export default function Scene({ children, ...props }){
  return (
    <ShaderGradientCanvas style={{ pointerEvents: 'auto', position:"absolute", top:0,left:0,zIndex:-1}} {...props}>
      {children}
    </ShaderGradientCanvas>
  )
}
