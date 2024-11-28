import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { requestWithAuth } from "../../helpers/requests";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import * as React from 'react';
import { Switch, TextField } from "@mui/material";
import { Person } from "@mui/icons-material";
import Cevaplar from "./Cevaplar";
import { PieChart } from "@mui/x-charts";
import "./anket.css"

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const renderTopAnswers = (statistics, questionId) => {
    const sortedAnswers = Object.entries(statistics[questionId].answers)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5); // Get top 5 most selected answers

    return (
        <ul>
            {sortedAnswers.map(([answer, count]) => (
                <li key={answer}>
                    {answer}: {count}
                </li>
            ))}
        </ul>
    );
};
function Anket() {
    const loc = useLocation();
    const [anket, setAnket] = React.useState();
    const [anketCevaplayanlar, setanketCevaplayanlar] = React.useState([]);
    const [statistics, setStatistics] = React.useState();
    const [value, setValue] = React.useState(0);
    const [id, setId] = React.useState();
    const [open, setOpen] = React.useState(false);

    const getCevaplayanlar = async () => {
        try {
            const resp = await requestWithAuth("get", "/admin/get-anket-cevap/" + loc.pathname.split("/")[2]);
            setanketCevaplayanlar(resp.data.attends);
        } catch (error) {
            console.log(error);
        }
    }

    const getAnket = async () => {
        try {
            const resp = await requestWithAuth("get", "/user/get-anket/" + loc.pathname.split("/")[2]);
            setAnket(resp.data.survey);
        } catch (error) {
            console.log(error);
        }
    }

    const [checked, setChecked] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);


    useEffect(() => {
        if (anket?.isActive == 1) {
            setChecked(true);
        }else{
            
            setChecked(false);
        }
    }, [anket]);


    useEffect(() => {
        if (anket?.isMain == 1) {
            setChecked2(true);
        }else{
            
            setChecked2(false);
        }
    }, [anket]);

    const handleChangee = async (event) => {
        setChecked(event.target.checked);
        await requestWithAuth("post", "/admin/switch-anket/" + anket.id);
    };

    const handleChangeMainn = async (event) => {
        setChecked2(event.target.checked);
        await requestWithAuth("post", "/admin/set-main-anket/" + anket.id);
    };





    const getStatistics = async () => {
        try {
            const resp = await requestWithAuth("get", "/admin/get-cevap-statistics/" + loc.pathname.split("/")[2]);
            setStatistics(resp.data.statistics);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAnket();
        getCevaplayanlar();
        getStatistics();
    }, []);

    const handleClickOpen = (e) => {
        setId(e);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderPieChart = (questionId) => {
        const data = Object.entries(statistics[questionId].answers).map(([label, value], index) => ({
            id: index,
            label,
            value,
        }));

        return (
            <PieChart
                slotProps={{
                    legend: {
                        hidden: true
                    }
                }}
                series={[{ data }]}
                width={400}
                height={200}
            />
        );
    }
    function findAnswerByQuestionText(data, targetQuestionText) {
        const foundItem = data.find(item => item.Question.question_text === targetQuestionText);
        return foundItem ? foundItem.answer_text : null;
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Cevaplar open={open} handleClose={handleClose} id={id}></Cevaplar>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Anketi Cevaplayanlar" {...a11yProps(0)} />
                    <Tab label="Cevap İstatistikleri" {...a11yProps(1)} />
                    <Tab label="Önizleme" {...a11yProps(2)} />
                    <Tab label="Anket Ayarları" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className="row">
                    {
                        anketCevaplayanlar?.length > 0 ?

                            anketCevaplayanlar?.map((element) => (
                                <div style={{}} className=" col-3 m-2 py-5 aaaff" onClick={() => handleClickOpen(element.id)} key={element.id}>
                                    <div className="d-flex flex-column align-items-center">
                                        <Person />
                                        <span>
                                            {findAnswerByQuestionText(element.Answers, "Adınız Soyadınız") || ""}

                                        </span>

                                    </div>
                                </div>
                            ))

                            :
                            <div>
                                Henüz kimse anketi cevaplamamış
                            </div>
                    }
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="d-flex">
                    <div>
                        {statistics ?
                            Object.keys(statistics).map((questionId) => (
                                <div className="d-flex mt-5" key={questionId}>

                                    <div key={questionId}>
                                        <h4>{statistics[questionId].question}</h4>
                                        {renderPieChart(questionId)}
                                    </div>
                                    <div>
                                        <h4>{statistics[questionId].question} - Top 5</h4>
                                        {renderTopAnswers(statistics, questionId)}

                                    </div>
                                </div>
                            ))
                            :

                            <div>
                                Henüz kimse anketi cevaplamamış
                            </div>
                        }

                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <div className="d-flex flex-column">
                    <h3>{anket?.title}</h3>
                    {anket?.Questions?.map((eachQuestion, index) => (
                        <div key={eachQuestion.id} className="mt-5">
                            <div className="p-2 d-inline justify-content-start align-items-start" style={{ borderRadius: "10px", backgroundColor: "#2A2A5B", color: "white", fontWeight: "bold" }}>
                                {index + 1}
                            </div>
                            <div className="d-inline-block">
                                <div className="d-flex flex-column mx-2">
                                    <div className="fw-bold">
                                        {eachQuestion.question_text}
                                    </div>
                                    <div>
                                        {eachQuestion.question_type === "text_input" && <TextField />}
                                        {eachQuestion.question_type === "multiple_choice" && eachQuestion.Choices.map((choice) => (
                                            <div key={choice.id} className="d-flex">
                                                <input name={`question-${eachQuestion.id}`} value={choice.choice_text} type="radio" />
                                                <span>{choice.choice_text}</span>
                                            </div>
                                        ))}
                                        {eachQuestion.question_type === "multiple_selection" && eachQuestion.Choices.map((choice) => (
                                            <div key={choice.id} className="d-flex">
                                                <input type="checkbox" />
                                                <span>{choice.choice_text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <div className="d-flex flex-column">

                    <div>
                        <div>Aktif mi?</div>
                        <Switch
                            checked={checked}
                            onChange={handleChangee}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </div>
                    <div>
                        <div>Önemli Anket mi?</div>
                        <Switch
                            checked={checked2}
                            onChange={handleChangeMainn}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </div>
                </div>
            </CustomTabPanel>
        </Box>
    );
}

export default Anket;
