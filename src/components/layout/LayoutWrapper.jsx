import React, { useEffect } from "react";
import { Layout } from "antd";
import SidePanel from "./SidePanel";
import MiddleSection from "./MiddleSection";
import RightSidebar from "./RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../features/profile/profileThunks";
import { message } from "antd";

const { Content } = Layout;

export default function LayoutWrapper({ children }) {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile)
  useEffect(() => {
    if(!user){
      const result = dispatch(getUserProfileThunk());
      console.log('result',result);
      if (getUserProfileThunk.rejected.match(result)) {
        message.error(result.payload || "Failed to load user profile");
      }
    }
  }, [dispatch,user]);

  return (
    <Layout className="min-h-screen" style={{ background: 'transparent' }}>
      {/* Left Sidebar */}
      <SidePanel />

      {/* Main Content Area */}
      <Layout className="ml-35 mr-45" style={{ background: 'transparent' }}>
        <Content style={{ background: 'transparent' }}>
          <MiddleSection>{children}</MiddleSection>
        </Content>
      </Layout>

      {/* Right Sidebar */}
      <RightSidebar />
    </Layout>
  );
}
