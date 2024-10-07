import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Button, Alert, Container } from "react-bootstrap";
import CreateKakitangan from "../tetapan kriteria/Kakitangan/Create";
import SearchResultUntukLaporanIndividu from "./Show";
import "../../assets/styles/styles_laporan_individu.css";
import axiosCustom from "../../axios";

function SearchUntukLaporanIndividu() {
  // manage visibility of the search result
  const [linkClicked, setLinkClicked] = useState(false);

  // check validation errors
  const [validationErrors, setValidationErrors] = useState(null);

  // store search results
  const [searchResults, setSearchResults] = useState(null);

  // form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // adding watch to the destructuring
  } = useForm({
    defaultValues: {
      searchKakitanganInput: "", // to ensure a default value is set
    },
  });

  // watch the value of searchKakitanganInput
  const searchKakitanganInputValue = watch("searchKakitanganInput");

  // submit for the search
  const onSubmit = async (data) => {
    if (!data.searchKakitanganInput) {
      setValidationErrors({
        searchKakitanganInput: { message: "ID kakitangan diperlukan " },
      });
    } else {
      setValidationErrors(null);
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axiosCustom.post('laporan-individu/carian-laporan-individu', {
            searchKakitanganInput: data.searchKakitanganInput
          });
          setSearchResults(response.data);
          setLinkClicked(true);
        } catch (error) {
          console.error('Error fetching search results', error);
          setValidationErrors({
            searchKakitanganInput: { message: "Ralat dalam mencari ID kakitangan" },
          });
          console.error('Error fetching search results', error);
        }
      } else {
        setValidationErrors(errors);
      }
    }
  };

  return (
    <>
      <Container fluid className="laporan-individu-search-container">
        <Row>
          <Col xs={12} md={7} xl={7}>
            <Form>
              <Form.Group>
                <Controller
                  name="searchKakitanganInput"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="ID kakitangan"
                      value={searchKakitanganInputValue} // to fix unctrolled to controlled input
                      isInvalid={!!validationErrors?.searchKakitanganInput}
                    />
                  )}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} md={2} xl={2} className="remove-padding">
            <Button
              className="laporan-individu-search-btn"
              onClick={() => {
                handleSubmit((data) => onSubmit(data))();
              }}
            >
              Cari
            </Button>
          </Col>
          <Col xs={12} md={3} xl={3} className="remove-padding">
            <CreateKakitangan />
          </Col>
        </Row>
      </Container>

      {validationErrors?.searchKakitanganInput && (
        <Alert className="alert-display" variant="danger">
          {validationErrors.searchKakitanganInput.message}
        </Alert>
      )}

      <div className="pelaporan-search-result">
        {linkClicked && <SearchResultUntukLaporanIndividu searchResults={searchResults} />}
      </div>
    </>
  );
}

export default SearchUntukLaporanIndividu;
