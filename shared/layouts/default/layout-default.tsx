import React from "react";
import { Layout, Modal } from "antd";
import Header from "@/layouts/default/header";
import Footer from "@/layouts/default/footer";
import MainContent from "@/layouts/default/main-content";
import useAuthModal from "@/hooks/use-auth-modal";
import AuthForm from "@/components/auth";

function LayoutDefault({ children }) {
  const {
    showingLogin,
    showingRegister,
    onHideLogin,
    onHideRegister,
  } = useAuthModal();

  return (
    <div className="min-h-screen flex">
      <Layout className="flex-1">
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </Layout>
      <Modal open={showingRegister} onCancel={onHideRegister} footer={null}>
        <AuthForm register={true} />
      </Modal>
      <Modal open={showingLogin} onCancel={onHideLogin} footer={null}>
        <AuthForm register={false} afterSubmit={onHideLogin} />
      </Modal>
    </div>
  );
}

export default LayoutDefault;
