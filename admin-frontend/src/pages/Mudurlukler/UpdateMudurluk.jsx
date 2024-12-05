import { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';
import { errorToast, successToast } from '../../helpers/toast';

function UpdateMudurluk({ handleClose, open, getMudurlukler, mudurluk }) {

    const [name, setName] = useState();
    const [mudur, setMudur] = useState();

    const [errors, setErrors] = useState({});


    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (open) {
            setName(mudurluk?.birim)
            setMudur({label: (mudurluk?.mudurr.name + " " + mudurluk?.mudurr.surname), value: mudurluk.mudurr.id})
            setOptions([{ label: (mudurluk?.mudurr.name +" "+ mudurluk?.mudurr.surname), value: mudurluk?.mudurr.id }])
        }
    }, [open]);

    const handleSubmit = async (event) => {
        event.preventDefault();



        const resp = await requestWithAuth("put", "/admin/update-mudurluk/", mudurluk.id, "", { birim: name, mudur: mudur.value })

        if (resp.success == 1) {
            getMudurlukler()
            handleClose()
            successToast("IP Güncellendi")
        } else {

            errorToast("IP Güncellenirken Hata.")
        }

    };


    const getClients = async (arg) => {
        const resp = await requestWithAuth("post", "/admin/get-clients", "", "", { name: arg || "" })

        setOptions([])
        for (const element of resp.data.clients.result) {
            setOptions(prevOptions => [...prevOptions, { label: (element.name +" "+ element.surname), value: element.id }]);
        }
    }
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


                    <Autocomplete
                        className='mt-3'
                        options={options}
                        getOptionLabel={(option) => option.label}
                        value={mudur}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Müdür"
                                variant="outlined"
                            />
                        )}
                        onInputChange={(e, value) => {
                            getClients(value)
                        }}
                        onChange={(event, newValue) => {
                            setMudur(newValue)
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Düzenle
                    </Button>
                </form>
            </div>
        </Dialog>
    );
}

export default UpdateMudurluk;
