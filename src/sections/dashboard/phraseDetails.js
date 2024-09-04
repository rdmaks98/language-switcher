import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import Iconify from "@/components/iconify/iconify";

const PhraseModal = ({ open, onClose, phrase }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          // border: "2px solid #000",
          boxShadow: 24,
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ alignSelf: "flex-end", color: "black" }}
        >
          {/* <CloseIcon /> */}
          <Iconify icon={"material-symbols:close"} />
        </IconButton>
        <Typography mb={5} variant="h6" fontWeight={700} component="h2">
          Phrase Details
        </Typography>
        {phrase && (
          <>
            {/* <Typography variant="body1">
              <strong>ID:</strong> {phrase.id}
            </Typography> */}
            <Typography variant="body1">
              <strong>Phrase:</strong> {phrase.phrase}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {phrase.status}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PhraseModal;
