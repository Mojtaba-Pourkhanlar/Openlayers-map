import { getTranslate } from "@/language";
import { ReactComponent as Delete } from "@/assets/svg/delete.svg";
import { ReactComponent as Download } from "@/assets/svg/download.svg";
import { ReactComponent as Visi } from "@/assets/svg/visibility.svg";

const translate = getTranslate();

export const options = [
  { value: "1", label: translate.projects },
  { value: "2", label: translate.download },
  { value: "3", label: translate.delete },
];

export const locationTime = [
  { value: "Default(UTC & Local)", label: "Default(UTC & Local)" },
  { value: "Local Time( Asia/Tehran)", label: "Local Time( Asia/Tehran)" },
  { value: "UTC Time", label: "UTC Time" },
];

export const system = [
  { value: "UTM38N", label: "UTM38N" },
  { value: "UTM39N", label: "UTM39N" },
  { value: "UTM40N", label: "UTM40N" },
  { value: "UTM41N", label: "UTM41N" },
];
export const STATUS = [
  { value: 1, label: "Synced" },
  { value: 2, label: "Not Synced" },
];

export const toltipData = [
  { name: translate.veiwProject, icon: Visi, value: "view" },
  { name: translate.download, icon: Download, value: "download" },
  { name: translate.deleteProject, icon: Delete, value: "delete" },
];
