"use client";

import { CustomAreaChart } from "@/components/area-chart";
import { TitleCard } from "@/components/title-card";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import {MaterialSymbol} from "react-material-symbols";
import Link from "next/link";
import {Button} from "@/components/ui/button";

type CostsProps = {
    dayExpenses : number,
    yesterdayExpenses : number,
    water_mon : number,
    electricity_mon: number,
    monthExpenses: number
}[];

export default function Costs() {
    const [data, setData] = useState<CostsProps>([]);

    useEffect(() => {
        async function fetchData() {
            const temp = await fetch(
                `http://${process.env.NEXT_PUBLIC_HOST_URL}/service/houses/1/costs`,
                {
                    next: { revalidate: 60 }, // Revalidate every 60 seconds
                },
            );
            setData(await temp.json());
        }

        fetchData().catch(console.error);
        const interval = setInterval(() => {
            fetchData().catch(console.error);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TitleCard text="Here's your expenses summary" />

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>
                        Net Expenses
                    </CardTitle>
                    <CardDescription>Your net expenses after considering earnings from the grid</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-10">
                        <div>
                            <p>Today</p>
                            <p className="text-3xl font-semibold">294,43 €</p>
                        </div>
                        <div>
                            <p>Yesterday</p>
                            <p className="text-3xl">356,48 €</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>
                        Expenses
                    </CardTitle>
                    <CardDescription>Water and eletricity expenses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-10">
                        <div>
                            <MaterialSymbol icon="water_drop" size={35} className="text-blue-300"></MaterialSymbol>
                            <p>Water</p>
                            <p className="text-3xl text-blue-400"> 256,56 € </p>
                        </div>
                        <div>
                            <MaterialSymbol icon="bolt" size={35} className="text-amber-300"></MaterialSymbol>
                            <p>Electricity</p>
                            <p className="text-3xl text-amber-300"> 256,56 €</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden">
            <CardHeader>
                    <CardTitle>
                        Oh snap! These devices are having a power party.
                    </CardTitle>
                    <CardDescription>Consider adjusting them if needed.</CardDescription>
                </CardHeader>
                <CardContent noPadding>
                    <div className="mx-3 mb-2 flex items-center justify-between rounded-card bg-zinc-600 p-4">
                        <div className="flex gap-2">
                            <MaterialSymbol icon="microwave" size={40}></MaterialSymbol>
                            <div className="text-xl font-bold">
                                Microwave
                            </div>
                        </div>

                        <Link href="#">
                            <Button className="bg-red-400 p-2 text-black">
                                Stop
                            </Button>
                        </Link>

                    </div>

                    <div className="mx-3 mb-2 flex items-center justify-between rounded-card bg-zinc-600 p-4">
                        <div className="flex gap-2">
                            <MaterialSymbol icon="microwave" size={40}></MaterialSymbol>
                            <div className="text-xl font-bold">
                                Microwave
                            </div>
                        </div>

                        <Link href="#">
                            <Button className="bg-red-400 p-2 text-black">
                                Stop
                            </Button>
                        </Link>

                    </div>

                </CardContent>
            </Card>

            <Card className="overflow-hidden md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Expenses by month</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-10">
                        <div className="font-semibold">
                            <p>November</p>
                            <p className="text-3xl">4654,5 €</p>
                        </div>
                        <div>
                            <p>Outubro</p>
                            <p className="text-3xl">3600,63 €</p>
                        </div>
                    </div>
                    <div>
                        <CustomAreaChart
                            data={data}
                            dataKey="monthExpences"
                            className="fill-blue-600 dark:fill-yellow-600"
                            unitOfMeasurement="€"
                        />
                    </div>


                </CardContent>
            </Card>
        </div>
    );
}
