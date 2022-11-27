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
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth.js";

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

export default function CategoryTable() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.auth.user.categories);
  const user = useSelector((state) => state.auth.user);

  const remove = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    let res = await fetch(`${process.env.REACT_APP_URL}/categories/${id}`, {
      method: "Delete",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) alert("Some error occured!");
    else {
      dispatch(
        setUser({
          ...user,
          categories: categories.filter((cat) => cat._id != id),
        })
      );
    }
  };

  //   const getCategoryName = (categoryId) => {
  //     const category = categories.find((category) => category._id === categoryId);
  //     return category ? category.label : "NA";
  //   };

  return (
    <Container>
      <Typography
        variant="h5"
        paddingLeft={"15px"}
        paddingRight={"15px"}
        paddingTop={"15px"}
        paddingBottom={"5px"}
      >
        List of Categories
      </Typography>
      <TableContainer component={Paper} sx={{ margin: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell align="center">Icon</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {item.label}
                </StyledTableCell>
                <StyledTableCell align="center">{item.icon}</StyledTableCell>
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
    </Container>
  );
}
