import type { CSSProperties } from 'react'

type LeftRailProps = {
  width: number
  height?: number
  className?: string
  style?: CSSProperties
  fill?: string
  stroke?: string
}

function buildLeftRailPath(width: number, height: number) {
  const h = Math.max(8, height)
  const w = Math.max(h, width)
  const radius = h / 1.8
  const maxNotch = Math.max(6, w - radius - 1)
  const notchDepth = Math.min(h * 0.4, maxNotch)

  return `M ${radius} 0 H ${w} Q ${w - notchDepth} ${h / 2} ${w} ${h} H ${radius} Q 0 ${h} 0 ${
    h - radius
  } V ${radius} Q 0 0 ${radius} 0 Z`
}

function LeftRail({
  width,
  height = 44,
  className,
  style,
  fill = '#ffffff',
}: LeftRailProps) {
  if (width <= 0) {
    return null
  }

  const d = buildLeftRailPath(width, height)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} fill={fill} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default LeftRail
