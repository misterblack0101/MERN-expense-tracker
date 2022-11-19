import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TransactionTable({
  transactionsList,
  getAllTransactions,
}) {
  const remove = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    let res = await fetch(`http://localhost:4000/transaction/${id}`, {
      method: "Delete",
    });

    if (!res.ok) alert("Some error occured!");
    getAllTransactions();
  };
  return (
    <>
      <Typography
        variant="h5"
        paddingLeft={"15px"}
        paddingRight={"15px"}
        paddingTop={"15px"}
        paddingBottom={"5px"}
      >
        List of Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ margin: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsList.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="center">{item.amount}</StyledTableCell>
                <StyledTableCell align="center">{item.date}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="primary">
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton color="warning" onClick={() => remove(item._id)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
