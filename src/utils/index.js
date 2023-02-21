import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import { formatUnits } from 'ethers';

export const classnames = (...classes) => {
  return twMerge(clsx(...classes));
};

export const copy = (data) => JSON.parse(JSON.stringify(data));

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, time);
  });
};

export const getShortAddress = (address) => {
  return address ? `${address.substr(0, 4)}...${address.substr(-4)}` : '';
};

export const getNumberString = (number) => {
  const reg = /(\d)(?=(\d{3})+$)/g;
  return String(number).replace(reg, '$1,');
};

export const formatSecond = (t) => {
  return dayjs(Number(t * 1000)).format('YYYY-MM-DD HH:mm:ss');
};

export const decimalString = (value, decimals = 2) => {
  let val = parseFloat(`${value}`);
  val = Number.isNaN(val) ? 0 : val;
  return val.toFixed(decimals);
};

export const decimalFloat = (value, decimals = 2) => {
  return parseFloat(this.decimalString(value, decimals));
};

export const valueToEther = (value) => {
  return formatUnits(value, 8);
};
