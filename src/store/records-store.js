import { create } from "zustand";
import axiosCustom from "../axios";

const useRecordsStore = create((set) => ({
  records: [],
  columns: [
    {
      header: "Num",
      accessorFn: (row, i) => i + 1,
      id: "index",
    },
    {
      header: "Report Date",
      accessorKey: "reportDate",
    },
    {
      header: "Year",
      accessorKey: "year.yearName",
    },
    {
      header: "Class",
      accessorKey: "classes.className",
    },
    {
      header: "Misdemeanor Category",
      accessorKey: "misdemeanor_category.misdemeanorCategoryName",
    },
    {
      header: "Misdemeanor",
      accessorKey: "misdemeanor.misdemeanorName",
    },
    {
      header: "Student ID",
      accessorKey: "student.idStudent",
    },
    {
      header: "Student Name",
      accessorKey: "student.namaStudent",
    },
  ],

  // Fetch Audits
  fetchRecords: async () => {
    try {
      const response = await axiosCustom.get(`/records/reports`);
      set({
        audits: response.data,
      });
    } catch (error) {
      console.error("Error in retrieving data:", error);
    }
  },
}));

export default useRecordsStore;
