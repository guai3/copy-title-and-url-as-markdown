import React, { useState, useEffect } from "react";
import { Form, Textarea, Button, Toast } from "react-lightning-design-system";

export const Options: React.FC = () => {
  const [options, setOptions] = useState<{ format: string }>({
    format: ""
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(
      {
        format: "- [ ] [${title}](${url})"
      },
      (savedOptions: { format: string }) => {
        setOptions(savedOptions);
      }
    );
  }, []);

  const handleChange = e => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const onSave = e => {
    chrome.storage.local.set(options, () => {
      setShowToast(true);
    });
  };

  return (
    <div className="optionsContainer">
      {showToast ? (
        <Toast
          className="toast"
          level="success"
          icon="success"
          onClose={() => setShowToast(false)}
        >
          Successfully Saved.
        </Toast>
      ) : null}
      <div className="slds-text-heading_medium">Options</div>
      <Form className="form">
        <Textarea
          name="format"
          label="Format"
          onChange={handleChange}
          value={options.format}
        />
        <Button className="slds-m-top_medium" type="brand" onClick={onSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};
