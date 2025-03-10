import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
