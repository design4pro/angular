export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

export type FontStyle = Required<{
  fontFamily: CSSProperties['fontFamily'];
  fontSize: number;
  fontWeightLight: CSSProperties['fontWeight'];
  fontWeightRegular: CSSProperties['fontWeight'];
  fontWeightMedium: CSSProperties['fontWeight'];
  fontWeightBold: CSSProperties['fontWeight'];
  htmlFontSize: number;
}>;

export interface CSSProperties {
  [k: string]: unknown | CSSProperties;
}

export interface FontStyleOptions extends Partial<FontStyle> {
  allVariants?: CSSProperties;
}

export type TypographyStyle = CSSProperties;
export type TypographyStyleOptions = TypographyStyle;

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export interface Typography
  extends Partial<Record<Variant, TypographyStyle>>,
    Partial<FontStyle>,
    Partial<TypographyUtils> {}

export type TypographyOptions = Partial<
  Record<Variant, TypographyStyleOptions> & FontStyleOptions & TypographyUtils
>;
