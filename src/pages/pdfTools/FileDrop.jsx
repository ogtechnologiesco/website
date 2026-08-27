import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

function FileDrop({ label, accept, extensions, onFile, fileName }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const validate = (file) => {
    if (!file) return false;
    const valid = extensions.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!valid) {
      toast.error(`Unsupported format. Use: ${extensions.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (validate(file)) onFile(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (validate(file)) onFile(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-purple-500 bg-purple-500 bg-opacity-10'
          : 'border-gray-600 hover:border-gray-400'
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      {fileName ? (
        <p className="text-gray-300">
          <span className="font-semibold text-purple-400">{fileName}</span> loaded. Click or drag to replace it.
        </p>
      ) : (
        <p className="text-gray-400">{label}</p>
      )}
    </div>
  );
}

export default FileDrop;
