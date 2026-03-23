// src/components/layout/MobileWrapper.tsx
export const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black text-white safe-area overflow-hidden flex flex-col">
    {/* Ensuring content never overflows horizontally on small screens */}
    <div className="flex-1 w-full max-w-md mx-auto px-6 relative flex flex-col">
      {children}
    </div>
  </div>
);