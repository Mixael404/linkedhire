
export function CharCount({ current, max }: { current: number; max: number }) {
	 const pct = current / max;
	 const color = pct >= 1 ? "text-red-500" : pct >= 0.8 ? "text-amber-500" : "text-[#9ca3af]";
	 return (
			<span className={`absolute bottom-2.5 right-3 text-[10px] pointer-events-none select-none tabular-nums ${color}`}>
				 {current}/{max}
			</span>
	 );
}