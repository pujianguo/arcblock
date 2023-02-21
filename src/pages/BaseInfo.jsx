import { Card, Empty, message, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

function View({ info, loading }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = () => {
    copy(info.hash);
    messageApi.success('Copied To Clipboard!');
  };
  return (
    <div className="w-full">
      {contextHolder}
      <Card title="Base Info" loading={loading}>
        {!info ? (
          <Empty />
        ) : (
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2">
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Hash</div>
                <div className="w-3/5 text-gray-500 hover:font-medium">
                  <Tooltip placement="top" title={info.hash}>
                    {info.shortHash}
                    <CopyOutlined onClick={handleCopy} />
                  </Tooltip>
                </div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Height</div>
                <div className="w-3/5 text-gray-500">{info.height}</div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Weight</div>
                <div className="w-3/5 text-gray-500">{info.weight}</div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Size</div>
                <div className="w-3/5 text-gray-500">{info.size}</div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Time</div>
                <div className="w-3/5 text-gray-500">{info.time}</div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Fee</div>
                <div className="w-3/5 text-gray-500">{info.fee} BTC</div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Bits</div>
                <div className="w-3/5 text-gray-500">{info.bits}</div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Nonce</div>
                <div className="w-3/5 text-gray-500">{info.nonce}</div>
              </div>
              <div className="h-5 mb-1 flex items-center">
                <div className="w-2/5">Transactions</div>
                <div className="w-3/5 text-gray-500">{info.n_tx}</div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default View;
