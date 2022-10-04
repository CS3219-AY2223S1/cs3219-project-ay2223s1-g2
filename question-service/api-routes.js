// Initialize express router
import { Router } from 'express'

let router = Router();
// Set default API response
router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome to Question Service API!'
    });
});

// Import contact controller

import questionController from './controller/question-controller.js'// Question routes

router.route('/questions')
    .get(questionController.index);

router.route('/randomquestion')
    .get(questionController.randomQuestion);


// router.route('/question')
//     .post(questionController.new);

// router.route('/randomquestion')
//     .post(questionController.randomQuestion);


// router.route('/contacts/:contact_id')
//     .get(questionController.view)
//     .patch(questionController.update)
//     .put(questionController.update)
//     .delete(questionController.delete);

// Export API routes
export default router;

