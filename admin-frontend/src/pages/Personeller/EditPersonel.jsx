import { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Dialog, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Done } from '@mui/icons-material';
import { requestWithAuth, requestWithAuthForm } from '../../helpers/requests';

function EditPersonel({ handleClose, open, personel }) {

    const ogrenimler = ["İlkokul", "Ortaokul", "Lise", "Önlisans", "Lisans", "Yüksek Lisans", "Doktora", "Okur Yazar", "Cahil", "İlk Öğretim"];

    const [mudurlukler, setMudurlukler] = useState([]);
    const [formData, setFormData] = useState({
        ID: personel?.ID || '',
        KartNo: personel?.KartNo || '',
        Adi: personel?.Adi || '',
        Soyadi: personel?.Soyadi || '',
        TCKimlikNo: personel?.TCKimlikNo || '',
        TelefonNo: personel?.TelefonNo || '',
        EMailAdresi: personel?.EMailAdresi || '',
        Adresi: personel?.Adresi || '',
        DogumTarihiGun: personel?.DogumTarihi ? personel.DogumTarihi.slice(8, 10) : '',
        DogumTarihiAy: personel?.DogumTarihi ? personel.DogumTarihi.slice(5, 7) : '',
        DogumTarihiYil: personel?.DogumTarihi ? personel.DogumTarihi.slice(0, 4) : '',
        OgrenimDurumu: personel?.OgrenimDurumu || '',
        Bolum: personel?.Bolum || '',
        Unvani: personel?.Unvani || '',
    });

    const [selectedImage, setSelectedImage] = useState(`${import.meta.env.VITE_APP_URL}/kullanici/${personel?.Resim}`);
    
    const [selectedImage2, setSelectedImage2] = useState();
    useEffect(() => {
        setFormData({
            ID: personel?.ID || '',
            KartNo: personel?.KartNo || '',
            Adi: personel?.Adi || '',
            Soyadi: personel?.Soyadi || '',
            TCKimlikNo: personel?.TCKimlikNo || '',
            TelefonNo: personel?.TelefonNo || '',
            EMailAdresi: personel?.EMailAdresi || '',
            Adresi: personel?.Adresi || '',
            DogumTarihiGun: personel?.DogumTarihi ? personel.DogumTarihi.slice(8, 10) : '',
            DogumTarihiAy: personel?.DogumTarihi ? personel.DogumTarihi.slice(5, 7) : '',
            DogumTarihiYil: personel?.DogumTarihi ? personel.DogumTarihi.slice(0, 4) : '',
            OgrenimDurumu: personel?.OgrenimDurumu || '',
            Bolum: personel?.Bolum || '',
            Unvani: personel?.Unvani || '',
        });
        setSelectedImage(`${import.meta.env.VITE_APP_URL}/kullanici/${personel?.Resim}`);
    }, [personel]);

    const getMudurlukler = async () => {
        const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
        setMudurlukler(resp.data.mudurlukler);
    }

    useEffect(() => {
        getMudurlukler();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage2(file)
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
        // Handle form submission
        const form = new FormData();
        Object.keys(formData).forEach(key => form.append(key, formData[key]));


        if (selectedImage2) {
            form.append("image", selectedImage2);
        }

        await requestWithAuthForm("put", "/admin/update-personel/",formData.ID,"" ,  form);
        // handleClose();
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
                    style={{ borderRadius: "150px", height: "240px", width: "200px", cursor: 'pointer' }}
                    src={selectedImage}
                    alt=""
                    onClick={handleImageClick}
                />
                <div className='d-flex flex-column align-items-center mt-3'>
                    <h3>Kart Bilgileri</h3>
                    <TextField
                        fullWidth
                        label="Kart No"
                        name="KartNo"
                        value={formData.KartNo}
                        onChange={handleChange}
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
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="Soyisim"
                        name="Soyadi"
                        value={formData.Soyadi}
                        onChange={handleChange}
                    />
                    <TextField
                        className='my-2'
                        fullWidth
                        label="TC"
                        name="TCKimlikNo"
                        value={formData.TCKimlikNo}
                        onChange={handleChange}
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
                        />
                        <TextField
                            fullWidth
                            label="Ay"
                            name="DogumTarihiAy"
                            value={formData.DogumTarihiAy}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Yıl"
                            name="DogumTarihiYil"
                            value={formData.DogumTarihiYil}
                            onChange={handleChange}
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

export default EditPersonel;
