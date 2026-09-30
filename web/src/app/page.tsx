import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <header className="mb-12 border-b border-slate-700 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src="/kavach_gov_logo.jpg" alt="Kavach Government Logo" className="w-20 h-20 object-contain rounded-xl shadow-lg border border-slate-700 bg-white" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">KAVACH</h1>
            <p className="text-slate-400 mt-2 text-lg">Next-Gen Decentralized Identity & Access Management</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
            Network: Local Hardhat
          </div>
        </div>
      </header>
      
      <Dashboard />
    </main>
  );
}
