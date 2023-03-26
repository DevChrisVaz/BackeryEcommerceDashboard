import Modal from "bootstrap/js/dist/modal";

export const showModal = (modalId) => {
    setTimeout(function() {
        const toastResponse = document.getElementById(modalId);
        const toast = new Modal(toastResponse);
        toast.show();
    }, 100);
}