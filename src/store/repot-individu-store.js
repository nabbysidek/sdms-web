import { create } from "zustand";
import axiosCustom from "../axios";
import Swal from "sweetalert2";

const useRepotIndividuStore = create((set) => ({

  // search
  linkClicked: false,
  setLinkClicked: (value) => set({ linkClicked: value }),
  validationErrors: null,
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  searchResults: null,
  setSearchResults: (results) => set({ searchResults: results }),

}));

export default useRepotIndividuStore;
