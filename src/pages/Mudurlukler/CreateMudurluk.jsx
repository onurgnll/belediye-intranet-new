import { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';
import { errorToast, successToast } from '../../helpers/toast';

function CreateMudurluk({ handleClose, open, getMudurlukler }) {

    const [name, setName] = useState();
    const [mudur, setMudur] = useState();

    const [errors, setErrors] = useState({});


    useEffect(() => {
        if(open){
            setMudur("")
            setName("")
        }
    }, [open]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        

        const resp = await requestWithAuth("post", "/admin/create-mudurluk", "", "", { birim:name, mudur })

        if (resp.success == 1) {
            handleClose()
            successToast("Müdürlük Oluşturuldu.")
            getMudurlukler()
        } else {
            errorToast("Müdürlük Oluştururken hata.")
        }

    };


    const [options, setOptions] = useState([]);


    useEffect(() => {
        getClients()
    }, []);


    const getClients = async (arg) => {
        const resp = await requestWithAuth("post", "/admin/get-personels", "", "", { name: arg || "" })

        setOptions([])
        for (const element of resp.data.personels.result) {
            setOptions(prevOptions => [...prevOptions, { label: (element.Adi +" "+ element.Soyadi), value: element.ID }]);
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
                            setMudur(newValue?.value)
                        }}
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

export default CreateMudurluk;
