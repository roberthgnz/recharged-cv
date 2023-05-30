export const CTAButton = ({ children, onClick }: any) => {
  return (
    <button
      type="button"
      className="py-4 px-8 border border-[#ffffff26] rounded-xl mt-4 mb-8"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(244,244,244,.1),rgba(255,255,255,.1))`
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
