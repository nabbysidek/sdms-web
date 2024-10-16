import Swal from "sweetalert2";

const showConfirmationDialog = async () => {
  return await Swal.fire({
    title: "Warning",
    text: "Deleted data cannot be retrieved after deletion.",
    icon: "warning",
    showCancelButton: true,
    // var(--PRIMARY)
    confirmButtonColor: "#00674F",
    // var (--NEUTRALGRAY)
    cancelButtonColor: "#A3A3A3",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });
};

export default showConfirmationDialog;
