import Iconify from "@/components/iconify/iconify";
import { Icon } from "@iconify/react";
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
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardTable = ({ setResults, results, handleOpen }) => {
  const [selected, setSelected] = useState();

  const handleLanguageChange = async (id, language, index) => {
    try {
      // API call to fetch updated phrase
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Phrase</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action Button</TableCell>
          <TableCell>Language</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results?.map((phrase, index) => (
          <TableRow key={phrase._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{phrase.phrase}</TableCell>
            <TableCell
              sx={{
                color: phrase.status === "active" ? "green" : "red",
                fontWeight: "600",
              }}
            >
              {phrase.status.toUpperCase()}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleOpen(phrase)}>
                <Iconify icon={"ph:eye-thin"} sx={{ color: "black" }} />
              </IconButton>
            </TableCell>
            <TableCell>
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
