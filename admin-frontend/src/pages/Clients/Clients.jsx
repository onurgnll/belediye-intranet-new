import { useEffect, useState } from "react";
import { requestWithAuth, requestWithAuthForm } from "../../helpers/requests";
import { CloudDownload, CloudUpload, Delete, NavigateBefore, NavigateNext, Phone } from "@mui/icons-material";
import { TextField } from "@mui/material";
import CreatePhoneNumber from "./CreateClients";
import "./Clients.css"
import ReactPaginate from "react-paginate";
import CreateClients from "./CreateClients";
import UpdateClient from "./UpdateClient";
import { errorToast, successToast } from "../../helpers/toast";

function Clients() {

    const [selectedFile, setSelectedFile] = useState(null); // Dosya seçimi için state
    const [search, setSearch] = useState("");
    const [ip, setIP] = useState("");

    const [page, setPage] = useState(1);
    const [clients, setClients] = useState();

    const handlePageChange = ({ selected }) => {
        setPage(selected + 1); // react-paginate uses 0-based index
    };

    useEffect(() => {

        setPage(1)
    }, [search, ip]);
    const getClients = async () => {

        const resp = await requestWithAuth("post", "/admin/get-clients?page=", page, "", { name: search, ip })
        setClients(resp.data.clients)
    }

    useEffect(() => {
        getClients(page)
    }, [search, ip, page]);

    const handleDelete = async (id) => {
        var confi = confirm("Bu ipyi silmek istiyormusunuz?")
        if (confi) {

            await requestWithAuth("delete", "/admin/delete-client/", id)
            getClients()
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDownloadClick = () => {
        window.open(import.meta.env.VITE_APP_API_URL + "/admin/download-clients", "_blank");
    };








    const [updatingClient, setUpdatingClient] = useState();
    


    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (e) => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };


    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Lütfen bir dosya seçin.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await requestWithAuthForm("post", "/admin/upload-excel-for-ips", "", "", formData);
            console.log(res);
            if (res.success == 1) {
                setPage(1)
                getClients(page)
                successToast("IPLER Güncellendi")
            }else{
                errorToast("Bir hata oluştu.")
            }
        } catch (error) {
            console.error("Dosya yükleme hatası:", error);
            alert("Dosya yükleme sırasında bir hata oluştu.");
        }
    };


    return (
        <div style={{ marginRight: "5rem" }} className="mx">
            {/* <CreatePhoneNumber getPhones={getPhones} open={open} handleClose={handleClose}></CreatePhoneNumber> */}
            <UpdateClient client={updatingClient} open={open2} handleClose={handleClose2} getClients={getClients} setPage={setPage}></UpdateClient>
            <CreateClients setPage={setPage} getClients={getClients} open={open} handleClose={handleClose}></CreateClients>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">

                    <TextField
                        className='mt-2 '
                        id="title"
                        label="İsim"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <TextField
                        className='mt-2 mx-2'
                        id="ip"
                        label="IP"
                        variant="outlined"
                        value={ip}
                        onChange={(e) => setIP(e.target.value)}
                    />
                    <div style={{ cursor: "pointer" }} onClick={handleDownloadClick} className="d-flex flex-column align-items-center mx-2">
                        <CloudDownload sx={{ fontSize: 40 }}></CloudDownload>
                        <span className="fw-bold">İndir</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        {!selectedFile ? (
                            <>
                                <label htmlFor="file-upload" style={{ cursor: "pointer" , display: "flex" , flexDirection: "column"}}>
                                    <CloudUpload sx={{ fontSize: 40 }} />
                                    <span className="fw-bold">Yükle</span>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={handleFileSelect}
                                />
                            </>
                        ) : (
                            <button className="upload-button" onClick={handleUpload}>
                                {selectedFile.name} (Yükle)
                            </button>
                        )}
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
                        <th>İSİM</th>
                        <th>IP</th>
                        <th>MAC</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients?.result.length > 0 && clients.result.map((client) => {
                            return (

                                <tr onClick={() => {setUpdatingClient(client); handleClickOpen2()}} key={client.id}>
                                    <td>{client.name}</td>
                                    {/* <td>{client.surname}</td> */}
                                    <td>{client.ip}</td>
                                    <td>{client.address}</td>
                                    <td><Delete onClick={(e) => {e.stopPropagation();handleDelete(client.id)}} style={{ color: "crimson", cursor: "pointer" }}></Delete></td>

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
                    pageCount={clients?.pagination?.total_page || 1}
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

export default Clients;