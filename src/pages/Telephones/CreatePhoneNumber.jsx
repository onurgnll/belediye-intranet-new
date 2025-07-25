import { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';
import { errorToast, successToast } from '../../helpers/toast';

function CreatePhoneNumber({ handleClose, open, getPhones, mudurlukler, setPage }) {

    const [name, setName] = useState();
    const [telephone, setTelephone] = useState();

    const [errors, setErrors] = useState({});

    const [departman, setDepartman] = useState("");


    useEffect(() => {
        if(open){
            setName("")
            setTelephone("")
            setDepartman("")
        }
    }, [open]);

    const handleSubmit = async (event) => {
        event.preventDefault();



        const resp = await requestWithAuth("post", "/admin/create-phonenumber", "", "", { name, departman, telephone })

        if (resp.success == 1) {

            setPage(1)
            getPhones(1)
            handleClose()
            successToast("Dahili Telefon Oluşturuldu")
        }else{
            
            errorToast("Dahili Telefon Oluşturulurken Hata.")
        }

    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{ width: "35rem" }} className='p-5'>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="name"
                        label="İsim"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormControl className='mt-2' fullWidth>
                        <InputLabel id="demo-simple-select-label">Müdürlük</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="asd"
                            placeholder="Müdürlük Seçiniz"
                            onChange={(e) => setDepartman(e.target.value)}
                        >
                            {
                                mudurlukler?.map((mudurluk) => {
                                    return (<MenuItem value={mudurluk.id} key={mudurluk.id}>{mudurluk.birim}</MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="phonetelephone"
                        label="Telefon"
                        variant="outlined"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Oluştur
                    </Button>
                </form>
            </div>
        </Dialog>
    );
}

export default CreatePhoneNumber;
