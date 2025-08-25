import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";
import { getNavItems } from "../_nav"; // make sure getNavItems accepts (access, role)

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_USER_BACKEND_URL}/demopannelaccess`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();

        const access = Array.isArray(data.access)
          ? data.access
          : typeof data.access === "string"
          ? JSON.parse(data.access)
          : [];

        const role = data.role || "";

        const items = getNavItems(access, role); // ✅ pass both access and role
        setNavItems(items);
      } catch (error) {
        console.error("Failed to fetch panel access:", error);
        setNavItems([]);
      }
    };

    fetchAccess();
  }, []);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand style={{ textDecoration: "none", textAlign: "center" }}>
          
          <strong>My App</strong>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>

      
      <AppSidebarNav items={navItems} />

      <CSidebarFooter className="border-top">
       
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
