import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Box from './Box';
import AppText from './AppText';
import Icon from './Icon';

export default function CategoryRow({ 
  name, 
  spent, 
  limit, 
  icon, 
  iconBg, 
  iconColor,
  progressColor,
  percentageText,
  remainingText
}) {
  const { isDarkMode, theme } = useTheme();
  const { symbol, rate } = useCurrency();

  const numericSpent = parseFloat(spent);
  const numericLimit = parseFloat(limit);
  
  // Category usage percentage based on category allocated budget and used/spent amount
  const rawPercentage = numericLimit > 0 ? (numericSpent / numericLimit) * 100 : (numericSpent > 0 ? 100 : 0);
  const percentage = Math.max(rawPercentage, 0);

  const isOverBudget = numericSpent > numericLimit;

  const remaining = numericLimit - numericSpent;
  const convertedSpent = numericSpent * rate;
  const convertedRemaining = remaining * rate;
  const convertedLimit = numericLimit * rate;

  const barColor = isOverBudget ? theme.colors.error : (progressColor || theme.colors.primary);
  const bgIconColor = isOverBudget 
    ? (isDarkMode ? 'rgba(186, 26, 26, 0.15)' : '#fce8e6') 
    : (iconBg || (isDarkMode ? theme.colors.surfaceContainerLow : theme.colors.surfaceContainer));
  const activeIconColor = isOverBudget ? theme.colors.error : (iconColor || theme.colors.primary);

  // Fill width for progress bar (visually capped at 100% for bar fill width)
  const barWidth = Math.min(percentage, 100);

  return (
    <Box p={12} radius="lg" bg="surfaceContainerLowest" shadow mb={8}>
      <Box row align="center" justify="space-between" mb={8} gap={8}>
        <Box row align="center" style={{ flex: 1, flexShrink: 1, paddingRight: 6 }}>
          {/* Icon Circle */}
          <Box 
            width={36} 
            height={36} 
            radius="md" 
            bg={bgIconColor} 
            align="center" 
            justify="center" 
            mr={10}
            style={{ flexShrink: 0 }}
          >
            <Icon name={icon} color={activeIconColor} size={16} />
          </Box>
          {/* Title & Info */}
          <Box style={{ flex: 1, flexShrink: 1 }}>
            <AppText 
              variant="bodyMd" 
              color="onSurface" 
              style={{ fontWeight: '700', fontSize: 14 }} 
              numberOfLines={1}
            >
              {name}
            </AppText>
            <AppText 
              variant="labelXs" 
              color={isOverBudget ? 'error' : 'onSurfaceVariant'} 
              style={{ fontWeight: isOverBudget ? '700' : '600', marginTop: 1, fontSize: 11, flexShrink: 1 }}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {percentageText || `${percentage.toFixed(0)}% used (${symbol}${convertedSpent.toFixed(0)} of ${symbol}${convertedLimit.toFixed(0)})`}
            </AppText>
          </Box>
        </Box>

        {/* Right side budget metrics */}
        <Box align="flex-end" style={{ flexShrink: 0, paddingLeft: 4, maxWidth: '45%' }}>
          <AppText 
            variant="bodyMd" 
            color={isOverBudget ? 'error' : 'onSurface'} 
            style={{ fontWeight: '700', fontSize: 14, textAlign: 'right' }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {isOverBudget ? `-${symbol}${Math.abs(convertedRemaining).toFixed(0)}` : `${symbol}${convertedRemaining.toFixed(0)}`}
          </AppText>
          <AppText 
            variant="labelXs" 
            color={isOverBudget ? 'error' : 'onSurfaceVariant'} 
            style={{ marginTop: 1, fontSize: 11, textAlign: 'right' }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            {isOverBudget ? `over ${symbol}${convertedLimit.toFixed(0)} limit` : `left of ${symbol}${convertedLimit.toFixed(0)}`}
          </AppText>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box height={4} radius="full" bg={isDarkMode ? 'surfaceContainerHighest' : 'surfaceContainer'} style={{ overflow: 'hidden' }}>
        <Box height="100%" width={`${barWidth}%`} radius="full" style={{ backgroundColor: barColor }} />
      </Box>
    </Box>
  );
}
