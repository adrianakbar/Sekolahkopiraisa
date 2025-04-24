import { useState } from "react";

interface Comment {
  name: string;
  comment: string;
  created_at: string;
}

interface Props {
  activityId: number;
}

export default function CommentSection({ activityId }: Props) {
  const [comments, setComments] = useState<Comment[]>([
    {
      name: "Budi",
      comment: "Beritanya sangat informatif!",
      created_at: new Date().toISOString(),
    },
    {
      name: "Sari",
      comment: "Terima kasih infonya.",
      created_at: new Date().toISOString(),
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      setError("Komentar tidak boleh kosong.");
      return;
    }

    const newItem = {
      name: "Anonim",
      comment: newComment.trim(),
      created_at: new Date().toISOString(),
    };

    setComments([newItem, ...comments]);
    setNewComment("");
    setError("");
    setSuccessMsg("Komentar berhasil dikirim!");

    setTimeout(() => setSuccessMsg(""), 3000); // hilangkan pesan setelah 3 detik
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Komentar</h3>

      {/* Form Komentar */}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            setError("");
          }}
          placeholder="Tulis komentar Anda..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 resize-none"
          rows={4}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {successMsg && <p className="text-green-500 text-sm mt-1">{successMsg}</p>}

        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Kirim Komentar
        </button>
      </div>

      {/* List Komentar */}
      <div className="space-y-4">
        {comments.map((c, idx) => (
          <div key={idx} className="flex gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              {c.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(c.created_at).toLocaleString()}
              </p>
              <p className="mt-2">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
