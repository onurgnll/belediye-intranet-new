import React, { useEffect, useState } from 'react';
import { getInternalNumbers } from '../api/services';

export default function InternalNumbers() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = () => {
    const filters = {
      name: name.trim(),
      departman: department.trim(),
      phone: phone.trim(),
    };

    getInternalNumbers(page, filters)
      .then((res) => {
        const telephones = res?.data?.data?.telephones;
        const list = telephones?.result || [];
        const total = telephones?.pagination?.total_page || 1;

        const transformed = list.map((item) => ({
          name: item.description,
          department: item?.department?.birim || '',
          internalNumber: item.phone,
        }));

        setData(transformed);
        setTotalPages(total);
        setError(false);
      })
      .catch(() => setError(true));
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/get-mudurlukler`);
      const json = await res.json();
      if (json.success) {
        setDepartments(json.data.mudurlukler || []);
      }
    } catch (err) {
      console.error('Müdürlükler alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchData();
  }, [name, department, phone, page]);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Dahili Numaralar</h2>

      {/* Filtre Alanı */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="İsim ara..."
          value={name}
          onChange={(e) => {
            setPage(1);
            setName(e.target.value);
          }}
          className="border dark:border-gray-600 px-3 py-2 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <select
          value={department}
          onChange={(e) => {
            setPage(1);
            setDepartment(e.target.value);
          }}
          className="border dark:border-gray-600 px-3 py-2 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Müdürlük seçiniz...</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>{dep.birim}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Numara ara..."
          value={phone}
          onChange={(e) => {
            setPage(1);
            setPhone(e.target.value);
          }}
          className="border dark:border-gray-600 px-3 py-2 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Tablo */}
      {error ? (
        <p className="text-red-500 dark:text-red-400">Veri alınamadı.</p>
      ) : (
        <>
          <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="p-2 border">Ad Soyad</th>
                <th className="p-2 border">Birim</th>
                <th className="p-2 border">Dahili</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((person, index) => (
                  <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="p-2 border">{person.name}</td>
                    <td className="p-2 border">{person.department}</td>
                    <td className="p-2 border">{person.internalNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-sm text-gray-500 p-4 dark:text-gray-400">
                    Sonuç bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Sayfalama */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 border rounded-md transition ${
                  page === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
