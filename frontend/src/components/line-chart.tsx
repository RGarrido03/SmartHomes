import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";

type CustomLineChartProps = {
  data: object[];
  dataKey: string;
  className?: string;
  height?: number | string | undefined;
  unitOfMeasurement?: string;
  width?: number | string | undefined;
};

export function CustomTooltip({
  payload,
  label,
  active,
  unitOfMeasurement,
}: TooltipProps<number, string> & {
  unitOfMeasurement: string;
}) {
  if (active) {
    return (
      <div className="rounded-lg bg-popover px-4 py-3 shadow dark:shadow-lg">
        <p className="font-semibold">
          {payload ? payload[0].value : 0} {unitOfMeasurement}
        </p>
        <p className="text-sm">{label}</p>
      </div>
    );
  }

  return null;
}

export function CustomLineChart({
  data,
  dataKey,
  className = "stroke-primary",
  height = 160,
  unitOfMeasurement = "",
  width = "100%",
}: CustomLineChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        data={data}
        margin={{
          top: 4,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Tooltip
          content={
            <CustomTooltip label={"hi"} unitOfMeasurement={unitOfMeasurement} />
          }
        />
        <Line
          className={className}
          type="monotone"
          dataKey={dataKey}
          dot={false}
          fill="inherit"
          stroke="inherit"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
