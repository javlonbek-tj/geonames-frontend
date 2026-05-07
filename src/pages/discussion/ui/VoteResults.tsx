import { Progress } from 'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

interface Props {
  supportCount: number;
  opposeCount: number;
  total: number;
  supportPct: number;
  opposePct: number;
}

export default function VoteResults({
  supportCount,
  opposeCount,
  total,
  supportPct,
  opposePct,
}: Props) {
  return (
    <div className="bg-white border border-[#e3e8f0] rounded-2xl px-8 py-6">
      <h3 className="text-base font-bold text-[#0f1f3d] mb-5">Ovoz natijasi</h3>

      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold text-green-800 flex items-center gap-1">
          <LikeFilled />
          {supportPct}% ({supportCount} ta)
        </span>
        <span className="font-semibold text-red-800 flex items-center gap-1">
          {opposePct}% ({opposeCount} ta)
          <DislikeFilled />
        </span>
      </div>
      <Progress
        percent={supportPct}
        showInfo={false}
        strokeColor={{ from: '#16a34a', to: '#4ade80' }}
        trailColor="#fecaca"
        className="!mb-0"
      />
      <div className="text-center text-sm text-gray-400 mt-2">
        Jami: {total} ovoz
      </div>
    </div>
  );
}
