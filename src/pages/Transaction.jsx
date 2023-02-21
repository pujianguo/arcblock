import { Card, Empty, Pagination, message, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { CopyOutlined, DownOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { classnames, getShortAddress, getNumberString, valueToEther, formatSecond, decimalString } from '@/utils';

const startList = JSON.parse(
  '[{"index":0,"hash":"25e4fb7042fc25fe98582adf598357e3b0bc60021cd80de628599512abb63598","shortHash":"25e4...3598","time":1608620982,"ver":1,"vin_sz":1,"vout_sz":4,"size":329,"weight":1208,"fee":0,"relayed_by":"0.0.0.0","lock_time":2390244852,"tx_index":5355406891307691,"double_spend":false,"block_index":662463,"block_height":662463,"inputs":[{"sequence":4294967295,"witness":"01200000000000000000000000000000000000000000000000000000000000000000","script":"03bf1b0a04ba9be15f2f706f6f6c696e2e636f6d2f746170726f6f742f626970392fef058602302864a933f742f80698085311c191d861002dd7010000000000","index":0,"prev_out":{"n":4294967295,"script":"","spending_outpoints":[{"n":0,"tx_index":5355406891307691}],"spent":true,"tx_index":0,"type":0,"value":0}}],"out":[{"type":0,"spent":true,"value":641583560,"spending_outpoints":[{"tx_index":1501575876861430,"n":2}],"n":0,"tx_index":5355406891307691,"script":"a9149837b6ca944b36f71b94d19cf1e1acd17972642487","addr":"3FZsNnE2PJfhaAeRRtsNijm9WpCv4xvkkz"},{"type":0,"spent":false,"value":0,"spending_outpoints":[],"n":1,"tx_index":5355406891307691,"script":"6a24b9e11b6ddccb4730dd13ee44cc9eed1ab57357dd3af7a65667b0a86e96f9cd41d33216b1"},{"type":0,"spent":false,"value":0,"spending_outpoints":[],"n":2,"tx_index":5355406891307691,"script":"6a24aa21a9edd346b25a5a0045ee3dece08ca6d0a45c4ff70d73e1f871c9675933511adcb498"},{"type":0,"spent":false,"value":0,"spending_outpoints":[],"n":3,"tx_index":5355406891307691,"script":"6a2952534b424c4f434b3af4f39b1d084072e4e00dfeef19004ace6c3b4b75698998be9d14762c002d3588"}]},{"index":1,"hash":"ecbaf13b3c726f7f3b03bc2578def60dc6c41259bc07ac4af2a6a7bfc09ce337","shortHash":"ecba...e337","time":1608620982,"ver":2,"vin_sz":3,"vout_sz":1,"size":536,"weight":1175,"fee":93431,"relayed_by":"0.0.0.0","lock_time":662462,"tx_index":1966423263409396,"double_spend":false,"block_index":662463,"block_height":662463,"inputs":[{"sequence":4294967294,"witness":"0247304402207ccd670d9e8ab968e31d4858be19311cd1e6b8d6a4a2d3c576b7ca6c50d7f47a02204e6950a2f073169d14e7da3541b4b48abdea6ccac89d1a65e9ea26bc9c2afc3e012102d7d92bcf252355fe944ecb76f3e5e6afebc1748a784656d9a7fd8203b5131ad9","script":"","index":0,"prev_out":{"addr":"bc1qq5l34rvg7lzynr2cv8m3jf0cne8au0g6kn7s4x","n":0,"script":"0014053f1a8d88f7c4498d5861f71925f89e4fde3d1a","spending_outpoints":[{"n":0,"tx_index":1966423263409396}],"spent":true,"tx_index":6259734792976457,"type":0,"value":851770}},{"sequence":4294967294,"witness":"02473044022027724715d97cf477cd8eff532523d52760a190aacf7754c5a3cbc0b67ef02de8022014c12e4f7bf56cafb104fa85fa564489bd887b895bd86cd431589656c5e2493f012102338d2f0ddc12292ae89614521ef36eb6a22cf2b8bc04b0df1691e64f44f208d9","script":"16001427710c80f6751e0a036c403254f5813725618c84","index":1,"prev_out":{"addr":"39B8Q3Z3hhva3RWn55qqjxkaaF9BaRe6dG","n":0,"script":"a9145219ee887d27caced4018ef75711c8b71f04ee7387","spending_outpoints":[{"n":1,"tx_index":1966423263409396}],"spent":true,"tx_index":973819361762426,"type":0,"value":209661}},{"sequence":4294967294,"witness":"0247304402204a9f2cc763b902332490fbd48153587725682e12c787b52c4efe14298d126159022078c6b367095f4b4160e75e72aa0db6cc7f94c3c2d1299bdae74223b7fc05f9be012102f21cae887977bf0635b7795c3bb0221c8bcb013e72b568a2f585eb13e59d9b39","script":"1600149ba3afcea31d6c5a43aa7a49fef9457be71c0a51","index":2,"prev_out":{"addr":"39mGiGTiPaX67Kxp77zx2XpojD8k1ivaZ2","n":0,"script":"a914588f03c9f83d0db6ac1236955dccff4339cb4fda87","spending_outpoints":[{"n":2,"tx_index":1966423263409396}],"spent":true,"tx_index":6429141544781108,"type":0,"value":3000000}}],"out":[{"type":0,"spent":true,"value":3968000,"spending_outpoints":[{"tx_index":6788440544731550,"n":0}],"n":0,"tx_index":1966423263409396,"script":"76a9141c045845e00a160397b2cc62b9876bb6d9835e4d88ac","addr":"13Z98FkiVvMNDqvWAZKWnNg3F66GR8gUie"}]},{"index":2,"hash":"b15bb075d22c8a276bd7b8a29f60229702119acfe995905835dc26c0107d0424","shortHash":"b15b...0424","time":1608620982,"ver":1,"vin_sz":1,"vout_sz":2,"size":382,"weight":766,"fee":50000,"relayed_by":"0.0.0.0","lock_time":0,"tx_index":1267254295004379,"double_spend":false,"block_index":662463,"block_height":662463,"inputs":[{"sequence":4294967295,"witness":"04004730440220298a34ddc02f9cc3e0c5f272029b7a5c63bbc48c9dc4733a5a5d3b949ea2b04a022046043cd1337394007190c1f47a9fbfc65520805328dc50c4f315768aebe6e46b0147304402204c9299bfa11ced4f0443ebcd174acde1c025921cc752009e8f07650acc7a2bb302202bb9d7bd6dd9aea90f102e3f505ec79748cf77050a284ce98ed362df06d59354016952210375e00eb72e29da82b89367947f29ef34afb75e8654f6ea368e0acdfd92976b7c2103a1b26313f430c4b15bb1fdce663207659d8cac749a0e53d70eff01874496feff2103c96d495bfdd5ba4145e3e046fee45e84a8a48ad05bd8dbb395c011a32cf9f88053ae","script":"","index":0,"prev_out":{"addr":"bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej","n":2,"script":"0020701a8d401c84fb13e6baf169d59684e17abd9fa216c8cc5b9fc63d622ff8c58d","spending_outpoints":[{"n":0,"tx_index":1267254295004379}],"spent":true,"tx_index":8701005538167377,"type":0,"value":1162912}}],"out":[{"type":0,"spent":true,"value":506000,"spending_outpoints":[{"tx_index":2554583002155562,"n":311}],"n":0,"tx_index":1267254295004379,"script":"76a91471499b9efdbf6f8f9bf3acb53921633476d2d67c88ac","addr":"1BL1Y3VjyRBM44vr2parCXb9HquGDU4bdA"},{"type":0,"spent":true,"value":606912,"spending_outpoints":[{"tx_index":6255698307092705,"n":1}],"n":1,"tx_index":1267254295004379,"script":"0020701a8d401c84fb13e6baf169d59684e17abd9fa216c8cc5b9fc63d622ff8c58d","addr":"bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej"}]},{"index":3,"hash":"ae690a0a93740af3ca0629141015715bd382be4dc9f2e04d141d1e9cbc05f049","shortHash":"ae69...f049","time":1608620982,"ver":1,"vin_sz":1,"vout_sz":2,"size":371,"weight":821,"fee":50000,"relayed_by":"0.0.0.0","lock_time":0,"tx_index":2601447591216067,"double_spend":false,"block_index":662463,"block_height":662463,"inputs":[{"sequence":4294967295,"witness":"0400473044022050c36d9de6d70930641f9b05f611a105ee9be85c56b40bb1e084f2a10b68156502205053f40785b8caadaed39df859e9ef8416b1cc33c1bea3e52ff60cdbd18ea20501483045022100c2c546a511ba8f9421a8f2fdaf606e15e0449d00048a9079888547ddcbb7128e02204a831a0bdde0bccbad3e8eb6e8c2bcd0e82e24649259cf07c8dcb09f91a5c8240147522103c972287632e4b2c00a1e51c5d3909bff60080c4839dec3bdb47d28759db33c8b2103e3685c39f554f7cc9e5630f2b26197ea5754581b844912bc2cd66fd341126f4452ae","script":"220020b13908f28a441a50bf748b9b701becdaf83bf566de4cf7d745b8112a0fd1bbd7","index":0,"prev_out":{"addr":"3KYyWfAVnWRgLvvvRrhatxdmE8xBHSevVb","n":1,"script":"a914c3ecec52aeaefd8cee54161af6de1b4cd9c6263087","spending_outpoints":[{"n":0,"tx_index":2601447591216067}],"spent":true,"tx_index":3770522252441448,"type":0,"value":107283069}}],"out":[{"type":0,"spent":true,"value":1392581,"spending_outpoints":[{"tx_index":706169298480321,"n":1}],"n":0,"tx_index":2601447591216067,"script":"a914b4979e237797a12a7033e6da4e924115119c77eb87","addr":"3J9uBf6mEPfVVtQ6GThLT4LzpMvATPSdc4"},{"type":0,"spent":true,"value":105840488,"spending_outpoints":[{"tx_index":220702490367270,"n":0}],"n":1,"tx_index":2601447591216067,"script":"a914c3ecec52aeaefd8cee54161af6de1b4cd9c6263087","addr":"3KYyWfAVnWRgLvvvRrhatxdmE8xBHSevVb"}]},{"index":4,"hash":"4a7ffeb21cdf228995a0090c2b35f200bdb09ea036e230d50835c6bb30d85fad","shortHash":"4a7f...5fad","time":1608620982,"ver":1,"vin_sz":1,"vout_sz":2,"size":223,"weight":892,"fee":50000,"relayed_by":"0.0.0.0","lock_time":0,"tx_index":6100069138266310,"double_spend":false,"block_index":662463,"block_height":662463,"inputs":[{"sequence":4294967295,"witness":"","script":"47304402203cbfa7be8b18312375ec748da65f57e6f5b917813512e34a7b426156b1dae0e702200f9887a2e173dd495c0b7e3089041c94bf561858bb5b1326736e3a11e0de17450121028c9d88c0f58b2a33d9e790299c3e899936dcf00bbe420529d5091c8484da376d","index":0,"prev_out":{"addr":"1Gaw8aSPMCp1MjNPTXZgXTwY5wdFGDV9Ty","n":1,"script":"76a914aaf4ccaa0b74c41afbece8218e23dfa57f18fdbb88ac","spending_outpoints":[{"n":0,"tx_index":6100069138266310}],"spent":true,"tx_index":6710896419532667,"type":0,"value":6030434}}],"out":[{"type":0,"spent":true,"value":3043553,"spending_outpoints":[{"tx_index":2070433628171335,"n":11}],"n":0,"tx_index":6100069138266310,"script":"a9143b6cc2cf00aebe392474f3892ddb5ef79a2e73fc87","addr":"377E5hvvcXd7fndVzPtpSv2PDtBGXLd3M3"},{"type":0,"spent":true,"value":2936881,"spending_outpoints":[{"tx_index":3879229634044513,"n":0}],"n":1,"tx_index":6100069138266310,"script":"76a914dad69f7ce2adeca552e83f8f0bda8bdd621333ed88ac","addr":"1Lx7R61qbwQFKtx3MUg5NAmwhgsESLta7Z"}]}]'
);

function View({ info, loading }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [allList, setAllList] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 15;

  const handlePageChange = (i) => {
    setCurrentPage(i);
    const start = (currentPage - 1) * size;
    const end = start + size;
    const list = allList.slice(start, end);
    setList(list);
  };
  const getItem = (item, i) => {
    const allValue = item.out.reduce((pre, cur) => {
      return pre + cur.value;
    }, 0);

    return {
      ...item,
      index: i,
      hash: item.hash,
      shortHash: getShortAddress(item.hash),
      time: formatSecond(item.time),
      fee: item.fee > 1000 ? `${decimalString(item.fee / 1000, 1)}k` : item.fee,
      allValue: valueToEther(allValue),
      open: true,
      moreHeight: 39 + Math.max(item.vin_sz, item.vout_sz) * 52,
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

  const initData = () => {
    const list = info.map((x, i) => getItem(x, i));
    // console.log(JSON.stringify(list.slice(0, 5)));
    setAllList(list);
  };

  const init = () => {
    // initData();
    // setCurrentPage(1);
    // setTotal(info.length);
    // setList([]);
    // handlePageChange(1);
  };

  useEffect(() => {
    // init();
  }, [info]);
  useEffect(() => {
    console.log('xxxs1', startList);
    const list = startList.map((x, i) => getItem(x, i));
    console.log('xxxs', list);
    setList(list);
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
        {!list.length ? (
          <Empty />
        ) : (
          <div className="w-full overflow-hidden">
            <div className="table w-full overflow-hidden">
              {list.map((line, index) => {
                return (
                  <div className="line w-full" key={line.hash}>
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
                              <CopyOutlined className="text-gray-400" onClick={() => handleCopy(line.hash)} />
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
                                      onClick={() => handleCopy(line.inputs[0].addr)}
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
                      style={{ height: line.open ? `${line.moreHeight}px` : 0 }}>
                      <div
                        className={classnames(
                          'flex flex-wrap h-full box-border border-0 border-b border-solid border-gray-200 '
                        )}>
                        <div className="from max-h-full w-full lg:w-1/2 border-0 lg:border-r border-solid border-gray-200 p-2">
                          <div className="font-medium text-lg	">From</div>
                          <div>
                            <div>
                              {line.inputs.map((input, i) => (
                                <div className="flex mb-2" key={input.addr}>
                                  <div className="font-medium w-6">{i + 1}</div>
                                  <div>
                                    {input.addr ? (
                                      <div className="flex items-center text-sm">
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
                        <div className="to max-h-full w-full lg:w-1/2 p-2">
                          <div className="font-medium text-lg">To</div>
                          <div>
                            {line.out.map((out, i) => (
                              <div className="flex mb-2" key={out.addr}>
                                <div className="font-medium w-6">{i + 1}</div>
                                <div>
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
            <div className="w-full flex justify-center mt-4">
              <Pagination current={currentPage} total={total} showSizeChanger={false} onChange={handlePageChange} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default View;
