import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function AppText({ variant = 'bodyMd', color = 'onSurface', style, children, ...props }) {
  const { theme } = useTheme();
  
  // Resolve typography variant styles (fontFamily, fontSize, etc.)
  const typographyStyle = theme.typography[variant] || theme.typography.bodyMd;
  
  // Resolve color from theme colors, fallback if not a direct theme color token
  const textColor = theme.colors[color] || color;

  return (
    <RNText 
      style={[
        typographyStyle, 
        { color: textColor }, 
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
}
