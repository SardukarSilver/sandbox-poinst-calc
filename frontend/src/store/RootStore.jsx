/* eslint-disable no-console */
import { makeObservable, observable, action } from "mobx";
import axios from "axios";
import { nanoid } from "nanoid";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default class RootStore {
  constructor() {
    makeObservable(this, {
      data: observable,
      isLoading: observable,
      setData: action,
      getSalesData: action,
      calcData: action,
    });
  }

  data = null;

  isLoading = false;

  setData = (name, data) => {
    this[name] = data;
  };

  getSalesData = async () => {
    this.isLoading = true;
    try {
      const { data } = await axios.get("/api/salesData")
      this.setData('data', this.calcData(data))
    } catch (error) {
      // TODO custom error hendling
      console.log(error)
    } finally {
      this.setData('isLoading', false)
    }
  };

  calcData = (incomingData) => {
    // Calculate points per transaction
    const pointsPerTransaction = incomingData.map((transaction) => {
      let points = 0;
      let over100 = transaction.amt - 100;

      if (over100 > 0) {
        points += over100 * 2;
      }
      if (transaction.amt > 50) {
        points += 50;
      }
      const month = new Date(transaction.transactionDt).getMonth();

      return { ...transaction, points, month };
    });

    let byCustomer = {};
    let totalPointsByCustomer = {};
    pointsPerTransaction.forEach((pointsPerTransaction) => {
      let { custid, name, month, points } = pointsPerTransaction;
      if (!byCustomer[custid]) {
        byCustomer[custid] = [];
      }
      if (!totalPointsByCustomer[custid]) {
        totalPointsByCustomer[name] = 0;
      }
      totalPointsByCustomer[name] += points;
      if (byCustomer[custid][month]) {
        byCustomer[custid][month].points += points;
        byCustomer[custid][month].monthNumber = month;
        byCustomer[custid][month].numTransactions++;
      } else {
        byCustomer[custid][month] = {
          custid,
          name,
          monthNumber: month,
          month: MONTHS[month],
          numTransactions: 1,
          points,
          key: nanoid(),
        };
      }
    });
    let tot = [];
    for (var custKey in byCustomer) {
      byCustomer[custKey].forEach((cRow) => {
        tot.push(cRow);
      });
    }

    let totByCustomer = [];
    for (custKey in totalPointsByCustomer) {
      totByCustomer.push({
        key: nanoid(),
        name: custKey,
        points: totalPointsByCustomer[custKey],
      });
    }

    totByCustomer.forEach((cutomer) => {
      cutomer.custid = tot.find((item) => item.name === cutomer.name).custid;
    });

    for (const item in byCustomer) {
      byCustomer[item] = byCustomer[item].filter((a) => a);
    }

    return {
      summaryByCustomer: tot,
      pointsPerTransaction,
      totalPointsByCustomer: totByCustomer,
      groupByCustomer: byCustomer,
    };
  };
}
