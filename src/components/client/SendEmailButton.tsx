"use client";

import React from "react";
import { Button } from "../ui/button";

const SendEmailButton = () => {
  return (
    <>
      <Button
        onClick={async () => {
          const data = await fetch("/api/services/send-email", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              to: "mr.mohdmuneeb123@gmail.com",
              subject: "Testing",
              text: "yo bro?",
            }),
          });
        }}
      >
        Send
      </Button>
      <Button
        onClick={async () => {
          const data = await fetch("/api/services/send-sms", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              to: "917386398995",
              from: "917093724750",
              text: "Ayeee this email work?",
            }),
          });
        }}
      >
        Send SMS
      </Button>
    </>
  );
};

export default SendEmailButton;
