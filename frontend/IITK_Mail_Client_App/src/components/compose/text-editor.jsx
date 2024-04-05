import React, { useCallback, useMemo, useRef, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogContent, Input, Typography, Button, Snackbar } from "@mui/material";
import styles from "./styles.module.css";
import JSONFile from "../../../Mails.json"
import { v4 as uuidv4 } from 'uuid';
const Editor = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [value, setValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isValidTo, setIsValidTo] = useState(true);
  const [isValidFrom, setIsValidFrom] = useState(true);
  const [isValidSubject, setIsValidSubject] = useState(true);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const quill = useRef();

  const handler = useCallback(async () => {
    if (!from || !to || !subject || !value) {
      // Display alert box if any of the required fields are empty
      alert("Please fill in all required fields");
      return;
    }
  
    try {
      const timestamp = new Date().toISOString(); // Get current date and time in ISO format
      const id = Math.floor(1000 + Math.random() * 9000);
  
      const emailData = {
        id: id, // Add unique ID to emailData
        sender: from,
        recipient: to,
        subject: subject,
        body: value,
        time: timestamp // Add timestamp to emailData
      };
  
      // Send a POST request to your backend API to update the JSON data
      const response = await fetch("http://localhost:3000/update-json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
  
      // Data updated successfully, display success message
      setOpenDialog(true);
      setSuccessSnackbarOpen(true); // Display success snackbar
  
      // Reset all editor entries
      setFrom("");
      setTo("");
      setSubject("");
      setValue("");
      setIsValidTo(true);
      setIsValidFrom(true);
      setIsValidSubject(true);
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error, display error message
    }
  }, [from, to, subject, value]);
  

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleToChange = (e) => {
    const email = e.target.value;
    setTo(email);
    setIsValidTo(validateEmail(email));
  };

  const handleFromChange = (e) => {
    const email = e.target.value;
    setFrom(email);
    setIsValidFrom(validateEmail(email));
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSubject(subject);
    setIsValidSubject(!!subject.trim()); // Check for non-empty subject
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <Typography variant="caption" className={styles.label} sx={{ fontSize: '16px' }}>From:</Typography>
        <Input 
          className={`${styles.customInput} ${!isValidFrom ? styles.error : ''}`}
          placeholder="Enter your email" 
          value={from} 
          onChange={handleFromChange}
          error={!isValidFrom}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Typography variant="caption" className={styles.label} sx={{ fontSize: '16px' }}>To:</Typography>
        <Input
          className={`${styles.customInput} ${!isValidTo ? styles.error : ''}`} 
          placeholder="Enter recipient's email" 
          value={to} 
          onChange={handleToChange}
          error={!isValidTo}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Typography variant="caption" className={styles.label} sx={{ fontSize: '16px' }}>Subject:</Typography>
        <Input 
          className={`${styles.customInput} ${!isValidSubject ? styles.error : ''}`}
          placeholder="Enter email subject" 
          value={subject} 
          onChange={handleSubjectChange}
          error={!isValidSubject}
        />
      </div>
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className={styles.editor}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
        // style={{ fontSize: '16px' }} 
      />
      
      <Button onClick={handler} className={styles.btn} variant="contained">
        Submit
      </Button>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
        message="Email sent successfully"
        action={
          <Button color="inherit" size="small" onClick={handleCloseSuccessSnackbar}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default Editor;
