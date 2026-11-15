import React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { cart, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-9 h-9 flex items-center justify-center">
            <img 
              src="/assets/logo/alterform-symbol-white.png" 
              alt="ALTERFORM Symbol" 
              className="w-full h-full object-contain opacity-95 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-[0.25em] text-lg font-bold text-brand-white">
              ΛLTERFORM
            </span>
            <span className="text-[10px] font-mono tracking-widest text-brand-gray -mt-1">
              WEARABLE OBJECT STUDIO
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest">
          <button 
            onClick={() => scrollTo('axes')} 
            className="text-brand-gray hover:text-brand-white transition-colors flex items-center gap-1 group"
          >
            <span className="text-brand-muted text-[10px]">01</span>
            <span>EXPERIMENTS</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-brand-plum">/</span>
          </button>
          
          <button 
            onClick={() => scrollTo('case')} 
            className="text-brand-gray hover:text-brand-white transition-colors flex items-center gap-1 group"
          >
            <span className="text-brand-muted text-[10px]">02</span>
            <span>CASE R2</span>
          </button>

          <button 
            onClick={() => scrollTo('shop')} 
            className="text-brand-gray hover:text-brand-white transition-colors flex items-center gap-1 group"
          >
            <span className="text-brand-muted text-[10px]">03</span>
            <span>SHOP & ARCHIVE</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-brand-plum/20 text-brand-plum border border-brand-plum/30">ONLINE</span>
          </button>

          <button 
            onClick={() => scrollTo('philosophy')} 
            className="text-brand-gray hover:text-brand-white transition-colors flex items-center gap-1"
          >
            <span className="text-brand-muted text-[10px]">04</span>
            <span>PHILOSOPHY</span>
          </button>
        </nav>

        {/* Action Buttons: Cart & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3 py-2 rounded border border-brand-border hover:border-brand-gray/60 bg-brand-steel/50 hover:bg-brand-steel transition-all flex items-center space-x-2 text-xs font-mono"
            aria-label="장바구니 열기"
          >
            <ShoppingBag className="w-4 h-4 text-brand-white" />
            <span className="hidden sm:inline text-brand-lightGray">CART</span>
            {totalCartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand-plum text-white animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-gray hover:text-brand-white"
            aria-label="메뉴 토글"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-bg/95 border-b border-brand-border px-6 py-6 space-y-4 font-mono text-sm tracking-wider">
          <button 
            onClick={() => scrollTo('axes')} 
            className="block w-full text-left py-2 text-brand-gray hover:text-white"
          >
            01. EXPERIMENTS (5 AXES)
          </button>
          <button 
            onClick={() => scrollTo('case')} 
            className="block w-full text-left py-2 text-brand-gray hover:text-white"
          >
            02. CASE R2 PACKAGING
          </button>
          <button 
            onClick={() => scrollTo('shop')} 
            className="block w-full text-left py-2 text-brand-gray hover:text-white"
          >
            03. SHOP & ARCHIVE (주문)
          </button>
          <button 
            onClick={() => scrollTo('philosophy')} 
            className="block w-full text-left py-2 text-brand-gray hover:text-white"
          >
            04. BRAND PHILOSOPHY
          </button>
        </div>
      )}
    </header>
  );
};
