"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import DashboardTable from "../dashboardTable";
import axios from "axios";
import PhraseModal from "../phraseDetails";

const Dashboardviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to 'desc'
  const [status, setStatus] = useState(""); // Default to 'all'
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  console.log(results);

  const handleOpen = (phrase) => {
    setSelectedPhrase(phrase);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPhrase(null);
  };

  const doGetAllData = async (url) => {
    let endpoint = url;

    // SortBy ane SortOrder ne check kari ne append karo
    if (sortBy) {
      endpoint += `sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }

    // Status ne check kari ne append karo
    if (status && status !== "all") {
      endpoint += `&status=${status}`;
    }

    // Search term ne append karo agar available hoy
    if (searchTerm.length > 0) {
      endpoint += `&query=${searchTerm}`;
    }

    try {
      const data = await axios.get(endpoint);
      setResults(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    doGetAllData(`${process.env.NEXT_PUBLIC_API}pharse`);
  }, []);

  useEffect(() => {
    doGetAllData(`${process.env.NEXT_PUBLIC_API}pharse/search?`);
  }, [searchTerm, sortBy, sortOrder, status]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: "20px",
          my: "20px",
        }}
      >
        {" "}
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search phrases"
        />
        <FormControl
          variant="outlined"
          style={{ marginTop: "16px", minWidth: 120 }}
        >
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="createdAt">Created At</MenuItem>
            <MenuItem value="updatedAt">Updated At</MenuItem>
            <MenuItem value="phrase">Phrase</MenuItem>
            {/* Add more options here if needed */}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ marginTop: "16px", minWidth: 120, marginLeft: "16px" }}
        >
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ marginTop: "16px", minWidth: 120, marginLeft: "16px" }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="deleted">Deleted</MenuItem>
            <MenuItem value="spam">Spam</MenuItem>
            {/* Add more status options here if needed */}
          </Select>
        </FormControl>
      </Box>
      <DashboardTable
        results={results}
        setResults={setResults}
        handleOpen={handleOpen}
      />
      <PhraseModal open={open} onClose={handleClose} phrase={selectedPhrase} />
    </div>
  );
};

export default Dashboardviews;
