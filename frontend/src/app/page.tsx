import Image from "next/image";
import Sidebar from "./components/sidebar";
import Main from "./components/maincontent";
import Search from "./components/search";
import Switch from "./components/switch";

export default function Home() {
  return (
    <div className="flex flex-row sm:gap-10" >
      <div className="sm:w-full sm:max-w-[18rem]">
        <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
        <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay" />
        <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <Sidebar />
        </aside>
      </div>
      <main className=" w-full">
        <div className="w-full gap-1 flex p-4" >
          <>
            <div className="w-fit">
              <label htmlFor="sidebar-mobile-fixed" className="btn-primary btn sm:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="#fff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
              </label>
            </div>
          </>
          <Search />
          <Switch />
        </div>
        <Main />
      </main>
    </div>
  );
}
