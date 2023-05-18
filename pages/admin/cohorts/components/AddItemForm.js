import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";

export default function AddItemForm({
  saveItem,
  cancel,
  idx,
  sectionId,
  note,
  type,
}) {
  const [content, setContent] = useState("");
  const matches_md = useMediaQuery("(max-width: 1500px)");
  const matches_sx = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    setContent(note ? note : "");
  }, [note]);

  if (matches_sx) {
    return (
      <Box
        sx={{
          p: 2,
          display: "block",
          minHeight: "112px",
          width: "100%",
          marginBottom: "20px",
          boxShadow:
            "0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
          borderRadius: "8px",
        }}
      >
        <Typography> Note for students:</Typography>
        <TextField
          placeholder="Type your note for the students"
          label={type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
          fullWidth
          multiline
          autoFocus
          InputLabelProps={{ shrink: true }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          sx={{
            my: 4,
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <IconButton
            size="small"
            aria-label="save"
            sx={{
              "&:hover": {
                color: "green",
              },
            }}
            onClick={() => {
              if (!content.trim()) {
                cancel(!note ? null : false);
              } else {
                saveItem(idx, { type, content, section: sectionId });
              }
            }}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="discard"
            size="small"
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
            onClick={() => {
              cancel(!note ? null : false);
              setContent("");
            }} // close edit form
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "grid",
        minHeight: "112px",
        marginLeft: "112px",
        width: "calc(100%-120px)",
        marginBottom: "40px",
        boxShadow:
          "0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
        borderRadius: "8px",
        gridTemplateColumns: matches_md ? "1fr 2fr 72px" : "2fr 7fr 72px",
        alignItems: "center",
      }}
    >
      <Typography> Note for students:</Typography>
      <TextField
        placeholder="Type your note for the students"
        label={type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
        fullWidth
        multiline
        autoFocus
        InputLabelProps={{ shrink: true }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            saveItem(null, {});
          }
        }}
        sx={{
          pr: 2,
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          display: "inline-block",
          width: "72px",
        }}
      >
        <IconButton
          size="small"
          aria-label="save"
          sx={{
            "&:hover": {
              color: "green",
            },
          }}
          onClick={() => {
            if (!content.trim()) {
              cancel(!note ? null : false);
            } else {
              saveItem(idx, {
                type,
                content: content.trim(),
                section: sectionId,
              });
            }
          }}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="discard"
          size="small"
          sx={{
            "&:hover": {
              color: "red",
            },
          }}
          onClick={() => {
            cancel(!note ? null : false);
            setContent("");
          }} // close edit form
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}
