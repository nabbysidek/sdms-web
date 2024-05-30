import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";

function SearchSkopKriteria() {
  // --------- FE ------------
  // Form validation
  const { register, handleSubmit, control, setError, formState } = useForm();

  const onSubmit = (data) => {
    if (!data.skopKriteria) {
      setError("skopKriteria", {
        type: "manual",
        message: "Sila masukkan skop kriteria",
      });
    } else {
      // Perform your search logic here
      console.log("Form submitted with data:", data);
    }
  };

  // ___________________________________ Backend __________________________________
  // Display skop semakan options
  const { skopSemakanOptions, displaySkopSemakans } = useOptionStore(
    (state) => ({
      skopSemakanOptions: state.skopSemakanOptions,
      displaySkopSemakans: state.displaySkopSemakans,
    })
  );

  useEffect(() => {
    displaySkopSemakans();
  }, [displaySkopSemakans]);
  
  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-4 with-padding-left">
              <Form.Select
                {...register("skopSemakanSelect")}
                aria-label="skopSemakanSelect"
                onChange={(e) => {
                  setValue("skopSemakan", e.target.value);
                }}
              >
                <option value="">Skop Semakan</option>
                {skopSemakanOptions
                  // Sort wilayah options alphabetically by namaWilayah
                  .sort((a, b) => a.namaSkopSemakan.localeCompare(b.namaSkopSemakan))
                  .map((skopSemakan) => (
                    <option key={skopSemakan.id} value={skopSemakan.id}>
                      {skopSemakan.namaSkopSemakan}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-6">
              <Controller
                name="skopKriteria"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan skop kriteria ketidakpatuhan"
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

      {formState.errors.skopKriteria && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.skopKriteria.message}
        </Alert>
      )}
    </>
  );
}

export default SearchSkopKriteria;
