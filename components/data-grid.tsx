"use client";

import React from "react";
import DataCard, { DataCardLoading } from "./data-card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { useGetSummery } from "@/features/summery/use-get-summery";

const DataGrid = () => {
  const { data, isPending } = useGetSummery();
  if (isPending) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Products"
        total={data?.products.total}
        isOutOfStock={data?.products.outOfStock}
        icon={FaPiggyBank}
        variant="default"
        description={"Product summary"}
      />
      <DataCard
        title="Enquries"
        total={data?.enquiries.total}
        success={data?.enquiries.completed}
        icon={FaArrowTrendDown}
        variant="default"
        description={"Enquries Summary"}
      />
      <DataCard
        title="Order"
        total={1000}
        icon={FaArrowTrendUp}
        variant="default"
        description={"Order Summary"}
      />
    </div>
  );
};

export default DataGrid;
