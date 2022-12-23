import { Router } from 'express'

import QuizzController from '../controller/quizzController';

export const router = Router();

const quizz = new QuizzController();

router.route('/all').get(quizz.getQuizz);
router.route('/create').post(quizz.createOne);
router.route('/getquizz').get(quizz.getOne);
router.route('/deletequizz').delete(quizz.deleteOne);
router.route('/updatequizz').put(quizz.updateOne);





