import React, { Component } from "react";
import { Upload, Icon, message, Button, Row, Col, Form } from "antd";
import LModel from "../../services/api";
const FormItem = Form.Item;

export class DocumentsUpload extends Component {
  state = {
    uploadList: true,
    fileList: [],
    transcript_file_list: [],
    g12NationalExam_file_list: [],
    previewImage: "",
    transcript_path: "",
    motivationLetter_path: null,
    enrollmentApplicationId: this.props.enrollmentApplicationId
  };

  componentDidUpdate() {
    console.log("applicaiton data", this.props);
  }

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File size must be smaller than 2MB!");
    }
    return true && isLt2M;
  };

  customRequestTranscriptUpload = ({ onSuccess, onError, file }) => {
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let data = new FormData();
      data.append("document_type", "Transcript");
      data.append("enrollment_application_id", "1");
      data.append("document", file);
      LModel.create("documents", data)
        .then(response => {
          console.log("updated : ", response);
        })
        .catch(err => {
          console.log("Error ==> ", err);
        });
    };
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h4 className="pt-4">Upload neccessary documents</h4>
        <Row>
          <Col span={12}>
            <FormItem label="Highschool Transcript">
              {getFieldDecorator("highschool_transcript", {
                rules: [
                  {
                    required: true,
                    message: "Please upload your highschool transcript"
                  }
                ]
              })(
                <Upload
                  customRequest={this.customRequestTranscriptUpload}
                  fileList={this.state.transcript_file_list}
                  showUploadList={this.state.uploadList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleTranscriptChange}
                  onRemove={this.onRemoveTranscript}
                  accept={[".pdf", ".doc", ".docx"]}
                >
                  {this.state.transcript_file_list.length >= 1 ? null : (
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  )}
                </Upload>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="EHEECE(Grade 12 national exam result)">
              {getFieldDecorator("grade12_National_Exam_Result", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please upload your grade 12 national exam result document"
                  }
                ]
              })(
                <Upload
                  name="file"
                  customRequest={this.customRequestG12ExamResultUpload}
                  fileList={this.state.g12NationalExam_file_list}
                  showUploadList={this.state.uploadList}
                  beforeUpload={this.beforeUpload}
                  accept={[".pdf", "jpeg", "jpg"]}
                >
                  {this.state.g12NationalExam_file_list.length >= 1 ? null : (
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  )}
                </Upload>
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}
DocumentsUpload = Form.create()(DocumentsUpload);
export default DocumentsUpload;
