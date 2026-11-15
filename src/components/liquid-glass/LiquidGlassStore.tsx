import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import { ShoppingBag, ArrowUpRight, Check, ShieldCheck, Box } from 'lucide-react';
import { BorderGlow } from './BorderGlow';

const getAxisGlow = (axis: string) => {
  switch (axis) {
    case 'FLUID':
      return { glowColor: '195 80 85', colors: ['#ffffff', '#38bdf8', '#c084fc'] };
    case 'DISTORTION':
      return { glowColor: '270 70 85', colors: ['#ffffff', '#c084fc', '#f472b6'] };
    case 'STRUCTURE':
      return { glowColor: '210 20 90', colors: ['#ffffff', '#cbd5e1', '#94a3b8'] };
    case 'GROWTH':
      return { glowColor: '150 60 85', colors: ['#ffffff', '#34d399', '#38bdf8'] };
    case 'VOID':
      return { glowColor: '40 80 85', colors: ['#ffffff', '#fde047', '#fb923c'] };
    default:
      return { glowColor: '0 0 100', colors: ['#ffffff', '#cbd5e1', '#94a3b8'] };
  }
};

export const LiquidGlassStore: React.FC = () => {
  const { setSelectedProduct, addToCart } = useStore();
  const [filterAxis, setFilterAxis] = useState<string>('ALL');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const filteredProducts = filterAxis === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.axis === filterAxis);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 15, product.materials[0].name, 1);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  return (
    <section id="shop" className="relative py-28 px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full font-body text-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
        <div>
          <span className="text-sm text-white/70 mb-4 block tracking-widest font-mono">
            // ONLINE STORE & ARCHIVE
          </span>
          <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-white">
            Wearable Objects,{"\n"}Made to Wear
          </h2>
          <p className="text-white/75 text-sm md:text-base mt-4 max-w-xl font-light leading-relaxed">
            주문 즉시 고밀도 파인 지르코니아 세라믹 3D 적층 제조 및 수작업 다이아몬드 버프 폴리싱을 거쳐 완성되는 맞춤 제작 아카이브 에디션.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['ALL', 'STRUCTURE', 'DISTORTION', 'FLUID', 'GROWTH', 'VOID'].map((axis) => (
            <button
              key={axis}
              onClick={() => setFilterAxis(axis)}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                filterAxis === axis
                  ? 'bg-white text-black font-medium shadow-lg'
                  : 'liquid-glass text-white/80 hover:text-white'
              }`}
            >
              {axis}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProducts.map((product) => {
          const glow = getAxisGlow(product.axis);
          return (
            <BorderGlow
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group rounded-[1.5rem] cursor-pointer hover:scale-[1.015] transition-all duration-300 shadow-xl text-left"
              borderRadius={24}
              glowRadius={40}
              glowColor={glow.glowColor}
              colors={glow.colors}
              backgroundColor="#0a0a0a"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                {/* Top Bar: Code & Badges */}
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="text-white/50 tracking-widest uppercase">{product.code}</span>
                  <div className="flex items-center gap-1.5">
                    {product.modelUrl && (
                      <span className="liquid-glass rounded-full px-2 py-0.5 text-[10px] text-sky-300 font-mono border border-sky-400/40 flex items-center gap-1 shadow-sm">
                        <Box className="w-2.5 h-2.5 text-sky-400" />
                        <span>3D</span>
                      </span>
                    )}
                    {product.isSignature && (
                      <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] text-white font-medium border border-white/30">
                        SIGNATURE
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Area */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden my-2 border border-white/15 bg-black/40 shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-xl">
                      <span>Inspect & Customize</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Product Info & Action */}
                <div className="pt-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block">
                      {product.axis}
                    </span>
                    <h3 className="font-heading font-semibold text-xl sm:text-2xl text-white mt-0.5 leading-tight tracking-tight group-hover:text-neutral-200 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-white/60 font-light truncate mt-0.5">
                      {product.nameKr}
                    </p>
                  </div>

                  {/* Price and Add button */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="text-lg font-light text-white font-body">
                      ₩{product.price.toLocaleString()}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="liquid-glass-strong px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto z-10"
                      title="기본 옵션(15호)으로 장바구니 담기"
                    >
                      {addedNotice === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">담김</span>
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
            </BorderGlow>
          );
        })}
      </div>

      {/* Production Certification Footer Banner */}
      <div className="mt-16 liquid-glass p-6 rounded-[1.25rem] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 font-light shadow-lg">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-white/90 flex-shrink-0" />
          <span>
            모든 ALTERFORM 오브제는 고밀도 파인 세라믹 3D 적층 제조 공정으로 제작되며, 고유 인증 일련번호가 각인됩니다.
          </span>
        </div>
        <span className="font-mono text-[11px] text-white/50">LEAD TIME: 7~10 BUSINESS DAYS</span>
      </div>

    </section>
  );
};
