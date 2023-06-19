import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { callUseCases } from "../useCases/UsersUseCases";
import Swal from 'sweetalert2'
import _ from 'lodash';
import ReactInputMask from "react-input-mask";

const steps = ['Informações'];

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export default function ModalPriceDetail({ callCode, isOpen, parentCallback }) {

    const [open, setOpen] = useState(isOpen);
    const [scroll] = useState('body');
    const [activeStep, setActiveStep] = useState(0);
    const [atualiza, setAtualiza] = useState(0)
    const [contact, setContact] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeContact = (event) => {
        setContact(event.target.value);
        localStorage.setItem("contact", event.target.value)
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
        localStorage.setItem("name", event.target.value)
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
        localStorage.setItem("address", event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        localStorage.setItem("email", event.target.value)
    }

    const handleChangeLinkedin = (event) => {
        setLinkedin(event.target.value);
        localStorage.setItem("linkedin", event.target.value)
    }

    const handleCall = async (nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate) => {
        let response;
        if (atualiza == 0) {
            response = await callUseCases.postCreateUser(nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate);
        } else {
            response = await callUseCases.putEditUser(callCode, nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate);
        }

        if (!response.status) {
            return Swal.fire({
                icon: "error",
                confirmButtonText: "OK",
                text: "Connection error",
            });
        } else {
            parentCallback(true);
            handleClose();
            Toast.fire({
                icon: "success",
                text: "Operação bem sucedida!",
            });

            setTimeout(() => {
                window.location.href = '/chamados';
            }, 3300);
        }
    }

    useEffect(() => {
        if (callCode > 0) {
            const getFlowCalls = async () => {
                const flowCall = await callUseCases.getUsersById(callCode);
                return flowCall;
            };
            getFlowCalls().then((response) => {
                setAtualiza(1);
                setContact(response.data[0].telefone);
                setName(response.data[0].nome);
                setAddress(response.data[0].endereco);
                setEmail(response.data[0].email);
                setLinkedin(response.data[0].linkedin);
            });
        }
    }, []);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                fullWidth
            >
                <DialogTitle>
                    <Box>
                        <Stepper sx={{ marginTop: '1rem' }} activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                    <Box sx={{ marginTop: '1.5rem', borderBottom: 1, borderColor: 'divider' }}>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ height: '63vh' }}>
                    {activeStep === steps.length ? (
                        <Box>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && (
                                <Box
                                    sx={{ display: "grid", gap: '25px', gridTemplateColumns: '1fr 1fr', marginTop: '2rem' }}
                                >
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField inputProps={{ maxLength: 60 }} id="outlined-basic" label="Nome" variant="outlined" value={name} onChange={handleChangeName}/> </FormControl>

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField inputProps={{ maxLength: 60 }} id="outlined-basic" label="Endereço" variant="outlined" value={address} onChange={handleChangeAddress}/> </FormControl>

                                    <ReactInputMask
                                        mask="+ (999) 9 99999-9999"
                                        maskChar=""
                                        onChange={handleChangeContact}
                                        value={contact}
                                    >
                                        {() => (
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField id="outlined-basic" label="Contato" variant="outlined" /> </FormControl>
                                        )}
                                    </ReactInputMask>

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField inputProps={{ maxLength: 60 }} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleChangeEmail}/> </FormControl>
                                    
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField inputProps={{ maxLength: 60 }} id="outlined-basic" label="LinkedIn" variant="outlined" value={linkedin} onChange={handleChangeLinkedin}/> </FormControl>
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 ? (
                            <Button
                                color="inherit"
                                onClick={handleClose}
                            >
                                Fechar
                            </Button>) :
                            (
                                <Button
                                    color="inherit"
                                    onClick={handleBack}
                                >
                                    Voltar
                                </Button>
                            )}

                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={() => handleCall(name, address, email, contact, linkedin)}>Enviar</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )

}