import { Button, Card, Checkbox, Divider, Space } from "antd";
import { EyeOutlined } from "bu2-sax-icons";
import { useEffect, useState } from "react";

interface IProps {
  question: string;
  answers: string[];
  correctAnswer: string;
  isShow: boolean;
  onChange?: (isRemove: boolean, answer: string) => void;
  isTesting?: boolean;
  isSubmit?: boolean;
}

const QuestionCard = (props: IProps) => {
  const {
    question,
    answers,
    correctAnswer,
    isShow,
    onChange,
    isTesting,
    isSubmit,
  } = props;
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    onChange && onChange(selectedAnswer ? false : true, selectedAnswer);
  }, [selectedAnswer]);

  useEffect(() => {
    isSubmit && setIsAnswerVisible(true);
  }, [isSubmit]);
  return (
    <div>
      <Card
        bordered
        className={` bg-white rounded-md border-gray-200  border dark:border-gray-700 ${
          isAnswerVisible && isSubmit
            ? selectedAnswer === correctAnswer
              ? "bg-emerald-100"
              : "bg-red-100"
            : "hover:bg-gray-100"
        }`}
      >
        <div className="p-2">
          <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">
            {question}?
          </h5>

          {answers.map((a, index) => (
            <div>
              <Space>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAnswer(a);
                    } else {
                      setSelectedAnswer("");
                    }
                  }}
                  checked={selectedAnswer === a}
                />
                <div
                  className={
                    (isAnswerVisible || isShow) && correctAnswer === a
                      ? "text-green-700 font-semibold"
                      : ""
                  }
                >
                  {a}
                </div>
              </Space>
            </div>
          ))}
          {(!isTesting || isSubmit) && (
            <>
              <Divider
                orientationMargin={0}
                style={{ margin: "12px 0 12px 0" }}
              />
              <div className="mt-2">
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                  size="small"
                >
                  {isAnswerVisible ? "Ẩn đáp án" : `Xem đáp án`}
                </Button>

                {(isAnswerVisible || isShow) && (
                  <div>
                    <Space
                      wrap
                      size={12}
                      className="text-green-700 font-semibold text-lg mt-2"
                    >
                      <span>Đáp án:</span>
                      <span>{correctAnswer}</span>
                    </Space>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;
