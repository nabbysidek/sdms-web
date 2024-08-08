import React from "react";
import { Form, Row, Container } from "react-bootstrap";

function SearchAktivitiSemakan({ filterValue, onFilterChange }) {
  // // ----------------- FE -----------------
  // // Form submission and validation
  // const { register, handleSubmit, control, setError, setValue, formState } =
  //   useForm();

  // const onSubmit = (data) => {
  //   if (!data.aktivitiSemakan) {
  //     setError("aktivitiSemakan", {
  //       type: "manual",
  //       message: "Sila masukkan nama aktiviti semakan",
  //     });
  //   } else {
  //     // Perform your search logic here
  //     // console.log("Form submitted with data:", data);
  //   }
  // };

  // // ___________________________________ Backend __________________________________
  // const [selectedSkopSemakan, setSelectedSkopSemakan] = useState("");
  // const [selectedSkopKriteria, setSelectedSkopKriteria] = useState("");

  // // Display skop semakan & skop kriteria options
  // const {
  //   skopSemakanOptions,
  //   displaySkopSemakans,
  //   skopKriteriaOptions,
  //   displaySkopKriterias,
  // } = useOptionStore((state) => ({
  //   skopSemakanOptions: state.skopSemakanOptions,
  //   displaySkopSemakans: state.displaySkopSemakans,
  //   skopKriteriaOptions: state.skopKriteriaOptions,
  //   displaySkopKriterias: state.displaySkopKriterias,
  // }));

  // useEffect(() => {
  //   displaySkopSemakans();
  //   displaySkopKriterias(selectedSkopSemakan);
  // }, [displaySkopSemakans, displaySkopKriterias]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar">
          <Row>
            <Form.Group className="col-md-12">
              <Form.Control
                type="text"
                placeholder="Cari melalui nama aktiviti semakan atau skop kriteria ketidakpatuhan."
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

export default SearchAktivitiSemakan;
