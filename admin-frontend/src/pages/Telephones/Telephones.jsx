import { useEffect, useState } from "react";
import { requestWithAuth } from "../../helpers/requests";
import { CloudDownload, Delete, NavigateBefore, NavigateNext, Phone } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CreatePhoneNumber from "./CreatePhoneNumber";
import "./telephones.css"
import ReactPaginate from "react-paginate";
import UpdatePhoneNumber from "./UpdatePhoneNumber";

function Telephones() {

    const [search, setSearch] = useState("");
    const [phone, setPhone] = useState("");
    const [phones, setPhones] = useState([]);
    const [departman, setDepartman] = useState("");

    const [page, setPage] = useState(1);

    useEffect(() => {

        setPage(1)
    }, [search, phone, departman]);


    const getPhones = async () => {

        const resp = await requestWithAuth("post", "/admin/get-phonenumber?page=", page, "", { name: search, departman, phone })
        setPhones(resp.data.telephones)
    }

    const handlePageChange = ({ selected }) => {
        setPage(selected + 1); // react-paginate uses 0-based index
    };

    useEffect(() => {
        getPhones(page)
    }, [search, departman, phone, page]);

    const handleDelete = async (id) => {
        var confi = confirm("Bu telefonu silmek istiyormusunuz?")
        if (confi) {

            await requestWithAuth("delete", "/admin/delete-phonenumber/", id)
            getPhones()
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (e) => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleDownloadClick = () => {
        window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-telefon", "_blank");
    };


    const [updatingPhone, setupdatingPhone] = useState(null);
    
    const [mudurlukler, setMudurlukler] = useState([]);


    const getMudurlukler = async () => {
        const resp = await requestWithAuth("get", "/admin/get-mudurlukler")
        setMudurlukler(resp.data.mudurlukler)
    }

    useEffect(() => {
        getMudurlukler()
    }, []);

    return (
        <div style={{ marginRight: "5rem" }} className="mx">

            <UpdatePhoneNumber phoneNumber={updatingPhone} setPage={setPage} mudurlukler={mudurlukler} getPhones={getPhones} page={page} open={open2} handleClose={handleClose2}></UpdatePhoneNumber>
            <CreatePhoneNumber setPage={setPage} mudurlukler={mudurlukler} getPhones={getPhones} page={page} open={open} handleClose={handleClose}></CreatePhoneNumber>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex mt-3">
                    <div className="w-25 ">


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
                    <TextField
                        className='mx-3'
                        id="title"
                        label="İsim"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <TextField
                        className=''
                        id="phone"
                        label="Telefon"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div style={{ cursor: "pointer" }} onClick={handleDownloadClick} className="d-flex flex-column align-items-center mx-2">
                        <CloudDownload sx={{ fontSize: 40 }}></CloudDownload>
                        <span className="fw-bold">İndir</span>
                    </div>
                </div>
                <div className="mt-2">

                    <button onClick={handleClickOpen} className="olusturbutton px-5">Oluştur</button>
                </div>
            </div>
            <hr />
            <table className="custom-table1">
                <thead>
                    <tr>
                        {/* <th>İSİM</th> */}
                        <th>İSİM</th>
                        <th>BİRİM</th>
                        <th>TELEFON</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        phones?.result?.length > 0 && phones.result.map((phone) => {
                            return (

                                <tr onClick={()=> {handleClickOpen2(); setupdatingPhone(phone)}} key={phone.id}>
                                    {/* <td>{phone.name}</td> */}
                                    <td>{phone.description}</td>
                                    <td>{phone?.department?.birim}</td>
                                    <td><Phone></Phone>{phone.phone}</td>
                                    <td><Delete onClick={(e) => {e.stopPropagation(); handleDelete(phone.id)}} style={{ color: "crimson", cursor: "pointer" }}></Delete></td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table><div className="d-flex justify-content-center mt-3 mb-3">
                <ReactPaginate
                    previousLabel={<NavigateBefore></NavigateBefore>}
                    nextLabel={<NavigateNext></NavigateNext>}
                    breakLabel={"..."}
                    pageCount={phones?.pagination?.total_page || 1}
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

export default Telephones;