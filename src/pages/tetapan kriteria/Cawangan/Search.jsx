import React from "react";
// import { useForm, Controller } from "react-hook-form";
import { Form, Row, Container } from "react-bootstrap";
// import { useOptionStore } from "../../../store/option-store";
// import useCawanganStore from "../../../store/cawangan-store";

function SearchCawangan({ filterValue, onFilterChange }) {
  // form validation
  // const { handleSubmit, control, setError, formState } = useForm();

  // // initialize store
  // const searchCawangans = useCawanganStore((state) => state.searchCawangans);

  // // handle search input
  // const onSubmit = async (data) => {
  //   const { cawangan, wilayahSelect } = data;

  //   if (!cawangan && !wilayahSelect) {
  //     setError("cawangan", {
  //       type: "manual",
  //       message: "Sila masukkan cawangan atau pilih wilayah",
  //     });
  //   } else {
  //     try {
  //       await searchCawangans(cawangan, wilayahSelect);
  //     } catch (error) {
  //       console.error("Search error:", error);
  //     }
  //   }
  // };

  // // fetch for wilayahOptions
  // const { wilayahOptions, displayWilayahs } = useOptionStore((state) => ({
  //   wilayahOptions: state.wilayahOptions,
  //   displayWilayahs: state.displayWilayahs,
  // }));

  // useEffect(() => {
  //   displayWilayahs();
  // }, [displayWilayahs]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar">
          <Row>
            <Form.Group className="col-md-12">
              <Form.Control
                type="text"
                placeholder="Cari cawangan melalui nama cawangan atau wilayah."
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default SearchCawangan;
