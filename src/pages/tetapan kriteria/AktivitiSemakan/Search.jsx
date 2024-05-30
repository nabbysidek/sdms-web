import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";

function SearchAktivitiSemakan() {
  // ----------------- FE -----------------
  // Form submission and validation
  const { register, handleSubmit, control, setError, setValue, formState } =
    useForm();

  const onSubmit = (data) => {
    if (!data.aktivitiSemakan) {
      setError("aktivitiSemakan", {
        type: "manual",
        message: "Sila masukkan nama aktiviti semakan",
      });
    } else {
      // Perform your search logic here
      // console.log("Form submitted with data:", data);
    }
  };

  // ___________________________________ Backend __________________________________
  const [selectedSkopSemakan, setSelectedSkopSemakan] = useState("");
  const [selectedSkopKriteria, setSelectedSkopKriteria] = useState("");

  // Display skop semakan & skop kriteria options
  const {
    skopSemakanOptions,
    displaySkopSemakans,
    skopKriteriaOptions,
    displaySkopKriterias,
  } = useOptionStore((state) => ({
    skopSemakanOptions: state.skopSemakanOptions,
    displaySkopSemakans: state.displaySkopSemakans,
    skopKriteriaOptions: state.skopKriteriaOptions,
    displaySkopKriterias: state.displaySkopKriterias,
  }));

  useEffect(() => {
    displaySkopSemakans();
    displaySkopKriterias(selectedSkopSemakan);
  }, [displaySkopSemakans, displaySkopKriterias]);

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
                  // Sort wilayah options alphabetically by namaWilayah
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
            <Form.Group className="col-md-4">
              <Form.Select
                {...register("skopKriteriaSelect")}
                aria-label="skopKriteriaSelect"
                onChange={(e) => {
                  setSelectedSkopKriteria(e.target.value);
                }}
              >
                <option value="">Skop Kriteria Ketidakpatuhan</option>
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
            <Form.Group className="col-md-4">
              <Controller
                name="aktivitiSemakan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan aktiviti semakan"
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

      {formState.errors.aktivitiSemakan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.aktivitiSemakan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchAktivitiSemakan;
