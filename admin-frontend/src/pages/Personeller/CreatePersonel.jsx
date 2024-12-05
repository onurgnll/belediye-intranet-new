import { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';
import defaultphoto from "../../assets/avradfaez.png"
import { errorToast, successToast } from '../../helpers/toast';

function CreatePersonel({ getPersonels, page,handleClose, open }) {

    const ogrenimler = ["İlkokul", "Ortaokul", "Lise", "Önlisans", "Lisans", "Yüksek Lisans", "Doktora", "Okur Yazar", "Cahil", "İlk Öğretim"];

    const [mudurlukler, setMudurlukler] = useState([]);
    const [formData, setFormData] = useState({
        KartNo: '',
        Adi: '',
        Soyadi: '',
        TCKimlikNo: '',
        TelefonNo: '',
        EMailAdresi: '',
        Adresi: '',
        DogumTarihiGun: '',
        DogumTarihiAy: '',
        DogumTarihiYil: '',
        OgrenimDurumu: '',
        Bolum: '',
        Unvani: '',
    });

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        getMudurlukler();
    }, []);

    const getMudurlukler = async () => {
        const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
        setMudurlukler(resp.data.mudurlukler);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [selectedImage2, setSelectedImage2] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage2(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        document.getElementById('imageUpload').click();
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        const form = new FormData();
        Object.keys(formData).forEach(key => {if(formData[key] != "") form.append(key, formData[key])});
        if (selectedImage2) {
            form.append("image", selectedImage2);
        }

        const res = await requestWithAuthForm("post", "/admin/create-personel","","" ,  form);
        handleClose();
        getPersonels(page)
        if (res.success > 0)
            successToast("Personel Başarıyla Oluşturuldu")
        else
            errorToast("Personel Oluşturulurken Hata")
    }
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        if (!formData.Adi) formErrors.Adi = "İsim zorunludur.";
        if (!formData.Soyadi) formErrors.Soyadi = "Soyisim zorunludur.";
        if (!formData.TCKimlikNo) formErrors.TCKimlikNo = "TC Kimlik No zorunludur.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }
    return (
        <Dialog
            open={open}
            maxWidth={"sm"}
            fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='p-5 d-flex flex-column align-items-center'>
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <img
                    style={{ borderRadius: "100px", height: "200px", width: "200px", cursor: 'pointer' }}
                    src={selectedImage || defaultphoto}
                    alt=""
                    onClick={handleImageClick}
                />
                {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
                <div className='d-flex flex-column align-items-center mt-3'>
                    <h3>Kart Bilgileri</h3>
                    <TextField
                        fullWidth
                        label="Kart No"
                        name="KartNo"
                        value={formData.KartNo}
                        onChange={handleChange}
                        error={!!errors.KartNo}
                        helperText={errors.KartNo}
                    />
                </div>
                <div className='d-flex flex-column align-items-center mt-3'>
                    <h3>Kimlik Bilgileri</h3>
                    <TextField
                        className='my-2'
                        fullWidth
                        label="İsim"
                        name="Adi"
                        value={formData.Adi}
                        onChange={handleChange}
                        error={!!errors.Adi}
                        helperText={errors.Adi}
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="Soyisim"
                        name="Soyadi"
                        value={formData.Soyadi}
                        onChange={handleChange}
                        error={!!errors.Soyadi}
                        helperText={errors.Soyadi}
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="TC"
                        name="TCKimlikNo"
                        value={formData.TCKimlikNo}
                        onChange={handleChange}
                        error={!!errors.TCKimlikNo}
                        helperText={errors.TCKimlikNo}
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="Cep Telefonu"
                        name="TelefonNo"
                        value={formData.TelefonNo}
                        onChange={handleChange}
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="Email"
                        name="EMailAdresi"
                        value={formData.EMailAdresi}
                        onChange={handleChange}
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="Adres"
                        name="Adresi"
                        value={formData.Adresi}
                        onChange={handleChange}
                    />
                    <h6 className='my-2'>Doğum Tarihi</h6>
                    <div className='d-flex'>
                        <TextField
                            fullWidth
                            label="Gün"
                            name="DogumTarihiGun"
                            value={formData.DogumTarihiGun}
                            onChange={handleChange}
                            error={!!errors.DogumTarihi}
                        />
                        <TextField
                            fullWidth
                            label="Ay"
                            name="DogumTarihiAy"
                            value={formData.DogumTarihiAy}
                            onChange={handleChange}
                            error={!!errors.DogumTarihi}
                        />
                        <TextField
                            fullWidth
                            label="Yıl"
                            name="DogumTarihiYil"
                            value={formData.DogumTarihiYil}
                            onChange={handleChange}
                            error={!!errors.DogumTarihi}
                            helperText={errors.DogumTarihi}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center mt-3 w-100'>
                    <h3>Eğitim Bilgileri</h3>
                    <FormControl className='mt-2' fullWidth>
                        <InputLabel id="ogrenim-durumu-label">Öğrenim Durumu</InputLabel>
                        <Select
                            name="OgrenimDurumu"
                            value={formData.OgrenimDurumu}
                            labelId="ogrenim-durumu-label"
                            onChange={handleChange}
                        >
                            {ogrenimler.map((ogrenim, index) => (
                                <MenuItem value={index + 1} key={index}>{ogrenim}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='d-flex flex-column align-items-center mt-3 w-100'>
                    <h3>Kurum Bilgileri</h3>
                    <FormControl className='mt-2' fullWidth>
                        <InputLabel id="mudurluk-label">Müdürlük</InputLabel>
                        <Select
                            name="Bolum"
                            value={formData.Bolum}
                            labelId="mudurluk-label"
                            onChange={handleChange}
                        >
                            {mudurlukler?.map((mudurluk) => (
                                <MenuItem value={mudurluk.id} key={mudurluk.id}>{mudurluk.birim}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        className='my-2'
                        fullWidth
                        label="Ünvan"
                        name="Unvani"
                        value={formData.Unvani}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '1rem' }}
                >
                    Oluştur
                </Button>
            </div>
        </Dialog>
    );
}

export default CreatePersonel;
