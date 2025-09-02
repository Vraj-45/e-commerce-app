export default function Pagination({ current, total, pageSize, onPageChange }:{
  current:number; total:number; pageSize:number; onPageChange:(p:number)=>void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = [];
  for (let i = 1; i <= totalPages && i <= 10; i++) pages.push(i);

  return (
    <div className="flex justify-center mt-6 gap-2">
      <button disabled={current===1} onClick={()=>onPageChange(current-1)} className="px-3 py-1 border rounded">Prev</button>
      {pages.map(p => (
        <button key={p} onClick={()=>onPageChange(p)} className={`px-3 py-1 border rounded ${p===current ? "bg-blue-600 text-white":""}`}>{p}</button>
      ))}
      <button disabled={current===totalPages} onClick={()=>onPageChange(current+1)} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
