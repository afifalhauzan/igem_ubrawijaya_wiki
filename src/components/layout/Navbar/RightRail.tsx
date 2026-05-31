import type { CSSProperties } from 'react'

type RightRailProps = {
  width: number
  height?: number
  className?: string
  style?: CSSProperties
  fill?: string
  filter?: string
  stroke?: string
}

function buildRightRailPath(width: number, height: number) {
  const h = Math.max(8, height)
  const w = Math.max(h, width)
  const radius = h / 1.8
  const maxNotch = Math.max(6, w - radius - 1)
  const notchDepth = Math.min(h * 0.4, maxNotch)

  return `M 0 0 H ${w - radius} Q ${w} 0 ${w} ${radius} V ${h - radius} Q ${w} ${h} ${w - radius} ${h} H 0 Q ${notchDepth
    } ${h / 2} 0 0 Z`
}

function RightRail({
  width,
  height = 44,
  className,
  style,
  fill = '#ffffff',
}: RightRailProps) {
  if (width <= 0) {
    return null
  }

  const d = buildRightRailPath(width, height)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{
        ...style,
        overflow: 'visible',
        filter: `
      drop-shadow(0 2px 3px rgba(0,0,0,.08))
      drop-shadow(0 6px 12px rgba(0,0,0,.10))
    `,
      }}
      aria-hidden="true"
    >
      <path d={d} fill={fill} strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default RightRail
