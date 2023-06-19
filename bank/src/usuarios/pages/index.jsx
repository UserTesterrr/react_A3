import Box from '@mui/material/Box';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalCallFlow from '../components/modalUser'
import { createRoot } from "react-dom/client";
import { Fab, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { callUseCases } from "../useCases/UsersUseCases";

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const Chamados = () => {

  const [liberador, setLiberador] = useState('normal');
  const [calls, setCall] = useState([]);
  const [changed, setChanged] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#85858524",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      //   backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleOpenModalCall = (evt, uuid, code) => {
    evt.preventDefault();
    const container = document.getElementById("modal-price");
    const root = createRoot(container);
    return root.render(
      <ModalCallFlow
        isOpen={true}
        callUuid={uuid}
        callCode={code}
        parentCallback={handleChangeEdit}
        userCre={liberador}
      />
    );
  };

  const handleChangeEdit = () => {
    setChanged(!changed);
  };

  const handleClick = (evt, uuid, numberCall, situation) => {
    if (liberador === "normal") {
        handleOpenModalCall(evt, uuid, numberCall);
    } else {
      callUseCases.approveCall(numberCall, situation)
    }

    if (liberador != "normal") {
      window.location.href = '/chamados';
      setLiberador("aprovador")
    }
  }

  useEffect(() => {
    const getCallCodes = async () => {
        const callCodes = await callUseCases.getUsers();
        return callCodes;
    };
    getCallCodes().then((response) => {
      setCall(response.data)
    });
  }, []);

  return (
    <>
      <section className="home-section">
        <div className="home-content" style={{ justifyContent: "space-between", backgroundColor: "rgb(42 70 42 / 35%)", paddingBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}>
            <Box sx={{ display: 'grid', height: '9vh' }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: "22pt", fontWeight: "600", paddingTop: "15px", color: "white" }}>Listagem de usuários</Typography>
              <Box sx={{ width: '2.5rem', height: '5px', marginTop: '-0.5rem', borderRadius: '5px', background: 'linear-gradient(90deg, #2a462a 0%, #2a462a 35%, #32a532 100%)' }}></Box>
            </Box>
          </div>
        </div>

        <TableContainer component={Paper} sx={{ padding: "20px", boxShadow: "none", borderRadius: "75px", marginBottom: "50px", backgroundColor: "#fff0 !important"}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell align="left">Endereço</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Telefone</StyledTableCell>
                <StyledTableCell align="left">LinkedIn</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calls.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.nome}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.endereco}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.telefone}</StyledTableCell>
                  <StyledTableCell align="left">{row.linkedin}</StyledTableCell>
                  
                  <StyledTableCell align="center">
                  <IconButton id="situationButton" onClick={(evt) => handleClick(evt, row.id, row.id)}>{liberador === "normal" ? <EditIcon /> : <CheckCircleOutlineIcon/>}</IconButton>{liberador != "normal" ? <IconButton><CancelIcon/></IconButton> : ""}<IconButton  onClick={() => ( 
                  callUseCases.deleteUser(row.id), 
                  window.location.href = `/chamados`
                  )}><DeleteIcon /></IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <input type="hidden" id="modal-price" />
        <input type="hidden" id="modal-reprove" />
      </section>

      <Fab sx={{
        position: 'fixed',
        bottom: 18,
        right: 18,
        fontWeight: 'bold',
        backgroundColor: '#2a462a'
      }}
        variant="extended"
        size="large"
        color="primary"
        onClick={localStorage.getItem("flow") !== "" ? (evt) => handleOpenModalCall(evt, "", -1) : (evt) => handleOpenModalCall(evt)}
      >
        Criar usuário
      </Fab>
    </>
  )
}

export default Chamados;
