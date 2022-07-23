import * as React from 'react';
import FileUploadComponent from './file-upload/FileUpload';
import './style.css';

export default function App() {
  return (
    <div>
      <FileUploadComponent
        accept={'image'}
        formDataEvent={(event) => {
          console.log('get formData', event);
        }}
        uploadEvent={(event) => {
          console.log('uplaod event', event);
        }}
        setPreviewUrl={(url) => {
          console.log('get preview url', url);
        }}
      />
    </div>
  );
}
