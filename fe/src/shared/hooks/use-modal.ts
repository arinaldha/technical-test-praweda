import React from "react";
import { useToggle } from "./use-toggle";
import { ModalTypeProps } from "@/models/modal";

type Props = {
    initialValue?: boolean,
    initialState?: ModalTypeProps
}

export function useModal(props: Props){
    const {
        initialState,
        initialValue
    } = props

    const [showModal, toggleShowModal] = useToggle(initialValue)
    const [showModalDelete, toggleShowModalDelete] = useToggle(initialValue)
    const [modalType, setModalType] = React.useState<ModalTypeProps>(initialState ?? null)

    const handleCancelModal = () =>{
        toggleShowModal()
    } 

    const handleCancelDeleteModal = () => {
        toggleShowModalDelete();
    };

    return {
        showModal,
        showModalDelete,
        toggleShowModal,
        toggleShowModalDelete,
        modalType,
        setModalType,
        handleCancelModal,
        handleCancelDeleteModal
    }
}