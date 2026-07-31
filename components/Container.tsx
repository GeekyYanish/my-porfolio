/** The single source of truth for page gutters and max width. */
export default function Container({
  children,
  className = "",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-7xl" : "max-w-6xl"} px-5 sm:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
