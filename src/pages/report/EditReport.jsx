import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../assets/styles/styles_report.css";
import { useOptionStore } from "../../store/option-store";
import useReportStore from "../../store/report-store";

function EditReport() {
  const location = useLocation();
  const { studentName, studentId, reports } = location.state || {};
  const { handleEditReport } = useReportStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const {
    yearOptions,
    displayYears,
    displayClasses,
    filteredClassOptions,
    filterClassesByYear,

    misdemeanorCategoryOptions,
    displayMisdemeanorCategories,
    misdemeanorOptions,
    displayMisdemeanors,
    filteredMisdemeanorOptions,
    filterMisdemeanorsByCategory,
  } = useOptionStore((state) => ({
    yearOptions: state.yearOptions,
    displayYears: state.displayYears,
    displayClasses: state.displayClasses,
    filteredClassOptions: state.filteredClassOptions,
    filterClassesByYear: state.filterClassesByYear,

    misdemeanorCategoryOptions: state.misdemeanorCategoryOptions,
    displayMisdemeanorCategories: state.displayMisdemeanorCategories,
    misdemeanorOptions: state.misdemeanorOptions,
    displayMisdemeanors: state.displayMisdemeanors,
    filteredMisdemeanorOptions: state.filteredMisdemeanorOptions,
    filterMisdemeanorsByCategory: state.filterMisdemeanorsByCategory,
  }));

  const onSubmit = (data) => {
    handleEditReport(data, reports.id);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // Fetch initial display data
  useEffect(() => {
    displayYears();
  }, [displayYears]);

  // Fetch dependent data when `reports` is provided
  useEffect(() => {
    if (reports) {
      // Set values for the fields
      setValue("yearId", reports.year?.id);
      setValue("classId", reports.class?.id);

      setValue("misdemeanorCategoryId", reports.misdemeanorCategory?.id);
      setValue("misdemeanorId", reports.misdemeanor?.id);

      setValue("tarikhReport", reports.tarikhReport);
      setValue("catatanReport", reports.catatanReport);

      // Trigger dependent data fetching
      filterClassesByYear(reports.year?.id);
      filterMisdemeanorsByCategory(reports.misdemeanorCategory?.id);
    }
  }, [reports, setValue, filterClassesByYear, filterMisdemeanorsByCategory]);

  // Fetch dependent options for `Classes` when `reports.year?.id` changes
  useEffect(() => {
    if (reports?.year?.id) {
      displayClasses(reports.year.id);
    }
  }, [reports?.year?.id, displayClasses]);

  // Fetch dependent options for `Misdemeanors` when `reports.misdemeanorCategory?.id` changes
  useEffect(() => {
    if (reports?.misdemeanorCategory?.id) {
      displayMisdemeanors(reports.misdemeanorCategory.id);
    }
  }, [reports?.misdemeanorCategory?.id, displayMisdemeanors]);

  const handleYearChange = (e) => {
    const selectedYearId = e.target.value;
    setValue("yearId", selectedYearId);
    filterClassesByYear(selectedYearId);
  };

  const handleMisdemeanorCategoryChange = (e) => {
    const selectedMisdemeanorCategoryId = e.target.value;
    setValue("misdemeanorCategoryId", selectedMisdemeanorCategoryId);
    filterMisdemeanorsByCategory(selectedMisdemeanorCategoryId);
  };

  const handleMisdemeanorChange = (e) => {
    const selectedMisdemeanorId = e.target.value;
    setValue("misdemeanorId", selectedMisdemeanorId);
  };

  return (
    <>
      <div className="page-title">
        <h2>Reports</h2>
        <hr />
        <h3>Edit Student Misdemeanor Report</h3>
      </div>
      <div className="edit-misdemeanor-form-container">
        <Container>
          <div>
            <h4>Student Basic Information</h4>
            <hr />
            <div className="student-info">
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control type="text" value={studentName} disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="text" value={studentId} disabled />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h4>Other Details</h4>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Controller
                      id="yearId"
                      name="yearId"
                      control={control}
                      rules={{ required: "A year is required" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              handleYearChange(e);
                            }}
                            value={value}
                          >
                            <option value="">Select a Year</option>
                            {yearOptions
                              .sort((a, b) =>
                                a.yearName.localeCompare(b.yearName)
                              )
                              .map((year) => (
                                <option key={year.id} value={year.id}>
                                  {year.yearName}
                                </option>
                              ))}
                          </Form.Select>
                          {errors.yearId && (
                            <span className="error-message">
                              {errors.yearId.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Class</Form.Label>
                    <Controller
                      id="classesId"
                      name="classesId"
                      control={control}
                      rules={{ required: "A class is required" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              setValue("classesId", e.target.value);
                            }}
                            value={value}
                          >
                            <option value="">Select a Class</option>
                            {filteredClassOptions
                              .sort((a, b) =>
                                a.className.localeCompare(b.className)
                              )
                              .map((classes) => (
                                <option key={classes.id} value={classes.id}>
                                  {classes.className}
                                </option>
                              ))}
                          </Form.Select>
                          {errors.classesId && (
                            <span className="error-message">
                              {errors.classesId.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="report-details-container">
                <h4>Report Details</h4>
                <hr />
                <div>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Date of Report</Form.Label>
                        <Controller
                          name="reportDate"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "A date is required",
                          }}
                          render={({ field }) => (
                            <>
                              <Form.Control
                                type="date"
                                placeholder="Select a date. . ."
                                {...field}
                                isInvalid={!!errors.reportDate}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.reportDate && errors.reportDate.message}
                              </Form.Control.Feedback>
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Misdemeanor Category</Form.Label>
                        <Controller
                          id="misdemeanorCategoryId"
                          name="misdemeanorCategoryId"
                          control={control}
                          rules={{
                            required: "A misdemeanor category is required",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  handleMisdemeanorCategoryChange(e);
                                }}
                                value={value}
                              >
                                <option value="">
                                  Select a Misdemeanor Category
                                </option>
                                {misdemeanorCategoryOptions
                                  .sort((a, b) =>
                                    a.misdemeanorCategoryName.localeCompare(
                                      b.misdemeanorCategoryName
                                    )
                                  )
                                  .map((misdemeanorCategory) => (
                                    <option
                                      key={misdemeanorCategory.id}
                                      value={misdemeanorCategory.id}
                                    >
                                      {
                                        misdemeanorCategory.misdemeanorCategoryName
                                      }
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.misdemeanorCategoryId && (
                                <span className="error-message">
                                  {errors.misdemeanorCategoryId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Misdemeanor</Form.Label>
                        <Controller
                          id="misdemeanorId"
                          name="misdemeanorId"
                          control={control}
                          rules={{
                            required: "A misdemeanor is required",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  handleMisdemeanorChange(e);
                                }}
                                value={value}
                              >
                                <option value="">Select a Misdemeanor</option>
                                {filteredMisdemeanorOptions
                                  .sort((a, b) =>
                                    a.misdemeanorName.localeCompare(
                                      b.misdemeanorName
                                    )
                                  )
                                  .map((misdemeanor) => (
                                    <option
                                      key={misdemeanor.id}
                                      value={misdemeanor.id}
                                    >
                                      {misdemeanor.misdemeanorName}
                                    </option>
                                  ))}
                              </Form.Select>
                              {errors.misdemeanorId && (
                                <span className="error-message">
                                  {errors.misdemeanorId.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group>
                      <Form.Label>Additional Notes</Form.Label>
                      <Controller
                        name="reportNotes"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <Form.Control
                              as="textarea"
                              placeholder="Enter any additional notes . . ."
                              {...field}
                            />
                          </>
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <div className="edit-report-actions">
                    <Button type="submit" className="add-report-btn">
                      Save
                    </Button>{" "}
                    <Button onClick={handleCancel} className="cancel-btn">
                      Cancel
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default EditReport;
