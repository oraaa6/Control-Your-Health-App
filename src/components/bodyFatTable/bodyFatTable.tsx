
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./bodyFatTable.scss";

function createData(name: string, woman: string, men: string) {
  return { name, woman, men };
}

const rows = [
  createData("Necessary bodyfat", "10-12%", "2-4%"),
  createData("Athletic", "14-20%", "6-13%"),
  createData("Fitness", "21-24%", "14-17%"),
  createData("Acceptable", "25-31%", "18-25%"),
  createData("Obesity", "32%", "25%"),
];

const BodyFatTable = () => {
  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Classification</TableCell>
              <TableCell align="right">Woman</TableCell>
              <TableCell align="right">Men</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.woman}</TableCell>
                <TableCell align="right">{row.men}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BodyFatTable;
