import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";

function SearchAktivitiSemakan() {
    // ----------------- FE -----------------
    // Form submission and validation

    const {
        register,
        handleSubmit,
        control,
        setError,
        setValue, 
        formState
    } = useForm();

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
                  setValue("skopSemakan", e.target.value);
                }}
              >
                <option value="">Skop Semakan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-4">
            <Form.Select
                {...register("skopKriteriaSelect")}
                aria-label="skopKriteriaSelect"
                onChange={(e) => {
                  setValue("skopKriteria", e.target.value);
                }}
              >
                <option value="">Skop Kriteria Ketidakpatuhan</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
