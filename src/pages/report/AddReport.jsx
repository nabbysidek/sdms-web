import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useReportStore from "../../store/report-store";
import { useOptionStore } from "../../store/option-store";
import "../../assets/styles/styles_report.css";

function AddReport() {
  // Form validation
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Handle creation of student report
  const { handleCreateReport } = useReportStore();

  const onSubmit = (data) => {
    handleCreateReport(data);
  };

  // Navigate to the previous page
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  // Display student information
  const location = useLocation();
  const { id, studentName, studentId } = location.state || {};

  useEffect(() => {
    setValue("studentId", id);
  }, [id, setValue]);

  // Backend state management
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMisdemeanorCategory, setSelectedMisdemeanorCategory] =
    useState("");
  const [selectedMisdemeanor, setSelectedMisdemeanor] = useState("");

  // Display options
  const {
    yearOptions,
    displayYears,
    classOptions,
    displayClasses,
    misdemeanorCategoryOptions,
    displayMisdemeanorCategories,
    misdemeanorOptions,
    displayMisdemeanors,
  } = useOptionStore((state) => ({
    yearOptions: state.yearOptions,
    displayYears: state.displayYears,
    classOptions: state.classOptions,
    displayClasses: state.displayClasses,
    misdemeanorCategoryOptions: state.misdemeanorCategoryOptions,
    displayMisdemeanorCategories: state.displayMisdemeanorCategories,
    misdemeanorOptions: state.misdemeanorOptions,
    displayMisdemeanors: state.displayMisdemeanors,
  }));

  useEffect(() => {
    if (selectedYear) {
      displayClasses(selectedYear);
    }
    displayYears();
  }, [selectedYear, displayYears, displayClasses]);

  useEffect(() => {
    displayMisdemeanorCategories();
  }, [displayMisdemeanorCategories]);

  useEffect(() => {
    if (selectedMisdemeanorCategory) {
      displayMisdemeanors(selectedMisdemeanorCategory);
    }
  }, [selectedMisdemeanorCategory, displayMisdemeanors]);

  return (
    <>
      <div className="page-title">
        <h2>Reports</h2>
        <hr />
        <h3>Create New Report</h3>
      </div>
      <div className="add-misdemeanor-form-container">
        <Container>
          <div>
            <h4>Student Information</h4>
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
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
              <Row>
                <Col xs={12} xl={6}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Controller
                      id="yearId"
                      name="yearId"
                      control={control}
                      rules={{ required: "Select a year" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              setSelectedYear(e.target.value);
                            }}
                            value={value}
                          >
                            <option value="">Select Year</option>
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
                      defaultValue=""
                      rules={{ required: "Select a class" }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Form.Select
                            onChange={(e) => {
                              onChange(e);
                              setSelectedClass(e.target.value);
                            }}
                            value={value}
                          >
                            <option value="" disabled>
                              Select Class
                            </option>
                            {classOptions
                              .filter(
                                (classes) =>
                                  classes.yearId === parseInt(selectedYear)
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
                        <Form.Label>Report Date</Form.Label>
                        <Controller
                          id="reportDate"
                          name="reportDate"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Enter a report date",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Control
                                type="date"
                                onChange={onChange}
                                value={value}
                                placeholder="Date"
                              />
                              {errors.reportDate && (
                                <span className="error-message">
                                  {errors.reportDate.message}
                                </span>
                              )}
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
                          defaultValue=""
                          rules={{ required: "Select a misdemeanor category" }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedMisdemeanorCategory(
                                    e.target.value
                                  );
                                }}
                                value={value}
                              >
                                <option value="">
                                  Select Misdemeanor Category
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
                          defaultValue=""
                          rules={{
                            required: "Select a misdemeanor",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Form.Select
                                onChange={(e) => {
                                  onChange(e);
                                  setSelectedMisdemeanor(e.target.value);
                                }}
                                value={value}
                              >
                                <option value="">Select Misdemeanor</option>
                                {misdemeanorOptions
                                  .filter(
                                    (misdemeanor) =>
                                      misdemeanor.misdemeanorCategoryId ===
                                      parseInt(selectedMisdemeanorCategory)
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
                        render={({ field: { onChange, value } }) => (
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </Form.Group>
                  </Row>
                  <div className="add-report-actions">
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

export default AddReport;
