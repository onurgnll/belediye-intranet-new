import { useEffect, useState } from "react";
import "./mudurlukler.css"
import { requestWithAuth } from "../../helpers/requests";
import { Delete } from "@mui/icons-material";
import CreateMudurluk from "./CreateMudurluk";
import { Autocomplete, TextField } from "@mui/material";
import UpdateMudurluk from "./UpdateMudurluk";

function Mudurlukler() {


    const [mudurlukler, setMudurlukler] = useState([]);


    const getMudurlukler = async () => {
        const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
        setMudurlukler(resp.data.mudurlukler)
    }

    useEffect(() => {
        getMudurlukler()
    }, []);


    const handleDelete = async (id) => {
        var confi = confirm("Bu müdürlüğü silmek istiyormusunuz?")
        if (confi) {

            await requestWithAuth("delete", "/admin/delete-mudurluk/", id)
            getMudurlukler()
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const [updatingMudurluk, setUpdatingMudurluk] = useState();



    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (e) => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    

    return (
        <div style={{ marginRight: "5rem" }} className="mt-4">
            <CreateMudurluk open={open} handleClose={handleClose} getMudurlukler={getMudurlukler}></CreateMudurluk>
            <UpdateMudurluk open={open2} handleClose={handleClose2} getMudurlukler={getMudurlukler} mudurluk={updatingMudurluk}></UpdateMudurluk>
            
            <div className="d-flex justify-content-between align-items-center">

                <div className="mt-2">

                    <button onClick={handleClickOpen} className="olusturbutton px-5">Oluştur</button>
                </div>
            </div>
            <hr />
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>İsim</th>
                        <th>Müdür</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mudurlukler?.length > 0 && mudurlukler.map((mudurluk) => {
                            return (

                                <tr onClick={() => {handleClickOpen2(); setUpdatingMudurluk(mudurluk)}} key={mudurluk.id}>
                                    <td>{mudurluk?.birim}</td>
                                    <td><div className="d-flex flex-column align-items-center"><span>{mudurluk?.mudurr?.name} {mudurluk?.mudurr?.surname}</span> </div></td>
                                    
                                    
                                    {/* <td><Delete onClick={() => handleDelete(phone.id)} style={{ color: "crimson", cursor: "pointer" }}></Delete></td> */}
                                    <td className="d-flex justify-content-center"><Delete onClick={(e) => { e.stopPropagation(); handleDelete(mudurluk.id) }} style={{ color: "crimson", cursor: "pointer" }}></Delete></td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Mudurlukler;