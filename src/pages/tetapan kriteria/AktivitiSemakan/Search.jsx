import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";

function SearchAktivitiSemakan() {
    // ----------------- FE -----------------
    // Form submission and validation

    const {
        handleSubmit,
        control,
        setError, 
        formState
    } = useForm();

    const onSubmit = (data) => {
        if (!data.aktivitiSemakan) {
          setError("aktivitiSemakann", {
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
                    <Form.Group className="col-md-10">
                        <Controller nama="aktivitiSemakan" control={control} defaultValue="" render={({field}) => (
                            <Form.Control {...field} type="text" placeholder="Masukkan aktiviti semakan"/>
                        )}/>
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
  )
}

export default SearchAktivitiSemakan;
