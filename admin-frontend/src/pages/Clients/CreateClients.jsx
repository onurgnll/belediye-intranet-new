import { useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';
import { errorToast, successToast } from '../../helpers/toast';

function CreateClients({ handleClose, open, getClients,setPage }) {

    const [name, setName] = useState();
    const [ip, setIP] = useState();
    const [mac, setMac] = useState();
    
    const [errors, setErrors] = useState({});



    const handleSubmit = async (event) => {
        event.preventDefault();



        const resp = await requestWithAuth("post" , "/admin/create-client" , "" , "" ,{name , ip , mac})

        if(resp.success ==1){
            handleClose()
            successToast("IP Oluşturuldu.")
            setPage(1)
            getClients(1)
        }else{
            errorToast(resp.message)
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
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="ip"
                        label="IP"
                        variant="outlined"
                        value={ip}
                        onChange={(e) => setIP(e.target.value)}
                    />
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="mac"
                        label="MAC"
                        variant="outlined"
                        value={mac}
                        onChange={(e) => setMac(e.target.value)}
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

export default CreateClients;
