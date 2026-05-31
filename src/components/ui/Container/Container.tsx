import type { HTMLAttributes, PropsWithChildren } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement>

function Container({ children, className = '', ...props }: PropsWithChildren<ContainerProps>) {
  return (
    <div className={['mx-auto w-full max-w-6xl px-4 sm:px-6', className].join(' ')} {...props}>
      {children}
    </div>
  )
}

export default Container
