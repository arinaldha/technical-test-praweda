'use client'

import React from 'react'
import './modal.scss'
import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

interface ModalProps {
    isModalOpen: boolean;
    onCancel: () => void;
    deleteAction: () => void;
}

export default function ModalDelete(props: ModalProps) {
    return (
        <Modal open={props.isModalOpen} onCancel={props.onCancel}
            footer={null} centered>
            <div className="modal-delete-wrapper">
                <div className="modal-body">
                    <span className="delete-icon">
                        <DeleteOutlined />
                    </span>
                    <h5>Delete Confirmation</h5>
                    <p>Are you sure want to delete this data?</p>
                </div>
                <div className="modal-footer">
                    <Button key="back" onClick={props.onCancel} size='large'>
                        No, Cancel
                    </Button>,
                    <Button key="submit" onClick={props.deleteAction} size='large'>
                        Yes, Delete
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
