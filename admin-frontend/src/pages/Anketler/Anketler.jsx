import { useEffect, useState } from "react";
import { requestWithAuth } from "../../helpers/requests";
import CreateAnket from "./CreateAnket";

import "./anket.css"
import { useNavigate } from "react-router-dom";
import { Delete, Poll } from "@mui/icons-material";
import anket from "../../assets/survey.png"

function Anketler() {

    const [surveys, setSurveys] = useState();


    const getSurveys = async () => {
        try {

            const resp = await requestWithAuth("get", "/admin/get-anketler")

            setSurveys(resp.data.surveys)

        } catch (error) {
            console.log(error);
        }
    }

    const [mainAnket, setmainAnket] = useState();

    const getMainSurvey = async () => {
        try {

            const resp = await requestWithAuth("get", "/admin/get-main-anket")

            setmainAnket(resp.data.anket)

        } catch (error) {
            console.log(error);
        }
    }

    const deleteAnket = async (e) => {
        try {

            const resp = await requestWithAuth("delete", "/admin/delete-anket/" + e)

            setSurveys(resp.data.surveys)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSurveys()
        getMainSurvey()
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate()

    return (
        <div>
            <CreateAnket open={open} handleClose={handleClose} getAnketler={getSurveys}></CreateAnket>
            <div>

                <div className="mt-2">
                    <button onClick={handleClickOpen} className="olusturbutton px-5">Oluştur</button>
                </div>
            </div>

            <div className="p-3 d-flex flex-wrap">

                {mainAnket &&

                    <div className="d-flex flex-column table-container">
                        <span className="fw-bold fs-4">Önemli Anket (Kullanıcıların girdiğinde karşılaştığı anket)</span>
                        <div style={{ width: "300px" }} onClick={() => navigate("/anket/" + mainAnket.id)} className="p-2 px-5 m-3 eachanket d-flex flex-column align-items-center justify-content-center" key={mainAnket.id}>
                            <img src={anket} alt="" />
                            <span className="fw-bold">

                                {mainAnket.title}
                            </span>
                            <Delete onClick={async (e) => { e.stopPropagation(); const a = confirm("Bu anketi silmek istiyor musunuz?"); if (a) { await deleteAnket(mainAnket.id); getSurveys() } }} style={{ color: "crimson" }}></Delete>

                        </div>

                    </div>

                }


            </div>

            <div className="p-3 d-flex flex-wrap">

                {
                    surveys?.length > 0 &&

                    <div className="d-flex flex-column  table-container">
                        <span className="fw-bold fs-4">Diğer Anketler</span>

                        <div className="d-flex flex-wrap">

                            {surveys?.map((element) => {
                                return (
                                    <div style={{ width: "300px" }} onClick={() => navigate("/anket/" + element.id)} className="p-2 px-5 m-3 eachanket d-flex flex-column align-items-center justify-content-center" key={element.id}>
                                        <img src={anket} alt="" />
                                        <span className="fw-bold">

                                            {element.title}
                                        </span>
                                        <Delete onClick={async (e) => { e.stopPropagation(); const a = confirm("Bu anketi silmek istiyor musunuz?"); if (a) { await deleteAnket(element.id); getSurveys() } }} style={{ color: "crimson" }}></Delete>

                                    </div>
                                )
                            })}
                        </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Anketler;