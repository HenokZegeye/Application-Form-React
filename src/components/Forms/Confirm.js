import React, { Component } from 'react';
import { Card } from 'antd';

export class Confirm extends Component {
  render() {
    return (
      <div>
        <h2>Your application has been submitted</h2>
        <h3 className="pl-3">Thank you for applying to our college! </h3>
        <Card style={{ width: 500 }}>
          <div style={{ fontSize: '20px', textAlign: 'center' }}>
            You will be receiving an email from us shortly. It will include your
            credentials for BITS college's portal, through which you can edit,
            track the progress of and receive messages pertainning to your
            application.
          </div>
        </Card>
      </div>
    );
  }
}

export default Confirm;
