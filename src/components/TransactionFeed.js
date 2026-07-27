import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Box from './Box';
import AppText from './AppText';
import Icon from './Icon';

export default function TransactionFeed({ transactions = [] }) {
  const { theme, isDarkMode } = useTheme();
  const { formatCurrency } = useCurrency();

  if (!transactions || transactions.length === 0) {
    return (
      <Box p={20} radius="lg" bg="surfaceContainerLowest" shadow align="center">
        <AppText variant="bodyMd" color="onSurfaceVariant" style={{ fontSize: 13 }}>
          No transactions recorded yet.
        </AppText>
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Box row gap={12} style={{ flexDirection: 'column' }}>
        {transactions.map((tx, index) => {
          return (
            <Box 
              key={tx.id || index}
              row
              align="center"
              justify="space-between"
              p={16}
              bg="surfaceContainerLowest"
              radius="lg"
              shadow
            >
              <Box row align="center" style={{ flex: 1, paddingRight: 10, flexShrink: 1 }}>
                <Box 
                  width={40}
                  height={40}
                  radius="md"
                  bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'}
                  align="center"
                  justify="center"
                  mr={12}
                  style={{ flexShrink: 0 }}
                >
                  <Icon name={tx.icon || 'shopping'} color={theme.colors.primary} size={18} />
                </Box>
                <Box style={{ flex: 1, flexShrink: 1 }}>
                  <AppText variant="bodyMd" color="onSurface" numberOfLines={1} style={{ fontWeight: '500' }}>
                    {tx.title}
                  </AppText>
                  <AppText variant="labelXs" color="onSurfaceVariant" numberOfLines={1} style={{ marginTop: 2 }}>
                    {tx.date}
                  </AppText>
                </Box>
              </Box>
              <Box align="flex-end" style={{ flexShrink: 0, maxWidth: '40%', paddingLeft: 4 }}>
                <AppText 
                  variant="bodyMd" 
                  color="onSurface" 
                  style={{ fontWeight: '700', textAlign: 'right' }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                >
                  {formatCurrency(tx.amount)}
                </AppText>
                <AppText 
                  variant="labelXs" 
                  color="onSurfaceVariant" 
                  numberOfLines={1}
                  style={{ marginTop: 2, textAlign: 'right' }}
                >
                  {tx.category}
                </AppText>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
