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
import { MaterialSymbol } from "react-material-symbols";

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
                <CardContent noPadding>
                    <CardTitle className="flex flex-col gap-2">
                        Today
                    </CardTitle>
                    <CardTitle className="flex flex-col gap-2">
                        Yesterday
                    </CardTitle>
                </CardContent>
            </Card>

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>
                        Expenses
                    </CardTitle>
                    <CardDescription>Water and eletricity expenses</CardDescription>
                </CardHeader>
                <CardContent noPadding>
                    <div>
                        <CardHeader icon="water">
                            Water
                        </CardHeader>
                    </div>
                    <div>
                        <CardHeader icon="electric_bolt">
                            Electricity
                        </CardHeader>
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

                </CardContent>
            </Card>

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Expenses by month</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between">
                            <p className="font-semibold">Air conditioner</p>
                            <p>2600 W</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="font-semibold">Dehumidifier</p>
                            <p>350 W</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="font-semibold">Oven</p>
                            <p>100 W</p>
                        </div>
                    </div>

                    <CustomAreaChart
                        data={data}
                        dataKey="monthExpences"
                        className="fill-yellow-300 dark:fill-yellow-600"
                        unitOfMeasurement="€"
                    />

                </CardContent>
            </Card>
        </div>
    );
}
