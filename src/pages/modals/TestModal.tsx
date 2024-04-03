import { InputNumber, Modal, Segmented, Space } from "antd";
import { useState } from "react";
import { Mode } from "../TestPage";

interface IProps {
  isVisible: boolean;
  onCancel: () => void;
  length: number;
  setSelectedOption: (mode: Mode) => void;
}

const TestModal = ({
  isVisible,
  length,
  setSelectedOption,
  onCancel,
}: IProps) => {
  const [mode, setMode] = useState<string>("Bình thường");
  const [fromQ, setfromQ] = useState(1);
  const [toQ, setToQ] = useState(20);
  const [numberQ, setnumberQ] = useState(50);
  return (
    <Modal
      okButtonProps={{
        style: { background: "rgb(59 130 246)" },
        onClick: () => {
          onCancel();
          setSelectedOption({
            mode: mode,
            from: fromQ,
            to: toQ,
            total: numberQ,
          });
        },
      }}
      open={isVisible}
    >
      <h1 className="mb-6 text-xl font-semibold text-gray-900 leading-7">
        Chọn chế độ
      </h1>

      <div className="bg-slate-100 p-4 rounded-lg">
        <div className="">
          <h2 className="text-base font-semibold  mb-2">Chế độ</h2>
          <Segmented
            options={["Bình thường", "Ngẫu nhiên"]}
            value={mode}
            onChange={(e) => {
              setMode(e);
            }}
          />
        </div>

        <div className="py-6">
          <h2 className="text-base font-semibold  mb-2">Câu hỏi</h2>

          {mode === "Bình thường" ? (
            <Space>
              <div>Từ câu: </div>
              <InputNumber
                min={1}
                onChange={(e) => setfromQ(Number(e))}
                value={fromQ}
                max={toQ}
              />
              <div>Đến câu: </div>
              <InputNumber
                min={fromQ}
                onChange={(e) => setToQ(Number(e))}
                value={toQ}
                max={length}
              />
            </Space>
          ) : (
            <InputNumber
              min={1}
              onChange={(e) => setnumberQ(Number(e))}
              value={numberQ}
              max={length}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TestModal;
