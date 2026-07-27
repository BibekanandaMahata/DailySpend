import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';

function TabItem({ tab, isActive, onPress, theme, isDarkMode }) {
  const anim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isActive ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1],
  });

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.75}
      style={{ flex: 1, alignItems: 'center' }}
    >
      <Animated.View style={{ transform: [{ scale }], width: '100%', alignItems: 'center' }}>
        <Box 
          row
          align="center" 
          justify="center"
          gap={8}
          px={16} 
          py={10} 
          radius="full" 
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated Active Background Capsule */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 999,
              backgroundColor: isDarkMode ? theme.colors.primaryContainer : theme.colors.primary,
              opacity: anim,
            }}
          />

          <Icon 
            name={tab.icon} 
            color={
              isActive 
                ? (isDarkMode ? theme.colors.onPrimaryContainer : theme.colors.onPrimary)
                : theme.colors.onSurfaceVariant
            } 
            size={20} 
          />

          <AppText 
            variant="labelSm" 
            color={
              isActive 
                ? (isDarkMode ? 'onPrimaryContainer' : 'onPrimary')
                : 'onSurfaceVariant'
            }
            style={{ 
              fontWeight: isActive ? '800' : '600',
              fontSize: 13,
              letterSpacing: -0.2
            }}
          >
            {tab.name}
          </AppText>
        </Box>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function TabBar({ currentTab, onTabPress, tabs }) {
  const { theme, isDarkMode } = useTheme();

  return (
    <Box 
      row 
      justify="space-between" 
      align="center" 
      py={6} 
      px={8}
      mx={20}
      mb={18}
      radius="full"
      shadow
      bg={isDarkMode ? 'surfaceContainerLowest' : 'white'}
      border={1}
      borderColor={isDarkMode ? 'surfaceContainerHigh' : 'outlineVariant'}
    >
      {tabs.map((tab) => (
        <TabItem
          key={tab.name}
          tab={tab}
          isActive={currentTab === tab.name}
          onPress={() => onTabPress(tab.name)}
          theme={theme}
          isDarkMode={isDarkMode}
        />
      ))}
    </Box>
  );
}
