type DecimalStyle = "dot" | "comma";

export interface YarnWeightBaseRow {
  symbol: string;
  gaugeStitches: string;
  needleRangeMm: string;
  needleRangeUs: string;
  wpi: string;
  wpiMin: number;
  wpiMax: number;
  regionalFull: string;
}

export interface YarnWeightLocalizedCopy {
  name: string;
  regional: string;
  uses: string;
}

export const YARN_WEIGHT_BASE_ROWS: readonly YarnWeightBaseRow[] = [
  {
    symbol: "0",
    gaugeStitches: "33-40+",
    needleRangeMm: "1.5-2.25",
    needleRangeUs: "000-1",
    wpi: "30-40+",
    wpiMin: 30,
    wpiMax: 40,
    regionalFull: "Lace, Cobweb, Light fingering, 2-ply (UK)",
  },
  {
    symbol: "1",
    gaugeStitches: "27-32",
    needleRangeMm: "2.25-3.25",
    needleRangeUs: "1-3",
    wpi: "14-30",
    wpiMin: 14,
    wpiMax: 30,
    regionalFull: "Sock, Fingering, Baby, 4-ply (UK/AUS)",
  },
  {
    symbol: "2",
    gaugeStitches: "23-26",
    needleRangeMm: "3.25-3.75",
    needleRangeUs: "3-5",
    wpi: "12-18",
    wpiMin: 12,
    wpiMax: 18,
    regionalFull: "Sport, Baby, 5-ply (UK/AUS)",
  },
  {
    symbol: "3",
    gaugeStitches: "21-24",
    needleRangeMm: "3.75-4.5",
    needleRangeUs: "5-7",
    wpi: "11-15",
    wpiMin: 11,
    wpiMax: 15,
    regionalFull: "DK (Double Knitting), Light Worsted, 8-ply (UK/AUS)",
  },
  {
    symbol: "4",
    gaugeStitches: "16-20",
    needleRangeMm: "4.5-5.5",
    needleRangeUs: "7-9",
    wpi: "9-12",
    wpiMin: 9,
    wpiMax: 12,
    regionalFull: "Worsted, Aran, Afghan, 10-ply (AUS)",
  },
  {
    symbol: "5",
    gaugeStitches: "12-15",
    needleRangeMm: "5.5-8",
    needleRangeUs: "9-11",
    wpi: "6-9",
    wpiMin: 6,
    wpiMax: 9,
    regionalFull: "Chunky, Craft, Rug, 12-ply (AUS)",
  },
  {
    symbol: "6",
    gaugeStitches: "7-11",
    needleRangeMm: "8-12.75",
    needleRangeUs: "11-17",
    wpi: "5-6",
    wpiMin: 5,
    wpiMax: 6,
    regionalFull: "Super Chunky, Bulky, Roving",
  },
  {
    symbol: "7",
    gaugeStitches: "0-6",
    needleRangeMm: "12.75+",
    needleRangeUs: "17+",
    wpi: "1-4",
    wpiMin: 1,
    wpiMax: 4,
    regionalFull: "Jumbo, Roving",
  },
] as const;

export const NEEDLE_SIZE_BASE_ROWS = [
  ["1.5", "000", "-", "-", "Lace"],
  ["1.75", "00", "-", "-", "Lace"],
  ["2.0", "0", "14", "0", "Lace"],
  ["2.25", "1", "13", "-", "Lace / Super Fine"],
  ["2.4", "-", "-", "1", "Super Fine"],
  ["2.5", "1.5", "-", "-", "Super Fine"],
  ["2.7", "-", "-", "2", "Super Fine"],
  ["2.75", "2", "12", "-", "Super Fine"],
  ["3.0", "2.5", "11", "3", "Super Fine"],
  ["3.25", "3", "10", "-", "Super Fine / Fine"],
  ["3.3", "-", "-", "4", "Fine"],
  ["3.5", "4", "-", "-", "Fine"],
  ["3.6", "-", "-", "5", "Fine"],
  ["3.75", "5", "9", "-", "Fine / Light"],
  ["3.9", "-", "-", "6", "Light"],
  ["4.0", "6", "8", "-", "Light"],
  ["4.2", "-", "-", "7", "Light"],
  ["4.5", "7", "7", "8", "Light / Medium"],
  ["4.8", "-", "-", "9", "Medium"],
  ["5.0", "8", "6", "-", "Medium"],
  ["5.1", "-", "-", "10", "Medium"],
  ["5.4", "-", "-", "11", "Medium"],
  ["5.5", "9", "5", "-", "Medium / Bulky"],
  ["5.7", "-", "-", "12", "Bulky"],
  ["6.0", "10", "4", "13", "Bulky"],
  ["6.3", "-", "-", "14", "Bulky"],
  ["6.5", "10.5", "3", "-", "Bulky"],
  ["6.6", "-", "-", "15", "Bulky"],
  ["7.0", "-", "2", "-", "Bulky"],
  ["8.0", "11", "0", "-", "Bulky / Super Bulky"],
  ["9.0", "13", "00", "-", "Super Bulky"],
  ["10.0", "15", "000", "-", "Super Bulky"],
  ["12.0", "17", "-", "-", "Super Bulky"],
  ["12.75", "-", "-", "-", "Super Bulky / Jumbo"],
  ["15.0", "19", "-", "-", "Jumbo"],
  ["16.0", "19", "-", "-", "Jumbo"],
  ["19.0", "35", "-", "-", "Jumbo"],
  ["25.0", "50", "-", "-", "Jumbo"],
] as const;

function formatDecimal(value: string, style: DecimalStyle): string {
  if (style === "comma") return value.replaceAll(".", ",");
  return value;
}

function formatRange(
  value: string,
  style: DecimalStyle,
  separator = "-",
): string {
  return formatDecimal(value, style).replaceAll("-", separator);
}

export function getLocalizedYarnWeightRows(
  copyRows: readonly YarnWeightLocalizedCopy[],
  gaugeUnit: string,
  decimalStyle: DecimalStyle = "comma",
) {
  return YARN_WEIGHT_BASE_ROWS.map((row, index) => {
    const copy = copyRows[index];
    return [
      row.symbol,
      copy.name,
      copy.regional,
      `${row.gaugeStitches} ${gaugeUnit}`,
      `${formatRange(row.needleRangeMm, decimalStyle)} mm`,
      `${row.wpi} WPI`,
      copy.uses,
      row.regionalFull,
    ] as const;
  });
}

export function getEnglishYarnWeightCategories(
  copyRows: readonly YarnWeightLocalizedCopy[],
) {
  return YARN_WEIGHT_BASE_ROWS.map((row, index) => {
    const copy = copyRows[index];
    return {
      cyc: Number(row.symbol),
      name: copy.name,
      regional: copy.regional,
      regionalFull: row.regionalFull,
      gauge: `${formatEnglishRange(row.gaugeStitches)} sts per 4 in / 10 cm`,
      needles: `US ${formatEnglishRange(row.needleRangeUs)} (${formatEnglishRange(row.needleRangeMm)} mm)`,
      wpi: formatEnglishRange(row.wpi),
      uses: copy.uses,
      wpiMin: row.wpiMin,
      wpiMax: row.wpiMax,
    } as const;
  });
}

export function getWpiCategories(
  copyRows: readonly Pick<YarnWeightLocalizedCopy, "name" | "regional">[],
) {
  return YARN_WEIGHT_BASE_ROWS.map((row, index) => {
    const copy = copyRows[index];
    return {
      cyc: Number(row.symbol),
      name: copy.name,
      regional: copy.regional,
      min: row.wpiMin,
      max: row.wpiMax,
    } as const;
  });
}

export function getNeedleSizeRows(
  decimalStyle: DecimalStyle = "dot",
  yarnWeightLabels?: readonly string[],
) {
  return NEEDLE_SIZE_BASE_ROWS.map(([mm, us, uk, jp, yarnWeight], index) => {
    return [
      formatDecimal(mm, decimalStyle),
      formatDecimal(us, decimalStyle),
      uk,
      jp,
      yarnWeightLabels?.[index] ?? yarnWeight,
    ] as const;
  });
}

export function formatEnglishRange(value: string): string {
  return formatRange(value, "dot", "\u2013");
}
