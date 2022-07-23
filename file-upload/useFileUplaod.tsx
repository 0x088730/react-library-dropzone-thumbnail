import { useEffect, useState } from 'react';
import React = require('react');
import { Accept, useDropzone } from 'react-dropzone';

type UplaodEeventT = {
  files: File[];
  previewUrls: string[];
};

export interface useFileUploadPros {
  uploadEvent?(event: UplaodEeventT): void;
  formDataEvent?(formData: FormData): void;
  accept: string;
}

const acceptDefault: { [key: string]: Accept } = {
  image: {
    'image/jpeg': [],
    'image/png': [],
  },
};

export default function useFileUpload({
  uploadEvent,
  formDataEvent,
  accept,
}: useFileUploadPros) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptDefault[accept],
    onDrop: (acceptedFiles) => {
      const tempPreview = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const tempUrls = previewUrls.concat(tempPreview);
      setPreviewUrls(tempUrls);
      formDataEvent && imageUpload(acceptedFiles);
      setFiles(files.concat(acceptedFiles));
    },
  });

  const imageUpload = (files) => {
    var formDataTemp = new FormData();
    for (const key of Object.keys(files)) {
      formDataTemp.append('files', files[key]);
    }
    formDataEvent(formDataTemp);
  };

  useEffect(() => {
    uploadEvent &&
      uploadEvent({
        files,
        previewUrls,
      });
  }, [previewUrls]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const removeEvent = (index: number) => {
    setFiles(files.filter((e, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((e, i) => i !== index));
  };
  return {
    getRootProps,
    getInputProps,
    previewUrls,
    files,
    removeEvent,
  };
}
