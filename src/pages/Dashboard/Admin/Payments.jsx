import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import { MdOutlinePayment } from "react-icons/md";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure("/payments");
      return res.data;
    },
  });

  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">View Payments</h2>
          <p className="text-accent">
            Track all payment transactions on the platform.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : payments.length !== 0 ? (
        <div className="overflow-x-auto bg-white border border-base-300 rounded-2xl">
          <h1 className="flex items-center gap-1 text-2xl text-secondary font-bold bg-white p-3 pb-0">
            <MdOutlinePayment />
            Payment History
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Member</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Club Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.memberName}</td>
                  <td className="font-medium">{payment.memberEmail}</td>
                  <td className="font-medium">${payment.amount}</td>
                  <td>
                    <div className="badge font-medium">
                      {payment.paymentType}
                    </div>
                  </td>
                  <td className="font-medium">{payment.clubName}</td>
                  <td>
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString("en-CA")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-2xl mt-10">
          No transactoins yet!
        </p>
      )}
    </div>
  );
};

export default Payments;
