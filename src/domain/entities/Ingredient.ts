import Timestamps from "./Timestamps";

interface Ingredient extends Timestamps {
    uuid?: string;
    name?: string;
    unitOfMeasure?: string;
    cost?: number;
    status?: string;
};

export default Ingredient;