"use client";

import React, { ReactNode } from "react";
import "./modal.scss";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import Loading from "@/app/components/loading/Loading";
import { useForm } from "antd/es/form/Form";

interface ModalProps {
  title: ReactNode;
  children: ReactNode;
  isModalOpen: boolean;
  modalCancel: () => void;
}

export default function CustomModal(props: ModalProps) {
  const [form] = useForm();

  const handleCloseButton = () => {
    form.resetFields();
  };
  // const { isContentLoading } = useSelector((state: any) => state.basicSlice)

  return (
    <Modal
      style={{
        borderRadius: "16px",
      }}
      title={props.title}
      open={props.isModalOpen}
      footer={null}
      onCancel={props.modalCancel}
      centered
      destroyOnClose={true}    >
      <div className="modal-wrapper">
        <div className="modal-body">
          {props.children}
          {/* {isContentLoading ? (<Loading />) : props.children} */}
        </div>
      </div>
    </Modal>
  );
}
