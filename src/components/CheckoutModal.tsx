import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-brand-bg rounded-2xl border border-brand-border text-brand-white shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-brand-steel border border-brand-border text-brand-gray hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-brand-plum tracking-widest uppercase">
                ORDER CONFIRMED
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                주문이 성공적으로 접수되었습니다
              </h2>
              <p className="text-xs font-mono text-brand-gray mt-2">
                주문 번호: <span className="text-white font-bold">{completedOrder.orderId}</span>
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 rounded-xl bg-brand-steel/50 border border-brand-border text-left font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-brand-border/60 pb-2">
                <span className="text-brand-muted">주문자</span>
                <span className="text-white">{completedOrder.customerName} ({completedOrder.phone})</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/60 pb-2">
                <span className="text-brand-muted">배송지</span>
                <span className="text-white truncate max-w-xs">{completedOrder.address} {completedOrder.addressDetail}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/60 pb-2">
                <span className="text-brand-muted">제작 품목</span>
                <span className="text-white">{completedOrder.items.length}개 품목</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>최종 결제 금액</span>
                <span className="text-brand-white">₩{completedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-brand-muted font-mono">
              * 본 오브제는 전량 고온 소결 3D 세라믹 적층 공정으로 맞춤 제작되며, 제작 완료 후 안전 특송으로 발송됩니다.
            </p>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded bg-brand-white hover:bg-brand-gray text-brand-bg font-mono text-xs font-bold transition-colors"
            >
              확인 및 쇼케이스로 돌아가기
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-brand-plum tracking-widest uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ALTERFORM INSTITUTE DISPATCH SYSTEM</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                주문서 작성 및 결제
              </h2>
              <p className="text-xs text-brand-gray font-light mt-1">
                정밀 3D 세라믹 적층 공정에 필요한 주문자 정보와 수령지를 입력해 주세요.
              </p>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-muted mb-1">성함 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-3.5 py-2.5 rounded bg-brand-steel border border-brand-border focus:border-brand-white text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full px-3.5 py-2.5 rounded bg-brand-steel border border-brand-border focus:border-brand-white text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-brand-muted mb-1">이메일</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.com"
                  className="w-full px-3.5 py-2.5 rounded bg-brand-steel border border-brand-border focus:border-brand-white text-white outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-brand-muted">배송지 주소 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="도로명 주소 또는 지번 주소"
                  className="w-full px-3.5 py-2.5 rounded bg-brand-steel border border-brand-border focus:border-brand-white text-white outline-none"
                />
                <input
                  type="text"
                  value={formData.addressDetail}
                  onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                  placeholder="상세 주소 (동, 호수)"
                  className="w-full px-3.5 py-2.5 rounded bg-brand-steel border border-brand-border focus:border-brand-white text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-brand-muted mb-1">배송 요청사항</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="부재 시 경비실에 맡겨주세요."
                  className="w-full px-3.5 py-2.5 rounded bg-brand-steel border border-brand-border focus:border-brand-white text-white outline-none"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2 font-mono text-xs">
              <span className="block text-brand-muted">결제 수단 선택</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: '신용/체크카드' },
                  { id: 'kakaopay', name: '카카오페이' },
                  { id: 'naverpay', name: '네이버페이' },
                  { id: 'transfer', name: '가상계좌 입금' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                    className={`p-3 rounded border text-center transition-all ${
                      formData.paymentMethod === m.id
                        ? 'border-brand-plum bg-brand-plum/20 text-white font-bold'
                        : 'border-brand-border bg-brand-steel text-brand-gray hover:text-white'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-brand-border space-y-4">
              <div className="flex justify-between items-center font-mono">
                <span className="text-xs text-brand-muted">결제 예정 금액 ({cart.length}개 품목)</span>
                <span className="text-xl font-bold text-white">₩{subtotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded bg-brand-white hover:bg-brand-gray text-brand-bg text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
