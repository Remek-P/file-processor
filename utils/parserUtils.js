import { checkForNumber } from "@/utils/sortUtils";

export const isContainingSubheaders = (data) => !data[1].some(datum => checkForNumber(datum));