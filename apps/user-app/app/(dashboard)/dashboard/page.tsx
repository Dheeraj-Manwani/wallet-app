"use server";

import React from "react";
import { MyChart } from "../../../components/MyChart";
import { getAuditBalances } from "../../lib/actions/getAuditBalances";

export default async function () {
  const auditBalances = await getAuditBalances();
  return (
    <div className="w-1/2 h-full">
      <MyChart data={auditBalances} />
    </div>
  );
}
