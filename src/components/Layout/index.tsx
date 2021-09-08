import React from "react";
import "./Layout.module.scss";
import s from "./Layout.module.scss";

interface LayoutProp {
    children: React.ReactNode;
}

const Layout:React.FC<LayoutProp> = ({children }) => {
    return (
        <div className={s.wrap}>
            <div className={s.container}>{children}</div>
        </div>
    )
}

export default Layout;