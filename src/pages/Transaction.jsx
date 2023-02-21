import { Card, Empty, Pagination, message, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { CopyOutlined, DownOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { classnames, getShortAddress, valueToEther, formatSecond, decimalString } from '@/utils';

function View({ info, loading }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [isLg, setIsLg] = useState(true);
  const [allList, setAllList] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 15;

  const handlePageChange = (i, initList = []) => {
    setCurrentPage(i);
    const start = (i - 1) * size;
    const end = start + size;
    let arr = allList.slice(start, end);
    if (initList.length) {
      arr = initList.slice(start, end);
    }
    setList(arr);
  };
  const getItem = (item, i) => {
    const allValue = item.out.reduce((pre, cur) => {
      return pre + cur.value;
    }, 0);

    return {
      index: i,
      hash: item.hash,
      shortHash: getShortAddress(item.hash),
      time: formatSecond(item.time),
      fee: item.fee > 1000 ? `${decimalString(item.fee / 1000, 1)}k` : item.fee,
      allValue: valueToEther(allValue),
      open: false,
      moreMinHeight: 44 + Math.max(item.vin_sz, item.vout_sz) * 52,
      moreMaxHeight: 44 * 2 + (item.vin_sz + item.vout_sz) * 52,
      inputs: item.inputs.map((input) => {
        return {
          addr: input.prev_out.addr,
          shortAddr: getShortAddress(input.prev_out.addr),
          value: valueToEther(input.prev_out.value),
        };
      }),
      out: item.out.map((out) => {
        return {
          addr: out.addr,
          shortAddr: getShortAddress(out.addr),
          value: valueToEther(out.value),
        };
      }),
    };
  };

  const init = () => {
    const arr = info.map((x, i) => getItem(x, i));
    setAllList(arr);
    setCurrentPage(1);
    setTotal(info.length);
    setList([]);
    handlePageChange(1, arr);
  };

  const windowResize = () => {
    if (window.innerWidth > 1024) {
      setIsLg(true);
    } else {
      setIsLg(false);
    }
  };
  const addListener = () => {
    window.addEventListener('resize', windowResize);
  };

  useEffect(() => {
    init();
  }, [info]);

  useEffect(() => {
    windowResize();
    addListener();
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  const handleCopy = (text, e) => {
    copy(text);
    messageApi.success('Copied To Clipboard!');
    e.stopPropagation();
  };
  const handleOpen = (line, i) => {
    const arr = JSON.parse(JSON.stringify(list));
    arr[i] = { ...line, open: !line.open };
    setList(arr);
  };

  return (
    <div className="w-full mt-5 home-transaction">
      {contextHolder}
      <Card title="Transactions" loading={loading}>
        {!info.length ? (
          <Empty />
        ) : (
          <div className="w-full overflow-hidden">
            <div className="table w-full overflow-hidden">
              {list.map((line, index) => {
                return (
                  <div className="line w-full" key={line.hash + index}>
                    <div
                      className="header relative p-2 pr-6 box-border border-0 border-b border-solid border-gray-200 w-full flex flex-wrap items-center"
                      onClick={() => handleOpen(line, index)}>
                      <div className="rounded-full mr-5 border border-solid border-gray-300 h-8 w-8 flex items-center justify-center">
                        TX
                      </div>
                      <div className="content flex-1 flex flex-wrap items-center justify-between">
                        <div className="w-full mb-2 md:flex-1 md:mb-0">
                          <div>
                            <span>{line.index} </span>
                            <span className="text-gray-400">ID: </span>
                            <span>
                              <Tooltip placement="top" title={line.hash}>
                                <span className="text-[#ed9b60]">{line.shortHash} </span>
                              </Tooltip>
                              <CopyOutlined className="text-gray-400" onClick={(e) => handleCopy(line.hash, e)} />
                            </span>
                          </div>
                          <div className="text-gray-400">{line.time}</div>
                        </div>
                        <div className="w-full mb-2 md:flex-1 md:mb-0">
                          <div className="from">
                            <span>From </span>
                            {line.inputs.length > 1 ? (
                              <span className="text-gray-400">{line.inputs.length} Inputs</span>
                            ) : (
                              <span className="text-gray-400">
                                {!line.inputs[0].addr ? (
                                  'Block Reward'
                                ) : (
                                  <span>
                                    <Tooltip placement="top" title={line.inputs[0].addr}>
                                      <span className="text-[#ed9b60]">{line.inputs[0].shortAddr} </span>
                                    </Tooltip>
                                    <CopyOutlined
                                      className="text-gray-400"
                                      onClick={(e) => handleCopy(line.inputs[0].addr, e)}
                                    />
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                          <div className="to">
                            <span>To </span>
                            {line.out.length > 1 ? (
                              <span className="text-gray-400">{line.out.length} Outputs</span>
                            ) : (
                              <span className="text-gray-400">
                                {!line.out[0].addr ? (
                                  'Block Reward'
                                ) : (
                                  <span>
                                    <Tooltip placement="top" title={line.out[0].addr}>
                                      <span className="text-[#ed9b60]">{line.out[0].shortAddr} </span>
                                    </Tooltip>
                                    <CopyOutlined
                                      className="text-gray-400"
                                      onClick={(e) => handleCopy(line.out[0].addr, e)}
                                    />
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-full mb-2 md:flex-1 md:mb-0">
                          <div>
                            <span>{line.allValue} BTC</span>
                          </div>
                          <div>
                            <span className="text-[#f45b69]">Fee </span>
                            <span>{line.fee} Sats </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={classnames(
                          'absolute top-4 right-4 transform duration-200',
                          line.open && 'rotate-180'
                        )}>
                        <DownOutlined />
                      </div>
                    </div>
                    <div
                      className={classnames('body overflow-hidden transform duration-200')}
                      style={{ height: line.open ? `${isLg ? line.moreMinHeight : line.moreMaxHeight}px` : 0 }}>
                      <div
                        className={classnames(
                          'flex flex-wrap h-full box-border border-0 border-b border-solid border-gray-200 '
                        )}>
                        <div className="from max-h-full w-full lg:w-1/2 border-0 lg:border-r border-solid border-gray-200 p-2 box-border">
                          <div className="font-medium text-lg	">From</div>
                          <div>
                            <div>
                              {line.inputs.map((input, i) => (
                                <div className="flex mb-2" key={`${input.addr}-${i}`}>
                                  <div className="font-medium w-6">{i + 1}</div>
                                  <div className="flex-1 w-0">
                                    {input.addr ? (
                                      <div className="w-full flex items-center text-sm">
                                        <div className="text-[#ed9b60] truncate">{input.addr} </div>
                                        <CopyOutlined
                                          className="text-gray-400"
                                          onClick={(e) => handleCopy(input.addr, e)}
                                        />
                                      </div>
                                    ) : (
                                      'Block Reward'
                                    )}
                                    <div>{input.value} BTC</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="to max-h-full w-full lg:w-1/2 p-2 box-border">
                          <div className="font-medium text-lg">To</div>
                          <div>
                            {line.out.map((out, i) => (
                              <div className="flex mb-2" key={`${out.addr}-${i}`}>
                                <div className="font-medium w-6">{i + 1}</div>
                                <div className="flex-1 w-0">
                                  {out.addr ? (
                                    <div className="flex items-center text-sm">
                                      <div className="text-[#ed9b60] truncate">{out.addr} </div>
                                      <CopyOutlined
                                        className="text-gray-400"
                                        onClick={(e) => handleCopy(out.addr, e)}
                                      />
                                    </div>
                                  ) : (
                                    'Unknown'
                                  )}
                                  <div>{out.value} BTC</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-center my-4">
              <Pagination
                current={currentPage}
                pageSize={size}
                total={total}
                showSizeChanger={false}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default View;
