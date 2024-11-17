import { useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';

function CreateAnnouncement({ handleClose, open, setData , fetchData , getMainAnn }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false); // Switch durumu

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            setFile(null);
            setFileName('');
        }
    };

    const handleSwitchChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors({}); // Önceki hataları temizle

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        isChecked ? formData.append('isMain', "true") : formData.append('isMain', "false");
        if (file) {
            formData.append('image', file); // Tek bir dosya yükleme
        }

        // Diğer formData işlemleri

        await requestWithAuthForm("post" , "/admin/create-duyuru" , "" , "" ,formData)
        handleClose()
        fetchData()
        getMainAnn()

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
                        id="title"
                        label="Başlık"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="content"
                        label="İçerik"
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        error={!!errors.content}
                        helperText={errors.content}
                    />

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={fileName ? <Done /> : <CloudUploadIcon />}
                        style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
                    >
                        {fileName || 'Resim Yükle'}
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {errors.file && <div style={{ color: 'red', marginTop: '0.5rem' }}>{errors.file}</div>}

                    <FormControlLabel
                        control={<Switch checked={isChecked} onChange={handleSwitchChange} />}
                        label="Önemli Duyurumu?"
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

export default CreateAnnouncement;
