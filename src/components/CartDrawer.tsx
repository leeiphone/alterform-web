import React from 'react';
import { useStore } from '../store/useStore';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    setIsCheckoutOpen 
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-brand-bg border-l border-brand-border text-brand-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-brand-plum" />
              <h2 className="text-sm font-mono tracking-widest uppercase font-bold text-white">
                CART ARCHIVE ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded text-brand-gray hover:text-white hover:bg-brand-steel transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 font-mono text-xs text-brand-muted">
                <ShoppingBag className="w-10 h-10 stroke-[1.2] opacity-40" />
                <p>장바구니에 담긴 오브제가 없습니다.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded border border-brand-border hover:border-brand-white text-white text-xs transition-colors"
                >
                  컬렉션 탐색하기
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.product.id}-${item.size}-${item.selectedMaterial}`}
                  className="p-4 rounded-xl border border-brand-border/80 bg-brand-steel/40 flex gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-brand-steel/80 border border-brand-border flex items-center justify-center p-2 flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="max-h-full w-auto object-contain drop-shadow"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-brand-plum tracking-widest uppercase">
                          {item.product.code}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.selectedMaterial)}
                          className="text-brand-muted hover:text-red-400 p-1"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight">
                        {item.product.name}
                      </h4>
                      <div className="text-[10px] font-mono text-brand-gray mt-1">
                        호수: {item.size}호 | {item.selectedMaterial}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 mt-1 border-t border-brand-border/40">
                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-2 border border-brand-border rounded px-2 py-0.5 font-mono text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.selectedMaterial, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="disabled:opacity-30 text-brand-gray hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.selectedMaterial, item.quantity + 1)}
                          className="text-brand-gray hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-medium text-white/90">
                        미정
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brand-border bg-brand-steel/30 space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-brand-gray">
                  <span>배송비</span>
                  <span className="text-emerald-400">무료 (ALTERFORM 특송)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-brand-border/40">
                  <span>총 주문 금액</span>
                  <span className="text-base text-brand-white">
                    미정
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded bg-brand-white hover:bg-brand-gray text-brand-bg text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>주문서 작성 및 결제</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
