import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import useBahagianStore from "../../../store/bahagian-store";

function SearchBahagian() {
  // form validation
  const { handleSubmit, control, setError, formState } = useForm();

  // initialize store
  const searchBahagians = useBahagianStore((state) => state.searchBahagians);

  // handle search input
  const onSubmit = async (data) => {
    if (!data.bahagian) {
      setError("bahagian", {
        type: "manual",
        message: "Sila masukkan bahagian",
      });
    } else {
      try {
        await searchBahagians(data.bahagian);
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-10">
              <Controller
                name="bahagian"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Masukkan bahagian"
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

      {formState.errors.bahagian && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.bahagian.message}
        </Alert>
      )}
    </>
  );
}

export default SearchBahagian;
