export const useAppToast = () => {
  const toast = useState('app-toast', () => ({
    show: false,
    message: "",
    isError: false,
  }));

  const triggerToast = (msg: string, error = false) => {
    toast.value.message = msg;
    toast.value.isError = error;
    toast.value.show = true;
    
    setTimeout(() => {
      toast.value.show = false;
    }, 4000);
  };

  return { toast, triggerToast };
};
