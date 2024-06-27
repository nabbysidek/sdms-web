import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Alert, Container } from "react-bootstrap";
import { useOptionStore } from "../../../store/option-store";
import useCawanganStore from "../../../store/cawangan-store";

function SearchCawangan() {
  // form validation
  const { handleSubmit, control, setError, formState } = useForm();

  // initialize store
  const searchCawangans = useCawanganStore((state) => state.searchCawangans);

  // handle search input
  const onSubmit = async (data) => {
    const { cawangan, wilayahSelect } = data;

    if (!cawangan && !wilayahSelect) {
      setError("cawangan", {
        type: "manual",
        message: "Sila masukkan cawangan atau pilih wilayah",
      });
    } else {
      try {
        await searchCawangans(cawangan, wilayahSelect);
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  // fetch for wilayahOptions
  const { wilayahOptions, displayWilayahs } = useOptionStore((state) => ({
    wilayahOptions: state.wilayahOptions,
    displayWilayahs: state.displayWilayahs,
  }));

  useEffect(() => {
    displayWilayahs();
  }, [displayWilayahs]);

  return (
    <>
      <Container fluid className="search-bar-section">
        <Form className="search-bar" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="col-md-4 with-padding-left">
              <Controller
                name="wilayahSelect"
                control={control}
                render={({ field }) => (
                  <Form.Select {...field} aria-label="wilayahSelect">
                    <option value="">Wilayah</option>
                    {wilayahOptions
                      // Sort wilayah options alphabetically by namaWilayah
                      .sort((a, b) =>
                        a.namaWilayah.localeCompare(b.namaWilayah)
                      )
                      .map((wilayah) => (
                        <option key={wilayah.id} value={wilayah.id}>
                          {wilayah.namaWilayah}
                        </option>
                      ))}
                  </Form.Select>
                )}
              />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Controller
                name="cawangan"
                control={control}
                render={({ field }) => (
                  <Form.Control {...field} type="text" placeholder="Cawangan" />
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

      {formState.errors.cawangan && (
        <Alert className="alert-display" variant="danger">
          {formState.errors.cawangan.message}
        </Alert>
      )}
    </>
  );
}

export default SearchCawangan;
