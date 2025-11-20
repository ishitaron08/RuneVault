"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  History,
  Loader2,
} from "lucide-react";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import PortfolioStats from "@/components/dashboard/PortfolioStats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePortfolioContext } from "@/contexts/PortfolioProvider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TransactionSummary from "@/components/dashboard/TransactionSummary";

import {
  Label,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { TransactionStatus } from "@solana/web3.js";
import CopyToClipboard from "react-copy-to-clipboard";
import { Input } from "@/components/ui/input";

function PerformanceChart() {
  return (
    <Card className="mt-6">
      {" "}
      <CardHeader>
        {" "}
        <CardTitle className="text-lg font-medium">Performance</CardTitle>{" "}
      </CardHeader>{" "}
      <CardContent>
        {" "}
        <Line data={chartData} />{" "}
      </CardContent>{" "}
    </Card>
  );
}

const TransactionButton = ({
  href,
  icon: Icon,
  label,
}: {
  href?: string;
  icon: any;
  label: string;
}) => {
  return (
    <Button variant="outline" asChild>
      <a href={href} className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
};

export function PortfolioValue() {
  const { balance, isFetching, timestamp, address } = usePortfolioContext();

  const [copyStatus, setCopyStatus] = useState(false);

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="md:flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-4xl font-bold">
                {isFetching ? (
                  <div className="animate-pulse bg-gray-200 h-10 w-48 rounded" />
                ) : (
                  <span>{balance.toLocaleString()} SOL</span>
                )}
              </div>
              <div className="text-sm text-gray-500">Updated {timestamp}</div>
            </div>
            <div className="flex items-center mt-3 md:mt-0 gap-6">
              <Modal>
                <ModalTrigger>
                  <TransactionButton icon={ArrowDownToLine} label="Deposit" />
                </ModalTrigger>
                <ModalBody>
                  <ModalContent>
                    <div className="text-center pt-2 pb-4">
                      <div className="text-4xl font-semibold text-foreground">
                        Send your crypto to this address
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center space-x-2 pt-6">
                          <div className="max-w-fit overflow-hidden rounded-md border border-input bg-muted/20 px-3 py-2.5 text-sm shadow-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
                            <p className="truncate font-mono text-base">
                              {address}
                            </p>
                          </div>
                          <CopyToClipboard text={address} onCopy={onCopyText}>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center rounded-md bg-primary p-2.5 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              aria-label="Copy address to clipboard"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                                />
                              </svg>
                              <span className="sr-only">Copy</span>
                            </button>
                          </CopyToClipboard>
                        </div>

                        {/* Feedback when copied */}
                        {copyStatus && (
                          <p className="text-sm text-green-600 animate-in fade-in-0 slide-in-from-bottom-1">
                            Address copied to clipboard!
                          </p>
                        )}
                      </div>
                    </div>
                    <ModalFooter className="flex justify-center border-t border-border p-3 bg-muted/20 mt-auto">
                      <small className="text-xs text-muted-foreground">
                        Make sure to double-check the address before sending any
                        funds
                      </small>
                    </ModalFooter>
                  </ModalContent>
                </ModalBody>
              </Modal>

              <TransactionButton
                href="/c/transfer"
                icon={ArrowUpFromLine}
                label="Withdraw"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Portfolio() {
  const { balance, isFetching, refetch, error } = usePortfolioContext();
  const session = useSession();
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-medium">
              Weclome back, {session.data?.user?.name}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={refetch}
              disabled={isFetching}
              className="hover:bg-gray-100"
            >
              <RefreshCw
                className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <PortfolioValue />
          <PerformanceChart />
        </div>

        <div className="space-y-6 mt-3">
          <PortfolioStats balance={balance} />
        </div>
      </div>
    </div>
  );
}

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Portfolio Value (SOL)",
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: "#4F46E5",
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      fill: true,
      tension: 0.3,
    },
  ],
};
