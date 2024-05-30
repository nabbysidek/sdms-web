import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";

function SearchKriteriaKetidakpatuhan() {
  // --------- FE ------------
  // Form validation
  const { handleSubmit, control, setError, formState, register, setValue } =
    useForm();

  const onSubmit = (data) => {
    if (!data.kriteriaKetidakpatuhan) {
      setError("kriteriaKetidakpatuhan", {
        type: "manual",
        message: "Sila masukkan kriteria ketidakpatuhan",
      });
    } else {
      // Perform your search logic here
      console.log("Form submitted with data:", data);
    }
  };

  // ___________________________________ Backend __________________________________
  const [selectedSkopSemakan, setSelectedSkopSemakan] = useState("");
  const [selectedSkopKriteria, setSelectedSkopKriteria] = useState("");
  const [selectedAktivitiSemakan, setSelectedAktivitiSemakan] = useState("");

  // Display skop semakan, skop kriteria & aktiviti semakan options
  const {
    skopSemakanOptions,
    displaySkopSemakans,
    skopKriteriaOptions,
    displaySkopKriterias,
    aktivitiSemakanOptions,
    displayAktivitiSemakans,
  } = useOptionStore((state) => ({
    skopSemakanOptions: state.skopSemakanOptions,
    displaySkopSemakans: state.displaySkopSemakans,
    skopKriteriaOptions: state.skopKriteriaOptions,
    displaySkopKriterias: state.displaySkopKriterias,
    aktivitiSemakanOptions: state.aktivitiSemakanOptions,
    displayAktivitiSemakans: state.displayAktivitiSemakans,
  }));

  useEffect(() => {
    displaySkopSemakans();
    displaySkopKriterias(selectedSkopSemakan);
    displayAktivitiSemakans(selectedSkopKriteria);
  }, [displaySkopSemakans, displaySkopKriterias, displayAktivitiSemakans]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-2 with-padding-left">
              <Form.Select
                {...register("skopSemakanSelect")}
                aria-label="skopSemakanSelect"
                onChange={(e) => {
                  setSelectedSkopSemakan(e.target.value);
                }}
              >
                <option value="">Skop Semakan</option>
                {skopSemakanOptions
                  .sort((a, b) =>
                    a.namaSkopSemakan.localeCompare(b.namaSkopSemakan)
                  )
                  .map((skopSemakan) => (
                    <option key={skopSemakan.id} value={skopSemakan.id}>
                      {skopSemakan.namaSkopSemakan}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-2">
              <Form.Select
                {...register("skopKriteriaSelect")}
                aria-label="skopKriteriaSelect"
                onChange={(e) => {
                  setSelectedSkopKriteria(e.target.value);
                }}
              >
                <option value="">Skop Kriteria</option>
                {skopKriteriaOptions
                  .filter(
                    (skopKriteria) =>
                      skopKriteria.skopSemakanId ===
                      parseInt(selectedSkopSemakan)
                  )
                  .map((skopKriteria) => (
                    <option key={skopKriteria.id} value={skopKriteria.id}>
                      {skopKriteria.namaSkopKriteria}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-2">
              <Form.Select
                {...register("aktivitiSemakanSelect")}
                aria-label="kaktivitiSemakanSelect"
                onChange={(e) => {
                  setSelectedAktivitiSemakan(e.target.value);
                }}
              >
                <option value="">Aktiviti Semakan</option>
                {aktivitiSemakanOptions
                  .filter(
                    (aktivitiSemakan) =>
                      aktivitiSemakan.skopKriteriaId ===
                      parseInt(selectedSkopKriteria)
                  )
                  .map((aktivitiSemakan) => (
                    <option key={aktivitiSemakan.id} value={aktivitiSemakan.id}>
                      {aktivitiSemakan.namaAktivitiSemakan}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-4">
              <Controller
                name="kriteriaKetidakpatuhan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan kriteria ketidakpatuhan"
                  />
                )}
              />
            </Form.Group>
            <Form.Group className="col-md-2">
              <Button className="search-bar-btn" type="submit">
                Cari
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>

      {formState.errors.kriteriaKetidakpatuhan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.kriteriaKetidakpatuhan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchKriteriaKetidakpatuhan;
