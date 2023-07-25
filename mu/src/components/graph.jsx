import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Graph = (props) => {
  return (
    <AreaChart
      className="py-[0.5rem]"
      data={props.data}
      margin={{ top: 5, right: 1, bottom: 5 }}
      width={props.width}
      height={props.height}
      style={{
        background: "#fcfcfc",
        padding: 50,
        borderRadius: 20,
        paddingLeft: 0,
      }}
    >
      <Area
        type="monotone"
        dataKey={props.dataKey}
        stroke={props.stroke}
        fillOpacity={0.6}
        fill={props.fill}
        strokeWidth={3}
        name={props.name}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis interval={"preserveEnd"} dataKey={"_id"} />
      <YAxis />
      <Legend />
      <Tooltip labelStyle={{ color: "black" }} itemStyle={{ color: "black" }} />
    </AreaChart>
  );
};

export default Graph;
