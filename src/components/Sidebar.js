import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import Box from '@/components/Box';
import AppText from '@/components/AppText';
import Icon from '@/components/Icon';
import AnimatedMenuIcon from '@/components/AnimatedMenuIcon';

import menuItems from '@/json/sidebarMenu.json';

export default function Sidebar({ onClose, onNavigate }) {
  const { theme, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];
  const itemAnims = useRef(safeMenuItems.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = itemAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 320,
        delay: index * 50,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start();
  }, []);

  return (
    <Box 
      flex={1} 
      bg={isDarkMode ? 'surfaceContainerLowest' : 'surface'} 
    >
      {/* Sidebar Header */}
      <Box 
        row 
        align="center" 
        justify="space-between" 
        px="containerMargin" 
        pt={12 + insets.top}
        pb={12}
      >
        <Box row align="center" gap={10}>
          <AnimatedMenuIcon 
            onPress={onClose} 
            color={theme.colors.primary}
            size={22}
          />
          <AppText variant="headlineLg" color="primary" style={{ fontWeight: '800', letterSpacing: -0.5 }}>
            DailySpend
          </AppText>
        </Box>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={{ padding: 4 }}>
          <Box style={{ transform: [{ rotate: '180deg' }] }}>
            <Icon name="chevron-right" color={theme.colors.onSurfaceVariant} size={20} />
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Menu Options Scroll view */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 24 }}>
        <Box gap={28}>
          {safeMenuItems.map((item, index) => {
            const anim = itemAnims[index] || new Animated.Value(1);
            const slideX = anim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            });
            const opacity = anim;

            return (
              <TouchableOpacity 
                key={item.name} 
                onPress={() => {
                  onNavigate(item.route);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Animated.View style={{ opacity, transform: [{ translateX: slideX }] }}>
                  <Box row align="center" gap={16}>
                    <Box width={24} height={24} justify="center" align="center">
                      <Icon name={item.icon} color={theme.colors.onSurface} size={20} />
                    </Box>
                    <AppText variant="bodyMd" color="onSurface" style={{ fontWeight: '600', fontSize: 17 }}>
                      {item.name}
                    </AppText>
                  </Box>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </Box>
      </ScrollView>

      {/* Sidebar Footer */}
      <Box 
        py={20} 
        align="center"
        justify="center"
      >
        <AppText variant="labelXs" color="onSurfaceVariant" style={{ fontWeight: '700', letterSpacing: 0.5 }}>
          v1.0.0 Precision
        </AppText>
      </Box>
    </Box>
  );
}
