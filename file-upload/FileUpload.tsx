import React = require('react');
import useFileUpload, { useFileUploadPros } from './useFileUplaod';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  flexDirection: 'column',
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
};

interface FileUploadPros extends useFileUploadPros {
  showCheckbox?: boolean;
  setPreviewUrl?(value: string): void;
}

export default function FileUploadComponent({
  uploadEvent,
  showCheckbox,
  formDataEvent,
  accept,
  setPreviewUrl,
}: FileUploadPros) {
  const { getRootProps, getInputProps, previewUrls, removeEvent } =
    useFileUpload({
      uploadEvent,
      formDataEvent,
      accept,
    }) as any;
  const [currentUrl, setCurrentUrl] = React.useState<string>();

  React.useEffect(
    () => setPreviewUrl && setPreviewUrl(currentUrl),
    [currentUrl]
  );
  return (
    <section>
      <div
        style={{
          border: '1px dashed gray',
          padding: '50px',
          textAlign: 'center',
          height: 20,
          overflow: 'auto',
        }}
      >
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} max={7} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      <aside style={thumbsContainer}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {previewUrls.map((url, index) => (
            <div key={index} style={{ display: 'flex', margin: '12px' }}>
              <div style={thumb}>
                <div style={thumbInner}>
                  <img src={url} style={img} />
                </div>
              </div>
              {!showCheckbox ? (
                <div>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeEvent(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentUrl === url}
                    onChange={() => setCurrentUrl(url)}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
