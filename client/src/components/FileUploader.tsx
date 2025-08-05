import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, FileText, Download } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadDate: Date;
}

export default function FileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.includes('text') || type.includes('document')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);
    
    Array.from(files).forEach((file) => {
      // Create a preview URL for the file
      const url = URL.createObjectURL(file);
      
      const newFile: UploadedFile = {
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        uploadDate: new Date()
      };

      // Simulate upload delay
      setTimeout(() => {
        setUploadedFiles(prev => [...prev, newFile]);
        setIsUploading(false);
      }, 1000);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300
          ${isDragging 
            ? 'dynamic-border-primary bg-white/5 dynamic-shadow-primary' 
            : 'border-white/20 hover:border-white/40 dynamic-glass'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:bg-white/5'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          accept="*/*"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-6 rounded-full ${isDragging ? 'dynamic-gradient-2 dynamic-shadow-primary' : 'bg-white/10'}`}>
            <Upload className={`w-10 h-10 ${isDragging ? 'text-white' : 'text-white/70'}`} />
          </div>
          
          {isUploading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 dynamic-border-primary"></div>
              <span className="text-white/80 text-lg">جاري الرفع...</span>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-white dynamic-glow-accent">
                اسحب وأفلت ملفاتك هنا
              </div>
              <div className="text-lg text-white/70">
                أو اضغط للاختيار من جهازك
              </div>
              <div className="text-sm text-white/50">
                يدعم جميع أنواع الملفات • حتى 100MB
              </div>
            </>
          )}
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white dynamic-glow-primary text-center">
            الملفات المرفوعة ({uploadedFiles.length})
          </h3>
          
          <div className="grid gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 dynamic-shadow-accent backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 text-white/70">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-white truncate">
                      {file.name}
                    </div>
                    <div className="text-sm text-white/50 flex items-center space-x-3">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{file.uploadDate.toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => downloadFile(file)}
                    className="p-3 text-white/70 hover:text-white dynamic-hover rounded-xl transition-all"
                    title="تحميل"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-3 text-white/70 hover:text-red-400 rounded-xl transition-all"
                    title="حذف"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Clear All Button */}
          <div className="text-center">
            <button
              onClick={() => {
                uploadedFiles.forEach(file => URL.revokeObjectURL(file.url));
                setUploadedFiles([]);
              }}
              className="px-6 py-3 text-lg text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/50 rounded-xl hover:bg-red-500/10 transition-all duration-300"
            >
              حذف جميع الملفات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}