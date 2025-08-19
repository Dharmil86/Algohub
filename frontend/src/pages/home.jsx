import { useState, useEffect } from "react";
import SortDropdown from "../components/sorting";
require('dotenv').config();

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);
  const [solved, setSolved] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [problems, setProblems] = useState([]);
  const [sortOption, setSortOption] = useState("latest"); // default sort


  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/content?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data || []);
        setTotal(json.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleSolved = (id) => {
    setSolved((prev) =>
        prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
    };

    const toggleBookmark = (id) => {
    setBookmarked((prev) =>
        prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
    };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  const sortedProblems = [...problems].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="max-w-8xl mx-auto px-6 py-10 text-white">
        <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white">AlgoHub </h1>
            <p className="text-gray-300 text-3xl mt-2 italic">
                "Organized learning for unstoppable problem solvers."
            </p>
        </div>

        {/* Pagination */}
      <div className="flex justify-end items-center gap-4 mb-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>

      <div className="p-6">
      
    </div>

      {/* accordion */}
      {data.map((section, index) => (
        <div
          key={section._id || section.sl_no || index}
          className="mb-6  rounded-lg overflow-hidden"
        >
            
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center px-4 py-3 bg-[#546a7b] text-lg font-semibold"
          >
            <span>{section.title}</span>
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>

          
          {openIndex === index && (
            <div className="bg-white text-black">
              <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border w-1/5">Question</th>
                    <th className="px-4 py-2 border w-1/5">Tags</th>
                    <th className="px-4 py-2 border w-1/6">Video</th>
                    <th className="px-4 py-2 border w-1/6">Problem 1</th>
                    <th className="px-4 py-2 border w-1/6">Problem 2</th>
                    <th className="px-4 py-2 border w-1/6"></th>
                  </tr>
                </thead>
                <tbody>
                  {section.ques?.map((q) => (
                    <tr key={q._id || q.id}>
                      <td className="px-4 py-2 border">{q.title}</td>
                      <td className="px-4 py-2 border truncate max-w-[150px]">
                        {q.tags || "—"}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {q.yt_link ? (
                          <a
                            href={q.yt_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 border border-red-500 rounded-md text-red-600 hover:bg-red-100 transition"
                          >
                            ▶ Video
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {q.p1_link ? (
                          <a
                            href={q.p1_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-100 transition"
                          >
                           Solve
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {q.p2_link ? (
                          <a
                            href={q.p2_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-100 transition"
                          >
                            Solve
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-2 border gap-2">
                        {/* Solved Button */}
                        <button
                            onClick={() => toggleSolved(q._id)}
                            className={`px-3 py-1 rounded-lg text-sm transition  ${
                            solved.includes(q._id)
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-green-700"
                            }`}
                        >
                            {solved.includes(q._id) ? "Solved" : "Mark Solved"}
                        </button>

                        {/* Bookmark Button */}
                        <button
                            onClick={() => toggleBookmark(q._id)}
                            className={`px-3 py-1 rounded-lg text-sm transition mt-2 ${
                            bookmarked.includes(q._id)
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-700 text-gray-300 hover:bg-yellow-600"
                            }`}
                        >
                            {bookmarked.includes(q._id) ? "Bookmarked" : "Bookmark"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      
    </div>
  );
}
