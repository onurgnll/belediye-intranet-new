import { useState } from 'react';
import { Dialog, Button, TextField, FormControlLabel, Switch } from '@mui/material';
import { requestWithAuth } from '../../helpers/requests';
import { errorToast, successToast } from '../../helpers/toast';

function CreateAnket({ handleClose, open, getAnketler }) {
    const [questionLength, setQuestionLength] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState(Array(questionLength).fill({ question_text: '', question_type: '', choices: [] }));

    const [isChecked, setIsChecked] = useState(false); // Switch durumu
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic


        const body = {
            title, description, questions,

            isMain: isChecked ? "true": "false"
        }

        const response = await requestWithAuth("post", "/admin/create-anket", "", "", body)

        console.log(response);

        if (response.success == -1) {
            errorToast(response.message)
        }
        if (response.success == 1) {
            handleClose()
            getAnketler()
            successToast("Anket Oluşturuldu")
        }

    };

    const handleDescriptionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question_text = value;
        setQuestions(newQuestions);
    };

    const handleTypeChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question_type = value;
        if (value !== 'multiple_choice' && value !== 'multiple_selection') {
            newQuestions[index].choices = [];
        }
        setQuestions(newQuestions);
    };

    const handleChoiceChange = (questionIndex, choiceIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices[choiceIndex] = value;
        setQuestions(newQuestions);
    };

    const addChoice = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices.push('');
        setQuestions(newQuestions);
    };

    const handleSwitchChange = (event) => {
        setIsChecked(event.target.checked);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='p-5'>
                <div>
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="title"
                        label="İsim"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        className='mt-2'
                        fullWidth
                        id="description"
                        label="Açıklama"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <FormControlLabel
                        control={<Switch checked={isChecked} onChange={handleSwitchChange} />}
                        label="Önemli Anket mi? (Kullanıcılar girince karşılaşacak)"
                    />
                    <div>
                        <h4>Sorular</h4>
                        {/* <span className='fs-6'>Adınız Soyadınız sorusu her ankette otomatik eklenir.</span> */}
                        <hr />
                        <Button
                            variant='outlined'
                            onClick={() => {
                                setQuestionLength(questionLength + 1);
                                setQuestions([...questions, { question_text: '', question_type: '', choices: [] }]);
                            }}
                        >
                            Soru Ekle
                        </Button>
                        {
                            Array.from({ length: questionLength }, (_, index) => (
                                <div className='border p-5' key={index} style={{ marginBottom: '1rem', borderRadius: "15px" }}>
                                    <TextField
                                        className='mt-2'
                                        fullWidth
                                        id={`question-text-${index}`}
                                        label={`Soru Metni ${index + 1}`}
                                        variant="outlined"
                                        value={questions[index]?.question_text}
                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                    />
                                    <select
                                        className='mt-2'
                                        style={{ padding: "5px", outline: "none" }}
                                        value={questions[index]?.question_type}
                                        onChange={(e) => handleTypeChange(index, e.target.value)}
                                    >
                                        <option value="" hidden>Soru Tipi Seçiniz</option>
                                        <option value="multiple_choice">Şıklı</option>
                                        <option value="multiple_selection">Çok seçenek seçilebilen</option>
                                        <option value="text_input">Yanıt Verilebilen (Text)</option>
                                    </select>
                                    {(questions[index].question_type === 'multiple_choice' || questions[index].question_type === 'multiple_selection') && (
                                        <div className='mt-2'>
                                            <h5>Şıklar</h5>
                                            {questions[index].choices.map((choice, choiceIndex) => (
                                                <TextField
                                                    key={choiceIndex}
                                                    className='mt-2'
                                                    fullWidth
                                                    id={`choice-${index}-${choiceIndex}`}
                                                    label={`Şık ${choiceIndex + 1}`}
                                                    variant="outlined"
                                                    value={choice}
                                                    onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}
                                                />
                                            ))}
                                            <Button
                                                variant='outlined' onClick={() => addChoice(index)}>Şık Ekle</Button>
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                        onClick={handleSubmit}
                    >
                        Oluştur
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default CreateAnket;
