import { useEffect, useState } from "react";
import { requestWithAuth } from "../../helpers/requests";
import "./announcement.css"
import { Delete } from "@mui/icons-material";
import CreateAnnouncement from "./CreateAnnouncement";
import AnnDetails from "./AnnDetails";
function Announcements() {

    const [announcements, setAnnouncements] = useState([]);
    const [mainDuyuru, setmainDuyuru] = useState();


    const getAnnouncements = async () => {
        const announcements = await requestWithAuth("get", "/admin/get-duyurular")

        setAnnouncements(announcements.data.duyurular)

    }

    const getMainAnnouncm = async () => {
        const announcements = await requestWithAuth("get", "/admin/get-main-duyuru")

        setmainDuyuru(announcements.data.duyuru)

    }
    useEffect(() => {
        getMainAnnouncm()
        getAnnouncements()
    }, []);


    const handleDelete = async (id) => {
        await requestWithAuth("delete", "/admin/delete-duyuru/", id)
        getAnnouncements()
        getMainAnnouncm()
    }



    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [ann, setAnn] = useState();

    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = (e) => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    return (
        <div>
            <AnnDetails getAnnouncements={getAnnouncements} getMainAnnouncm={getMainAnnouncm} open={open2} handleClose={handleClose2} ann={ann}></AnnDetails>
            <CreateAnnouncement getMainAnn={getMainAnnouncm} fetchData={getAnnouncements} open={open} handleClose={handleClose}></CreateAnnouncement>
            <div className="mt-2">
                <button onClick={handleClickOpen} className="olusturbutton px-5">Oluştur</button>
            </div>
            <hr />
            {mainDuyuru &&
                <div className="d-flex flex-column table-container">
                    <span className="fw-bold fs-4">Önemli Duyuru (Kullanıcıların girdiğinde karşılaştığı duyuru)</span>
                    <div onClick={() => { setAnn(mainDuyuru), setOpen2(true) }} style={{ width: "300px", height: "300px" }} className="d-flex flex-column align-items-center dutututu p-3">
                        {mainDuyuru?.duyuruResimler?.length > 0 &&


                            <img style={{ width: "200px" , height: "200px" }} src={`${import.meta.env.VITE_APP_URL}/duyuru/` + mainDuyuru?.duyuruResimler[0].resim} alt="Resim 1" />
                        }
                        <span style={{overflow: "hidden", textOverflow: "ellipsis"}} className="fw-bold ">{mainDuyuru.title}</span>
                    </div>
                </div>
            }

            <hr />
            {
                announcements?.length > 0 &&

                <div className="d-flex flex-column  table-container">
                    <span className="fw-bold fs-4">Diğer Duyurular</span>

                    <div className="d-flex flex-wrap">


                        {
                            announcements?.map((ann) => {
                                return (

                                    <div onClick={() => { setAnn(ann), setOpen2(true) }} key={ann.id} style={{ width: "300px", height: "300px" }} className="m-2 d-flex flex-column align-items-center dutututu justify-content-center">
                                        {ann?.duyuruResimler?.length > 0 &&


                                            <img style={{ width: "200px", height: "200px" }} src={`${import.meta.env.VITE_APP_URL}/duyuru/` + ann?.duyuruResimler[0].resim} alt="Resim 1" />
                                        }
                                        <span className="fw-bold">{ann.title}</span>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

        </div>
    );
}

export default Announcements;