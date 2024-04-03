import { useEffect, useMemo, useState } from "react";
import { answerBenhHoc, benhhoc } from "../data/BenhHoc";
import QuestionCard from "../components/QuestionCard";
import { Input, Segmented } from "antd";
import Search from "antd/es/input/Search";
import { DataServices } from "../services/DataService";

export interface QUESTIONMODAL {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  tmpAnswer?: string;
}

const Test = () => {
  const [data, setData] = useState<QUESTIONMODAL[]>([]);
  const [filterQuestion, setfilterQuestion] = useState<QUESTIONMODAL[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [mode, setMode] = useState("Ẩn đáp án");

  let debouncedSearch = DataServices.useDebounce(searchVal, 200);

  useEffect(() => {
    filterQUESTION();
  }, [debouncedSearch]);

  useEffect(() => {
    initData();
  }, []);

  const filterQUESTION = () => {
    if (debouncedSearch) {
      const dataT = data.filter((q) =>
        q.question.includes(debouncedSearch.trim())
      );

      setfilterQuestion(dataT);
    } else {
      setfilterQuestion(data);
    }
  };

  const initData = () => {
    const lines = benhhoc.questions.split(/\r?\n/).filter(Boolean);

    const dataT: QUESTIONMODAL[] = [];

    lines.forEach((lineT) => {
      if (lineT.startsWith("Câu")) {
        const newQ = {
          id: `${lineT.split(".").shift()?.split(" ").pop()}`,
          question: lineT,
          answers: [],
          correctAnswer: answerBenhHoc[dataT.length],
        };
        dataT[dataT.length] = newQ;
      } else {
        const answersT = dataT[dataT.length - 1]?.answers ?? [];
        answersT.push(lineT);
        dataT[dataT.length - 1].answers = answersT;
      }
    });

    setfilterQuestion(dataT);
    setData(dataT);
  };

  const messageContent = useMemo(() => {
    return (
      <>
        {filterQuestion.map((q) => (
          <QuestionCard
            question={q.question}
            answers={q.answers}
            correctAnswer={q.correctAnswer}
            isShow={mode === "Hiện đáp án"}
          />
        ))}
      </>
    );
  }, [filterQuestion, mode]);

  return (
    <div className="overflow-auto">
      <div className="flex flex-col gap-4 mx-4 ">
        <div className="flex gap-2">
          <Search
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            style={{ width: 300 }}
          />
          <Segmented
            onChange={(e) => setMode(e)}
            options={["Hiện đáp án", "Ẩn đáp án", ""]}
            defaultValue="Ẩn đáp án"
          />
        </div>
        {messageContent}
      </div>
    </div>
  );
};

export default Test;
