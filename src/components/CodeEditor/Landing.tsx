// Landing.tsx

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios, { AxiosResponse } from "axios";
import { languageOptions } from "./constants/languageOptions";
import { defineTheme } from "./lib/defineTheme";
import useKeyPress from "./hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
// Import the Snackbar and Alert components from MUI
import { Snackbar, Alert, Box, Stack, Button } from "@mui/material";
import { OutputDetailsProps } from "./interface/OutputDetailsProps";
import OutputDetails from "./OutputDetails";

const codeDefault = `// some comment`;

const Landing: React.FC = () => {
  const [code, setCode] = useState(codeDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState<OutputDetailsProps>(null);

  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [language, setLanguage] = useState<any | null>(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  // Define the form data type
  type FormData = {
    language_id: string;
    source_code: string;
    stdin: string;
  };

  // Define the response data type
  type ResponseData = {
    token: string;
  };

  // Define a function to encode data in base64
  const encodeBase64 = (data: string) => {
    return btoa(data);
  };

  // Define a function to handle the compile request
  const handleCompile = () => {
    setProcessing(true);

    // Create the form data object
    const formData: FormData = {
      language_id: language?.id,
      // encode source code in base64
      source_code: encodeBase64(code),
      stdin: encodeBase64(customInput),
    };

    // Create the options object
    const options: any = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    // Send the request and handle the response
    axios
      .request<ResponseData>(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  // Define a function to check the status of the request
  const checkStatus = async (token: string) => {
    var timeoutId: number;
    // Create the options object
    const options: any = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      // Send the request and get the response
      let response: AxiosResponse = await axios.request(options);
      let statusId: number = response.data.status_id;
      console.log("statusId", statusId);
      // Processed - we have a result
      if (statusId === 3) {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessSnackbar(`Compiled Successfully!`);
        console.log("response.data", response.data);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        return;
      } else if (statusId === 1 || statusId === 2) {
        // Still processing or error
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      }else{
        setProcessing(false);
        setOutputDetails(response.data);
        showErrorSnackbar(`Something went wrong! Please try again.`);
        console.log("response.data", response.data);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorSnackbar();
    }
  };

  // Define the theme type
  type Theme = {
    value: string;
    label: string;
  };

  function handleThemeChange(th: Theme) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  // Define a state for the snackbar open status
  const [open, setOpen] = React.useState(false);

  // Define a state for the snackbar message
  const [message, setMessage] = React.useState("");

  // Define a state for the snackbar severity
  const [severity, setSeverity] = React.useState<"success" | "error">(
    "success"
  );

  // Define a state for the snackbar position
  const [position, setPosition] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  // Define a function to show a success snackbar
  const showSuccessSnackbar = (msg?: string) => {
    setMessage(msg || `Compiled Successfully!`);
    setSeverity("success");
    setOpen(true);
    setPosition({ vertical: "top", horizontal: "center" });
  };

  // Define a function to show an error snackbar
  const showErrorSnackbar = (msg?: string) => {
    setMessage(msg || `Something went wrong! Please try again.`);
    setSeverity("error");
    setOpen(true);
    setPosition({ vertical: "top", horizontal: "center" });
  };

  // Define a function to handle the snackbar close event
  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Render the snackbar component with the alert component inside
  <Snackbar
    open={open}
    autoHideDuration={5000}
    onClose={handleClose}
    key={position.vertical + position.horizontal}
  >
    <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>;

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key={position.vertical + position.horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Box sx={{ height: "4", width: "100%", bgcolor: "gradient.secondary" }} />
      <Stack
        direction="row"
        spacing={4}
        px={4}
        py={4}
        left={0}
        right={0}
        sx={{
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <LanguagesDropdown onSelectChange={onSelectChange} />
        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        px={4}
        py={4}
        alignItems="start"
        sx={{
          "@media (max-width: 900px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme?.value}
          />
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            width: "30%",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 900px)": {
              width: "100%",
              mt: 4,
            },
          }}
        >
          <OutputWindow {...outputDetails} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <Button
              onClick={handleCompile}
              disabled={!code}
              sx={{
                mt: 4,
                border: 2,
                borderColor: "black",
                zIndex: 10,
                borderRadius: "md",
                boxShadow: "5px 5px 0px 0px rgba(0,0,0)",
                px: 4,
                py: 2,
                "&.hover": {
                  boxShadow: "none",
                },
                transition: "duration-200",
                bgcolor: "white",
                flexShrink: 0,
                opacity: !code ? 0.5 : 1,
              }}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </Button>
          </Box>
          {outputDetails && <OutputDetails {...outputDetails} />}
        </Box>
      </Stack>
    </>
  );
};
export default Landing;
