import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCheckoutOpen } = useStore();

  const [selectedSize, setSelectedSize] = useState<number>(15);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Initialize selected material when product opens
  React.useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.availableSizes[Math.floor(selectedProduct.availableSizes.length / 2)] || 15);
      setSelectedMaterial(selectedProduct.materials[0]?.name || '');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [selectedProduct]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-border bg-brand-bg text-brand-white shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-steel/80 border border-brand-border hover:bg-brand-steel text-brand-gray hover:text-white transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Big Specimen Visualizer */}
        <div className="w-full md:w-1/2 p-8 bg-brand-steel/20 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-brand-border">
          <div className="absolute top-4 left-4 font-mono text-[10px] text-brand-muted tracking-widest">
            <span>INDEX: {selectedProduct.code}</span>
          </div>

          <div className="relative aspect-square w-full max-w-[320px] flex items-center justify-center my-4">
            <div className="absolute w-48 h-48 rounded-full bg-brand-plum/20 blur-[80px] pointer-events-none" />
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-h-72 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
            />
          </div>

          <div className="w-full text-center space-y-1 font-mono text-[11px] text-brand-gray border-t border-brand-border/60 pt-4">
            <div className="flex justify-between">
              <span className="text-brand-muted">AXIS / SYSTEM</span>
              <span className="text-white font-medium">{selectedProduct.axis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">PACKAGING</span>
              <span className="text-white font-medium">CASE R2 FROSTED INCLUDED</span>
            </div>
          </div>
        </div>

        {/* Right: Spec Inspector & Purchase Controls */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="text-xs font-mono text-brand-plum tracking-widest uppercase">
                {selectedProduct.code} // {selectedProduct.axis}
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-brand-gray font-light mt-0.5">
                {selectedProduct.nameKr}
              </p>
              <div className="text-xl font-light font-body text-white mt-3">
                미정
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-lightGray font-light leading-relaxed border-t border-brand-border/60 pt-3">
              {selectedProduct.description}
            </p>

            {/* Material Options */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-brand-muted block">
                MATERIAL OPTION (소재 선택)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProduct.materials.map((mat) => {
                  const isSelected = selectedMaterial === mat.name;
                  return (
                    <button
                      key={mat.name}
                      onClick={() => setSelectedMaterial(mat.name)}
                      className={`p-2.5 rounded border text-left flex items-center space-x-2 text-xs font-mono transition-all ${
                        isSelected
                          ? 'border-brand-plum bg-brand-plum/20 text-white'
                          : 'border-brand-border bg-brand-steel/40 text-brand-gray hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <span className="truncate">{mat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest text-brand-muted">
                  RING SIZE (한국 표준 호수)
                </span>
                <span className="text-[10px] font-mono text-brand-gray">
                  선택: {selectedSize}호
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {selectedProduct.availableSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 rounded border transition-all ${
                        isSelected
                          ? 'border-brand-white bg-brand-white text-brand-bg font-bold'
                          : 'border-brand-border bg-brand-steel/40 text-brand-gray hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Spec Sheet */}
            <div className="p-3.5 rounded-lg bg-brand-steel/50 border border-brand-border text-[11px] font-mono space-y-1.5 text-brand-gray">
              <div className="flex justify-between">
                <span className="text-brand-muted">공정:</span>
                <span className="text-brand-white">{selectedProduct.details.process}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">마감:</span>
                <span className="text-brand-white">{selectedProduct.details.finish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">제작 기간:</span>
                <span className="text-brand-plum">{selectedProduct.details.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded border border-brand-border hover:border-brand-gray bg-brand-steel hover:bg-brand-steel/80 text-brand-white text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">장바구니 담김</span>
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
                className="flex-1 py-3 px-4 rounded bg-brand-white hover:bg-brand-gray text-brand-bg text-xs font-mono font-bold tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>바로 구매하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] font-mono text-center text-brand-muted">
              주문 제작 상품으로 결제 완료 후 3D 프린팅 및 소결 공정이 시작됩니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
