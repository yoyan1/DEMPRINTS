"use client";
import React from 'react'
import AdminLayout from './layout/layout'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { FaChartLine } from "react-icons/fa";
import { MdCandlestickChart } from "react-icons/md";
import { FaChartArea } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <AdminLayout>
      <main className="flex flex-1 flex-col gap-4 m-4 lg:gap-6 lg:m-6 bg-white">
        <div>
          <div>
            <Tabs aria-label="Options" color="primary">
              <Tab key="summary" title={
                <div className="flex items-center space-x-2">
                  <FaChartLine/>
                  <span>Summary</span>
                </div>
              }>
                <Card>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="expenses" title={
                <div className="flex items-center space-x-2">
                  <MdCandlestickChart/>
                  <span>Expenses</span>
                </div>
              }>
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="analytics" title={
                <div className="flex items-center space-x-2">
                  <FaChartArea/>
                  <span>Analytics</span>
                </div>
              }>
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}
