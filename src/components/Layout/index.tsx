import React from "react";
import "./Layout.module.scss";
import style from "./Layout.module.scss";

interface LayoutProp {
    children: React.ReactNode;
}

const Layout:React.FC<LayoutProp> = ({children }) => {
    return (
            <div className={style.container}>{children}</div>
    )
}

export default Layout;
