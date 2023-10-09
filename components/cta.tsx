export const CallToAction = ({ children, ...props }: any) => {
  return (
    <button
      type="button"
      className="mb-8 mt-4 inline-flex rounded-xl border border-[#ffffff26] px-8 py-4 transition duration-200 ease-in-out hover:bg-[#ffffff26] disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(244,244,244,.1),rgba(255,255,255,.1))`,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
