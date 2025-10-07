import Image from 'next/image';
import type { ElementType } from 'react';

type TitleOverlayProps = {
  logoUrl?: string | null;
  title: string;
  wrapperClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  fallbackAs?: ElementType;
  sizes?: string;
  priority?: boolean;
  useFill?: boolean;
  width?: number;
  height?: number;
};

export const TitleOverlay = ({
  logoUrl,
  title,
  wrapperClassName,
  imageClassName,
  fallbackClassName,
  fallbackAs: FallbackTag = 'span',
  sizes,
  priority,
  useFill = true,
  width = 320,
  height = 160,
}: TitleOverlayProps) => {
  return (
    <div className={wrapperClassName}>
      {logoUrl ? (
        useFill ? (
          <Image
            src={logoUrl}
            alt={`${title} logo`}
            fill
            priority={priority}
            sizes={sizes}
            className={imageClassName ?? 'object-contain'}
          />
        ) : (
          <Image
            src={logoUrl}
            alt={`${title} logo`}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className={imageClassName ?? 'object-contain'}
          />
        )
      ) : (
        <FallbackTag className={fallbackClassName}>{title}</FallbackTag>
      )}
    </div>
  );
};
