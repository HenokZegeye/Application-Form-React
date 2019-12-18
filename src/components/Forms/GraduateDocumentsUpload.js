import React, { Component } from "react";
import { Upload, Icon, message, Button, Row, Col, Form } from "antd";
import LModel from "../../services/api";
const FormItem = Form.Item;

export class GraduateDocumentsUpload extends Component {
  state = {
    uploadList: true,
    fileList: [],
    ba_degree_file_list: [],
    motivation_letter_file_list: [],
    previewImage: "",
    ba_degree_path: "",
    motivation_letter_path: "",
    attached_documents: {},
    enrollmentApplicationId: this.props.enrollmentApplicationId
  };
  componentDidMount() {
    if (this.props.applicationData.attached_documents) {
      console.log("application data iff exist", this.props.applicationData);
      this.setState(
        {
          attached_documents: this.props.applicationData.attached_documents
        },
        () => {
          let documents = this.state.attached_documents;
          for (var document in documents) {
            if (document === "baDegree") {
              let doc = documents[document][0];
              const list = [];
              list.push({
                uid: doc.uid,
                name: doc.name,
                status: "done",
                url: doc.url,
                document_id: doc.document_id
              });
              this.setState({ ba_degree_file_list: list });
            } else if (document === "motivationLetter") {
              let doc = documents[document][0];
              const list = [];
              list.push({
                uid: doc.uid,
                name: doc.name,
                status: "done",
                url: doc.url,
                document_id: doc.document_id
              });
              this.setState({ motivation_letter_file_list: list });
            }
          }
          console.log("documentssssss from component did mount", documents);
        }
      );
    }
  }

  componentDidUpdate() {
    console.log("applicaiton data", this.props);
  }
  handleBAdegreeChange = ({ fileList }) =>
    this.setState({ ba_degree_file_list: fileList });
  handleMotivationLetterChange = ({ fileList }) =>
    this.setState({ motivation_letter_file_list: fileList });
  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File size must be smaller than 2MB!");
    }
    return true && isLt2M;
  };

  onRemoveBAdegree = file => {
    const index = this.state.ba_degree_file_list.indexOf(file);
    const newFileList = this.state.ba_degree_file_list.slice();

    const document_id = this.state.ba_degree_file_list[index].document_id;
    const ba_degree_name = file.name;
    console.log("file ==> ", this.state.ba_degree_file_list[index]);

    console.log(
      "Document ID --> ",
      this.state.ba_degree_file_list[index].document_id
    );
    console.log("Transcript name ==> ", ba_degree_name);
    LModel.destroy("documents", document_id)
      .then(response => {
        console.log("Transcript document delteded succesfulyu", response);
        newFileList.splice(index, 1);
        this.setState({ ba_degree_file_list: newFileList });
        // LModel.deleteFiles("documents", transcript_name)
        //   .then(response => {
        //     console.log("transcript file successfuly delted", response);
        //   })
        //   .catch(err => {
        //     console.log("unable to delete trascript file", err);
        //   });
      })
      .catch(err => {
        console.log("unable to delete transcript document ", err);
      });
  };

  onRemoveMotivationLetter = file => {
    const index = this.state.motivation_letter_file_list.indexOf(file);
    const newFileList = this.state.motivation_letter_file_list.slice();

    const document_id = this.state.motivation_letter_file_list[index]
      .document_id;
    const motivation_letter_name = file.name;
    console.log("file ==> ", this.state.motivation_letter_file_list[index]);

    console.log(
      "Document ID --> ",
      this.state.motivation_letter_file_list[index].document_id
    );
    console.log("Transcript name ==> ", motivation_letter_name);
    LModel.destroy("documents", document_id)
      .then(response => {
        console.log("Transcript document delteded succesfulyu", response);
        newFileList.splice(index, 1);
        this.setState({ motivation_letter_file_list: newFileList });
        // LModel.deleteFiles("documents", transcript_name)
        //   .then(response => {
        //     console.log("transcript file successfuly delted", response);
        //   })
        //   .catch(err => {
        //     console.log("unable to delete trascript file", err);
        //   });
      })
      .catch(err => {
        console.log("unable to delete transcript document ", err);
      });
  };

  customBAdegreeValidator = (rule, value, callback) => {
    console.log("Tran vali ==> ", this.state.ba_degree_file_list);
    if (this.state.ba_degree_file_list.length >= 1) {
      callback();
    } else {
      callback("Please upload your badegree");
    }
  };

  customMotivationLetterValidator = (rule, value, callback) => {
    console.log("Tran vali ==> ", this.state.motivation_letter_file_list);
    if (this.state.motivation_letter_file_list.length >= 1) {
      callback();
    } else {
      callback("Please upload your motivation_letter_file_list");
    }
  };

  customRequestBAdegreeUpload = ({ onSuccess, onError, file }) => {
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let data = new FormData();
      data.append("document_type", "BAdegree");
      data.append("enrollment_application_id", "1");
      data.append("document", file);
      console.log("fileeeeee", file);
      let previously_uploaded = this.state.ba_degree_file_list[0];
      console.log("previously uploaded : ", previously_uploaded);
      LModel.create("documents", data)
        .then(response => {
          let ba_degree_path = LModel.API_BASE_URL + response.data.document.url;
          console.log("updated : ", response);
          console.log("BAdegree pathhhh", ba_degree_path);
          this.setState({ ba_degree_path });
          console.log("BAdegree path from state", this.state.ba_degree_path);
          const list = [];

          list.push({
            type: "BAdegree",
            uid: response.data.document.url,
            name: file.name,
            status: "done",
            url: LModel.API_BASE_URL + response.data.document.url,
            document_id: response.data.id
          });
          let attached_documents = this.state.attached_documents;
          console.log("previous attached docs", attached_documents);

          this.setState({ ba_degree_file_list: list }, () => {
            attached_documents.baDegree = this.state.ba_degree_file_list;
            this.setState({
              attached_documents
            });
          });
          console.log("current attached docs", attached_documents);
          this.props.onUpdate(attached_documents);
          onSuccess();
        })
        .catch(err => {
          console.log("Error ==> ", err);
        });
    };
  };

  customRequestMotivationLetterUpload = ({ onSuccess, onError, file }) => {
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let data = new FormData();
      data.append("document_type", "MotivationLetter");
      data.append("enrollment_application_id", "1");
      data.append("document", file);
      console.log("fileeeeee", file);
      let previously_uploaded = this.state.motivation_letter_file_list[0];
      console.log("previously uploaded : ", previously_uploaded);
      LModel.create("documents", data)
        .then(response => {
          let motivation_letter_path =
            LModel.API_BASE_URL + response.data.document.url;
          this.setState({ motivation_letter_path });
          console.log(
            "motivation_letter path from state",
            this.state.motivation_letter_path
          );
          const list = [];

          list.push({
            type: "MotivationLetter",
            uid: response.data.document.url,
            name: file.name,
            status: "done",
            url: LModel.API_BASE_URL + response.data.document.url,
            document_id: response.data.id
          });
          let attached_documents = this.state.attached_documents;
          console.log("previous attached docs", attached_documents);

          this.setState({ motivation_letter_file_list: list }, () => {
            attached_documents.motivationLetter = this.state.motivation_letter_file_list;
            this.setState({
              attached_documents
            });
          });
          console.log("current attached docs", attached_documents);
          this.props.onUpdate(attached_documents);
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
          <Col>
            <FormItem label="Bachelor Degree">
              {getFieldDecorator("baDegree", {
                rules: [
                  {
                    validator: this.customBAdegreeValidator
                  }
                ]
              })(
                <Upload
                  name="baDegree"
                  customRequest={this.customRequestBAdegreeUpload}
                  fileList={this.state.ba_degree_file_list}
                  showUploadList={this.state.uploadList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleBAdegreeChange}
                  onRemove={this.onRemoveBAdegree}
                  accept={[".pdf", "jpeg", "jpg"]}
                >
                  {this.state.ba_degree_file_list.length >= 1 ? null : (
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
          <Col>
            <FormItem label="Motivation Letter">
              {getFieldDecorator("motivationLetter", {
                rules: [
                  {
                    validator: this.customMotivationLetterValidator
                  }
                ]
              })(
                <Upload
                  name="motivationLetter"
                  customRequest={this.customRequestMotivationLetterUpload}
                  fileList={this.state.motivation_letter_file_list}
                  showUploadList={this.state.uploadList}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleMotivationLetterChange}
                  onRemove={this.onRemoveMotivationLetter}
                  accept={[".pdf", "jpeg", "jpg"]}
                >
                  {this.state.motivation_letter_file_list.length >= 1 ? null : (
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
GraduateDocumentsUpload = Form.create()(GraduateDocumentsUpload);
export default GraduateDocumentsUpload;
