import { create } from 'zustand';
import { MetaResponse, UploadFileResponse } from '@/models/response/basic_response';

interface globalState {
    isBtnLoading: boolean;
    isContentLoading: boolean;
    errorMessage: string;
    successMessage: string;
    pagePagination?: MetaResponse | null;
    countData: number;
    imageUrl: Nullable<UploadFileResponse>;
    
    setBtnLoading: (loading: boolean) => void;
    setContentLoading: (loading: boolean) => void;
    setErrorMessage: (message: string) => void;
    setSuccessMessage: (message: string) => void;
    setPagePagination: (pagination: MetaResponse) => void;
    setCountData: (count: number) => void;
    setImageUrl: (imageUrl: UploadFileResponse) => void;
    
    resetState: () => void;
}

const useGlobalStore = create<globalState>((set) => ({
    isBtnLoading: false,
    isContentLoading: false,
    errorMessage: "",
    successMessage: "",
    pagePagination: null,
    countData: 0,
    imageUrl: null,
    
    setBtnLoading: (loading) => set({ isBtnLoading: loading }),
    setContentLoading: (loading) => set({ isContentLoading: loading }),
    setErrorMessage: (message) => set({ errorMessage: message }),
    setSuccessMessage: (message) => set({ successMessage: message }),
    setPagePagination: (pagination) => set({ pagePagination: pagination }),
    setCountData: (count) => set({ countData: count }),
    setImageUrl: (imageUrl) => set({ imageUrl: imageUrl }),
    
    resetState: () => set({
        isBtnLoading: false,
        isContentLoading: false,
        errorMessage: "",
        successMessage: "",
        pagePagination: null,
        countData: 0,
        imageUrl: null
    })
}));

export default useGlobalStore;