export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f39a4f]">Dashboard</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Painel principal</h1>
        <p className="mt-3 text-slate-600">Resumo geral de competições, acessibilidade e participantes.</p>
      </section>
    </main>
  );
}
