import React from "react";

type StatusBadgeProps = {
  status: "Pending" | "In Progress" | "Completed" | string;
};

const getColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "#f0ad4e";
    case "In Progress":
      return "#5bc0de";
    case "Completed":
      return "#5cb85c";
    default:
      return "#aaa";
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span
    style={{
      background: getColor(status),
      color: "#fff",
      padding: "0.25em 0.75em",
      borderRadius: 12,
      fontSize: 12,
    }}
  >
    {status}
  </span>
);

export default StatusBadge;
