import { useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Delete, Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';

function AnnDetails({ handleClose, open, ann , getAnnouncements, getMainAnnouncm}) {

    const handleDelete = async (id) => {
        await requestWithAuth("delete", "/admin/delete-duyuru/", id)
        getAnnouncements()
        getMainAnnouncm()
        handleClose()
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='p-5 d-flex flex-column justify-content-center align-items-center'>
                {ann?.duyuruResimler?.length > 0 &&


                    <img style={{ width: "200px", height: "200px" }} src={`${import.meta.env.VITE_APP_URL}/duyuru/` + ann?.duyuruResimler[0].resim} alt="Resim 1" />
                }


                <span className="fw-bold fs-4 text-center">{ann?.title}</span>
                <span className="">{ann?.content}</span>
            </div>
            <Delete className='mb-3' style={{color: "crimson" , fontSize: "35px", cursor: "pointer"}} onClick={() => handleDelete(ann.id)}></Delete>

        </Dialog>
    );
}

export default AnnDetails;
