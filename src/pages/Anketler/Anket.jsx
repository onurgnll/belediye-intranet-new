"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { requestWithAuth } from "../../helpers/requests"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import * as React from "react"
import { Switch, TextField } from "@mui/material"
import { Person } from "@mui/icons-material"
import Cevaplar from "./Cevaplar"
import { PieChart } from "@mui/x-charts"
import "./anket.css"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

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
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const renderTopAnswers = (statistics, questionId) => {
  const sortedAnswers = Object.entries(statistics[questionId].answers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {sortedAnswers.map(([answer, count]) => (
        <li
          key={answer}
          style={{
            padding: "0.5rem",
            margin: "0.25rem 0",
            background: "var(--background-color)",
            borderRadius: "var(--border-radius)",
            border: "1px solid var(--border-color)",
          }}
        >
          <strong>{answer}:</strong> {count}
        </li>
      ))}
    </ul>
  )
}

function Anket() {
  const loc = useLocation()
  const [anket, setAnket] = React.useState()
  const [anketCevaplayanlar, setanketCevaplayanlar] = React.useState([])
  const [statistics, setStatistics] = React.useState()
  const [value, setValue] = React.useState(0)
  const [id, setId] = React.useState()
  const [open, setOpen] = React.useState(false)

  const getCevaplayanlar = async () => {
    try {
      const resp = await requestWithAuth("get", "/admin/get-anket-cevap/" + loc.pathname.split("/")[2])
      setanketCevaplayanlar(resp.data.attends)
    } catch (error) {
      console.log(error)
    }
  }

  const getAnket = async () => {
    try {
      const resp = await requestWithAuth("get", "/user/get-anket/" + loc.pathname.split("/")[2])
      setAnket(resp.data.survey)
    } catch (error) {
      console.log(error)
    }
  }

  const [checked, setChecked] = React.useState(false)
  const [checked2, setChecked2] = React.useState(false)

  useEffect(() => {
    if (anket?.isActive == 1) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [anket])

  useEffect(() => {
    if (anket?.isMain == 1) {
      setChecked2(true)
    } else {
      setChecked2(false)
    }
  }, [anket])

  const handleChangee = async (event) => {
    setChecked(event.target.checked)
    await requestWithAuth("post", "/admin/switch-anket/" + anket.id)
  }

  const handleChangeMainn = async (event) => {
    setChecked2(event.target.checked)
    await requestWithAuth("post", "/admin/set-main-anket/" + anket.id)
  }

  const getStatistics = async () => {
    try {
      const resp = await requestWithAuth("get", "/admin/get-cevap-statistics/" + loc.pathname.split("/")[2])
      setStatistics(resp.data.statistics)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAnket()
    getCevaplayanlar()
    getStatistics()
  }, [])

  const handleClickOpen = (e) => {
    setId(e)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderPieChart = (questionId) => {
    const data = Object.entries(statistics[questionId].answers).map(([label, value], index) => ({
      id: index,
      label,
      value,
    }))

    return (
      <PieChart
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        series={[{ data }]}
        width={400}
        height={200}
      />
    )
  }

  function findAnswerByQuestionText(data, targetQuestionText) {
    const foundItem = data.find((item) => item.Question.question_text === targetQuestionText)
    return foundItem ? foundItem.answer_text : null
  }

  return (
    <div className="anket-container">
      <Cevaplar open={open} handleClose={handleClose} id={id} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Anketi Cevaplayanlar" {...a11yProps(0)} />
            <Tab label="Cevap İstatistikleri" {...a11yProps(1)} />
            <Tab label="Önizleme" {...a11yProps(2)} />
            <Tab label="Anket Ayarları" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <div className="anket-grid">
            {anketCevaplayanlar?.length > 0 ? (
              anketCevaplayanlar?.map((element) => (
                <div key={element.id} className="participant-card" onClick={() => handleClickOpen(element.id)}>
                  <div className="participant-avatar">
                    <Person />
                  </div>
                  <div className="participant-name">
                    {findAnswerByQuestionText(element.Answers, "Adınız Soyadınız") || "Anonim"}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-participants">Henüz kimse anketi cevaplamamış</div>
            )}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="statistics-container">
            {statistics ? (
              Object.keys(statistics).map((questionId) => (
                <div
                  key={questionId}
                  className="statistic-item"
                  style={{
                    display: "flex",
                    gap: "2rem",
                    marginBottom: "3rem",
                    background: "var(--surface-color)",
                    padding: "2rem",
                    borderRadius: "var(--border-radius-large)",
                    boxShadow: "var(--shadow-light)",
                  }}
                >
                  <div>
                    <h4 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
                      {statistics[questionId].question}
                    </h4>
                    {renderPieChart(questionId)}
                  </div>
                  <div>
                    <h4 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>En Popüler Cevaplar</h4>
                    {renderTopAnswers(statistics, questionId)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-participants">Henüz kimse anketi cevaplamamış</div>
            )}
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <div
            style={{
              background: "var(--surface-color)",
              padding: "2rem",
              borderRadius: "var(--border-radius-large)",
              boxShadow: "var(--shadow-light)",
            }}
          >
            <h3 style={{ color: "var(--text-primary)", marginBottom: "2rem" }}>{anket?.title}</h3>
            {anket?.Questions?.map((eachQuestion, index) => (
              <div key={eachQuestion.id} style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "var(--primary-color)",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--border-radius)",
                      fontWeight: "bold",
                      minWidth: "40px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {eachQuestion.question_text}
                    </div>
                    <div>
                      {eachQuestion.question_type === "text_input" && (
                        <TextField fullWidth variant="outlined" placeholder="Cevap yazınız..." disabled />
                      )}
                      {eachQuestion.question_type === "multiple_choice" &&
                        eachQuestion.Choices.map((choice) => (
                          <div
                            key={choice.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <input
                              name={`question-${eachQuestion.id}`}
                              value={choice.choice_text}
                              type="radio"
                              disabled
                            />
                            <span>{choice.choice_text}</span>
                          </div>
                        ))}
                      {eachQuestion.question_type === "multiple_selection" &&
                        eachQuestion.Choices.map((choice) => (
                          <div
                            key={choice.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <input type="checkbox" disabled />
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
          <div
            style={{
              background: "var(--surface-color)",
              padding: "2rem",
              borderRadius: "var(--border-radius-large)",
              boxShadow: "var(--shadow-light)",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                background: "var(--background-color)",
                borderRadius: "var(--border-radius)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Anket Durumu</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  Anketin aktif olup olmadığını belirler
                </div>
              </div>
              <Switch checked={checked} onChange={handleChangee} inputProps={{ "aria-label": "controlled" }} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                background: "var(--background-color)",
                borderRadius: "var(--border-radius)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Önemli Anket</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  Kullanıcıların giriş yaptığında karşılaştığı anket
                </div>
              </div>
              <Switch checked={checked2} onChange={handleChangeMainn} inputProps={{ "aria-label": "controlled" }} />
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default Anket
