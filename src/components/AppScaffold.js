import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, ScrollView, View, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import Box from './Box';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.65, 280);

export default function AppScaffold({ 
  children, 
  body,
  bottomNavigationBar, 
  appBar, 
  floatingActionButton,
  scrollable = false, 
  bg,
  drawer,
  drawerOpen = false,
  onDrawerClose
}) {
  const { theme, isDarkMode } = useTheme();
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(drawerOpen);

  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (drawerOpen) {
      setShouldRenderDrawer(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 240,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRenderDrawer(false);
      });
    }
  }, [drawerOpen]);

  const content = body || children;

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: bg || theme.colors.background
    }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <Box flex={1}>
        {/* Top App Bar */}
        {appBar && appBar}
        
        {/* Main Body */}
        {scrollable ? (
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {content}
          </ScrollView>
        ) : (
          <Box flex={1}>
            {content}
          </Box>
        )}
        
        {/* Bottom Navigation */}
        {bottomNavigationBar && bottomNavigationBar}
        
        {/* Floating Action Button */}
        {floatingActionButton && (
          <View style={{ position: 'absolute', bottom: bottomNavigationBar ? 80 : 24, right: 20, zIndex: 10 }}>
            {floatingActionButton}
          </View>
        )}
      </Box>

      {/* Absolute Drawer Overlay with Classic Clean Slide */}
      {drawer && shouldRenderDrawer && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            opacity: fadeAnim,
          }}
        >
          {/* Overlay Dismiss Backdrop */}
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={onDrawerClose}
            style={{ 
              position: 'absolute', 
              top: 0, 
              bottom: 0, 
              left: 0, 
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          />
          {/* Drawer Slide Container */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: DRAWER_WIDTH,
              height: '100%',
              transform: [{ translateX: slideAnim }],
            }}
          >
            {drawer}
          </Animated.View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
