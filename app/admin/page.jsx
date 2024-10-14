import AdminLayout from './layout/layout'

export default function Dashboard() {
  return (
    <AdminLayout>
      <main className="flex flex-1 flex-col gap-4 m-4 lg:gap-6 lg:m-6 bg-white">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
      </main>
    </AdminLayout>
  )
}
