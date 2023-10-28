import { Outlet } from "react-router-dom";
import Appbar from "../components/Appbar/Appbar";
import { Header } from "../components/shared/Header";
import styles from "./layout.module.css";
export const siteTitle = "Fast Style Transfer for Arbitrary Styles Demo";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className="bg_color">
      <Header />
      <div className="py-5">
        <Outlet />
      </div>
    </div>
  );
}
