import React from 'react';
import { Text } from 'react-native';
import Box from './Box';

export default function Icon({ name, color = '#64748b', size = 20 }) {
  const normalizedName = name?.toLowerCase();

  if (normalizedName === 'home') {
    const boxSize = (size - 3) / 2;
    return (
      <Box width={size} height={size} wrap="wrap" row gap={2} justify="center" align="center">
        <Box width={boxSize} height={boxSize} bg={color} radius={1.5} />
        <Box width={boxSize} height={boxSize} bg={color} radius={1.5} />
        <Box width={boxSize} height={boxSize} bg={color} radius={1.5} />
        <Box width={boxSize} height={boxSize} bg={color} radius={1.5} />
      </Box>
    );
  }

  if (normalizedName === 'history') {
    return (
      <Box width={size * 0.85} height={size} border={2} borderColor={color} radius={2} p={3} justify="space-between">
        <Box height={1.5} bg={color} width="100%" />
        <Box height={1.5} bg={color} width="80%" />
        <Box height={1.5} bg={color} width="60%" />
      </Box>
    );
  }

  if (normalizedName === 'budgets') {
    return (
      <Box width={size} height={size} justify="space-between" align="center">
        {/* Roof */}
        <Box width="100%" height={0} style={{
          borderBottomWidth: 4,
          borderBottomColor: color,
          borderLeftWidth: size / 2,
          borderLeftColor: 'transparent',
          borderRightWidth: size / 2,
          borderRightColor: 'transparent',
        }} />
        {/* Columns */}
        <Box row justify="space-between" width="80%" height={size - 7} mt={1}>
          <Box width={2} height="100%" bg={color} />
          <Box width={2} height="100%" bg={color} />
          <Box width={2} height="100%" bg={color} />
        </Box>
        {/* Base */}
        <Box width="100%" height={2} bg={color} mt={1} />
      </Box>
    );
  }

  if (normalizedName === 'settings') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        {/* Spokes (drawn as horizontal & vertical intersecting lines) */}
        <Box style={{ position: 'absolute', width: size, height: 4, backgroundColor: color, borderRadius: 1 }} />
        <Box style={{ position: 'absolute', width: 4, height: size, backgroundColor: color, borderRadius: 1 }} />
        <Box style={{ position: 'absolute', width: size - 2, height: size - 2, backgroundColor: color, borderRadius: 999, transform: [{ rotate: '45deg' }] }} />
        <Box style={{ position: 'absolute', width: size - 2, height: 4, backgroundColor: color, borderRadius: 1, transform: [{ rotate: '45deg' }] }} />
        <Box style={{ position: 'absolute', width: 4, height: size - 2, backgroundColor: color, borderRadius: 1, transform: [{ rotate: '45deg' }] }} />
        
        {/* Outer Ring Cover */}
        <Box width={size - 4} height={size - 4} radius="full" bg={color} justify="center" align="center">
          {/* Inner Circle Cutout */}
          <Box width={(size - 4) * 0.4} height={(size - 4) * 0.4} radius="full" style={{ backgroundColor: 'white' }} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'shopping') {
    return (
      <Box justify="center" align="center" width={size} height={size}>
        {/* Handle */}
        <Box width={size * 0.4} height={size * 0.3} radius="full" border={1.5} borderColor={color} style={{ borderBottomWidth: 0, marginBottom: -2 }} />
        {/* Bag Body */}
        <Box width={size * 0.7} height={size * 0.7} radius={2} border={1.5} borderColor={color} />
      </Box>
    );
  }

  if (normalizedName === 'food') {
    return (
      <Box row justify="center" align="center" gap={3} width={size} height={size}>
        {/* Fork */}
        <Box align="center" height="100%" justify="space-between" style={{ paddingVertical: 1 }}>
          <Box row gap={1} height="55%">
            <Box width={1.5} height="100%" bg={color} />
            <Box width={1.5} height="100%" bg={color} />
            <Box width={1.5} height="100%" bg={color} />
          </Box>
          <Box width={1.5} height="45%" bg={color} />
        </Box>
        {/* Knife */}
        <Box align="center" height="100%" justify="space-between" style={{ paddingVertical: 1 }}>
          <Box width={2.5} height="55%" bg={color} radius={1} />
          <Box width={1.5} height="45%" bg={color} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'transport') {
    return (
      <Box justify="center" align="center" width={size} height={size * 0.9}>
        {/* Car Top */}
        <Box width={size * 0.65} height={size * 0.35} radius={1.5} border={1.5} borderColor={color} style={{ borderBottomWidth: 0 }} />
        {/* Car Body */}
        <Box width={size} height={size * 0.45} radius={2} bg={color} row justify="space-between" align="flex-end" px={2} pb={0.5}>
          {/* Wheels */}
          <Box width={3.5} height={3.5} radius="full" style={{ backgroundColor: 'white' }} />
          <Box width={3.5} height={3.5} radius="full" style={{ backgroundColor: 'white' }} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'utilities') {
    return (
      <Box justify="center" align="center" width={size} height={size}>
        {/* Bolt lightning design constructed via angled segments */}
        <Box height="100%" width="50%" justify="center" align="center">
          <Box width={size * 0.35} height={size * 0.5} bg={color} style={{
            transform: [{ skewX: '-25deg' }],
            alignSelf: 'center',
          }} />
          <Box width={size * 0.35} height={size * 0.5} bg={color} style={{
            transform: [{ skewX: '-25deg' }],
            alignSelf: 'center',
            marginTop: -size * 0.15,
            marginLeft: -size * 0.15,
          }} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'chevron-right') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.3} height={size * 0.3} style={{
          borderTopWidth: 2,
          borderRightWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }} />
      </Box>
    );
  }

  if (normalizedName === 'search') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.55} height={size * 0.55} radius="full" border={2} borderColor={color} style={{ marginRight: size * 0.1, marginBottom: size * 0.1 }}>
          <Box style={{
            position: 'absolute',
            bottom: -size * 0.22,
            right: -size * 0.22,
            width: 2,
            height: size * 0.38,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
          }} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'filter') {
    return (
      <Box width={size} height={size} justify="center" align="center" gap={3}>
        <Box width={size * 0.85} height={2} bg={color} radius="full" />
        <Box width={size * 0.55} height={2} bg={color} radius="full" />
        <Box width={size * 0.25} height={2} bg={color} radius="full" />
      </Box>
    );
  }

  if (normalizedName === 'bell') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.5} height={size * 0.5} radius="full" border={2} borderColor={color} style={{ borderBottomWidth: 0 }}>
          <Box style={{ position: 'absolute', bottom: -2, left: -size * 0.15, width: size * 0.8, height: 2, backgroundColor: color }} />
          <Box style={{ position: 'absolute', bottom: -5, left: size * 0.15, width: size * 0.2, height: size * 0.2, borderRadius: 999, backgroundColor: color }} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'lock') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.4} height={size * 0.4} radius="full" border={2} borderColor={color} style={{ borderBottomWidth: 0, marginBottom: -2 }} />
        <Box width={size * 0.6} height={size * 0.45} radius={2} border={2} borderColor={color} justify="center" align="center">
          <Box width={2} height={4} bg={color} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'user') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.4} height={size * 0.4} radius="full" border={2} borderColor={color} mb={1} />
        <Box width={size * 0.75} height={size * 0.3} style={{
          borderTopLeftRadius: size * 0.3,
          borderTopRightRadius: size * 0.3,
          borderWidth: 2,
          borderColor: color,
          borderBottomWidth: 0,
        }} />
      </Box>
    );
  }

  if (normalizedName === 'palette') {
    return (
      <Box width={size} height={size} radius="full" border={2} borderColor={color} justify="center" align="center">
        <Box row gap={1.5} wrap="wrap" justify="center" align="center" width="70%" style={{ marginTop: 1 }}>
          <Box width={3} height={3} radius="full" bg={color} />
          <Box width={3} height={3} radius="full" bg={color} />
          <Box width={3} height={3} radius="full" bg={color} />
          <Box width={3} height={3} radius="full" bg={color} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'housing') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={0} height={0} style={{
          borderBottomWidth: size * 0.45,
          borderBottomColor: color,
          borderLeftWidth: size * 0.45,
          borderLeftColor: 'transparent',
          borderRightWidth: size * 0.45,
          borderRightColor: 'transparent',
        }} />
        <Box width={size * 0.75} height={size * 0.45} border={2} borderColor={color} style={{ borderTopWidth: 0 }} justify="flex-end" align="center">
          <Box width={size * 0.2} height={size * 0.2} bg={color} />
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'entertainment') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.8} height={size * 0.7} radius={2} border={2} borderColor={color}>
          <Box width="100%" height={size * 0.22} bg={color} row justify="space-around" align="center" style={{ overflow: 'hidden' }}>
            <Box width={2} height={1.5} bg="white" style={{ transform: [{ rotate: '45deg' }] }} />
            <Box width={2} height={1.5} bg="white" style={{ transform: [{ rotate: '45deg' }] }} />
            <Box width={2} height={1.5} bg="white" style={{ transform: [{ rotate: '45deg' }] }} />
          </Box>
          <Box flex={1} justify="center" align="center">
            <Box width={0} height={0} style={{
              borderTopWidth: 2.5,
              borderTopColor: 'transparent',
              borderBottomWidth: 2.5,
              borderBottomColor: 'transparent',
              borderLeftWidth: 4.5,
              borderLeftColor: color,
            }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (normalizedName === 'plus') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box style={{ position: 'absolute', width: size * 0.7, height: 2, backgroundColor: color, borderRadius: 1 }} />
        <Box style={{ position: 'absolute', width: 2, height: size * 0.7, backgroundColor: color, borderRadius: 1 }} />
      </Box>
    );
  }

  if (normalizedName === 'info') {
    return (
      <Box width={size} height={size} radius="full" border={2} borderColor={color} justify="center" align="center">
        <Text style={{ fontFamily: 'System', fontWeight: '800', fontSize: size * 0.5, color: color, textAlign: 'center', lineHeight: size * 0.75 }}>i</Text>
      </Box>
    );
  }

  if (normalizedName === 'help') {
    return (
      <Box width={size} height={size} radius="full" border={2} borderColor={color} justify="center" align="center">
        <Text style={{ fontFamily: 'System', fontWeight: '800', fontSize: size * 0.5, color: color, textAlign: 'center', lineHeight: size * 0.75 }}>?</Text>
      </Box>
    );
  }

  if (normalizedName === 'privacy') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box width={size * 0.7} height={size * 0.8} style={{
          borderWidth: 2,
          borderColor: color,
          borderTopLeftRadius: size * 0.35,
          borderTopRightRadius: size * 0.35,
          borderBottomLeftRadius: size * 0.25,
          borderBottomRightRadius: size * 0.25,
        }} />
      </Box>
    );
  }

  if (normalizedName === 'close') {
    return (
      <Box width={size} height={size} justify="center" align="center">
        <Box style={{ position: 'absolute', width: size * 0.7, height: 2, backgroundColor: color, transform: [{ rotate: '45deg' }] }} />
        <Box style={{ position: 'absolute', width: size * 0.7, height: 2, backgroundColor: color, transform: [{ rotate: '-45deg' }] }} />
      </Box>
    );
  }

  return null;
}
