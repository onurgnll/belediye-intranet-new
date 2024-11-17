import { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { requestWithAuth } from '../../helpers/requests';

function Cevaplar({ handleClose, open, id }) {
    const [responses, setResponses] = useState({});

    const getResponses = async () => {
        try {
            const resp = await requestWithAuth("get", "/admin/get-cevap/" + id);
            console.log(resp);
            const processedAnswers = combineAnswers(resp.data.answer.Answers);
            setResponses({ ...resp.data.answer, Answers: processedAnswers });
        } catch (error) {
            console.log(error);
        }
    };

    // Aynı soruya verilen cevapları birleştiren fonksiyon
    const combineAnswers = (answers) => {
        const combined = answers.reduce((acc, current) => {
            const existing = acc.find(item => item.Question.id === current.Question.id);
            if (existing) {
                // Eğer aynı soru zaten eklenmişse, cevabı birleştir
                existing.answer_text = existing.answer_text
                    ? `${existing.answer_text}, ${current.answer_text || current.Choice?.choice_text}`
                    : current.answer_text || current.Choice?.choice_text;
            } else {
                // Yeni soru ekle
                acc.push({
                    ...current,
                    answer_text: current.answer_text || current.Choice?.choice_text
                });
            }
            return acc;
        }, []);
        return combined;
    };

    useEffect(() => {
        if (id)
            getResponses();
    }, [id]);
    function findAnswerByQuestionText(data, targetQuestionText) {
        const foundItem = data?.find(item => item.Question?.question_text === targetQuestionText);
        return foundItem ? foundItem.answer_text : null;
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='p-5'>
                <h4>{findAnswerByQuestionText(responses?.Answers , "Adınız Soyadınız")} Kişisinin Cevapları</h4>
                {
                    responses.Answers?.map((element) => {
                        return (
                            <div className='d-flex flex-column' key={element.id}>
                                <span className='fw-bold'>{element.Question.question_text}</span>
                                <span style={{color: "gray"}}>Verilen Cevap: {element.answer_text}</span>
                            </div>
                        )
                    })
                }
            </div>
        </Dialog>
    );
}

export default Cevaplar;
