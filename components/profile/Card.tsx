export default function Card({
   children,
   className = "",
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div
         className={`bg-white rounded-lg overflow-hidden ${className}`}
         style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
         }}
      >
         {children}
      </div>
   );
}
