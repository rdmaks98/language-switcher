import Iconify from "@/components/iconify/iconify";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const DashboardTable = ({ setResults, results, handleOpen }) => {
  const [selected, setSelected] = useState();

  const handleLanguageChange = async (id, language, index) => {
    try {
      // here Call API to fetch result with translator phrase
      const response = await axios.get(
        `http://localhost:2024/pharse/${id}/${language}`
      );

      // Update the specific row data with the new phrase from the response
      const updatedData = [...results];
      if (response.data.data.translations.es) {
        updatedData[index].phrase = response.data.data.translations.es;
      } else if (response.data.data.translations.fr) {
        updatedData[index].phrase = response.data.data.translations.fr;
      }

      // Update the data state with the new phrase
      setResults(updatedData);
    } catch (error) {
      console.log("Error fetching phrase:", error);
    }
  };

  return (
    <Table
      sx={{
        width: "100%",
        marginTop: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        marginLeft: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ fontWeight: "bold" }}>
            ID
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold" }}>
            Phrase
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold" }}>
            Status
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold" }}>
            Action Button
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold" }}>
            Language
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results?.map((phrase, index) => (
          <TableRow key={phrase._id}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{phrase.phrase}</TableCell>
            <TableCell
              align="center"
              sx={{
                color: phrase.status === "active" ? "green" : "red",
                fontWeight: "600",
              }}
            >
              {phrase.status.toUpperCase()}
            </TableCell>
            <TableCell align="center">
              <IconButton onClick={() => handleOpen(phrase)}>
                <Iconify icon={"ph:eye-thin"} sx={{ color: "black" }} />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <FormControl
                variant="outlined"
                style={{ marginTop: "16px", minWidth: 120, marginLeft: "16px" }}
              >
                <InputLabel>Language</InputLabel>
                <Select
                  value={selected}
                  onChange={(e) => {
                    handleLanguageChange(phrase._id, e.target.value, index),
                      setSelected(e.target.value);
                  }}
                  label="Language"
                >
                  <MenuItem value="es">ES</MenuItem>
                  <MenuItem value="fr">FR</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
