import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnketById } from '../api/services';
import { markSurveyAsAnswered } from '../utils/anketHolder';

export default function AnketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anket, setAnket] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAnketById(id)
      .then((res) => setAnket(res?.data?.data?.survey || null))
      .catch(() => setAnket(null));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    markSurveyAsAnswered(Number(id));
    setSubmitted(true);
    setTimeout(() => navigate('/anket'), 2000);
  };

  if (!anket) {
    return (
      <div className="text-center p-6 text-gray-600 dark:text-gray-300">
        Anket yükleniyor...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{anket.title}</h2>
        <p className="text-gray-500 dark:text-gray-300">{anket.description}</p>
      </div>

      {submitted && (
        <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border border-green-400 dark:border-green-600 p-4 rounded-md text-center shadow">
          ✅ Anketiniz başarıyla kaydedildi. Listeye yönlendiriliyorsunuz...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {anket.Questions?.map((q, i) => (
          <div
            key={q.id}
            className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
              {i + 1}. {q.question_text}
            </h4>

            {(q.question_type === 'multiple_choice' || q.question_type === 'multiple_selection') &&
              q.Choices.map((c) => (
                <label key={c.id} className="block text-sm my-1 text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    name={`q${q.id}`}
                    value={c.choice_text}
                    className="mr-2 accent-blue-600 dark:accent-blue-400"
                  />
                  {c.choice_text}
                </label>
              ))}

            {q.question_type === 'text_input' && (
              <textarea
                rows={3}
                className="w-full mt-2 p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                placeholder="Cevabınızı yazınız..."
              />
            )}
          </div>
        ))}

        {!submitted && (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded shadow block mx-auto"
          >
            Anketi Gönder
          </button>
        )}
      </form>
    </div>
  );
}
