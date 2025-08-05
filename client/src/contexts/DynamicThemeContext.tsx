import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorThief, type ColorPalette } from '../hooks/useColorThief';
import { useDiscordAvatar } from '../hooks/useUserData';

interface DynamicThemeContextType {
  palette: ColorPalette | null;
  loading: boolean;
  error: string | null;
  refreshColors: () => Promise<void>;
  applyTheme: (palette: ColorPalette) => void;
  resetTheme: () => void;
}

const DynamicThemeContext = createContext<DynamicThemeContextType | undefined>(undefined);

export function useDynamicTheme() {
  const context = useContext(DynamicThemeContext);
  if (!context) {
    throw new Error('useDynamicTheme must be used within a DynamicThemeProvider');
  }
  return context;
}

interface DynamicThemeProviderProps {
  children: ReactNode;
}

export function DynamicThemeProvider({ children }: DynamicThemeProviderProps) {
  const { palette, loading: colorLoading, error, extractColors, clearPalette } = useColorThief();
  const { avatar, loading: avatarLoading } = useDiscordAvatar();
  const [isInitialized, setIsInitialized] = useState(false);

  // Apply theme to CSS custom properties
  const applyTheme = (colorPalette: ColorPalette) => {
    const root = document.documentElement;
    
    // Primary color (dominant)
    root.style.setProperty('--color-primary', colorPalette.dominant);
    root.style.setProperty('--color-primary-rgb', hexToRgb(colorPalette.dominant));
    
    // Accent color
    root.style.setProperty('--color-accent', colorPalette.accentColor);
    root.style.setProperty('--color-accent-rgb', hexToRgb(colorPalette.accentColor));
    
    // Text color
    root.style.setProperty('--color-text-primary', colorPalette.textColor);
    
    // Background gradients based on palette
    if (colorPalette.palette.length >= 3) {
      root.style.setProperty('--bg-gradient-1', colorPalette.palette[0]);
      root.style.setProperty('--bg-gradient-2', colorPalette.palette[1]);
      root.style.setProperty('--bg-gradient-3', colorPalette.palette[2]);
    }
    
    // Dynamic background with opacity based on brightness
    const bgOpacity = colorPalette.brightness > 150 ? '0.15' : '0.25';
    root.style.setProperty('--bg-primary-opacity', bgOpacity);
    
    // Shadow colors
    root.style.setProperty('--shadow-primary', `${colorPalette.dominant}40`);
    root.style.setProperty('--shadow-accent', `${colorPalette.accentColor}60`);
    
    // Border colors
    root.style.setProperty('--border-primary', `${colorPalette.dominant}50`);
    root.style.setProperty('--border-accent', `${colorPalette.accentColor}70`);
  };

  // Reset theme to default
  const resetTheme = () => {
    const root = document.documentElement;
    
    // Reset to default blue theme
    root.style.setProperty('--color-primary', '#007BFF');
    root.style.setProperty('--color-primary-rgb', '0, 123, 255');
    root.style.setProperty('--color-accent', '#0056CC');
    root.style.setProperty('--color-accent-rgb', '0, 86, 204');
    root.style.setProperty('--color-text-primary', '#ffffff');
    root.style.setProperty('--bg-gradient-1', '#007BFF');
    root.style.setProperty('--bg-gradient-2', '#0099FF');
    root.style.setProperty('--bg-gradient-3', '#0056CC');
    root.style.setProperty('--bg-primary-opacity', '0.2');
    root.style.setProperty('--shadow-primary', '#007BFF40');
    root.style.setProperty('--shadow-accent', '#0056CC60');
    root.style.setProperty('--border-primary', '#007BFF50');
    root.style.setProperty('--border-accent', '#0056CC70');
    
    clearPalette();
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
    return '0, 0, 0';
  };

  // Refresh colors from current avatar
  const refreshColors = async () => {
    if (!avatar?.avatarUrl) return;
    
    try {
      const newPalette = await extractColors(avatar.avatarUrl);
      applyTheme(newPalette);
    } catch (err) {
      console.error('Failed to refresh colors:', err);
    }
  };

  // Auto-extract colors when avatar changes
  useEffect(() => {
    if (avatar?.avatarUrl && !avatarLoading) {
      if (!isInitialized) {
        // Initial load - extract colors immediately
        extractColors(avatar.avatarUrl)
          .then((newPalette) => {
            applyTheme(newPalette);
            setIsInitialized(true);
          })
          .catch((err) => {
            console.error('Failed to extract initial colors:', err);
            setIsInitialized(true);
          });
      } else {
        // Subsequent updates - small delay for smooth transition
        const timer = setTimeout(() => {
          refreshColors();
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [avatar?.avatarUrl, avatarLoading, isInitialized]);

  // Apply theme when palette changes
  useEffect(() => {
    if (palette) {
      applyTheme(palette);
    }
  }, [palette]);

  const contextValue: DynamicThemeContextType = {
    palette,
    loading: colorLoading || avatarLoading,
    error,
    refreshColors,
    applyTheme,
    resetTheme
  };

  return (
    <DynamicThemeContext.Provider value={contextValue}>
      {children}
    </DynamicThemeContext.Provider>
  );
}