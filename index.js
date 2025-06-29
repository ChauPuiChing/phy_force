import MechanicsQuestionBank from './MechanicsQuestionBank';
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, BookOpen, TrendingUp, Target, CheckCircle, XCircle, BarChart3, Lightbulb } from 'lucide-react';

const MechanicsQuestionBank = () => {
  // 模擬題庫數據（根據你提供的答案）
  const questionBank = [
    {
      id: 1, 
      year: "2005", 
      paper: "P2", 
      qNum: "Q1",
      topic: "力學基礎",
      difficulty: "容易",
      question: "一個物體在水平面上做等速直線運動，關於該物體的受力情況，下列說法正確的是：",
      options: ["A) 物體不受任何力", "B) 物體受到的合力為零", "C) 物體只受重力", "D) 物體受到向前的推力"],
      answer: "B",
      explanation: "根據牛頓第一定律，物體做等速直線運動時，所受合力必須為零。雖然物體可能受到多個力（如重力、支持力、摩擦力等），但這些力相互抵消，合力為零。"
    },
    {
      id: 2,
      year: "2009",
      paper: "P2", 
      qNum: "Q5",
      topic: "動量守恆",
      difficulty: "中等",
      question: "兩個質量相等的小球發生完全彈性碰撞，碰撞前一球靜止，另一球以速度v撞擊。碰撞後：",
      options: ["A) 原來運動的球停止，原來靜止的球以速度v運動", "B) 兩球都以v/2的速度運動", "C) 原來運動的球反彈", "D) 兩球粘在一起"],
      answer: "A",
      explanation: "在完全彈性碰撞中，動量和動能都守恆。當兩個質量相等的球碰撞，且其中一個靜止時，運動的球會完全停止，而靜止的球會以原來運動球的速度運動。這是完全彈性碰撞的特殊情況。"
    },
    {
      id: 3,
      year: "2009",
      paper: "P2",
      qNum: "Q14", 
      topic: "圓周運動",
      difficulty: "困難",
      question: "一個物體在水平圓桌面上做勻速圓周運動，半徑為r，角速度為ω。物體與桌面間的摩擦係數為μ，則：",
      options: ["A) 摩擦力提供向心力", "B) 重力提供向心力", "C) 向心力等於μmg", "D) 以上都不對"],
      answer: "C",
      explanation: "物體做勻速圓周運動需要向心力，在水平面上只有摩擦力能提供水平方向的力。最大靜摩擦力為μmg，當向心力需求等於最大靜摩擦力時，物體剛好能維持圓周運動而不滑動。"
    }
  ];

  const examTips = [
    {
      category: "解題策略",
      tips: [
        "先畫受力圖，清楚標示所有作用力的方向和大小",
        "確定坐標系，選擇合適的參考系進行分析",
        "運用牛頓定律時，注意力的方向和正負號",
        "能量問題優先考慮機械能守恆"
      ]
    },
    {
      category: "常見陷阱",
      tips: [
        "注意區分質量和重量的概念",
        "摩擦力方向要根據相對運動趨勢判斷",
        "圓周運動中要區分線速度和角速度",
        "碰撞問題要檢查動量和能量守恆條件"
      ]
    },
    {
      category: "時間管理",
      tips: [
        "選擇題平均2-3分鐘完成一題",
        "遇到困難題目先跳過，回頭再做",
        "計算題要列出完整的解題步驟",
        "留時間檢查答案的合理性"
      ]
    }
  ];

  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    const newAnswers = {
      ...userAnswers,
      [currentQuestion]: {
        selected: selectedAnswer,
        correct: selectedAnswer === questionBank[currentQuestion].answer,
        question: questionBank[currentQuestion]
      }
    };
    setUserAnswers(newAnswers);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questionBank.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]?.selected || '');
      setShowResult(!!userAnswers[currentQuestion - 1]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setUserAnswers({});
    setShowReport(false);
  };

  const generateReport = () => {
    const answered = Object.keys(userAnswers).length;
    const correct = Object.values(userAnswers).filter(a => a.correct).length;
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    
    const topicStats = {};
    Object.values(userAnswers).forEach(answer => {
      const topic = answer.question.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total++;
      if (answer.correct) topicStats[topic].correct++;
    });

    return { answered, correct, accuracy, topicStats };
  };

      const filteredQuestions = questionBank.filter(q =>
  (q.question.includes(searchTerm) ||
   q.topic.includes(searchTerm) ||
   q.explanation.includes(searchTerm)) &&
  (selectedTopic === '' || q.topic === selectedTopic) &&
  (selectedDifficulty === '' || q.difficulty === selectedDifficulty)
);
      
  const currentQ = questionBank[currentQuestion];

  if (showTips) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-800">DSE物理考試技巧</h1>
          </div>
          
          <div className="space-y-6">
            {examTips.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">{section.category}</h3>
                <div className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setShowTips(false)}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回練習
          </button>
        </div>
      </div>
    );
  }

  if (showReport) {
    const report = generateReport();
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-800">學習報告</h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">整體表現</h3>
              <div className="text-3xl font-bold text-blue-600">{report.accuracy}%</div>
              <p className="text-gray-600">答對 {report.correct} / {report.answered} 題</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">完成進度</h3>
              <div className="text-3xl font-bold text-purple-600">{Math.round((report.answered / questionBank.length) * 100)}%</div>
              <p className="text-gray-600">已完成 {report.answered} / {questionBank.length} 題</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">各知識點掌握度</h3>
            <div className="space-y-3">
              {Object.entries(report.topicStats).map(([topic, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={topic} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{topic}</span>
                      <span className="text-sm text-gray-600">{stats.correct}/{stats.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowReport(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              繼續練習
            </button>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              重新開始
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="mb-4">
  <input
    type="text"
    placeholder="搜尋關鍵字"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    className="border rounded px-3 py-2 w-full"
  />
</div>
            <select onChange={e => setSelectedTopic(e.target.value)}>
  <option value="">全部主題</option>
  <option value="力學基礎">力學基礎</option>
  <option value="動量守恆">動量守恆</option>
  <option value="圓周運動">圓周運動</option>
</select>
<select onChange={e => setSelectedDifficulty(e.target.value)}>
  <option value="">全部難度</option>
  <option value="容易">容易</option>
  <option value="中等">中等</option>
  <option value="困難">困難</option>
</select>
            
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">DSE物理力學題庫</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTips(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              考試技巧
            </button>
            <button
              onClick={() => setShowReport(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              學習報告
            </button>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>進度: {currentQuestion + 1} / {questionBank.length}</span>
            <span>已答對: {Object.values(userAnswers).filter(a => a.correct).length} 題</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questionBank.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {currentQ.year} {currentQ.paper} {currentQ.qNum}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {currentQ.topic}
            </span>
            <span>
  {'★'.repeat(
    currentQ.difficulty === '容易' ? 1 : currentQ.difficulty === '中等' ? 2 : 3
  )}
  {'☆'.repeat(
    3 - (currentQ.difficulty === '容易' ? 1 : currentQ.difficulty === '中等' ? 2 : 3)
  )}
</span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const optionLetter = option.charAt(0);
              const isSelected = selectedAnswer === optionLetter;
              const isCorrect = currentQ.answer === optionLetter;
              
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                if (isSelected) {
                  buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
                } else {
                  buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(optionLetter)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result and Explanation */}
        {showResult && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              {userAnswers[currentQuestion]?.correct ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <h3 className="text-lg font-semibold">
                {userAnswers[currentQuestion]?.correct ? "答案正確！" : "答案錯誤"}
              </h3>
            </div>
            <div className="mb-3">
              <strong>正確答案：</strong>{currentQ.answer}
            </div>
            <div>
              <strong>詳細解析：</strong>
              <p className="mt-2 text-gray-700 leading-relaxed">{currentQ.explanation}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            上一題
          </button>

          {!showResult && selectedAnswer && (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              提交答案
            </button>
          )}

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questionBank.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            下一題
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MechanicsQuestionBank;
