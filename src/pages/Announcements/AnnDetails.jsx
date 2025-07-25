import { useEffect, useState } from 'react';
import { Switch, Dialog, IconButton, TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Delete, Edit } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';

function AnnDetails({ handleClose, open, ann, getAnnouncements, getMainAnnouncm }) {
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [title, setTitle] = useState(ann?.title || '');
    const [content, setContent] = useState(ann?.content || '');

    useEffect(() => {
        if (ann?.isActive == 1) {
            setChecked(true);
        }else{
            
            setChecked(false);
        }
    }, [ann]);


    useEffect(() => {
        if (ann?.isMain == 1) {
            setChecked2(true);
        }else{
            
            setChecked2(false);
        }
    }, [ann]);
    useEffect(() => {
        setTitle(ann?.title)
    }, [ann]);

    useEffect(() => {
        setContent(ann?.content)
    }, [ann]);
    const handleChange = async (event) => {
        setChecked(event.target.checked);
        await requestWithAuth("post", "/admin/switch-duyuru/" + ann.id);
    };

    const handleChangeMainn = async (event) => {
        setChecked2(event.target.checked);
        await requestWithAuth("post", "/admin/set-main-duyuru/" + ann.id);
        await getAnnouncements()
        await getMainAnnouncm()
    };


    const handleDelete = async (id) => {
        await requestWithAuth("delete", "/admin/delete-duyuru/", id);
        getAnnouncements();
        getMainAnnouncm();
        handleClose();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);

            const formData = new FormData();
            formData.append("image", file);

            await requestWithAuthForm("post", "/admin/replace-duyuru-picture/" + ann.id, "", "", formData);
            getAnnouncements();
            handleClose();
        }
    };

    const handleUpdate = async () => {
        await requestWithAuth("post", "/admin/update-duyuru"  , "" , "" ,{
            duyuruID: ann.id,
            title,
            content,
        });
        getAnnouncements();
        getMainAnnouncm();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="p-5 d-flex flex-column justify-content-center align-items-center">
                {ann?.duyuruResimler?.length > 0 && (
                    <div
                        style={{
                            position: "relative",
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <img
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            src={`${import.meta.env.VITE_APP_URL}/duyuru/${ann.duyuruResimler[0].resim}`}
                            alt="Resim 1"
                        />
                        {hovered && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "white",
                                }}
                            >
                                <label htmlFor="file-input">
                                    <IconButton component="span">
                                        <Edit style={{ fontSize: "50px", color: "white" }} />
                                    </IconButton>
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        )}
                    </div>
                )}
                <TextField
                    className="mb-3 mt-5"
                    style={{width: "100%"}}
                    label="Başlık"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    className="mb-3"
                    label="İçerik"
                    fullWidth
                    multiline
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="d-flex flex-column align-items-center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    className="mb-3"
                >
                    Güncelle
                </Button>
                <div className="d-flex justify-content-between w-100 px-4">
                    <Delete
                        style={{ color: "crimson", fontSize: "35px", cursor: "pointer" }}
                        onClick={() => handleDelete(ann.id)}
                    />
                    <div>
                        <div>Aktif mi?</div>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </div>
                    <div>
                        <div>Önemli Duyuru mu?</div>
                        <Switch
                            checked={checked2}
                            onChange={handleChangeMainn}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default AnnDetails;
