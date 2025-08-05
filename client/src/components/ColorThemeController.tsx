import React, { useState } from 'react';
import { Palette, RefreshCw, Eye, Download, RotateCcw } from 'lucide-react';
import { useDynamicTheme } from '../contexts/DynamicThemeContext';

export default function ColorThemeController() {
  const { palette, loading, error, refreshColors, resetTheme } = useDynamicTheme();
  const [showPalette, setShowPalette] = useState(false);

  const handleRefresh = async () => {
    await refreshColors();
  };

  const handleReset = () => {
    resetTheme();
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Control Button */}
      <div className="relative">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="w-14 h-14 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          style={{
            boxShadow: `0 8px 32px var(--shadow-primary)`,
            border: `2px solid var(--border-primary)`
          }}
          title="تحكم في ألوان الموقع"
        >
          <Palette className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          {loading && (
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>

        {/* Color Palette Panel */}
        {showPalette && (
          <div className="absolute bottom-16 right-0 w-80 bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 p-6 transform transition-all duration-300"
               style={{
                 borderColor: 'var(--border-primary)',
                 boxShadow: `0 20px 60px var(--shadow-primary)`
               }}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white" style={{textShadow: '0 0 10px var(--color-primary)'}}>
                ألوان ديناميكية
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg hover:scale-110 transition-all disabled:opacity-50"
                  title="تحديث الألوان"
                >
                  <RefreshCw className={`w-4 h-4 text-white ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg hover:scale-110 transition-all"
                  title="استعادة الألوان الافتراضية"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Current Palette */}
            {palette && (
              <div className="space-y-4">
                {/* Dominant Color */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">اللون المهيمن</label>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: palette.dominant }}
                      onClick={() => copyColorToClipboard(palette.dominant)}
                      title={`انقر لنسخ: ${palette.dominant}`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-white font-mono text-sm">{palette.dominant}</p>
                      <p className="text-white/60 text-xs">
                        السطوع: {Math.round(palette.brightness)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">مجموعة الألوان</label>
                  <div className="grid grid-cols-5 gap-2">
                    {palette.palette.map((color, index) => (
                      <div
                        key={index}
                        className="w-full h-10 rounded-lg border border-white/20 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColorToClipboard(color)}
                        title={`انقر لنسخ: ${color}`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">اللون التكميلي</label>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: palette.accentColor }}
                      onClick={() => copyColorToClipboard(palette.accentColor)}
                      title={`انقر لنسخ: ${palette.accentColor}`}
                    ></div>
                    <p className="text-white font-mono text-sm">{palette.accentColor}</p>
                  </div>
                </div>

                {/* Theme Info */}
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-white">معلومات الموضوع</span>
                  </div>
                  <div className="space-y-1 text-xs text-white/70">
                    <p>لون النص: {palette.textColor}</p>
                    <p>نوع الموضوع: {palette.brightness > 128 ? 'فاتح' : 'داكن'}</p>
                    <p>تم استخراج {palette.palette.length} ألوان</p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && !palette && (
              <div className="flex flex-col items-center py-8">
                <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-white/70 text-sm">جارٍ استخراج الألوان...</p>
              </div>
            )}

            {/* No Palette State */}
            {!loading && !palette && !error && (
              <div className="text-center py-8">
                <Palette className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <p className="text-white/70 text-sm mb-4">انقر على "تحديث الألوان" لاستخراج ألوان من صورة Discord الشخصية</p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg text-white text-sm hover:scale-105 transition-transform"
                >
                  استخراج الألوان
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status Indicator */}
        {palette && (
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
}