import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function Box({
  flex,
  row,
  align,
  justify,
  wrap,
  // Spacing props (padding)
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  // Spacing props (margin)
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  // Layout spacing
  gap,
  // Size
  width,
  height,
  // Styling props
  bg,
  radius,
  border,
  borderColor,
  // Shadow helper
  shadow,
  elevation,
  style,
  children,
  ...props
}) {
  const { theme, isDarkMode } = useTheme();

  // Helper to resolve spacing tokens
  const getSpacing = (val) => {
    if (typeof val === 'string' && theme.spacing[val] !== undefined) {
      return theme.spacing[val];
    }
    return val;
  };

  // Helper to resolve color tokens
  const getColor = (val) => {
    if (typeof val === 'string' && theme.colors[val] !== undefined) {
      return theme.colors[val];
    }
    return val;
  };

  // Helper to resolve rounded tokens
  const getRadius = (val) => {
    if (val === 'default') return theme.rounded.default;
    if (typeof val === 'string' && theme.rounded[val] !== undefined) {
      return theme.rounded[val];
    }
    return val;
  };

  const resolvedStyles = {
    flex,
    flexDirection: row ? 'row' : 'column',
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    
    // Padding
    padding: getSpacing(p),
    paddingHorizontal: getSpacing(px),
    paddingVertical: getSpacing(py),
    paddingTop: getSpacing(pt),
    paddingBottom: getSpacing(pb),
    paddingLeft: getSpacing(pl),
    paddingRight: getSpacing(pr),

    // Margin
    margin: getSpacing(m),
    marginHorizontal: getSpacing(mx),
    marginVertical: getSpacing(my),
    marginTop: getSpacing(mt),
    marginBottom: getSpacing(mb),
    marginLeft: getSpacing(ml),
    marginRight: getSpacing(mr),

    // Gap
    gap: getSpacing(gap),

    // Dimensions
    width,
    height,

    // Border and background
    backgroundColor: getColor(bg),
    borderRadius: getRadius(radius),
    borderWidth: border,
    borderColor: getColor(borderColor || (border ? (isDarkMode ? 'surfaceContainerHigh' : 'outlineVariant') : undefined)),
  };

  // Optional shadow styling
  const shadowStyles = shadow ? {
    shadowColor: theme.colors.outline,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDarkMode ? 0 : 0.06,
    shadowRadius: 12,
    elevation: elevation || 2,
  } : {};

  return (
    <View style={[resolvedStyles, shadowStyles, style]} {...props}>
      {children}
    </View>
  );
}
