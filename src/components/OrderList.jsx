import { useLoaderData } from "react-router-dom";
import day from 'dayjs';
import advancedFormat from "dayjs/plugin/advancedFormat"; 
day.extend(advancedFormat);

const OrdersList = () => {
    const { orders, count } = useLoaderData();
    return (
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <h4 className="mb-4 capitalize">total orders :{count}</h4>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className="hidden sm:block">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const id = order._id;
                const { name, address, orderItems, total, createdAt } =
                  order;
                const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
                return (
                  <tr key={id} className="text-gray-900 dark:text-gray-100 even:bg-gray-100 dark:even:bg-gray-800">
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{address}</td>
                    <td className="px-4 py-2">{orderItems.length}</td>
                    <td className="px-4 py-2">{total}</td>
                    <td className="hidden sm:block px-4 py-2">{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  export default OrdersList;