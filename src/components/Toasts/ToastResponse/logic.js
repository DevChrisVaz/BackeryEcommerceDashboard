import Toast from "bootstrap/js/dist/toast";

export const showResponseToast = () => {
    setTimeout(function() {
        const toastResponse = document.getElementById('toastResponse');
        const toast = Toast.getOrCreateInstance(toastResponse);
        toast.show();
    }, 100);
}