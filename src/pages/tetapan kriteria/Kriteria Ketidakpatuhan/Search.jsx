import React from "react";
import { Form, Row, Container } from "react-bootstrap";

function SearchKriteriaKetidakpatuhan({ filterValue, onFilterChange }) {
  // // --------- FE ------------
  // // Form validation
  // const { handleSubmit, control, setError, formState, register, setValue } =
  //   useForm();

  // const onSubmit = (data) => {
  //   if (!data.kriteriaKetidakpatuhan) {
  //     setError("kriteriaKetidakpatuhan", {
  //       type: "manual",
  //       message: "Sila masukkan kriteria ketidakpatuhan",
  //     });
  //   } else {
  //     // Perform your search logic here
  //     console.log("Form submitted with data:", data);
  //   }
  // };

  // // ___________________________________ Backend __________________________________
  // const [selectedSkopSemakan, setSelectedSkopSemakan] = useState("");
  // const [selectedSkopKriteria, setSelectedSkopKriteria] = useState("");
  // const [selectedAktivitiSemakan, setSelectedAktivitiSemakan] = useState("");

  // // Display skop semakan, skop kriteria & aktiviti semakan options
  // const {
  //   skopSemakanOptions,
  //   displaySkopSemakans,
  //   skopKriteriaOptions,
  //   displaySkopKriterias,
  //   aktivitiSemakanOptions,
  //   displayAktivitiSemakans,
  // } = useOptionStore((state) => ({
  //   skopSemakanOptions: state.skopSemakanOptions,
  //   displaySkopSemakans: state.displaySkopSemakans,
  //   skopKriteriaOptions: state.skopKriteriaOptions,
  //   displaySkopKriterias: state.displaySkopKriterias,
  //   aktivitiSemakanOptions: state.aktivitiSemakanOptions,
  //   displayAktivitiSemakans: state.displayAktivitiSemakans,
  // }));

  // useEffect(() => {
  //   displaySkopSemakans();
  //   displaySkopKriterias(selectedSkopSemakan);
  //   displayAktivitiSemakans(selectedSkopKriteria);
  // }, [displaySkopSemakans, displaySkopKriterias, displayAktivitiSemakans]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar">
          <Row>
            <Form.Group className="col-md-12">
              <Form.Control
                type="text"
                placeholder="Cari kriteria ketidakpatuhan melalui nama kriteria ketidakpatuhan."
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

export default SearchKriteriaKetidakpatuhan;
