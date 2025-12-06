"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Wallet, RefreshCw } from "lucide-react";

export default function PfpTwister() {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const loadAsset = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => setImage(img);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false
  });

  useEffect(() => {
    const draw = async () => {
      if (!image || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const size = 600; 
      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = "#D32F2F";
      ctx.fillRect(0, 0, size, size);

      const logo = await loadAsset('/assets/logo-bg.png');
      
      if (logo) {
        ctx.globalAlpha = 0.6; 
        
        const spacing = 130;   
        const rows = Math.ceil(size / spacing) + 1;
        const cols = Math.ceil(size / spacing) + 1;

        for (let row = 0; row < rows; row++) {
          const offsetX = (row % 2 === 0) ? 0 : spacing / 2;

          for (let col = 0; col < cols; col++) {
            const x = (col * spacing) + offsetX - 35; 
            const y = row * spacing - 20;
            
            const iconSize = 75; 
            
            ctx.drawImage(logo, x, y, iconSize, iconSize);
          }
        }
        ctx.globalAlpha = 1.0;
      }

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = 180; 

      ctx.save();
      
      const borderThickness = 15; 
      const numSegments = 40;   
      const segmentAngle = (Math.PI * 2) / numSegments;

      ctx.save();
      ctx.lineWidth = borderThickness;

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle + 0.01; 

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + borderThickness / 2, startAngle, endAngle);

        ctx.strokeStyle = (i % 2 === 0) ? "#FFD700" : "#2D2D2D";
        ctx.stroke();
      }
      ctx.restore();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      const scale = Math.max((radius * 2) / image.width, (radius * 2) / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      const x = centerX - w / 2;
      const y = centerY - h / 2;
      
      ctx.drawImage(image, x, y, w, h);
      ctx.restore();

      ctx.fillStyle = "white";
      ctx.font = "bold 28px monospace"; 
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.fillText("ETHMUMBAI 2026", centerX, size - 30);
    };

    draw();
  }, [image]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "ethmumbai-pfp.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      
      {/* Editor Area */}
      <div className="relative">
        {!image ? (
          <div
            {...getRootProps()}
            className="w-[350px] h-[350px] rounded-full border-4 border-dashed border-white/30 flex flex-col items-center justify-center cursor-pointer transition-all bg-white/5 hover:bg-white/10 hover:border-white"
          >
            <input {...getInputProps()} />
            <Upload className="text-white mb-4" size={40} />
            <p className="font-bold text-white text-lg">Upload Photo</p>
          </div>
        ) : (
          <div className="relative group">
            <canvas
              ref={canvasRef}
              className="w-[350px] h-[350px] rounded-full shadow-2xl border-4 border-yellow-400"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      {image && (
        <div className="flex gap-4 w-full max-w-[350px]">
          <button
            onClick={() => setImage(null)}
            className="flex-1 py-3 rounded-xl bg-black/40 text-white font-bold hover:bg-black/60 transition-all flex justify-center items-center gap-2"
          >
            <RefreshCw size={18} /> Retry
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 py-3 rounded-xl bg-yellow-400 text-black font-extrabold hover:bg-yellow-300 transition-all shadow-lg flex justify-center items-center gap-2"
          >
            <Wallet size={20} /> Mint PFP
          </button>
        </div>
      )}
    </div>
  );
}