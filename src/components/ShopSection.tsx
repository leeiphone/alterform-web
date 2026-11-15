import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { ShoppingBag, ArrowUpRight, ShieldCheck, Check } from 'lucide-react';

export const ShopSection: React.FC = () => {
  const { setSelectedProduct, addToCart } = useStore();
  const [filterAxis, setFilterAxis] = useState<string>('ALL');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const filteredProducts = filterAxis === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.axis === filterAxis);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    // Default size 15, default first material
    addToCart(product, 15, product.materials[0].name, 1);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  return (
    <section id="shop" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-border/60">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-brand-plum tracking-widest uppercase mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>03 / ONLINE STORE & ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            WEARABLE OBJECTS
          </h2>
          <p className="text-brand-gray text-sm sm:text-base mt-2 font-light">
            주문 즉시 세라믹 3D 프린팅 및 정밀 수작업 폴리싱을 거쳐 생산되는 한정 수량 주문 제작 아카이브 피스.
          </p>
        </div>

        {/* Axis Filter Tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['ALL', 'STRUCTURE', 'DISTORTION', 'FLUID', 'GROWTH', 'VOID'].map((axis) => (
            <button
              key={axis}
              onClick={() => setFilterAxis(axis)}
              className={`px-3 py-1.5 rounded border transition-colors ${
                filterAxis === axis
                  ? 'border-brand-white bg-brand-white text-brand-bg font-bold'
                  : 'border-brand-border bg-brand-steel/40 text-brand-gray hover:text-white'
              }`}
            >
              {axis}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative rounded-2xl border border-brand-border bg-brand-card hover:border-brand-gray/80 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-black/60"
          >
            {/* Top Bar: Code & Signature Pill */}
            <div className="p-5 flex items-center justify-between text-xs font-mono">
              <span className="text-brand-muted tracking-widest">{product.code}</span>
              {product.isSignature && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-plum/20 text-brand-plum border border-brand-plum/40 font-bold tracking-wider">
                  SIGNATURE
                </span>
              )}
            </div>

            {/* Product Image Area */}
            <div className="relative aspect-square flex items-center justify-center p-8 bg-brand-steel/20 overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-bg/60 opacity-60 pointer-events-none" />
              <img
                src={product.image}
                alt={product.name}
                className="max-h-56 w-auto object-contain transform group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
              />

              {/* Hover Quick Action Overlay */}
              <div className="absolute inset-0 bg-brand-bg/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="px-4 py-2 rounded bg-brand-white text-brand-bg text-xs font-mono font-bold hover:bg-brand-gray transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <span>INSPECT DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Product Info & Purchase Bar */}
            <div className="p-5 space-y-4 border-t border-brand-border/60 bg-brand-card/90">
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-brand-plum uppercase">
                  {product.axis}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-brand-white transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-brand-muted truncate">
                  {product.nameKr}
                </p>
              </div>

              {/* Price and Cart Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="font-mono">
                  <span className="text-base font-light text-white tracking-tight">
                    미정
                  </span>
                </div>

                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="px-3 py-1.5 rounded border border-brand-border hover:border-brand-plum bg-brand-steel hover:bg-brand-plum text-brand-white text-xs font-mono transition-all flex items-center gap-1.5"
                  title="15호 기본 옵션으로 장바구니 담기"
                >
                  {addedNotice === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">ADDED</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>담기</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Production Notice Banner */}
      <div className="mt-16 p-6 rounded-xl border border-brand-border/80 bg-brand-steel/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-gray">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-plum flex-shrink-0" />
          <span>
            모든 ALTERFORM 오브제는 고밀도 파인 세라믹 3D 적층 제조 공정으로 제작되며, 고유 인증 일련번호가 각인됩니다.
          </span>
        </div>
        <span className="text-brand-muted">LEAD TIME: 7~10 BUSINESS DAYS</span>
      </div>

    </section>
  );
};
