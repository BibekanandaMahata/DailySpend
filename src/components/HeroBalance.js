import React from 'react';
import Box from './Box';
import AppText from './AppText';

export default function HeroBalance({ label, amount, subtext }) {
  return (
    <Box p="containerPadding" radius="lg" bg="surfaceContainerLowest" border={1} shadow>
      <AppText variant="labelSm" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>
        {label}
      </AppText>
      <AppText variant="heroValue" color="onSurface" style={{ letterSpacing: -0.8 }}>
        {amount}
      </AppText>
      {subtext && (
        <AppText variant="labelXs" color="primary" style={{ marginTop: 8 }}>
          {subtext}
        </AppText>
      )}
    </Box>
  );
}
