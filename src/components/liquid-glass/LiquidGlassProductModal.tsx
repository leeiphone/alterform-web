import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { PRODUCTS } from '../../data/products';
import { X, ShoppingBag, ArrowUpRight, Check, ChevronLeft, ChevronRight, Box, Image as ImageIcon } from 'lucide-react';
import { LiquidGlassModelViewer } from './LiquidGlassModelViewer';

export const LiquidGlassProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCheckoutOpen } = useStore();

  const [selectedSize, setSelectedSize] = useState<number>(15);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [quantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3D' | 'IMAGE'>('3D');

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.availableSizes[Math.floor(selectedProduct.availableSizes.length / 2)] || 15);
      setSelectedMaterial(selectedProduct.materials[0]?.name || 'Pure White Zirconia');
      setIsAdded(false);
      setViewMode(selectedProduct.modelUrl ? '3D' : 'IMAGE');
    }
  }, [selectedProduct]);

  // Find index for Prev / Next navigation
  const currentIndex = selectedProduct
    ? PRODUCTS.findIndex((p) => p.id === selectedProduct.id)
    : -1;

  const handlePrevProduct = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
    setSelectedProduct(PRODUCTS[prevIdx]);
  };

  const handleNextProduct = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % PRODUCTS.length;
    setSelectedProduct(PRODUCTS[nextIdx]);
  };

  // Keyboard navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProduct) return;
      if (e.key === 'ArrowLeft') handlePrevProduct();
      if (e.key === 'ArrowRight') handleNextProduct();
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, currentIndex]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedMaterial, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedMaterial, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-16 bg-black/98 backdrop-blur-3xl animate-fade-in font-body select-none"
      onClick={() => setSelectedProduct(null)}
    >
      {/* Outer Wrapper for Modal & Large Navigation Arrows */}
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        
        {/* Large Left Arrow (이전 반지) */}
        <button
          onClick={handlePrevProduct}
          aria-label="이전 반지 보기"
          title="이전 반지 (←)"
          className="absolute -left-6 sm:-left-20 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900/90 border border-white/20 hover:border-white hover:bg-white hover:text-black hover:scale-110 text-white transition-all flex items-center justify-center cursor-pointer shadow-2xl group pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transform group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Large Right Arrow (다음 반지) */}
        <button
          onClick={handleNextProduct}
          aria-label="다음 반지 보기"
          title="다음 반지 (→)"
          className="absolute -right-6 sm:-right-20 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900/90 border border-white/20 hover:border-white hover:bg-white hover:text-black hover:scale-110 text-white transition-all flex items-center justify-center cursor-pointer shadow-2xl group pointer-events-auto"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transform group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Modal Container */}
        <div 
          className="relative w-full max-h-[90vh] overflow-hidden rounded-[1.75rem] bg-[#0c0c0e]/98 backdrop-blur-2xl border border-white/15 text-white shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col md:flex-row"
        >
          {/* Close Button (Fixed Top-Right) */}
          <button
            onClick={() => setSelectedProduct(null)}
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
            className="z-30 w-10 h-10 liquid-glass rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center pointer-events-auto"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

        {/* Left: Specimen Visualizer */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col items-center justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10 min-h-[380px]">
          {/* Top Bar with INDEX & 3D/2D Toggle */}
          <div className="w-full flex items-center justify-between z-20 mb-2">
            <div className="font-mono text-[10px] text-white/50 tracking-widest flex items-center gap-2">
              <span>INDEX: {selectedProduct.code}</span>
              {selectedProduct.modelUrl && (
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/40 font-mono flex items-center gap-1">
                  <Box className="w-2.5 h-2.5" />
                  3D INTERACTIVE
                </span>
              )}
            </div>

            {/* 3D / 2D View Switcher */}
            {selectedProduct.modelUrl && (
              <div className="flex items-center liquid-glass rounded-full p-0.5 border border-white/15 shadow-md">
                <button
                  type="button"
                  onClick={() => setViewMode('3D')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === '3D'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>3D VIEW</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('IMAGE')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === 'IMAGE'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>PHOTO</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Visualizer Area */}
          <div className="relative aspect-square w-full max-w-[380px] flex items-center justify-center my-3">
            <div className="absolute w-52 h-52 rounded-full bg-white/10 blur-[90px] pointer-events-none" />
            {selectedProduct.modelUrl && viewMode === '3D' ? (
              <div className="w-full h-full relative z-10 flex items-center justify-center rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl">
                <LiquidGlassModelViewer
                  key={selectedProduct.id}
                  modelUrl={selectedProduct.modelUrl}
                  fallbackImage={selectedProduct.image}
                />
              </div>
            ) : (
              <div className="w-full h-full relative z-10 flex items-center justify-center rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover relative z-10 animate-fade-in"
                />
              </div>
            )}
          </div>

          {/* Bottom Spec Footer */}
          <div className="w-full text-center space-y-1.5 text-xs text-white/70 border-t border-white/10 pt-4 mt-auto">
            <div className="flex justify-between">
              <span className="text-white/50 font-light">SYSTEM</span>
              <span className="font-heading font-semibold text-sm text-white">{selectedProduct.axis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50 font-light">PACKAGING</span>
              <span className="text-white font-light text-[11px]">CASE R2 FROSTED INCLUDED</span>
            </div>
          </div>
        </div>

        {/* Right: Spec Inspector & Customization */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6 text-left max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <span className="text-[11px] font-mono tracking-widest text-white/60 uppercase">
                {selectedProduct.code} // {selectedProduct.axis}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1 leading-tight tracking-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-white/60 font-light mt-0.5">
                {selectedProduct.nameKr}
              </p>
              <div className="text-2xl font-light text-white mt-3 font-body">
                ₩{selectedProduct.price.toLocaleString()}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed border-t border-white/10 pt-3">
              {selectedProduct.description}
            </p>

            {/* Material Options (Pure White Zirconia 단일 통합) */}
            <div className="space-y-2">
              <span className="text-[11px] text-white/60 font-light block">
                소재 (Signature Material)
              </span>
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-2 rounded-full bg-white text-black text-xs font-medium shadow-md">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F8FAFC] border border-black/20 flex-shrink-0 shadow-inner" />
                <span>Pure White Zirconia (고밀도 파인 화이트 지르코니아)</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/60 font-light">
                  반지 호수 (한국 표준)
                </span>
                <span className="text-xs text-white font-medium">
                  {selectedSize}호 선택됨
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {selectedProduct.availableSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 rounded-full transition-all flex items-center justify-center font-mono ${
                        isSelected
                          ? 'bg-white text-black font-bold shadow'
                          : 'liquid-glass text-white/70 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Spec Sheet */}
            <div className="liquid-glass p-3.5 rounded-xl text-xs space-y-1.5 text-white/75 font-light">
              <div className="flex justify-between">
                <span className="text-white/50">공정:</span>
                <span className="text-white">{selectedProduct.details.process}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">마감:</span>
                <span className="text-white">{selectedProduct.details.finish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">제작 기간:</span>
                <span className="text-white font-medium">{selectedProduct.details.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <div className="flex gap-2.5">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-full liquid-glass-strong hover:bg-white/10 text-white text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">담김</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>장바구니 담기</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>바로 구매하기</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};
export default LiquidGlassProductModal;
