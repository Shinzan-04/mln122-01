import { useState, useEffect } from "react";
import { Save, X, BookOpen, Brain, RefreshCw, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { createTopic, createQuizQuestion, fetchTopics, TopicDto, fetchUsers, UserDto } from "../lib/api";

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"topic" | "quiz" | "users">("topic");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  // Topic Form
  const [topic, setTopic] = useState({
    title: "", summary: "", content: "", thumbnailUrl: "", category: "Triết học Mác-Lênin", author: "Admin"
  });

  // Quiz Form
  const [topics, setTopics] = useState<TopicDto[]>([]);
  const [quiz, setQuiz] = useState({
    topicId: 0, question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A"
  });

  // Users
  const [usersList, setUsersList] = useState<UserDto[]>([]);

  useEffect(() => {
    if (activeTab === "quiz") {
      fetchTopics().then(data => {
        setTopics(data);
        if (data.length > 0 && quiz.topicId === 0) {
          setQuiz(q => ({ ...q, topicId: data[0].id }));
        }
      });
    } else if (activeTab === "users") {
      setLoading(true);
      fetchUsers()
        .then(data => setUsersList(data))
        .catch(err => setMessage({ text: err.message || "Lỗi tải danh sách người dùng", type: "error" }))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createTopic(topic);
      setMessage({ text: "Thêm bài học thành công!", type: "success" });
      setTopic({ title: "", summary: "", content: "", thumbnailUrl: "", category: "Triết học Mác-Lênin", author: "Admin" });
    } catch (err: any) {
      setMessage({ text: err.message || "Lỗi khi thêm bài học", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createQuizQuestion({
        topicId: Number(quiz.topicId),
        question: quiz.question,
        optionA: quiz.optionA,
        optionB: quiz.optionB,
        optionC: quiz.optionC,
        optionD: quiz.optionD,
        correctAnswer: quiz.correctAnswer
      });
      setMessage({ text: "Thêm câu hỏi trắc nghiệm thành công!", type: "success" });
      setQuiz({ ...quiz, question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A" });
    } catch (err: any) {
      setMessage({ text: err.message || "Lỗi khi thêm câu hỏi", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <Badge className="bg-[#fce5cd] text-[#b45f06] border-0 hover:bg-[#fce5cd]">
          Admin Panel
        </Badge>
        <h1 className="font-serif mt-3 text-[#2f3d2f]" style={{ fontSize: "32px" }}>
          Quản trị nội dung
        </h1>
        <p className="text-sm text-[#7a8473] mt-1">
          Thêm bài học và câu hỏi trắc nghiệm mới vào hệ thống.
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => { setActiveTab("topic"); setMessage(null); }}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            activeTab === "topic" ? "bg-[#3f6048] text-white shadow-md" : "bg-white/60 text-[#5a6557] hover:bg-white/80"
          }`}
        >
          <BookOpen className="size-4" /> Thêm bài học
        </button>
        <button
          onClick={() => { setActiveTab("quiz"); setMessage(null); }}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            activeTab === "quiz" ? "bg-[#3f6048] text-white shadow-md" : "bg-white/60 text-[#5a6557] hover:bg-white/80"
          }`}
        >
          <Brain className="size-4" /> Thêm câu hỏi
        </button>
        <button
          onClick={() => { setActiveTab("users"); setMessage(null); }}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition flex items-center gap-2 ${
            activeTab === "users" ? "bg-[#3f6048] text-white shadow-md" : "bg-white/60 text-[#5a6557] hover:bg-white/80"
          }`}
        >
          <Users className="size-4" /> Quản lý Account
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-6 flex justify-between items-center ${
          message.type === "success" ? "bg-[#eef6f1] text-[#2f4a32] border border-[#cfe1cf]" : "bg-[#fbeee8] text-[#8a4d3a] border border-[#f5ddd5]"
        }`}>
          <div className="text-sm">{message.text}</div>
          <button onClick={() => setMessage(null)} className="opacity-50 hover:opacity-100"><X className="size-4" /></button>
        </div>
      )}

      {activeTab === "topic" && (
        <Card className="rounded-3xl border border-white/60 bg-white/40 shadow-sm">
          <CardContent className="p-8">
            <form onSubmit={handleTopicSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Tiêu đề bài học *</label>
                  <input required value={topic.title} onChange={e => setTopic({...topic, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" placeholder="Nhập tiêu đề..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Chuyên mục *</label>
                  <input required value={topic.category} onChange={e => setTopic({...topic, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" placeholder="VD: Triết học Mác-Lênin" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#3a4a3a]">Tóm tắt (hiện ở danh sách)</label>
                <textarea rows={2} value={topic.summary} onChange={e => setTopic({...topic, summary: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" placeholder="Viết tóm tắt ngắn..." />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#3a4a3a]">Nội dung chi tiết (HTML/Markdown) *</label>
                <textarea required rows={10} value={topic.content} onChange={e => setTopic({...topic, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm font-mono text-sm focus:ring-2 focus:ring-[#9ab99a]" placeholder="<h2>Tiêu đề phụ</h2><p>Nội dung bài học...</p>" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">URL Hình ảnh (Thumbnail)</label>
                  <input value={topic.thumbnailUrl} onChange={e => setTopic({...topic, thumbnailUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Tác giả</label>
                  <input value={topic.author} onChange={e => setTopic({...topic, author: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-6 rounded-xl bg-[#3f6048] hover:bg-[#2d5a3a] text-white">
                  {loading ? <RefreshCw className="size-5 animate-spin mr-2" /> : <Save className="size-5 mr-2" />}
                  Lưu Bài Học Mới
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "quiz" && (
        <Card className="rounded-3xl border border-white/60 bg-white/40 shadow-sm">
          <CardContent className="p-8">
            <form onSubmit={handleQuizSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#3a4a3a]">Chọn chuyên đề *</label>
                <select required value={quiz.topicId} onChange={e => setQuiz({...quiz, topicId: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]">
                  <option value={0} disabled>-- Chọn một chuyên đề --</option>
                  {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#3a4a3a]">Câu hỏi *</label>
                <textarea required rows={2} value={quiz.question} onChange={e => setQuiz({...quiz, question: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" placeholder="Nhập nội dung câu hỏi..." />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Đáp án A *</label>
                  <input required value={quiz.optionA} onChange={e => setQuiz({...quiz, optionA: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Đáp án B *</label>
                  <input required value={quiz.optionB} onChange={e => setQuiz({...quiz, optionB: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Đáp án C *</label>
                  <input required value={quiz.optionC} onChange={e => setQuiz({...quiz, optionC: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#3a4a3a]">Đáp án D *</label>
                  <input required value={quiz.optionD} onChange={e => setQuiz({...quiz, optionD: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]" />
                </div>
              </div>

              <div className="space-y-2 w-1/2">
                <label className="text-sm font-medium text-[#3a4a3a]">Đáp án đúng *</label>
                <select required value={quiz.correctAnswer} onChange={e => setQuiz({...quiz, correctAnswer: e.target.value})} className="w-full px-4 py-3 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#9ab99a]">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-6 rounded-xl bg-[#3f6048] hover:bg-[#2d5a3a] text-white">
                  {loading ? <RefreshCw className="size-5 animate-spin mr-2" /> : <Save className="size-5 mr-2" />}
                  Lưu Câu Hỏi Trắc Nghiệm
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "users" && (
        <Card className="rounded-3xl border border-white/60 bg-white/40 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {loading && usersList.length === 0 ? (
              <div className="p-8 flex justify-center"><RefreshCw className="size-6 animate-spin text-[#3f6048]" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#f3f6ec] text-[#5a6557] font-medium border-b border-[#e1e8d9]">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Tài khoản</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Điểm</th>
                      <th className="px-6 py-4">Quyền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u, i) => (
                      <tr key={u.id} className={`border-b border-[#e1e8d9] hover:bg-[#fafbf8] transition ${i === usersList.length - 1 ? 'border-0' : ''}`}>
                        <td className="px-6 py-4 font-mono text-[#7a8473]">{u.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatarUrl || `https://ui-avatars.com/api/?name=${u.name}&background=random`} alt={u.name} className="size-8 rounded-full bg-gray-100" />
                            <span className="font-medium text-[#2f3d2f]">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#5a6557]">{u.email}</td>
                        <td className="px-6 py-4 font-bold text-[#d49a55]">{u.totalScore} XP</td>
                        <td className="px-6 py-4">
                          <Badge className={u.role === "Admin" ? "bg-[#e8d7f4] text-[#6b3594] hover:bg-[#e8d7f4]" : "bg-[#e2edf6] text-[#3b6b90] hover:bg-[#e2edf6]"}>
                            {u.role}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    {usersList.length === 0 && !loading && (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-[#7a8473]">Chưa có người dùng nào.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
