/** Inline SVG sprite — themed gold line-art. Mount once at root. */
export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path d="M12 2 L13.5 9 L21 10.5 L13.5 12 L12 22 L10.5 12 L3 10.5 L10.5 9 Z" />
          <circle cx="12" cy="11.25" r="0.6" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="i-chevron-down" viewBox="0 0 24 24">
          <path d="M6 9 L12 15 L18 9" />
        </symbol>
        <symbol id="i-chevron-left" viewBox="0 0 24 24">
          <path d="M15 6 L9 12 L15 18" />
        </symbol>
        <symbol id="i-chevron-right" viewBox="0 0 24 24">
          <path d="M9 6 L15 12 L9 18" />
        </symbol>
        <symbol id="i-arrow-left" viewBox="0 0 24 24">
          <path d="M19 12 H5 M11 6 L5 12 L11 18" />
        </symbol>
        <symbol id="i-arrow-right" viewBox="0 0 24 24">
          <path d="M5 12 H19 M13 6 L19 12 L13 18" />
        </symbol>
        <symbol id="i-music-on" viewBox="0 0 24 24">
          <path d="M9 18 V6 L19 4 V16" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="16" r="2" />
        </symbol>
        <symbol id="i-music-off" viewBox="0 0 24 24">
          <path d="M9 18 V6 L19 4 V16" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="16" r="2" />
          <path d="M3 3 L21 21" strokeWidth="1.8" />
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12 H21 M12 3 C9 6 9 18 12 21 M12 3 C15 6 15 18 12 21" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </symbol>
        <symbol id="i-play" viewBox="0 0 24 24">
          <path d="M8 5 L19 12 L8 19 Z" />
        </symbol>
        <symbol id="i-nebula" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22 M5 5 L7.5 7.5 M16.5 16.5 L19 19 M5 19 L7.5 16.5 M16.5 7.5 L19 5" />
        </symbol>
        <symbol id="i-tower" viewBox="0 0 24 24">
          <path d="M4 21 H20 M5 21 V11 M19 21 V11 M5 11 H19 M7 11 V6 M17 11 V6 M9 11 V8 M15 11 V8 M11 11 V8 M13 11 V8 M12 6 V3 M10 4 H14" />
        </symbol>
        <symbol id="i-scale" viewBox="0 0 24 24">
          <path d="M12 4 V20 M5 20 H19 M5 8 H19 M5 8 L3 14 L7 14 Z M19 8 L17 14 L21 14 Z" />
        </symbol>
        <symbol id="i-mask" viewBox="0 0 24 24">
          <path d="M4 8 C4 6 6 5 8 5 H16 C18 5 20 6 20 8 V12 C20 16 16 19 12 19 C8 19 4 16 4 12 Z" />
          <circle cx="9" cy="11" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="11" r="1.2" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="i-swords" viewBox="0 0 24 24">
          <path d="M4 4 L14 14 M20 4 L10 14 M14 14 L18 18 L20 20 M10 14 L6 18 L4 20 M18 18 L20 16 M6 18 L4 16" />
        </symbol>
      </defs>
    </svg>
  );
}

export type IconName =
  | "star"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "arrow-left"
  | "arrow-right"
  | "music-on"
  | "music-off"
  | "globe"
  | "menu"
  | "close"
  | "play"
  | "nebula"
  | "tower"
  | "scale"
  | "mask"
  | "swords";

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: IconName;
  size?: number | string;
}

export function Icon({ name, size = "1em", className, style, ...rest }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "-0.125em",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        ...style,
      }}
      {...rest}
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}
