import { MaterialSymbolProps } from "react-material-symbols";
import { Room } from "./page";

export const deviceTypes: DeviceTypes = {
  AC: { name: "Air conditioner", icon: "mode_fan" },
  CARCARGER: { name: "Car charger", icon: "directions_car" },
  DESUMIDIFIER: { name: "Dehumidifier", icon: "humidity_mid" },
  GRIDMETER: { name: "Grid meter", icon: "electric_meter" },
  LIGHT: { name: "Light", icon: "lightbulb" },
  OVEN: { name: "Oven", icon: "oven" },
  PLUG: { name: "Plug", icon: "outlet" },
  SMARTASSISTANT: { name: "Home hub", icon: "nest_audio" },
  SOLARPV: { name: "Solar panel", icon: "solar_power" },
  TV: { name: "TV", icon: "tv_with_assistant" },
  VACUUM: { name: "Vacuum cleaner", icon: "vacuum" },
  WINDTURBINE: { name: "Wind turbine", icon: "wind_power" },
};

export type DeviceTypes = {
  [key in Room["devices"][number]["type"]]: {
    name: string;
    icon: MaterialSymbolProps["icon"];
  };
};
