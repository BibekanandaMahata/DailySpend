import React, { useState } from 'react';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Box from './Box';
import AppText from './AppText';
import Icon from './Icon';

import CATEGORIES from '@/json/inputCategories.json';

export default function InputForm({ onAddExpense }) {
  const { theme, isDarkMode } = useTheme();
  const { symbol, convertToRaw } = useCurrency();
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const catObj = CATEGORIES.find(c => c.value === selectedCategory);
    
    onAddExpense({
      amount: -convertToRaw(numericAmount),
      title: merchant.trim() || 'Untitled Expense',
      category: selectedCategory,
      icon: catObj ? catObj.icon : 'shopping',
    });

    // Reset form
    setAmount('');
    setMerchant('');
    setSelectedCategory('Food');
  };

  return (
    <Box width="100%">
      {/* Amount Input Card */}
      <Box 
        row 
        align="center" 
        px={12} 
        py={6} 
        mb={12} 
        radius="lg" 
        bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainerLowest'}
      >
        <Box 
          width={36} 
          height={36} 
          radius="md" 
          bg={isDarkMode ? 'surfaceContainerHigh' : 'primaryContainer'} 
          align="center" 
          justify="center"
          mr={10}
        >
          <AppText color="primary" style={{ fontSize: 18, fontWeight: '800' }}>
            {symbol}
          </AppText>
        </Box>

        <TextInput
          placeholder="0.00"
          placeholderTextColor={theme.colors.outline}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          style={{
            flex: 1,
            fontFamily: theme.typography.headlineLg.fontFamily,
            fontSize: 24,
            fontWeight: '700',
            color: theme.colors.onSurface,
            padding: 0,
            margin: 0,
            outlineStyle: 'none',
          }}
        />
      </Box>

      {/* Merchant Input Card */}
      <Box 
        row 
        align="center" 
        px={12} 
        py={10} 
        mb={14} 
        radius="lg" 
        bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainerLowest'}
      >
        <Box mr={10}>
          <Icon name="shopping" color={theme.colors.onSurfaceVariant} size={18} />
        </Box>
        <TextInput
          placeholder="Merchant / Note (Optional)"
          placeholderTextColor={theme.colors.outline}
          value={merchant}
          onChangeText={setMerchant}
          style={{
            flex: 1,
            fontFamily: theme.typography.bodyMd.fontFamily,
            fontSize: 15,
            color: theme.colors.onSurface,
            padding: 0,
            margin: 0,
            outlineStyle: 'none',
          }}
        />
      </Box>

      {/* Category Chips with Icons */}
      <AppText 
        variant="labelXs" 
        color="onSurfaceVariant" 
        style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', marginBottom: 8 }}
      >
        Category
      </AppText>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <Box row gap={8}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <TouchableOpacity
                key={cat.value}
                onPress={() => setSelectedCategory(cat.value)}
                activeOpacity={0.8}
              >
                <Box
                  row
                  align="center"
                  gap={5}
                  px={10}
                  py={5}
                  radius="md"
                  bg={isSelected ? theme.colors.primary : (isDarkMode ? theme.colors.surfaceContainerLow : theme.colors.surfaceContainerLowest)}
                >
                  <Icon 
                    name={cat.icon} 
                    color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant} 
                    size={12} 
                  />
                  <AppText
                    variant="labelXs"
                    color={isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
                    style={{ fontWeight: isSelected ? '700' : '600', fontSize: 11 }}
                  >
                    {cat.label}
                  </AppText>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88} style={{ alignSelf: 'flex-start' }}>
        <Box
          row
          align="center"
          justify="center"
          gap={8}
          px={20}
          py={10}
          radius="lg"
          bg="primary"
          shadow
        >
          <AppText variant="labelSm" color="onPrimary" style={{ fontWeight: '700', fontSize: 14 }}>
            + Add Expense
          </AppText>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
