import Swal from "sweetalert2";

const showConfirmationDialog = async () => {
  return await Swal.fire({
    title: "Adakah anda pasti?",
    text: "Data yang dipadam tidak boleh dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#204198",
    cancelButtonColor: "#D9D9D9",
    confirmButtonText: "Ya, Padam!",
    cancelButtonText: "Batal",
  });
};

export default showConfirmationDialog;
