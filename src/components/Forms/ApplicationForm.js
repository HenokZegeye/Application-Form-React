import React, { Component } from 'react';
import { Steps, Button, message, Form, Col, Row } from 'antd';
import LModel from '../../services/api';
import ResponseCodes from '../../utils/ResponseCodes';
import Logo from '../Logo';
import ProgramSelection from './ProgramSelection';
import ContactInfo from './ContactInfo';
import DocumentsUpload from './DocumentsUpload';
import Preview from './Preview';
import Confirm from './Confirm';
import GraduateDocumentsUpload from './GraduateDocumentsUpload';
const { Step } = Steps;

const steps = [
  'Select Program',
  'Upload Document',
  'Add Contact Information',
  'Preview Application',
  'Confirm'
];

const fields = {
  Select_Program: ['programType', 'fieldOfStudy', 'modeOfAttendance'],
  Upload_Document: ['highschool_transcript', 'grade12_National_Exam_Result'],
  Graduate_Upload_Document: ['baDegree', 'motivationLetter'],
  Contact_Info: [
    'first_name',
    'middle_name',
    'last_name',
    'email',
    'phone_number'
  ]
};

export class Main extends Component {
  state = {
    current: 0,
    enrollmentApplicationId: null,
    applicationData: {},
    select_program: {},
    attached_documents: {},
    contact_info: {},
    loaded: false,
    ids: {},
    applicant_id: '',
    user_id: '',
    program_id: ''
  };
  success = msg => {
    message.success(msg);
  };
  error = msg => {
    message.error(msg);
  };

  onUpdate = attached_documents => {
    console.log('attacheedddd docs from application form', attached_documents);
    this.setState({ attached_documents });
    console.log(
      'attached docs state from application form...',
      this.state.attached_documents
    );
  };

  get_ids = (type, id) => {
    console.log('typpppe', type);
    let ids = this.state.ids;
    ids[type] = id;
    let applicationData = this.state.applicationData;
    this.setState({ ids }, () => {
      applicationData.ids = this.state.ids;
      this.setState({ applicationData });
    });

    console.log('type', type);
    console.log('id', id);
  };

  next() {
    if (this.state.current == 0) {
      this.props.form.validateFieldsAndScroll(
        fields['Select_Program'],
        (err, values) => {
          if (!err) {
            if (this.state.ids.program_type_id != undefined) {
              const current = this.state.current + 1;
              const select_program = this.props.form.getFieldsValue(
                fields.Select_Program
              );
              let applicationData = this.state.applicationData;

              this.setState({ select_program }, () => {
                applicationData.select_program = this.state.select_program;
                this.setState({ applicationData });
                this.setState({ current });
              });
            } else {
              alert(
                'There is a connection problem, please, refresh your browser & Try again'
              );
            }
          }
        }
      );
    } else if (this.state.current == 1) {
      let Docfields;
      if (
        this.state.applicationData.select_program.programType ===
        'Undergraduate'
      ) {
        Docfields = fields['Upload_Document'];
      } else {
        Docfields = fields['Graduate_Upload_Document'];
      }
      this.props.form.validateFieldsAndScroll(Docfields, (err, values) => {
        if (!err) {
          const current = this.state.current + 1;
          let attached_documents = this.state.attached_documents;
          let applicationData = this.state.applicationData;
          let length_docs = Object.keys(this.state.attached_documents).length;
          if (length_docs >= 2) {
            applicationData.attached_documents = attached_documents;
            this.setState({ current });
            this.setState({ applicationData });
          } else {
            alert('please Wait until all the documents uploaded');
          }
        }
      });
    } else if (this.state.current == 2) {
      this.props.form.validateFieldsAndScroll(
        fields['Contact_Info'],
        (err, values) => {
          if (!err) {
            const current = this.state.current + 1;
            const contact_info = this.props.form.getFieldsValue(
              fields.Contact_Info
            );
            let applicationData = this.state.applicationData;
            this.setState({ contact_info }, () => {
              applicationData.contact_info = this.state.contact_info;
              this.setState({ applicationData }, () => {
                this.setState({ current });
                console.log('application data from contact', this.state);
              });
            });
          }
        }
      );
    }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  finalStep() {
    console.log('currentttttttt', this.state.current);
    const current = this.state.current + 1;
    this.setState({ current });
    console.log('currentttttttt updated', this.state.current);
  }

  form_submit = () => {
    console.log(
      'application form from form submit',
      this.state.applicationData
    );
    const applicationData = this.state.applicationData;
    const contact_info = applicationData.contact_info;
    let select_program = {};
    const program_type_id = applicationData.ids.program_type_id;
    const field_of_study_id = applicationData.ids.field_of_study_id;
    const mode_of_attendance = applicationData.select_program.modeOfAttendance;
    select_program = {
      mode_of_attendance: mode_of_attendance,
      program_type_id: program_type_id,
      field_of_study_id: field_of_study_id
    };

    LModel.create('applicants', contact_info)
      .then(response => {
        this.setState({ applicant_id: response.data.data.id });
        console.log('response from applicant created', response);
        let credentials = {};
        credentials = {
          email: response.data.data.email,
          password: response.data.random_string,
          password_confirmation: response.data.random_string
        };
        LModel.create('auth', credentials).then(response => {
          console.log('user registrationsssss', response);
          this.setState({ user_id: response.data.data.id });
          LModel.create('programs', select_program).then(response => {
            console.log('response from program creation', response);
            this.setState({ program_id: response.data.id });
            let enrollmentApplicationData = {};
            enrollmentApplicationData = {
              status: 'Inprogress',
              applicant_id: this.state.applicant_id,
              program_id: this.state.program_id,
              user_id: this.state.user_id
            };
            LModel.create('enrollment_applications', enrollmentApplicationData)
              .then(response => {
                console.log('response from program creation', response);
                let attached_documents = this.state.applicationData
                  .attached_documents;
                let uploaded = {};
                for (var key in attached_documents) {
                  uploaded = {
                    enrollment_application_id: response.data.id,
                    url: attached_documents[key][0]['url'],
                    doc_type: attached_documents[key][0]['type'],
                    uid: attached_documents[key][0]['uid'],
                    original_name: attached_documents[key][0]['name']
                  };
                  LModel.create('uploadeds', uploaded)
                    .then(response => {
                      console.log('response from uploaded ', response);
                    })
                    .catch(err => {
                      console.log('Error', err);
                      let statusCode = err.response.status;
                      let responseMsg = ResponseCodes.getResponseMessag(
                        statusCode
                      );
                      this.error(responseMsg);
                    });
                }
                let current = this.state.current + 1;
                this.setState({ current });
              })
              .catch(err => {
                console.log('Error', err);
                let statusCode = err.response.status;
                let responseMsg = ResponseCodes.getResponseMessag(statusCode);
                this.error(responseMsg);
              });
          });
        });
      })
      .catch(err => {
        console.log('Error', err);
        console.log('Error response', err.response);
        let error_msg = 'Email ' + err.response.data['email'];
        let statusCode = err.response.status;
        let responseMsg = ResponseCodes.getResponseMessag(statusCode);
        this.error(error_msg);
      });
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  renderSteps = current => {
    return (
      <Col>
        <Steps
          // onChange={this.onChange}
          direction="vertical"
          current={current}
          className="mt-5"
        >
          {steps.map(item => (
            <Step style={{ height: '100px' }} key={item} title={item} />
          ))}
        </Steps>
      </Col>
    );
  };

  renderStepActions = () => {
    return (
      <div>
        <div>
          <Row>
            {this.state.current < steps.length - 1 &&
              this.state.current > 0 && (
                <Button onClick={() => this.prev()}>Previous</Button>
              )}

            {this.state.current < steps.length - 2 && (
              <Button
                style={{ marginLeft: '100px' }}
                type="primary"
                onClick={() => this.next()}
              >
                Next
              </Button>
            )}
            {this.state.current === steps.length - 2 && (
              <Button
                style={{ marginLeft: '100px' }}
                type="primary"
                onClick={() => this.form_submit()}
              >
                Final Submission
              </Button>
            )}
          </Row>
        </div>
      </div>
    );
  };

  renderComponents = current => {
    switch (current) {
      case 0:
        return (
          <Row>
            <Col md="9">
              <ProgramSelection
                get_ids={this.get_ids}
                applicationData={this.state.applicationData}
                form={this.props.form}
              />
            </Col>
          </Row>
        );
      case 1: {
        if (
          this.state.applicationData.select_program.programType === 'Graduate'
        ) {
          return (
            <div>
              <GraduateDocumentsUpload
                onUpdate={this.onUpdate}
                applicationData={this.state.applicationData}
                form={this.props.form}
                enrollmentApplicationId={this.state.enrollmentApplicationId}
              />
            </div>
          );
        }
        return (
          <div>
            <DocumentsUpload
              onUpdate={this.onUpdate}
              applicationData={this.state.applicationData}
              form={this.props.form}
              enrollmentApplicationId={this.state.enrollmentApplicationId}
            />
          </div>
        );
      }

      case 2:
        return (
          <div>
            <ContactInfo
              applicationData={this.state.applicationData}
              form={this.props.form}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <Preview
              applicationData={this.state.applicationData}
              form={this.props.form}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <Confirm
              applicationData={this.state.applicationData}
              form={this.props.form}
            />
          </div>
        );

      default:
        break;
    }
  };
  render() {
    const { current } = this.state;
    return (
      <div>
        <div className="text-center">
          <Logo />
        </div>
        <div className="container">
          <Row>
            {current === 4 && (
              <img
                src={process.env.PUBLIC_URL + '/graduation-cap.jpg'}
                alt="graduate cap"
              />
            )}
            {current !== 4 && (
              <div>
                <h2>Steps to Apply to BITS College</h2>
                <Col lg={{ span: 12 }}>{this.renderSteps(current)}</Col>
              </div>
            )}
            <Col lg={{ span: 12 }}>
              {this.renderComponents(current)}
              {this.renderStepActions()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const MainForm = Form.create({})(Main);
export default MainForm;
