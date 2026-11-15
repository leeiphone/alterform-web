import React from 'react';
import { useStore } from '../../store/useStore';
import { X, Trash2, Plus, Minus, ArrowUpRight, ShoppingBag } from 'lucide-react';

export const LiquidGlassCartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    setIsCheckoutOpen 
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md animate-fade-in font-body">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md liquid-glass-strong border-l border-white/15 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center p-1.5">
                <img 
                  src="/assets/logo/alterform-symbol-white.png" 
                  alt="ALTERFORM" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <h2 className="text-base font-heading font-semibold text-white tracking-tight">
                Archive Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="liquid-glass p-2 rounded-full text-white/70 hover:text-white transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-white/50">
                <div className="liquid-glass p-4 rounded-full">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2] opacity-60" />
                </div>
                <p className="text-sm font-light">장바구니에 담긴 오브제가 없습니다.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="liquid-glass-strong px-4 py-2 rounded-full text-white text-xs hover:bg-white hover:text-black transition-colors"
                >
                  컬렉션 탐색하기
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.size}-${item.selectedMaterial}`}
                  className="liquid-glass p-4 rounded-[1rem] flex gap-4 text-left shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl liquid-glass flex items-center justify-center p-2 flex-shrink-0 bg-white/[0.02]">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="max-h-full w-auto object-contain drop-shadow"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
                          {item.product.code}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.selectedMaterial)}
                          className="text-white/40 hover:text-red-400 p-0.5 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-sm font-heading font-semibold text-white leading-tight mt-0.5 tracking-tight">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-white/70 font-light mt-1">
                        {item.size}호 · {item.selectedMaterial}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/10">
                      {/* Quantity Controller */}
                      <div className="liquid-glass flex items-center space-x-2 rounded-full px-2.5 py-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.selectedMaterial, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="disabled:opacity-30 text-white/70 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.selectedMaterial, item.quantity + 1)}
                          className="text-white/70 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-white">
                        ₩{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs font-light">
                <div className="flex justify-between text-white/70">
                  <span>배송비</span>
                  <span className="text-white font-medium">무료 (ALTERFORM 특송)</span>
                </div>
                <div className="flex justify-between text-base font-normal text-white pt-2 border-t border-white/10">
                  <span>합계</span>
                  <span className="text-lg font-heading font-bold tracking-tight">
                    ₩{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-full bg-white hover:bg-neutral-200 text-black text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>주문서 작성 및 결제</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
