import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import axios from "axios";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connectionsData = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnectionData = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/user/connections",
        {},
        { withCredentials: true }
      );
      dispatch(addConnections(res.data?.data ?? []));
    } catch (err) {
      console.error(err);
      dispatch(addConnections([]));
    }
  };

  useEffect(() => {
    getConnectionData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-2xl my-10">Connections</h1>
      </div>
      <div className="justify-items-center mb-60">
        {connectionsData && connectionsData.length > 0 ? (
          connectionsData.map((card, idx) => (
            <ConnectionCard
              key={card?._id ?? idx}
              connectionDetails={card}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4 my-100">
            No connections found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
