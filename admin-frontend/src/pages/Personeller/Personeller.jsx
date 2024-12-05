import { useEffect, useState } from "react";
import { requestWithAuth } from "../../helpers/requests";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./personels.css"
import { BorderColor, CloudDownload, Delete, NavigateBefore, NavigateNext } from "@mui/icons-material";
import EditPersonel from "./EditPersonel";
import CreatePersonel from "./CreatePersonel";
function Personeller() {

    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [departman, setDepartman] = useState("");
    const [kartno, setKartno] = useState("");
    const [unvan, setUnvan] = useState("");

    const handleDownloadClick = () => {
        window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-personeller", "_blank");
    };


    const handlePageChange = ({ selected }) => {
        setPage(selected + 1); // react-paginate uses 0-based index
    };
    const [personeller, setPersoneller] = useState();


    const getPersonels = async () => {
        const personel = await requestWithAuth("post", "/admin/get-personels?page=", page, "", {
            name: name, departman: departman.toString(), kartno, unvan
        })

        setPersoneller(personel.data.personels)

    }

    const [mudurlukler, setMudurlukler] = useState([]);


    const getMudurlukler = async () => {
        const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
        setMudurlukler(resp.data.mudurlukler)
    }

    useEffect(() => {
        getMudurlukler()
    }, []);
    useEffect(() => {

        setPage(1)
    }, [name]);

    useEffect(() => {
        getPersonels()
    }, [name, page, departman, kartno, unvan]);



    const [selectedPersonel, setSelectedPersonel] = useState(null);
    





    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (e) => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };




    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        var confi = confirm("Bu personeli silmek istiyormusunuz?")
        if (confi) {

            await requestWithAuth("delete", "/admin/delete-personel/", id)
            getPersonels()
        }
    }

    return (




        <div style={{marginRight: "5rem"}} className="mx-">
            <EditPersonel getPersonels={getPersonels} page={page} open={open2} handleClose={handleClose2} personel={selectedPersonel}></EditPersonel>
            <CreatePersonel getPersonels={getPersonels} page={page} open={open} handleClose={handleClose}></CreatePersonel>
            <div className="d-flex align-items-center mt-3">
                <div className="w-25">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Müdürlük</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="asd"
                            placeholder="Müdürlük Seçiniz"
                            onChange={(e) => setDepartman(e.target.value)}
                        >
                            {
                                mudurlukler?.map((mudurluk) => {
                                    return (<MenuItem value={mudurluk.id} key={mudurluk.id}>{mudurluk.birim}</MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>

                </div>
                {/* <select style={{ outline: "none" }} className="p-3" onChange={(e) => setDepartman(e.target.value)} name="" id="">
                    <option value="" selected>Müdürlük Seçiniz</option>
                    {
                        mudurlukler.map((mudurluk) => {
                            return (<option value={mudurluk.id} key={mudurluk.id}>{mudurluk.birim}</option>)
                        })
                    }

                </select> */}
                <TextField
                    className="mx-1"
                    id="title"
                    label="İsim"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    className="mx-1"
                    id="title"
                    label="Kart No"
                    variant="outlined"
                    value={kartno}
                    onChange={(e) => setKartno(e.target.value)}
                />

                <TextField
                    className="mx-1"
                    id="title"
                    label="Görev"
                    variant="outlined"
                    value={unvan}
                    onChange={(e) => setUnvan(e.target.value)}
                />

                <div style={{ cursor: "pointer" }} onClick={handleDownloadClick} className="d-flex flex-column align-items-center mx-2">
                    <CloudDownload sx={{ fontSize: 40 }}></CloudDownload>
                    <span className="fw-bold">İndir</span>
                </div>

                <div className="mt-2">

                    <button onClick={handleClickOpen} className="olusturbutton px-5">Oluştur</button>
                </div>
            </div>

            <hr />
            <table className="custom-table5">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ad Soyad</th>
                        <th>Bölüm</th>
                        <th>Kart No</th>
                        <th>Öğrenim Durumu</th>
                        <th>Telefon</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personeller?.result.length > 0 && personeller?.result.map((personel) => {
                            return (

                                <tr onClick={() => {setSelectedPersonel(personel) ; setOpen2(true)}} key={personel.ID}>
                                    <td><img style={{ borderRadius: "150px", height: "120px", width: "100px" }} src={`${import.meta.env.VITE_APP_URL}/kullanici/${personel.Resim}`} alt="" /></td>

                                    <td className="">
                                        <div className="fw-bold">{personel.Adi} {personel.Soyadi}</div>
                                        <div>{personel.Unvani}</div>
                                    </td>
                                    <td>{personel.department?.birim}</td>
                                    <td>{personel.KartNo}</td>
                                    <td>{personel?.ogrenim?.Adi}</td>
                                    <td>{personel.TelefonNo}</td>
                                    <td><Delete onClick={(e) => {e.stopPropagation(); handleDelete(personel.ID)}} style={{ color: "crimson", cursor: "pointer" }}></Delete></td>


                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-3 mb-3">
                <ReactPaginate
                    previousLabel={<NavigateBefore></NavigateBefore>}
                    nextLabel={<NavigateNext></NavigateNext>}
                    breakLabel={"..."}
                    pageCount={personeller?.pagination?.total_page || 1}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />


            </div>
        </div>
    );
}

export default Personeller;