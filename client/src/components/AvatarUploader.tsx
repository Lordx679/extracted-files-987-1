import React, { useState, useRef } from 'react';
import { Upload, Link, Image, X } from 'lucide-react';
import { useDynamicTheme } from '../contexts/DynamicThemeContext';

interface AvatarUploaderProps {
  onAvatarUpdate: (avatarUrl: string) => void;
  currentAvatar?: string;
}

export default function AvatarUploader({ onAvatarUpdate, currentAvatar }: AvatarUploaderProps) {
  const [showUploader, setShowUploader] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refreshColors } = useDynamicTheme();

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      alert('حدث خطأ في قراءة الملف');
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };

  // Handle URL input
  const handleUrlSubmit = async () => {
    if (!avatarUrl.trim()) {
      alert('يرجى إدخال رابط صحيح');
      return;
    }

    setIsLoading(true);
    
    // Test if URL is a valid image
    const img = document.createElement('img');
    img.onload = () => {
      setPreviewUrl(avatarUrl);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      alert('الرابط المدخل ليس صورة صالحة أو غير متاح');
      setIsLoading(false);
    };
    
    img.src = avatarUrl;
  };

  // Apply the new avatar
  const applyAvatar = async () => {
    if (!previewUrl) return;
    
    setIsLoading(true);
    
    try {
      // Update avatar in the main app
      onAvatarUpdate(previewUrl);
      
      // Extract colors from new avatar
      await refreshColors();
      
      setShowUploader(false);
      setPreviewUrl('');
      setAvatarUrl('');
    } catch (error) {
      console.error('Error applying avatar:', error);
      alert('حدث خطأ في تطبيق الصورة الجديدة');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPreview = () => {
    setPreviewUrl('');
    setAvatarUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!showUploader) {
    return (
      <button
        onClick={() => setShowUploader(true)}
        className="dynamic-button text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
        title="تحديث صورة الأفتار"
      >
        <Upload className="w-4 h-4" />
        <span>تحديث الصورة</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="dynamic-glass rounded-2xl max-w-md w-full p-6 dynamic-shadow-primary">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white dynamic-glow-primary">
            تحديث صورة الأفتار
          </h3>
          <button
            onClick={() => setShowUploader(false)}
            className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Current Avatar */}
        {currentAvatar && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">الصورة الحالية:</label>
            <img
              src={currentAvatar}
              alt="Current Avatar"
              className="w-20 h-20 rounded-full border-2 dynamic-border-primary object-cover"
            />
          </div>
        )}

        {/* Upload Methods */}
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">
              <Upload className="w-4 h-4 inline mr-2" />
              رفع صورة من الجهاز:
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full p-3 bg-black/30 border dynamic-border-primary rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:dynamic-button file:text-white hover:file:scale-105 file:transition-transform"
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">
              <Link className="w-4 h-4 inline mr-2" />
              أو أدخل رابط الصورة:
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://cdn.discordapp.com/avatars/..."
                className="flex-1 p-3 bg-black/30 border dynamic-border-primary rounded-lg text-white placeholder-white/50 focus:dynamic-border-accent focus:outline-none"
              />
              <button
                onClick={handleUrlSubmit}
                disabled={!avatarUrl.trim() || isLoading}
                className="dynamic-button px-4 py-3 text-white rounded-lg disabled:opacity-50"
              >
                تحميل
              </button>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                <Image className="w-4 h-4 inline mr-2" />
                معاينة الصورة الجديدة:
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-full border-2 dynamic-border-accent object-cover dynamic-shadow-accent"
                />
                <div className="flex-1">
                  <button
                    onClick={resetPreview}
                    className="text-red-400 hover:text-red-300 text-sm underline mb-2 block"
                  >
                    إلغاء المعاينة
                  </button>
                  <p className="text-white/70 text-sm">
                    انقر على "تطبيق" لاستخدام هذه الصورة واستخراج الألوان منها
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={applyAvatar}
            disabled={!previewUrl || isLoading}
            className="flex-1 dynamic-button py-3 text-white rounded-lg disabled:opacity-50 font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جارٍ التطبيق...</span>
              </div>
            ) : (
              'تطبيق الصورة واستخراج الألوان'
            )}
          </button>
          
          <button
            onClick={() => setShowUploader(false)}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            إلغاء
          </button>
        </div>

        {/* Discord Avatar Instructions */}
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-300 mb-2">للحصول على رابط صورة Discord:</h4>
          <ol className="text-xs text-blue-200 space-y-1">
            <li>1. افتح Discord في المتصفح (ويب)</li>
            <li>2. انقر بالزر الأيمن على صورتك الشخصية</li>
            <li>3. اختر "فتح الصورة في علامة تبويب جديدة"</li>
            <li>4. انسخ الرابط من شريط العنوان</li>
          </ol>
        </div>
      </div>
    </div>
  );
}