import React, { useState, useEffect, useMemo } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import CategoryRow from '@/components/CategoryRow';

import CATEGORY_METADATA from '@/json/categories.json';

const TOTAL_BUDGET_KEY = '@total_budget';
const CATEGORY_LIMITS_KEY = '@category_limits';

export default function Budgets({ transactions = [] }) {
  const { theme, isDarkMode } = useTheme();
  const { symbol, formatCurrency } = useCurrency();

  const [totalBudget, setTotalBudget] = useState(0);
  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [budgetText, setBudgetText] = useState('0');
  const [categoryLimits, setCategoryLimits] = useState({});
  const [editingCategoryName, setEditingCategoryName] = useState(null);
  const [categoryLimitText, setCategoryLimitText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load saved total budget and category limits dynamically from AsyncStorage
  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        const storedTotal = await AsyncStorage.getItem(TOTAL_BUDGET_KEY);
        if (storedTotal) {
          const parsed = parseFloat(storedTotal);
          if (!isNaN(parsed) && parsed >= 0) {
            setTotalBudget(parsed);
            setBudgetText(storedTotal);
          }
        }
        const storedLimits = await AsyncStorage.getItem(CATEGORY_LIMITS_KEY);
        if (storedLimits) {
          const parsedLimits = JSON.parse(storedLimits);
          if (parsedLimits && typeof parsedLimits === 'object') {
            setCategoryLimits(parsedLimits);
          }
        }
      } catch (e) {
        console.error('Failed to load budget data:', e);
      }
    };
    loadBudgetData();
  }, []);

  // Compute total spent dynamically from user transactions
  const totalSpent = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + (tx.amount < 0 ? Math.abs(tx.amount) : 0), 0);
  }, [transactions]);

  // Compute spending map by category dynamically from user transactions
  const categorySpentMap = useMemo(() => {
    const map = {};
    transactions.forEach((tx) => {
      if (tx.amount < 0) {
        const cat = tx.category || 'Other';
        map[cat] = (map[cat] || 0) + Math.abs(tx.amount);
      }
    });
    return map;
  }, [transactions]);

  // Compute categories array dynamically combining metadata, user spent, and user limits
  const categories = useMemo(() => {
    return CATEGORY_METADATA.map((meta) => {
      const spent = categorySpentMap[meta.name] || 0;
      const limit = categoryLimits[meta.name] !== undefined ? categoryLimits[meta.name] : 0;
      return {
        id: meta.name,
        name: meta.name,
        spent,
        limit,
        icon: meta.icon,
      };
    });
  }, [categorySpentMap, categoryLimits]);

  const totalCategoryLimits = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.limit, 0);
  }, [categories]);

  const handleSaveTotalBudget = async () => {
    const val = parseFloat(budgetText);
    if (!isNaN(val) && val >= 0) {
      setErrorMsg('');
      setTotalBudget(val);
      try {
        await AsyncStorage.setItem(TOTAL_BUDGET_KEY, val.toString());
      } catch (e) {
        console.error('Failed to save total budget:', e);
      }
    }
    setIsEditingTotal(false);
  };

  const handleSaveCategoryLimit = async (name) => {
    const val = parseFloat(categoryLimitText);
    if (!isNaN(val) && val >= 0) {
      setErrorMsg('');
      const updatedLimits = { ...categoryLimits, [name]: val };
      setCategoryLimits(updatedLimits);
      try {
        await AsyncStorage.setItem(CATEGORY_LIMITS_KEY, JSON.stringify(updatedLimits));
      } catch (e) {
        console.error('Failed to save category limit:', e);
      }
    }
    setEditingCategoryName(null);
  };

  // Exact remaining budget (total set budget minus total spent)
  const remainingTotal = totalBudget - totalSpent;
  const isOverTotalBudget = totalBudget > 0 && remainingTotal < 0;

  // Uncapped percentage calculation for total card
  const totalPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const totalBarWidth = Math.min(Math.max(totalPercentage, 0), 100);

  return (
    <Box px="containerMargin" py={8}>
      {/* Error / Validation Warning */}
      {errorMsg !== '' && (
        <Box p={12} mb={12} radius="md" bg="errorContainer" row align="center" justify="space-between">
          <AppText variant="labelXs" color="onErrorContainer" style={{ flex: 1, fontWeight: '700' }}>
            {errorMsg}
          </AppText>
          <TouchableOpacity onPress={() => setErrorMsg('')}>
            <AppText variant="labelXs" color="onErrorContainer" style={{ fontWeight: '800', marginLeft: 8 }}>
              Dismiss
            </AppText>
          </TouchableOpacity>
        </Box>
      )}

      {/* Revamped Total Remaining Budget Hero Card */}
      <Box p={20} radius="xl" bg="surfaceContainerLowest" shadow mb={20}>
        <Box row align="center" justify="space-between" mb={8} gap={8}>
          <AppText variant="labelXs" color="onSurfaceVariant" style={{ flex: 1, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700' }}>
            Total Remaining Budget
          </AppText>

          <AppText
            variant="headlineLg"
            color={isOverTotalBudget ? 'error' : 'onSurface'}
            style={{ fontSize: 26, fontWeight: '800', textAlign: 'right', flexShrink: 1 }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.65}
          >
            {formatCurrency(remainingTotal)}
          </AppText>
        </Box>

        <Box row justify="space-between" align="center" mb={14} gap={8}>
          <AppText 
            variant="labelXs" 
            color={isOverTotalBudget ? 'error' : 'onSurfaceVariant'} 
            style={{ fontWeight: isOverTotalBudget ? '700' : '500', flexShrink: 1 }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {formatCurrency(totalSpent)} spent {totalPercentage > 0 ? `(${totalPercentage.toFixed(0)}%)` : ''}
          </AppText>

          <Box row align="center" gap={6} style={{ flexShrink: 1 }}>
            <AppText 
              variant="labelXs" 
              color="onSurfaceVariant" 
              style={{ fontWeight: '600', textAlign: 'right', flexShrink: 1 }}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {formatCurrency(totalBudget)} total
            </AppText>
            <TouchableOpacity onPress={() => setIsEditingTotal(!isEditingTotal)} activeOpacity={0.7}>
              <Box px={8} py={3} radius="md" bg={isDarkMode ? 'surfaceContainerHigh' : 'surfaceContainer'}>
                <AppText variant="labelXs" color="primary" style={{ fontWeight: '700', fontSize: 11 }}>
                  {isEditingTotal ? 'Close' : 'Set Total'}
                </AppText>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>

        {/* Inline Edit Total Input */}
        {isEditingTotal && (
          <Box row align="center" gap={8} mb={14} px={14} py={10} radius="lg" bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'}>
            <AppText color="onSurfaceVariant" style={{ fontWeight: '700', fontSize: 16 }}>{symbol}</AppText>
            <TextInput
              keyboardType="decimal-pad"
              value={budgetText}
              onChangeText={setBudgetText}
              placeholder="Enter monthly budget..."
              placeholderTextColor={theme.colors.outline}
              style={{
                flex: 1,
                fontFamily: theme.typography.bodyMd.fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: theme.colors.onSurface,
                padding: 0,
                margin: 0,
                outlineStyle: 'none',
              }}
            />
            <TouchableOpacity onPress={handleSaveTotalBudget} activeOpacity={0.8}>
              <Box px={14} py={6} radius="md" bg="primary">
                <AppText variant="labelXs" color="onPrimary" style={{ fontWeight: '700', fontSize: 12 }}>Save</AppText>
              </Box>
            </TouchableOpacity>
          </Box>
        )}

        <Box height={8} radius="full" bg={isDarkMode ? 'surfaceContainerHighest' : 'surfaceContainer'} style={{ overflow: 'hidden' }}>
          <Box height="100%" width={`${totalBarWidth}%`} radius="full" bg={isOverTotalBudget ? 'error' : 'primary'} />
        </Box>
      </Box>

      {/* Category Budgets Header */}
      <Box row align="center" justify="space-between" mb={12} px={4} gap={8}>
        <AppText variant="labelXs" color="onSurfaceVariant" style={{ textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700', flexShrink: 1 }} numberOfLines={1}>
          Category Allocation
        </AppText>
        <AppText 
          variant="labelXs" 
          color="onSurfaceVariant" 
          style={{ fontSize: 12, fontWeight: '600', flexShrink: 1, textAlign: 'right' }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          Allocated: <AppText variant="labelXs" color="primary" style={{ fontWeight: '700' }}>{formatCurrency(totalCategoryLimits)}</AppText> / {formatCurrency(totalBudget)}
        </AppText>
      </Box>

      {/* Category Budgets List */}
      {categories.map((cat) => {
        const isEditingThis = editingCategoryName === cat.name;

        return (
          <Box key={cat.name} mb={6}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                if (isEditingThis) {
                  setEditingCategoryName(null);
                } else {
                  setEditingCategoryName(cat.name);
                  setCategoryLimitText(cat.limit.toString());
                }
              }}
            >
              <CategoryRow
                name={cat.name}
                spent={cat.spent}
                limit={cat.limit}
                icon={cat.icon}
              />
            </TouchableOpacity>

            {/* Inline Category Budget Limit Editor */}
            {isEditingThis && (
              <Box row align="center" justify="space-between" mb={8} px={14} py={10} radius="lg" bg={isDarkMode ? 'surfaceContainerLow' : 'surfaceContainer'}>
                <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontWeight: '600', fontSize: 12 }}>
                  Set {cat.name} Limit:
                </AppText>
                <Box row align="center" gap={8}>
                  <AppText color="onSurfaceVariant" style={{ fontWeight: '700', fontSize: 14 }}>{symbol}</AppText>
                  <TextInput
                    keyboardType="decimal-pad"
                    value={categoryLimitText}
                    onChangeText={setCategoryLimitText}
                    style={{
                      width: 70,
                      fontFamily: theme.typography.bodyMd.fontFamily,
                      fontSize: 14,
                      fontWeight: '700',
                      color: theme.colors.onSurface,
                      padding: 0,
                      margin: 0,
                      outlineStyle: 'none',
                    }}
                  />
                  <TouchableOpacity onPress={() => handleSaveCategoryLimit(cat.name)} activeOpacity={0.8}>
                    <Box px={12} py={5} radius="md" bg="primary">
                      <AppText variant="labelXs" color="onPrimary" style={{ fontWeight: '700', fontSize: 11 }}>Save</AppText>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
