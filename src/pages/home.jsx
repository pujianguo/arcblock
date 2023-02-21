import { useState } from 'react';
import { Input, message, Card } from 'antd';

import { getInfo as getInfoApi } from '@/api';
import BaseInfo from './BaseInfo';
import Transaction from './Transaction';
import { getShortAddress, getNumberString, valueToEther, formatSecond } from '@/utils';
import './home.scss';

const { Search } = Input;

function Home() {
  const [hash, setHash] = useState('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa');
  const [info, setInfo] = useState({});
  const [baseInfo, setBaseInfo] = useState(null);
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (e) => {
    setHash(e.target.value);
  };
  const onSearch = async () => {
    // check hash
    if (hash === '') {
      messageApi.warning('请输入查询的Hash!');
    }
    setLoading(true);
    try {
      const res = await getInfoApi(hash);
      console.log('res', res);
      setLoading(false);
      setInfo(res);
      setBaseInfo({
        hash: res.hash,
        shortHash: getShortAddress(res.hash),
        height: getNumberString(res.height),
        weight: getNumberString(res.weight),
        size: getNumberString(res.size),
        bits: getNumberString(res.bits),
        nonce: getNumberString(res.nonce),
        n_tx: getNumberString(res.n_tx),
        fee: valueToEther(res.fee),
        time: formatSecond(res.time),
      });
      setTransactionInfo(res.tx);
    } catch (err) {
      setLoading(false);
      messageApi.error(err);
    }
  };

  return (
    <>
      <header className="fixed z-50 shadow bg-white border-0 border-b border-solid border-gray-100 top-0 left-0 w-full h-16 flex items-center justify-center">
        {contextHolder}
        <Search
          className="w-1/2"
          value={hash}
          loading={loading}
          placeholder="Input search hash"
          onChange={onChange}
          onSearch={onSearch}
          enterButton
        />
      </header>

      <div className="w-full mt-20 container mx-auto px-4">
        <BaseInfo info={baseInfo} loading={loading} />
        <Transaction info={transactionInfo} loading={loading} />
      </div>
    </>
  );
}

export default Home;
