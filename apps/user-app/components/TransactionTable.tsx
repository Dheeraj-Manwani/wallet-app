import { v4 as uuidv4 } from "uuid";

interface Transaction {
  fromUserId: Number;
  fromUserName: string;
  toUserId: Number;
  toUserName: string;
  loggedInUserId: Number;
  timestamp: any;
  amount: Number;
}

export const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="relative overflow-x-auto m-8 border rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border rounded-lg">
        <thead className="text-md text-gray-700  bg-gray-50 ">
          <tr className="border-b border-b-gray-400">
            <th scope="col" className="px-10 py-3">
              User
            </th>
            <th scope="col" className="px-10 py-3">
              Amount
            </th>
            <th scope="col" className="px-10 py-3">
              Date
            </th>
            <th scope="col" className="px-10 py-3">
              Time
            </th>
          </tr>
          {transactions.map((data) => (
            <TableRow data={data} />
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

const TableRow = ({ data }: { data: any }) => {
  console.log(data);
  let type = data.loggedInUserId === data.fromUserId ? "debit" : "credit";
  let dateObj = new Date(data.timestamp);
  let date = `
    ${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  let time = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  return (
    <tr className={`border-b border-b-gray-400`} key={uuidv4()}>
      <th
        scope="row"
        className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {type === "debit" ? data.toUserName : data.fromUserName}
      </th>
      <td
        className={`px-10 py-4 ${type === "credit" ? "text-green-600" : "text-red-600"}`}
      >
        &#8377;{`${type === "debit" ? "-" : ""}${data.amount / 100}`}
      </td>
      <td className="px-10 py-4">{date}</td>
      <td className="px-10 py-4">{time}</td>
    </tr>
  );
};
