import React, { useMemo } from 'react';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import InputForm from '@/components/InputForm';
import TransactionFeed from '@/components/TransactionFeed';
import AdCard from '@/components/AdCard';
import Icon from '@/components/Icon';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function Home({ transactions = [], onAddExpense }) {
  const { theme, isDarkMode } = useTheme();
  const { formatCurrency } = useCurrency();

  // Calculate sum of absolute amounts of all expenses
  const totalSpend = useMemo(() => {
    return transactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [transactions]);

  // Find top spending category dynamically
  const topCategory = useMemo(() => {
    if (!transactions.length) return 'None';
    const map = {};
    transactions.forEach(tx => {
      if (tx.amount < 0) {
        const cat = tx.category || 'Other';
        map[cat] = (map[cat] || 0) + Math.abs(tx.amount);
      }
    });
    let top = 'None';
    let max = 0;
    Object.entries(map).forEach(([cat, amount]) => {
      if (amount > max) {
        max = amount;
        top = cat;
      }
    });
    return top;
  }, [transactions]);

  return (
    <Box>
      {/* Revamped Hero Monthly Spend Summary Card */}
      <Box px="containerMargin" pt={4} mb={16}>
        <Box 
          p={20} 
          radius="xl" 
          bg={isDarkMode ? 'surfaceContainerLowest' : 'surfaceContainerLowest'}
          shadow
          style={{
            borderWidth: 1,
            borderColor: isDarkMode ? theme.colors.surfaceContainerHigh : theme.colors.outlineVariant,
          }}
        >
          <Box row align="center" justify="space-between" mb={12}>
            <Box row align="center" gap={8}>
              <Box width={10} height={10} radius="full" bg="primary" />
              <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700' }}>
                Total Monthly Spend
              </AppText>
            </Box>
            <Box px={10} py={4} radius="full" bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'}>
              <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 11 }}>
                {transactions.length} {transactions.length === 1 ? 'Transaction' : 'Transactions'}
              </AppText>
            </Box>
          </Box>

          <AppText 
            variant="heroValue" 
            color="onSurface" 
            style={{ fontSize: 32, fontWeight: '800', letterSpacing: -1, marginBottom: 14 }}
          >
            {formatCurrency(totalSpend)}
          </AppText>

          {/* Quick Metrics Bar */}
          <Box 
            row 
            align="center" 
            justify="space-between" 
            pt={12} 
            style={{ 
              borderTopWidth: 1, 
              borderTopColor: isDarkMode ? theme.colors.surfaceContainerHigh : theme.colors.outlineVariant 
            }}
          >
            <Box row align="center" gap={6}>
              <Icon name="budgets" color={theme.colors.onSurfaceVariant} size={14} />
              <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 12 }}>
                Top Category: <AppText variant="labelXs" color="onSurface" style={{ fontWeight: '700' }}>{topCategory}</AppText>
              </AppText>
            </Box>
            <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 12 }}>
              Daily Spend Active
            </AppText>
          </Box>
        </Box>
      </Box>

      {/* Quick Entry Form Container */}
      <Box px="containerMargin" mb={20}>
        <AppText 
          variant="labelXs" 
          color="onSurfaceVariant" 
          style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8, marginLeft: 4 }}
        >
          Add New Expense
        </AppText>
        <InputForm onAddExpense={onAddExpense} />
      </Box>

      {/* Promotion Feature Ad Card */}
      <Box px="containerMargin" mb={24}>
        <AdCard />
      </Box>

      {/* Recent Transactions List */}
      <Box px="containerMargin" pb={32}>
        <Box row align="center" justify="space-between" mb={12}>
          <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700' }}>
            Recent Activity
          </AppText>
          {transactions.length > 0 && (
            <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 12 }}>
              {transactions.length} Total
            </AppText>
          )}
        </Box>
        <TransactionFeed transactions={transactions.slice(0, 5)} />
      </Box>
    </Box>
  );
}
