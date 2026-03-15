/**
 * PhoneFrame — iPhone-style phone emulator.
 *
 * Props:
 *   src      : iframe URL — renders a live, interactive app inside the phone
 *   image    : static image URL — shown when no src (objectFit: cover, top-aligned)
 *   width    : screen area width in CSS px (default 260); height derived from 9:19.5 ratio
 *   className: extra classes on the outer wrapper
 */

const NATIVE_W = 390   // iPhone 14 Pro logical width (pts)
const NATIVE_H = 844   // iPhone 14 Pro logical height (pts)
const RATIO    = NATIVE_H / NATIVE_W   // ≈ 2.164

export default function PhoneFrame({ src, image, width = 260, className = '' }) {
  const sw  = width
  const sh  = Math.round(sw * RATIO)
  const px  = Math.round(sw * 0.054)   // horizontal padding ~14px
  const pt  = Math.round(sw * 0.069)   // top pad ~18px
  const pb  = Math.round(sw * 0.069)   // bottom pad ~18px
  const fw  = sw + px * 2
  const fh  = sh + pt + pb
  const r   = Math.round(sw * 0.169)   // outer corner radius ~44px
  const sr  = Math.round(sw * 0.138)   // screen corner radius ~36px
  const bw  = Math.ceil(sw * 0.012)    // button protrusion ~3px
  const sc  = sw / NATIVE_W            // iframe / status-bar scale factor

  // Side button geometry (positioned relative to full frame height)
  const btn = (top, h, side) => ({
    position: 'absolute',
    ...(side === 'left' ? { left: -bw } : { right: -bw }),
    top: Math.round(fh * top),
    width: bw,
    height: Math.round(fh * h),
    borderRadius: side === 'left'
      ? `${bw}px 0 0 ${bw}px`
      : `0 ${bw}px ${bw}px 0`,
    background: side === 'left'
      ? 'linear-gradient(to right, #0a0a0a, #1e1e1e)'
      : 'linear-gradient(to left,  #0a0a0a, #1e1e1e)',
  })

  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width: fw, height: fh }}>

      {/* ── Phone body ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: r,
          background: 'linear-gradient(155deg, #2c2c2e 0%, #1c1c1e 45%, #111114 100%)',
          boxShadow: [
            `0 0 0 1.5px rgba(100,100,110,0.55)`,
            `0 0 0 3px rgba(40,40,44,0.9)`,
            `0 ${Math.round(sw * 0.14)}px ${Math.round(sw * 0.32)}px rgba(0,0,0,0.7)`,
            `0 ${Math.round(sw * 0.04)}px ${Math.round(sw * 0.10)}px rgba(0,0,0,0.45)`,
            `inset 0 1px 1px rgba(255,255,255,0.08)`,
          ].join(', '),
        }}
      />

      {/* ── Side buttons ───────────────────────────────────────────────── */}
      <div style={btn(0.158, 0.040, 'left')} />   {/* mute */}
      <div style={btn(0.218, 0.070, 'left')} />   {/* vol+ */}
      <div style={btn(0.306, 0.070, 'left')} />   {/* vol- */}
      <div style={btn(0.262, 0.118, 'right')} />  {/* power */}

      {/* ── Screen area ────────────────────────────────────────────────── */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: px, top: pt,
          width: sw, height: sh,
          borderRadius: sr,
          background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            top:  Math.round(12 * sc),
            left: '50%',
            transform: 'translateX(-50%)',
            width:  Math.round(120 * sc),
            height: Math.round(34 * sc),
            borderRadius: Math.round(20 * sc),
            background: '#000',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
          }}
        />

        {/* Status bar */}
        <div
          className="absolute z-10 flex items-center justify-between pointer-events-none"
          style={{
            top:   Math.round(14 * sc),
            left:  Math.round(24 * sc),
            right: Math.round(24 * sc),
            height: Math.round(16 * sc),
          }}
        >
          <span style={{ fontSize: Math.round(11 * sc), fontWeight: 600, color: '#fff', letterSpacing: -0.3, fontFamily: 'system-ui, -apple-system' }}>
            9:41
          </span>
          <div className="flex items-center" style={{ gap: Math.round(5 * sc) }}>
            {/* Signal bars */}
            <svg width={Math.round(17 * sc)} height={Math.round(12 * sc)} viewBox="0 0 17 12" fill="white">
              <rect x="0"    y="8"   width="3" height="4"  rx="0.8" opacity="0.35" />
              <rect x="4.5"  y="5.5" width="3" height="6.5" rx="0.8" opacity="0.6"  />
              <rect x="9"    y="2.5" width="3" height="9.5" rx="0.8" opacity="0.8"  />
              <rect x="13.5" y="0"   width="3" height="12" rx="0.8"               />
            </svg>
            {/* Wi-Fi */}
            <svg width={Math.round(16 * sc)} height={Math.round(12 * sc)} viewBox="0 0 16 12" fill="none">
              <circle cx="8" cy="9.8" r="1.3" fill="white" />
              <path d="M5.2 7.2C6.2 6.1 9.8 6.1 10.8 7.2" stroke="white" strokeWidth="1.35" strokeLinecap="round" />
              <path d="M2.8 4.8C4.6 2.9 11.4 2.9 13.2 4.8" stroke="white" strokeWidth="1.35" strokeLinecap="round" />
            </svg>
            {/* Battery */}
            <svg width={Math.round(25 * sc)} height={Math.round(12 * sc)} viewBox="0 0 25 12" fill="none">
              <rect x="0.6" y="1" width="20" height="10" rx="2.5" stroke="white" strokeWidth="1.1" opacity="0.5" />
              <rect x="21.2" y="3.8" width="2.6" height="4.4" rx="1" fill="white" opacity="0.5" />
              <rect x="1.7" y="2.1" width="17.2" height="7.8" rx="1.8" fill="white" />
            </svg>
          </div>
        </div>

        {/* Home indicator */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            bottom: Math.round(8 * sc),
            left: '50%',
            transform: 'translateX(-50%)',
            width:  Math.round(130 * sc),
            height: Math.round(5 * sc),
            borderRadius: Math.round(3 * sc),
            background: 'rgba(255,255,255,0.22)',
          }}
        />

        {/* Content — iframe or image */}
        {src ? (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <iframe
              src={src}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: NATIVE_W,
                height: NATIVE_H,
                border: 'none',
                transformOrigin: 'top left',
                transform: `scale(${sc})`,
                display: 'block',
              }}
              title="Travelie"
            />
          </div>
        ) : image ? (
          <img
            src={image}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        ) : null}

        {/* Screen gloss */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 0,
            borderRadius: sr,
            background: 'linear-gradient(150deg, rgba(255,255,255,0.04) 0%, transparent 35%)',
          }}
        />
      </div>
    </div>
  )
}
