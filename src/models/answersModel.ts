import path from "path";
import QuizzModel from "./quizzModel";

export default class AmswersModel extends QuizzModel {
    constructor(){
        super();
    super.file = path.resolve(__dirname, '..', 'bin', 'answer.json')
    }
}