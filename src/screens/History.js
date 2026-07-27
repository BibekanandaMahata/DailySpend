import React, { useState, useMemo } from 'react';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';
import TransactionFeed from '@/components/TransactionFeed';

const CATEGORY_CHIPS = ['All', 'Food', 'Transport', 'Shopping', 'Utilities', 'Housing'];

export default function History({ transactions = [] }) {
  const { theme, isDarkMode } = useTheme();
  const { formatCurrency } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter transactions based on search query and category chip selection
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [transactions, searchQuery, selectedCategory]);

  // Compute total spent of filtered transactions
  const filteredTotal = useMemo(() => {
    return filteredTransactions.reduce((sum, tx) => sum + (tx.amount < 0 ? Math.abs(tx.amount) : 0), 0);
  }, [filteredTransactions]);

  return (
    <Box px="containerMargin" py={8}>
      {/* Search Input Bar */}
      <Box row align="center" gap={12} mb={16}>
        <Box 
          row 
          align="center" 
          flex={1} 
          px={14} 
          py={10} 
          radius="xl" 
          bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLowest'}
          shadow
        >
          <Icon name="search" color={theme.colors.outline} size={18} />
          <TextInput
            placeholder="Search transactions or category..."
            placeholderTextColor={theme.colors.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: 8,
              fontFamily: theme.typography.bodyMd.fontFamily,
              fontSize: 14,
              color: theme.colors.onSurface,
              padding: 0,
              margin: 0,
              outlineStyle: 'none',
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Box px={6} py={2}>
                <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontWeight: '700' }}>✕</AppText>
              </Box>
            </TouchableOpacity>
          )}
        </Box>
      </Box>

      {/* Category Filter Chips Horizontal Scroll */}
      <Box mb={20}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
          <Box row gap={8}>
            {CATEGORY_CHIPS.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Box
                    px={14}
                    py={6}
                    radius="full"
                    bg={isSelected ? 'primary' : (isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainerLowest')}
                    shadow={isSelected}
                  >
                    <AppText
                      variant="labelXs"
                      color={isSelected ? 'onPrimary' : 'onSurface'}
                      style={{ fontWeight: isSelected ? '700' : '600', fontSize: 12 }}
                    >
                      {cat}
                    </AppText>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </ScrollView>
      </Box>

      {/* Header Metrics Bar */}
      <Box row align="center" justify="space-between" mb={14} px={4}>
        <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700' }}>
          History ({filteredTransactions.length})
        </AppText>
        {filteredTransactions.length > 0 && (
          <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontSize: 12, fontWeight: '600' }}>
            Filtered Total: <AppText variant="labelXs" color="primary" style={{ fontWeight: '800' }}>{formatCurrency(filteredTotal)}</AppText>
          </AppText>
        )}
      </Box>

      {/* Dynamic Transactions Feed or Empty State */}
      {filteredTransactions.length === 0 ? (
        <Box 
          align="center" 
          justify="center" 
          py={48} 
          px={24} 
          radius="xl" 
          bg="surfaceContainerLowest" 
          shadow
        >
          <Box width={56} height={56} radius="full" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'} align="center" justify="center" mb={16}>
            <Icon name="history" color={theme.colors.outline} size={28} />
          </Box>
          <AppText variant="headlineLg" color="onSurface" style={{ fontWeight: '700', fontSize: 18, marginBottom: 6, textAlign: 'center' }}>
            {searchQuery || selectedCategory !== 'All' ? 'No matching transactions' : 'No transactions recorded yet'}
          </AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ textAlign: 'center', fontSize: 13, lineHeight: 20 }}>
            {searchQuery || selectedCategory !== 'All' 
              ? 'Try selecting a different category chip or clearing your search term.'
              : 'Add your daily expenses from the Home screen to start building your transaction history.'}
          </AppText>
        </Box>
      ) : (
        <TransactionFeed transactions={filteredTransactions} />
      )}
    </Box>
  );
}