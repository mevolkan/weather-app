import Image from "next/image";
import Sidebar from "./components/sidebar";
import Main from "./components/maincontent";

export default function Home() {
  return (
    <div className="flex flex-row sm:gap-10" >
      <div className="sm:w-full sm:max-w-[18rem]">
        <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
        <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
        <aside>
          <Sidebar />
        </aside>
      </div>
      <main className="flex w-full flex-col p-4">
        <Main />
      </main>
    </div>
  );
}
