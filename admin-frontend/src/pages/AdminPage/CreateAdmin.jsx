import { useState } from 'react';
import { Dialog, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { requestWithAuth } from '../../helpers/requests';
import { errorToast, successToast } from '../../helpers/toast';

function CreateAdmin({ handleClose, open , getAdmin}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState({
        allowDuyuru: false,
        allowPhones: false,
        allowIPS: false,
        allowPersonel: false,
        allowAnket: false,
        allowMudurlukler: false,
        allowAdmins: false,
    });

    const handlePermissionChange = (field, value) => {
        setPermissions({
            ...permissions,
            [field]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.length < 10) {
            errorToast('Şifre en az 10 karakter uzunluğunda olmalıdır.');
            return;
        }
        const payload = {
            username: name,
            password,
            allowDuyuru: permissions.allowDuyuru ? 1 : 0,
            allowPhones: permissions.allowPhones ? 1 : 0,
            allowIPS: permissions.allowIPS ? 1 : 0,
            allowPersonel: permissions.allowPersonel ? 1 : 0,
            allowAnket: permissions.allowAnket ? 1 : 0,
            allowMudurlukler: permissions.allowMudurlukler ? 1 : 0,
            allowAdmins: permissions.allowAdmins ? 1 : 0,
        };

        const resp = await requestWithAuth("post", "/admin/create-admin", "", "", payload);

        if (resp.success === 1) {
            handleClose();
            successToast("Admin başarıyla oluşturuldu.");
            getAdmin()

            setName("")
            setPassword("")
            setPermissions({
                allowDuyuru: false,
                allowPhones: false,
                allowIPS: false,
                allowPersonel: false,
                allowAnket: false,
                allowMudurlukler: false,
                allowAdmins: false,
            })
        } else {
            errorToast(resp.message);
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
                <span>Dikkat: Şifre oluşturduktan sonra daha fazla gösterilmeyecektir koyduğunuz şifreyi not alınız.</span>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="name"
                        label="Kullanıcı Adı"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="password"
                        label="Şifre"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Checkboxlar */}
                    <div className="mt-3">
                        <span>İzinler:</span>
                        {Object.keys(permissions).map((permission) => (
                            <FormControlLabel
                                key={permission}
                                control={
                                    <Checkbox
                                        checked={permissions[permission]}
                                        onChange={(e) =>
                                            handlePermissionChange(permission, e.target.checked)
                                        }
                                    />
                                }
                                label={permission.replace('allow', '')}
                            />
                        ))}
                    </div>

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

export default CreateAdmin;
