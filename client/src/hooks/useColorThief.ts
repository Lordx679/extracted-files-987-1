import { useState, useEffect, useCallback } from 'react';
import ColorThief from 'colorthief';

export interface ColorPalette {
  dominant: string;
  palette: string[];
  brightness: number;
  textColor: string;
  accentColor: string;
}

export function useColorThief() {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert RGB array to hex
  const rgbToHex = (rgb: number[]): string => {
    return "#" + rgb.map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // Helper function to calculate brightness
  const getBrightness = (rgb: number[]): number => {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  };

  // Helper function to get contrasting text color
  const getTextColor = (brightness: number): string => {
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  // Helper function to get accent color (lighter/darker variant)
  const getAccentColor = (rgb: number[]): string => {
    const brightness = getBrightness(rgb);
    const factor = brightness > 128 ? 0.7 : 1.3; // Darken if bright, lighten if dark
    
    const accentRgb = rgb.map(channel => 
      Math.min(255, Math.max(0, Math.round(channel * factor)))
    );
    
    return rgbToHex(accentRgb);
  };

  const extractColors = useCallback(async (imageUrl: string): Promise<ColorPalette> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          
          // Get dominant color
          const dominantColor = colorThief.getColor(img);
          const dominantHex = rgbToHex(dominantColor);
          
          // Get color palette (5 colors)
          const colorPalette = colorThief.getPalette(img, 5);
          const paletteHex = colorPalette.map((color: number[]) => rgbToHex(color));
          
          // Calculate brightness
          const brightness = getBrightness(dominantColor);
          
          // Get text and accent colors
          const textColor = getTextColor(brightness);
          const accentColor = getAccentColor(dominantColor);
          
          const result: ColorPalette = {
            dominant: dominantHex,
            palette: paletteHex,
            brightness,
            textColor,
            accentColor
          };
          
          setPalette(result);
          setLoading(false);
          resolve(result);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to extract colors';
          setError(errorMessage);
          setLoading(false);
          reject(new Error(errorMessage));
        }
      };
      
      img.onerror = () => {
        const errorMessage = 'Failed to load image for color extraction';
        setError(errorMessage);
        setLoading(false);
        reject(new Error(errorMessage));
      };
      
      // Add timestamp to prevent caching issues
      const timestamp = Date.now();
      img.src = imageUrl.includes('?') 
        ? `${imageUrl}&colorThief=${timestamp}` 
        : `${imageUrl}?colorThief=${timestamp}`;
    });
  }, []);

  // Clear current palette
  const clearPalette = useCallback(() => {
    setPalette(null);
    setError(null);
  }, []);

  return {
    palette,
    loading,
    error,
    extractColors,
    clearPalette
  };
}