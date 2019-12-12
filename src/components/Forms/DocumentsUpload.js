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
    g12NationalExam_path: "",
    attached_documents: {},
    enrollmentApplicationId: this.props.enrollmentApplicationId
  };

  componentDidMount() {
    if (this.props.applicationData.attached_documents) {
      let documents = this.props.applicationData.attached_documents;
      const arr_docs = Object.entries(documents);
      for (let i = 0; i < arr_docs.length; i++) {
        const document_name = arr_docs[i][0];
        if (document_name === "highschool_transcript") {
          console.log("from highschool", arr_docs[i][1].file);
          console.log(
            "from highschool transcript path",
            this.state.transcript_path
          );
          const list = [];
          list.push({
            uid: arr_docs[i][1].file.uid,
            name: arr_docs[i][1].file.name,
            status: "done",
            url: LModel.API_BASE_URL + arr_docs[i][1].url
          });
          this.setState({ transcript_file_list: list });
        } else if (document_name === "grade12_National_Exam_Result") {
          console.log("from grade 12", arr_docs[i][1].file);
        }
      }
    }

    // let documents = this.state.attachedDocs;
    // for (var i = 0; i < documents.length; i++) {
    //   let document = documents[i];
    //   if (document.documentName === "PHOTO") {
    //     const list = [];
    //     list.push({
    //       uid: document.id,
    //       name: document.original_file_name,
    //       status: "done",
    //       url: LModel.API_BASE_URL + document.path,
    //       document_id: document.id,
    //       uploaded_photo_name: document.uploaded_photo_name
    //     });
    //     this.setState({ photo_file_list: list });
    //   } else if (document.documentName === "MOTIVATION_LETTER") {
    //     const list = [];
    //     console.log("photo docu : ", document);
    //     list.push({
    //       uid: document.id,
    //       name: document.original_file_name,
    //       status: "done",
    //       url: LModel.API_BASE_URL + document.path,
    //       document_id: document.id,
    //       uploaded_motivation_letter_name:
    //         document.uploaded_motivation_letter_name
    //     });

    //     this.setState({ motivation_letter_file_list: list });
    //   } else if (document.documentName === "TRANSCRIPT") {
    //     const list = [];
    //     console.log("photo docu : ", document);
    //     list.push({
    //       uid: document.id,
    //       name: document.original_file_name,
    //       status: "done",
    //       url: LModel.API_BASE_URL + document.path,
    //       document_id: document.id,
    //       uploaded_transcript_name: document.uploaded_transcript_name
    //     });

    //     this.setState({ transcript_file_list: list });
    //   }
    // }
  }

  componentDidUpdate() {
    console.log("applicaiton data", this.props);
  }
  handleTranscriptChange = ({ fileList }) =>
    this.setState({ transcript_file_list: fileList });
  handleG12ExamResultChange = ({ fileList }) =>
    this.setState({ g12NationalExam_file_list: fileList });

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File size must be smaller than 2MB!");
    }
    return true && isLt2M;
  };

  onRemoveTranscript = file => {
    const index = this.state.transcript_file_list.indexOf(file);
    const newFileList = this.state.transcript_file_list.slice();

    const document_id = this.state.transcript_file_list[index].document_id;
    const transcript_name = file.name;
    console.log("file ==> ", this.state.transcript_file_list[index]);

    console.log(
      "Document ID --> ",
      this.state.transcript_file_list[index].document_id
    );
    console.log("Transcript name ==> ", transcript_name);
    LModel.destroy("documents", document_id)
      .then(response => {
        console.log("Transcript document delteded succesfulyu", response);
        newFileList.splice(index, 1);
        this.setState({ transcript_file_list: newFileList });
        LModel.deleteFile("documents", transcript_name)
          .then(response => {
            console.log("transcript file successfuly delted", response);
          })
          .catch(err => {
            console.log("unable to delete trascript file", err);
          });
      })
      .catch(err => {
        console.log("unable to delete transcript document ", err);
      });
  };
  onRemoveG12ExamResult = file => {
    const index = this.state.g12NationalExam_file_list.indexOf(file);
    const newFileList = this.state.g12NationalExam_file_list.slice();

    const document_id = this.state.g12NationalExam_file_list[index].document_id;
    const g12_exam_result_name = file.name;
    console.log("file ==> ", this.state.g12NationalExam_file_list[index]);

    console.log(
      "Document ID --> ",
      this.state.g12NationalExam_file_list[index].document_id
    );
    console.log("G12 exam result name ==> ", g12_exam_result_name);
    LModel.destroy("documents", document_id)
      .then(response => {
        console.log("G12 exam result document delteded succesfulyu", response);
        newFileList.splice(index, 1);
        this.setState({ g12NationalExam_file_list: newFileList });
        LModel.deleteFile("documents", g12_exam_result_name)
          .then(response => {
            console.log("G12 exam result file successfuly delted", response);
          })
          .catch(err => {
            console.log("unable to delete g12 exam result file", err);
          });
      })
      .catch(err => {
        console.log("unable to delete g12 exam result document ", err);
      });
  };

  customTranscriptValidator = (rule, value, callback) => {
    console.log("Tran vali ==> ", this.state.transcript_file_list);
    if (this.state.transcript_file_list.length >= 1) {
      callback();
    } else {
      callback("Please upload your transcript");
    }
  };

  customG12ExamResultValidator = (rule, value, callback) => {
    console.log("Tran vali ==> ", this.state.g12NationalExam_file_list);
    if (this.state.g12NationalExam_file_list.length >= 1) {
      callback();
    } else {
      callback("Please upload your grade 12 exam result");
    }
  };
  customRequestTranscriptUpload = ({ onSuccess, onError, file }) => {
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let data = new FormData();
      data.append("document_type", "Transcript");
      data.append("enrollment_application_id", "1");
      data.append("document", file);
      console.log("fileeeeee", file);
      let previously_uploaded = this.state.transcript_file_list[0];
      console.log("previously uploaded : ", previously_uploaded);
      LModel.create("documents", data)
        .then(response => {
          let transcript_path =
            LModel.API_BASE_URL + response.data.document.url;
          console.log("updated : ", response);
          console.log("transcripttt pathhhh", transcript_path);
          this.setState({ transcript_path });
          console.log("transcript path from state", this.state.transcript_path);
          const list = [];

          list.push({
            uid: response.data.document.url,
            name: file.name,
            status: "done",
            url: LModel.API_BASE_URL + response.data.document.url,
            document_id: response.data.id
          });
          let attached_documents = this.state.attached_documents;
          console.log("previous attached docs", attached_documents);

          this.setState({ transcript_file_list: list }, () => {
            attached_documents.transcript = this.state.transcript_file_list;
            this.setState({
              attached_documents: attached_documents.transcript
            });
          });
          console.log("current attached docs", attached_documents);
          this.props.onUpdate(this.state.transcript_file_list, "Transcript");
          onSuccess();
        })
        .catch(err => {
          console.log("Error ==> ", err);
        });
    };
  };
  customRequestG12ExamResultUpload = ({ onSuccess, onError, file }) => {
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let data = new FormData();
      data.append("document_type", "G12ExamResult");
      data.append("enrollment_application_id", "1");
      data.append("document", file);
      console.log("fileeeeee", file);
      let previously_uploaded = this.state.g12NationalExam_file_list[0];
      console.log("previously uploaded : ", previously_uploaded);
      LModel.create("documents", data)
        .then(response => {
          console.log("updated : ", response);
          const list = [];

          list.push({
            uid: response.data.document.url,
            name: file.name,
            status: "done",
            url: LModel.API_BASE_URL + response.data.document.url,
            document_id: response.data.id
          });
          let attached_documents = this.state.attached_documents;
          console.log("previous attached docs", attached_documents);

          this.setState({ g12NationalExam_file_list: list }, () => {
            attached_documents.g12Exam = this.state.g12NationalExam_file_list;
            this.setState({ attached_documents: attached_documents.g12Exam });
          });
          console.log("current attached docs", attached_documents);
          this.props.onUpdate(this.state.g12NationalExam_file_list, "G12Exam");
          console.log("file liiist", this.state.g12NationalExam_file_list);
          onSuccess();
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
                    validator: this.customTranscriptValidator
                  }
                ]
              })(
                <Upload
                  name="transcript"
                  customRequest={this.customRequestTranscriptUpload}
                  fileList={this.state.transcript_file_list}
                  showUploadList={this.state.uploadList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleTranscriptChange}
                  onRemove={this.onRemoveTranscript}
                  accept={[".pdf", "jpeg", "jpg"]}
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
                    validator: this.customG12ExamResultValidator
                  }
                ]
              })(
                <Upload
                  name="file"
                  customRequest={this.customRequestG12ExamResultUpload}
                  fileList={this.state.g12NationalExam_file_list}
                  showUploadList={this.state.uploadList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleG12ExamResultChange}
                  onRemove={this.onRemoveG12ExamResult}
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
