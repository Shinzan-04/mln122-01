import { Outlet } from "react-router-dom";
import { MainNav } from "./components/MainNav";
import { ThemeProvider } from "./context/ThemeContext";

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <div className="app-root">
        <div className="bg-blob bg-blob-one" />
        <div className="bg-blob bg-blob-two" />
        <div className="app-shell">
          <div className="nav-sticky-wrap">
            <MainNav />
          </div>
          <main className="page-shell">
            <Outlet />
          </main>
          <footer className="app-footer">
            <div className="footer-brand">
              <span>🏛️</span>
              <span>Philosophy Atlas</span>
            </div>
            <span>MLN Knowledge Lab · Học Kinh tế Chính trị Mác–Lênin theo cách hiện đại</span>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}