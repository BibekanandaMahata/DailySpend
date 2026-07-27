import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import Box from './Box';

export default function AnimatedMenuIcon({ onPress, color = '#1e293b', size = 22 }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const barWidth = size * 0.85;
  const barHeight = 2.5;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8} 
      style={{ padding: 4 }}
    >
      <Animated.View
        style={{
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Box height={size} justify="space-evenly" align="center" width={size}>
          {/* Top Bar */}
          <Box
            width={barWidth}
            height={barHeight}
            bg={color}
            radius={2}
          />
          {/* Middle Bar */}
          <Box
            width={barWidth}
            height={barHeight}
            bg={color}
            radius={2}
          />
          {/* Bottom Bar */}
          <Box
            width={barWidth}
            height={barHeight}
            bg={color}
            radius={2}
          />
        </Box>
      </Animated.View>
    </TouchableOpacity>
  );
}
