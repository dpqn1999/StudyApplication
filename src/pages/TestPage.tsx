import { useEffect, useMemo, useState } from "react";
import { answerBenhHoc, benhhoc } from "../data/BenhHoc";
import { QUESTIONMODAL } from "./Test";
import TestModal from "./modals/TestModal";
import QuestionCard from "../components/QuestionCard";
import { Button, Space } from "antd";

export interface Mode {
  from: number;
  to: number;
  total: number;
  mode: string;
}

const TestPage = () => {
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState<QUESTIONMODAL[]>([]);
  const [selectedOption, setSelectedOption] = useState<Mode>();
  const [questions, setQuestions] = useState<QUESTIONMODAL[]>([]);
  const [totalError, setTotalError] = useState(0);

  const [checkedAnswer, setCheckedAnswer] = useState<QUESTIONMODAL[]>([]);
  const [isTesting, setIsTesting] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    setIsSubmit(false);
    setIsTesting(true);
    setCheckedAnswer([]);
    setTotalError(0);
    selectedOption && renderQuestion();
  }, [selectedOption, data]);

  function shuffle(array: QUESTIONMODAL[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  const renderQuestion = () => {
    if (selectedOption?.mode === "Bình thường") {
      setQuestions(data.slice(selectedOption.from - 1, selectedOption.to));
    } else {
      let test = [...data];

      shuffle(test);

      setQuestions(test.splice(0, selectedOption?.total));
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

    setData(dataT);
  };

  const messageContent = useMemo(() => {
    return (
      <div className="flex gap-4 flex-col">
        {questions.map((q) => (
          <QuestionCard
            question={q.question}
            answers={q.answers}
            correctAnswer={q.correctAnswer}
            isShow={false}
            isTesting={true}
            isSubmit={isSubmit}
            onChange={(isRemove: boolean, answer: string) => {
              if (isRemove) {
                const tmp = checkedAnswer.filter((c) => c.id !== q.id);
                setCheckedAnswer(tmp);
              } else {
                setCheckedAnswer((old) => [
                  ...old,
                  { ...q, correctAnswer: answer },
                ]);
              }
            }}
          />
        ))}
      </div>
    );
  }, [questions, isTesting, checkedAnswer, isSubmit]);

  const onSubmit = () => {
    let errort = 0;
    checkedAnswer.forEach((C) => {
      if (C.tmpAnswer !== C.correctAnswer || !C.tmpAnswer) {
        errort += 1;
      }
    });

    setTotalError(questions.length - errort);
    setIsSubmit(true);
  };

  return (
    <div>
      <div>
        <div className="">
          <div className="bg-white p-2 mb-4 border rounded-lg px-4">
            <div className="flex items-center">
              <div className="flex-1 ">
                <div>Chế độ: {selectedOption?.mode}</div>
                <div>
                  {selectedOption?.mode === "Bình thường" ? (
                    <Space>
                      <div>Từ câu: {selectedOption.from}</div>
                      <div>{`->`}</div>
                      <div>Đến câu: {selectedOption.to}</div>
                    </Space>
                  ) : (
                    <div>Số câu: {selectedOption?.total}</div>
                  )}
                </div>
              </div>

              <div style={{ marginRight: 24 }}>
                {isSubmit && (
                  <Space>
                    Tổng điểm:{" "}
                    {`${questions.length - totalError}/${questions.length}`}
                  </Space>
                )}
              </div>

              <div>
                <Button
                  onClick={() => {
                    onSubmit();
                  }}
                  type="primary"
                >
                  Chấm điểm
                </Button>
              </div>
            </div>
          </div>
        </div>

        <TestModal
          isVisible={visible}
          length={data.length}
          setSelectedOption={setSelectedOption}
          onCancel={() => setVisible(false)}
        />

        {messageContent}
      </div>
    </div>
  );
};

export default TestPage;
