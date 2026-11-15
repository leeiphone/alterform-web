import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { OrderDetails } from '../../types';

export const LiquidGlassCheckoutModal: React.FC = () => {
  const { cart, isCheckoutOpen, setIsCheckoutOpen, clearCart, setLastOrder } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    addressDetail: '',
    notes: '',
    paymentMethod: 'card' as const,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('주문자 성함, 연락처, 배송지 주소를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `AF-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        addressDetail: formData.addressDetail,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
        items: [...cart],
        totalAmount: subtotal,
        date: new Date().toLocaleDateString('ko-KR'),
      };

      setCompletedOrder(newOrder);
      setLastOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in font-body">
      <div 
        className="relative w-full max-w-2xl rounded-[1.75rem] bg-[#0c0c0e]/98 backdrop-blur-2xl border border-white/15 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {completedOrder ? (
          /* Order Confirmation Screen */
          <div className="text-center py-6 space-y-6 relative">
            {/* Close Button on Confirmation Screen */}
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 sm:top-0 sm:right-0 liquid-glass p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full liquid-glass border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-widest text-white/60 uppercase">
                ORDER CONFIRMED // ARCHIVE DISPATCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1 tracking-tight">
                주문이 성공적으로 접수되었습니다
              </h2>
              <p className="text-xs font-mono text-white/70 mt-2">
                주문 번호: <span className="text-white font-bold">{completedOrder.orderId}</span>
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="liquid-glass p-5 rounded-2xl text-left text-xs space-y-3 font-light">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">주문자</span>
                <span className="text-white">{completedOrder.customerName} ({completedOrder.phone})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">배송지</span>
                <span className="text-white truncate max-w-xs">{completedOrder.address} {completedOrder.addressDetail}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">제작 품목</span>
                <span className="text-white">{completedOrder.items.length}개 품목</span>
              </div>
              <div className="flex justify-between pt-1 font-normal text-sm">
                <span>최종 결제 금액</span>
                <span className="font-heading font-bold text-lg text-white">₩{completedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-white/60 font-light">
              * 고온 소결 3D 세라믹 적층 공정으로 맞춤 제작되며, 제작 완료 후 안전 특송으로 발송됩니다.
            </p>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-colors cursor-pointer shadow-lg"
            >
              확인 및 쇼케이스로 돌아가기
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Header: Left Title & Right Cancel Button */}
            <div className="flex items-start justify-between gap-6 pb-2 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-white/60 tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ALTERFORM INSTITUTE DISPATCH</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                  Order & Dispatch
                </h2>
                <p className="text-xs text-white/70 font-light">
                  정밀 3D 세라믹 적층 공정에 필요한 주문자 정보와 수령지를 입력해 주세요.
                </p>
              </div>

              {/* 오른쪽 넓은 여백으로 이동한 취소(닫기) 버튼 */}
              <button
                type="button"
                onClick={handleClose}
                className="liquid-glass p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer shadow-md mt-1"
                aria-label="결제 취소 및 창 닫기"
                title="결제 취소"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-4 text-xs font-light">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 mb-1">성함 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-3.5 py-2.5 rounded-xl liquid-glass text-white outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl liquid-glass text-white outline-none focus:ring-1 focus:ring-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1">이메일</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass text-white outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white/60">배송지 주소 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="도로명 주소 또는 지번 주소"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass text-white outline-none focus:ring-1 focus:ring-white/40"
                />
                <input
                  type="text"
                  value={formData.addressDetail}
                  onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                  placeholder="상세 주소 (동, 호수)"
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass text-white outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">배송 요청사항</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="부재 시 경비실에 맡겨주세요."
                  className="w-full px-3.5 py-2.5 rounded-xl liquid-glass text-white outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2 text-xs">
              <span className="block text-white/60 font-light">결제 수단 선택</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: '신용/체크카드' },
                  { id: 'kakaopay', name: '카카오페이' },
                  { id: 'naverpay', name: '네이버페이' },
                  { id: 'transfer', name: '가상계좌' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                    className={`p-3 rounded-xl text-center transition-all ${
                      formData.paymentMethod === m.id
                        ? 'bg-white text-black font-semibold shadow'
                        : 'liquid-glass text-white/70 hover:text-white'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-light">결제 금액 ({cart.length}개 품목)</span>
                <span className="text-xl font-heading font-bold tracking-tight text-white">₩{subtotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 text-black text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-xl"
              >
                {isSubmitting ? (
                  <span>주문 및 결제 처리 중...</span>
                ) : (
                  <>
                    <span>₩{subtotal.toLocaleString()} 결제 승인하기</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
