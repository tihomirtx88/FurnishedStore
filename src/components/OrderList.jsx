

const OrdersList = () => {
    return (
      <div className='mt-8'>
        <h4 className='mb-4 capitalize'>
          total orders :4
        </h4>
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th className='hidden sm:block'>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Todo order list */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  export default OrdersList;